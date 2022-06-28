import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/models/board.class';
import { MyTask } from 'src/models/task.class';
import { DialogAddColumnComponent } from '../dialog-add-column/dialog-add-column.component';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { DialogDeleteColComponent } from '../dialog-delete-col/dialog-delete-col.component';
import { FirebaseAuthService } from '../../../Services/firebase-auth.service';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { DialogEditColNameComponent } from '../dialog-edit-col-name/dialog-edit-col-name.component';
import { DialogEditColOrderComponent } from '../dialog-edit-col-order/dialog-edit-col-order.component';
import { PomodoroTimerService } from 'src/Services/pomodoro-timer.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  host: {  // Die nun folgenden HTML Attribute werden an alle <app-board> Tags angehangen:
    style: 'height: calc(100vh - 64px); width: 100%;'
  }
})
export class BoardComponent implements OnInit {

  activeBoard: Board = new Board({
    name: '',
    columns: [],
    categories: [],
    author: ''
  });
  allTasksBoard: MyTask[] = [];
  activeBoardId!: string;
  currentlyDraggedElement!: string;
  taskToUpdateArray: any = []; 

  allowDrop = true;
  draggingTask = false;
  currentlyArchiving = false;

  @ViewChild('colContainer') ColDiv: any;
  intervalRef: any;


  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public auth: FirebaseAuthService,
    public dialog: MatDialog,
    public timer: PomodoroTimerService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.activeBoardId = params['boardId'];
      this.firestore
      .collection('boards')
      .doc(params['boardId'])
      .valueChanges()
      .subscribe((changes: any) => {
        this.activeBoard = changes;
      });

