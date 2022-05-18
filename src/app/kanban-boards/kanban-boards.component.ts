import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddBoardComponent } from '../dialog-add-board/dialog-add-board.component';
import { FirebaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-kanban-boards',
  templateUrl: './kanban-boards.component.html',
  styleUrls: ['./kanban-boards.component.scss']
})
export class KanbanBoardsComponent implements OnInit {

  allBoards: any = [];

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    public auth: FirebaseAuthService
    ) { }

  ngOnInit(): void {
    this.firestore
    .collection('boards')
    .valueChanges({idField: 'idBoard'})
    .subscribe((changes: any) => {
      console.log('Received changes from DB:', changes);
      this.allBoards = changes;
      
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddBoardComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
