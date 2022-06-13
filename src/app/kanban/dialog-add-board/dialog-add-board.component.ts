import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Board } from 'src/models/board.class';
import { FirebaseAuthService } from '../../../Services/firebase-auth.service';

@Component({
  selector: 'app-dialog-add-board',
  templateUrl: './dialog-add-board.component.html',
  styleUrls: ['./dialog-add-board.component.scss']
})
export class DialogAddBoardComponent implements OnInit {

  loading = false;

  constructor(
    private auth: FirebaseAuthService,
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogAddBoardComponent>
  ) { }

  ngOnInit(): void {
  }

  addBoard(nameBoard: string) {
    // Teste ob der Name nicht von einem anderen Board besetzt ist, sonst verweigere die Erstellung und gib eine Warnung aus!
    this.loading = true;
    let newBoard = new Board({
      name: nameBoard, 
      categories: ['Work', 'Freetime'], 
      columns: ['To do', 'Do today', 'Doing', 'Done'], 
      author: `${this.auth.userUid}`
    })
    this.firestore
    .collection('boards')
    .add(newBoard.toJSON())
    .then(() => {
      this.loading = false;
      this.dialogRef.close();
    })
    
  }

}
