import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Board } from 'src/models/board.class';

@Component({
  selector: 'app-dialog-edit-col-order',
  templateUrl: './dialog-edit-col-order.component.html',
  styleUrls: ['./dialog-edit-col-order.component.scss']
})
export class DialogEditColOrderComponent implements OnInit {

  loading = false;
  boardId!: string;
  activeBoard!: Board;
  colArray: string[] = [];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.colArray, event.previousIndex, event.currentIndex);
  }

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogEditColOrderComponent>
  ) { }

  ngOnInit(): void {
    this.activeBoard.columns.forEach((col: string) => {
      this.colArray.push(col);
    })
  }

  saveChangedColPosition() {
    this.activeBoard.columns = this.colArray;
    this.firestore
    .collection('boards')
    .doc(this.boardId)
    .update(this.activeBoard);
    this.dialogRef.close();
  }

}
