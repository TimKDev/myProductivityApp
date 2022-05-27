import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/models/board.class';
import { MyTask } from 'src/models/task.class';
import { DialogAddColumnComponent } from '../dialog-add-column/dialog-add-column.component';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { DialogDeleteColComponent } from '../dialog-delete-col/dialog-delete-col.component';
import { FirebaseAuthService } from '../firebase-auth.service';

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
      .valueChanges()
      .subscribe((changes: any) => {
        this.allTasksBoard = changes.filter((task: any) => {
          return task.boardName == params['boardId'];
        });        
      });
    });
  }

  TasksCol(colNum: number){
    let result: MyTask[] = [];
    this.allTasksBoard.forEach((task: MyTask) => {
      if(task.column == this.activeBoard.columns[colNum]) result.push(task);
    });
    return result;
  }

  openDialog(numCol: number) {
    const dialogRef = this.dialog.open(DialogAddTaskComponent);
    dialogRef.componentInstance.categories = this.activeBoard.categories;
    dialogRef.componentInstance.boardName = this.activeBoardId;
    dialogRef.componentInstance.column = this.activeBoard.columns[numCol];
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



}
