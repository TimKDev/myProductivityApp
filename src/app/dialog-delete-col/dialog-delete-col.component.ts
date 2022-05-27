import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {MatDialogRef} from '@angular/material/dialog';
import { filter } from 'rxjs';
import { Board } from 'src/models/board.class';
import { MyTask } from 'src/models/task.class';

@Component({
  selector: 'app-dialog-delete-col',
  templateUrl: './dialog-delete-col.component.html',
  styleUrls: ['./dialog-delete-col.component.scss']
})
export class DialogDeleteColComponent implements OnInit {

  boardId!: string;
  activeBoard!: Board;
  numCol!: number;

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogDeleteColComponent>
  ) { }

  ngOnInit(): void {
  }

  deleteCol() {
    // Remove Tasks assoziated with this column:
    // let allTasksWithoutCol: string[] = [];
    // this.firestore
    // .collection('tasks')
    // .valueChanges({idField: 'taskId'})
    // .pipe(filter((task: any) => {return !(task.boardName == this.boardId && task.column == this.activeBoard.columns[this.numCol])}));
    // .subscribe((changes: any) => {
    //   allTasksWithoutCol = changes.forEach((task: any) => {
    //     if(!(task.boardName == this.boardId && task.column == this.activeBoard.columns[this.numCol])) return;
    //     allTasksWithoutCol.push(task.taskId); 
    //     console.log(allTasksWithoutCol);  
    //   });      
    // });
    

    // Remove the Column from active Board:
    this.activeBoard.columns.splice(this.numCol, 1);
    this.firestore
    .collection('boards')
    .doc(this.boardId)
    .update(this.activeBoard);

    this.dialogRef.close();
  }

}
