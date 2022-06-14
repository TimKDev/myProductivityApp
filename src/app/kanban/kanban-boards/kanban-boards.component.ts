import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddBoardComponent } from '../dialog-add-board/dialog-add-board.component';
import { DialogDeleteBoardComponent } from '../dialog-delete-board/dialog-delete-board.component';
import { FirebaseAuthService } from '../../../Services/firebase-auth.service';
import { Board } from 'src/models/board.class';
import { DialogEditBoardNameComponent } from '../dialog-edit-board-name/dialog-edit-board-name.component';
import { MyTask } from 'src/models/task.class';



@Component({
  selector: 'app-kanban-boards',
  templateUrl: './kanban-boards.component.html',
  styleUrls: ['./kanban-boards.component.scss']
})
export class KanbanBoardsComponent implements OnInit {

  allBoards: any = [];
  allTasks: any = [];
  activeTasksOfBoards: number[] = [];

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    public auth: FirebaseAuthService
    ) { }

  ngOnInit(): void {
    this.firestore
    .collection('tasks')
    .valueChanges({idField: 'idTask'})
    .subscribe((changes: any) => {
      this.allTasks = changes;
      
    });
    
    this.firestore
    .collection('boards')
    .valueChanges({idField: 'idBoard'})
    .subscribe((changes: any) => {
      this.allBoards = changes.filter((board: any) => {
        return board.author == this.auth.userUid;
      });
    });

    
  }

  getTasksOf(board: any) {
    return this.allTasks.filter((task: any) => task.boardName == board.idBoard);
  }

  getActiveTasksOf(board: any) {
    return this.getTasksOf(board).filter((task: MyTask) => task.column != 'Done').length;
  }

  getDoneTasksOf(board: any) {
    return this.getTasksOf(board).filter((task: MyTask) => task.column == 'Done').length;
  }

  getProgressOf(board: any) {
    return this.getDoneTasksOf(board)/(this.getActiveTasksOf(board) + this.getDoneTasksOf(board));
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

  openDialogEditBoardName(boardToEdit: any){
    const dialogRef = this.dialog.open(DialogEditBoardNameComponent);
    dialogRef.componentInstance.board = boardToEdit;
  }

}
