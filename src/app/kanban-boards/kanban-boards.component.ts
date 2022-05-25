import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddBoardComponent } from '../dialog-add-board/dialog-add-board.component';
import { DialogDeleteBoardComponent } from '../dialog-delete-board/dialog-delete-board.component';
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
      this.allBoards = changes.filter((board: any) => {
        return board.author == this.auth.userUid;
      });
      
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddBoardComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteBoard(boardId: string, boardName: string){
    const dialogRef = this.dialog.open(DialogDeleteBoardComponent, {
      data :{boardId: boardId, boardName: boardName}
    });
  }

}
