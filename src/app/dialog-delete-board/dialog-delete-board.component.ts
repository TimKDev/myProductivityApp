import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-board',
  templateUrl: './dialog-delete-board.component.html',
  styleUrls: ['./dialog-delete-board.component.scss']
})
export class DialogDeleteBoardComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {boardId: string, boardName: string},
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogDeleteBoardComponent>
  ) { }

  ngOnInit(): void {
  }

  deleteBoard() {
    console.log('Delete:', this.data.boardId);
    this.firestore
    .collection('boards')
    .doc(this.data.boardId)
    .delete();
    this.dialogRef.close();
  }

}
