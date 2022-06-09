import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/models/board.class';
import { MyTask } from 'src/models/task.class';
import { DialogAddColumnComponent } from '../dialog-add-column/dialog-add-column.component';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { DialogDeleteColComponent } from '../dialog-delete-col/dialog-delete-col.component';
import { FirebaseAuthService } from '../../Services/firebase-auth.service';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { DialogEditColNameComponent } from '../dialog-edit-col-name/dialog-edit-col-name.component';
import { DialogEditColOrderComponent } from '../dialog-edit-col-order/dialog-edit-col-order.component';
import { PomodoroTimerService } from 'src/app/Services/pomodoro-timer.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  host: {  // Die nun folgenden HTML Attribute werden an alle <app-board> Tags angehangen:
    style: 'height: calc(100vh - 64px); width: 100%;'
  }
})
export class BoardComponent implements OnInit, OnDestroy {

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

  // allTasksCol: MyTask[][] = [];


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
          return task
        });        
      });
    });
  }

  ngOnDestroy(): void {
    this.saveTaskToUpdateToFirestore();
  }

  unloadHandler() {
    this.saveTaskToUpdateToFirestore();
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

  saveTaskToUpdateToFirestore(){
    this.taskToUpdateArray.forEach((task: any) => {
      this.updateTaskInFirebase(task);
    });

    this.taskToUpdateArray = [];
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

  openDialog(numCol: number) {
    // this.saveTaskToUpdateToFirestore();
    const dialogRef = this.dialog.open(DialogAddTaskComponent);
    dialogRef.componentInstance.categories = this.activeBoard.categories;
    dialogRef.componentInstance.boardName = this.activeBoardId;
    dialogRef.componentInstance.column = this.activeBoard.columns[numCol];
    dialogRef.componentInstance.position = this.TasksCol(numCol).length;
  }


  addColumn() {
    // this.saveTaskToUpdateToFirestore();
    const dialogRef = this.dialog.open(DialogAddColumnComponent);
    dialogRef.componentInstance.activeBoard = this.activeBoard;
    dialogRef.componentInstance.activeBoardId = this.activeBoardId;
  }


  openDeleteColDialog(numCol: number) {
    // this.saveTaskToUpdateToFirestore();
    const dialogRef = this.dialog.open(DialogDeleteColComponent);
    dialogRef.componentInstance.activeBoard = this.activeBoard;
    dialogRef.componentInstance.boardId = this.activeBoardId;
    dialogRef.componentInstance.numCol = numCol;
  }


  drop(event: CdkDragDrop<any[]>, col: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.switchInSameCol(event, col)
    } 
    else {    
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.switchCol(event, col);
    }
  }


  switchInSameCol(event: CdkDragDrop<any[]>, col: string){
    let currentCol = col;
    this.allTasksBoard.forEach((task: any) => {
      if(event.previousIndex < event.currentIndex && task.column == currentCol){
        if (task.position > event.previousIndex && task.position <= event.currentIndex){
          task.position--;
        }
        else if(task.position == event.previousIndex){
          task.position = event.currentIndex;
        }
      }
      if(event.previousIndex > event.currentIndex && task.column == currentCol){
        if (task.position >= event.currentIndex && task.position < event.previousIndex){
          task.position++;
        }
        else if(task.position == event.previousIndex){
          task.position = event.currentIndex;
        }
      }
      this.taskToUpdateArray.push(task);
      // this.updateTaskInFirebase(task);
    });
  }


  switchCol(event: CdkDragDrop<any[]>, col: string){
    let currentCol = col;
    let previousCol =  event.container.data[event.currentIndex].column;
    this.allTasksBoard.forEach((task: any) => {
      if (task.column == previousCol && task.position > event.previousIndex){
        task.position--;
      }
      else if( task.column == currentCol && task.position >= event.currentIndex){
        task.position++;
      }
      else if(task.column == previousCol && task.position == event.previousIndex){
        task.column = currentCol;
        task.position = event.currentIndex;
      }
      else {
        return;
      }
      this.taskToUpdateArray.push(task);
      // this.updateTaskInFirebase(task);
    });         
  }


  updateTaskInFirebase(task: any){
    this.firestore
    .collection('tasks')
    .doc(task.taskId)
    .update(task)
    // .then(() => {console.log('Task updeted');} );
  }

  openDialogTasksDetails(taskId: string, currentTask: MyTask){
    this.saveTaskToUpdateToFirestore();
    const dialogRef = this.dialog.open(TaskDetailsComponent); 
    dialogRef.componentInstance.taskId = taskId;
    dialogRef.componentInstance.currentTask = currentTask;
    dialogRef.componentInstance.activeBoard = this.activeBoard;
  }


  openDialogEditPosition(){
    this.saveTaskToUpdateToFirestore();
    const dialogRef = this.dialog.open(DialogEditColOrderComponent); 
    dialogRef.componentInstance.activeBoard = this.activeBoard;
    dialogRef.componentInstance.boardId = this.activeBoardId;
  }

  openDialogEditName(numCol: number) {
    this.saveTaskToUpdateToFirestore();
    const dialogRef = this.dialog.open(DialogEditColNameComponent); 
    dialogRef.componentInstance.activeBoard = this.activeBoard;
    dialogRef.componentInstance.boardId = this.activeBoardId;
    dialogRef.componentInstance.numCol = numCol;
  }

}
