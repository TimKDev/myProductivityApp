import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Board } from 'src/models/board.class';

@Component({
  selector: 'app-dialog-edit-col-name',
  templateUrl: './dialog-edit-col-name.component.html',
  styleUrls: ['./dialog-edit-col-name.component.scss']
})
export class DialogEditColNameComponent implements OnInit {

  loading = false;
  boardId!: string;
  activeBoard!: Board;
  numCol!: number;

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogEditColNameComponent>
  ){ }


  ngOnInit(): void {
  }

  changeNameColumnForTasks(newName: string) {
    this.firestore
    .collection('tasks')
    .valueChanges({idField: 'taskId'})
    .pipe(take(1))
    .subscribe((changes: any) => {
      changes.forEach((task: any) => {  
        if(!(task.boardName == this.boardId && task.column == this.activeBoard.columns[this.numCol])) return;
        task.column = newName;
        this.firestore
        .collection('tasks')
        .doc(task.taskId)
        .update(task)
        .then(() => {
          this.changeNameColumn(newName);
        });
      });    
    });
  }

  changeNameColumn(newName: string) {
    this.activeBoard.columns[this.numCol] = newName;
    this.firestore
    .collection('boards')
    .doc(this.boardId)
    .update(this.activeBoard);

    this.dialogRef.close();
  }


}
