import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Board } from 'src/models/board.class';

@Component({
  selector: 'app-dialog-add-column',
  templateUrl: './dialog-add-column.component.html',
  styleUrls: ['./dialog-add-column.component.scss']
})
export class DialogAddColumnComponent implements OnInit {

  activeBoard!: Board; // This is already a JSON Object
  activeBoardId!: string;
  loading = false;

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogAddColumnComponent>
  ){ }

  ngOnInit(): void {
  }

  addColumn(columnName: string){
    console.log(this.activeBoard);
    this.loading = true;
    this.activeBoard.columns.push(columnName);
    console.log(this.activeBoard);
    
    this.firestore
    .collection('boards')
    .doc(this.activeBoardId)
    .update(this.activeBoard)
    .then(() => {
      this.loading = false;
      this.dialogRef.close();
    });
  }

}
