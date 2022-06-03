import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
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

  // allTasksCol: MyTask[][] = [];


  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public auth: FirebaseAuthService,
    public dialog: MatDialog
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
        this.allTasksBoard = changes.filter((task: any) => {
          return task.boardName == params['boardId'];
        });        
      });
    });
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
    const dialogRef = this.dialog.open(DialogAddTaskComponent);
    dialogRef.componentInstance.categories = this.activeBoard.categories;
    dialogRef.componentInstance.boardName = this.activeBoardId;
    dialogRef.componentInstance.column = this.activeBoard.columns[numCol];
    dialogRef.componentInstance.position = this.TasksCol(numCol).length;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
      this.updateTaskInFirebase(task);
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
      this.updateTaskInFirebase(task);
    });         
  }


  updateTaskInFirebase(task: any){
    this.firestore
    .collection('tasks')
    .doc(task.taskId)
    .update(task);
  }

  openDialogTasksDetails(taskId: string){
    const dialogRef = this.dialog.open(TaskDetailsComponent); 
    dialogRef.componentInstance.taskId = taskId;
    dialogRef.componentInstance.activeBoard = this.activeBoard;
  }


  openDialogEditPosition(){

  }

  openDialogEditName(numCol: number) {
    const dialogRef = this.dialog.open(DialogEditColNameComponent); 
    dialogRef.componentInstance.activeBoard = this.activeBoard;
    dialogRef.componentInstance.boardId = this.activeBoardId;
    dialogRef.componentInstance.numCol = numCol;
  }

}