      this.firestore
      .collection('tasks')
      .valueChanges({idField: 'taskId'})
      .subscribe((changes: any) => {
        this.allTasksBoard = changes
        .filter((task: any) => {
          return task.boardName == params['boardId'];
        })
        .map((task: any) => {
          if (this.isTaskInTaskToUpdateArray(task)){
            task.column = this.taskToUpdateArray.find((taskToUpdate: any) => taskToUpdate.taskId == task.taskId).column;     
            task.position = this.taskToUpdateArray.find((taskToUpdate: any) => taskToUpdate.taskId == task.taskId).position;
          }
          return task;
        });        
      });
    });
  }


  taskPositionInTaskToUpdateArray(taskToCheck: any): number{
    return this.taskToUpdateArray.findIndex((task: any) => {
      return task.taskId == taskToCheck.taskId;
    })
  }

  isTaskInTaskToUpdateArray(taskToCheck: any) {
    for (let i = 0; i < this.taskToUpdateArray.length; i++) {
      if (this.taskToUpdateArray[i].taskId == taskToCheck.taskId) return true;
    }
    return false;
  }

  addTaskToTaskToUpdate(task: any) {
    if(!this.isTaskInTaskToUpdateArray(task)){
      this.taskToUpdateArray.push(task);
      return;
    } 
    this.taskToUpdateArray[this.taskPositionInTaskToUpdateArray(task)] = task;
  }


  TasksCol(colNum: number){
    let result: any[] = [];
    this.allTasksBoard.forEach((task: any) => {
      if(task.column == this.activeBoard.columns[colNum]) result.push(task);
    });
    return result.sort((task1: any, task2: any) => {
      return task1.position - task2.position;
    });
  }
  

  isMobileView() {
    return window.innerWidth < 1000;
  }


  openDialog(numCol: number) {
    const dialogRef = this.dialog.open(DialogAddTaskComponent, {
      maxWidth: this.isMobileView() ? '100vw' : 'auto',
      maxHeight: this.isMobileView() ? '100vh' : 'auto',
      height: this.isMobileView() ? '100%' : 'auto',
      width: this.isMobileView() ? '100%' : 'auto'
    });
    dialogRef.componentInstance.categories = this.activeBoard.categories;
    dialogRef.componentInstance.boardName = this.activeBoardId;
    dialogRef.componentInstance.column = this.activeBoard.columns[numCol];
    dialogRef.componentInstance.position = this.TasksCol(numCol).length;
  }


  addColumn() {
    const dialogRef = this.dialog.open(DialogAddColumnComponent);
    dialogRef.componentInstance.activeBoard = this.activeBoard;
    dialogRef.componentInstance.activeBoardId = this.activeBoardId;
  }


  openDeleteColDialog(numCol: number) {
    const dialogRef = this.dialog.open(DialogDeleteColComponent);
    dialogRef.componentInstance.activeBoard = this.activeBoard;
    dialogRef.componentInstance.boardId = this.activeBoardId;
    dialogRef.componentInstance.numCol = numCol;
  }


  drop(event: CdkDragDrop<any[]>, col: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      for (let i = 0; i < event.container.data.length; i++) {
        let newTask = event.container.data[i];
        newTask.position = i;
        this.updateTaskInFirebase(newTask);
      }
    } 
    else {   
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );   
      for (let i = 0; i < event.container.data.length; i++) {
        let newTask = event.container.data[i];
        newTask.position = i;
        newTask.column = col;
        this.updateTaskInFirebase(newTask);
      }
      for (let i = 0; i < event.previousContainer.data.length; i++) {
        let newTask = event.previousContainer.data[i];
        newTask.position = i;
        this.updateTaskInFirebase(newTask);
      }
    }
  }


  updateTaskInFirebase(task: any){
    this.addTaskToTaskToUpdate(task);
    this.firestore
    .collection('tasks')
    .doc(task.taskId)
    .update(task)
    .then(() => {
      this.taskToUpdateArray.splice(this.taskPositionInTaskToUpdateArray(task), 1);
      this.checkIfTasksNeedToBeArchived();
    });
  }

  openDialogTasksDetails(taskId: string, currentTask: MyTask){
    const dialogRef = this.dialog.open(TaskDetailsComponent, {
      maxWidth: this.isMobileView() ? '100vw' : 'auto',
      maxHeight: this.isMobileView() ? '100vh' : 'auto',
      height: this.isMobileView() ? '100%' : 'auto',
      width: this.isMobileView() ? '100%' : 'auto'
    }); 
    dialogRef.componentInstance.taskId = taskId;
    dialogRef.componentInstance.currentTask = currentTask;
    dialogRef.componentInstance.activeBoard = this.activeBoard;
  }


  openDialogEditPosition(){
    const dialogRef = this.dialog.open(DialogEditColOrderComponent); 
    dialogRef.componentInstance.activeBoard = this.activeBoard;
    dialogRef.componentInstance.boardId = this.activeBoardId;
  }

  openDialogEditName(numCol: number) {
    const dialogRef = this.dialog.open(DialogEditColNameComponent); 
    dialogRef.componentInstance.activeBoard = this.activeBoard;
    dialogRef.componentInstance.boardId = this.activeBoardId;
    dialogRef.componentInstance.numCol = numCol;
  }


  moveWindowLeft() {
    if(!this.draggingTask) return;
    this.intervalRef = setInterval(() => {
      this.ColDiv.nativeElement.scrollLeft -= 2;
    } ,10);
  }

  stopMovingWindow() {
    if(!this.draggingTask) return;
    clearInterval(this.intervalRef);
  }

  moveWindowRight() {
    if(!this.draggingTask) return;
    this.intervalRef = setInterval(() => {
      this.ColDiv.nativeElement.scrollLeft += 2;
    } ,10);
  }

  startDragging() {
    this.draggingTask = true; 
  }

  endDragging() {
    this.draggingTask = false;
  }

  checkIfTasksNeedToBeArchived() {
    let maxNumberOfTasksInDone = 10;
    let tasksDone = this.TasksCol(this.activeBoard.columns.indexOf('Done'));
    if (tasksDone.length < maxNumberOfTasksInDone) return;
    tasksDone.forEach((task: any) => {
      if(task.position < maxNumberOfTasksInDone) return;
      this.archiveTask(task);
    })
  }

  archiveTask(task: any){
    if(this.currentlyArchiving) return;
    this.currentlyArchiving = true;
    this.firestore
    .collection('tasks')
    .doc(task.taskId)
    .delete()
    .then(() => {
      this.firestore
      .collection('archive')
      .add(task)
      .then(() => {
        this.currentlyArchiving = false;
      });
    });

    
  }

}
