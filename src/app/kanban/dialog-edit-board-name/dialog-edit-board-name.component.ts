import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-board-name',
  templateUrl: './dialog-edit-board-name.component.html',
  styleUrls: ['./dialog-edit-board-name.component.scss']
})
export class DialogEditBoardNameComponent implements OnInit {

  board!: any;
  loading = false;

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogEditBoardNameComponent>
  ) { }

  ngOnInit(): void {
  }

  changeNameBoard(newName: string){
    this.board.name = newName;
    console.log(this.board);
    
    this.firestore
    .collection('boards')
    .doc(this.board.idBoard)
    .update(this.board);
  }

}
