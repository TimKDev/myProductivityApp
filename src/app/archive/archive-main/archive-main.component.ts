import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsComponent } from 'src/app/kanban/task-details/task-details.component';
import { MyTask } from 'src/models/task.class';
import { FirebaseAuthService } from 'src/Services/firebase-auth.service';
import { DialogDeleteAllComponent } from '../dialog-delete-all/dialog-delete-all.component';

@Component({
  selector: 'app-archive-main',
  templateUrl: './archive-main.component.html',
  styleUrls: ['./archive-main.component.scss']
})
export class ArchiveMainComponent implements OnInit {

  archivedTasks: any = [];
  allBoards: any = [];

  constructor(
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    private auth: FirebaseAuthService
  ) { }

  ngOnInit(): void {
    this.firestore
    .collection('boards')
    .valueChanges({idField: 'boardId'})
    .subscribe((changes: any) => {
      this.allBoards = changes;
      this.firestore
      .collection('archive')
      .valueChanges({idField: 'taskId'})
      .subscribe((changes: any) => {
        // Das ist definitiv nicht scaleable!!! Es werden von allen Usern die Task heruntergeladen und erst 
        // danach sortiert. Es sollten nur die heruntergeladen werden, die zum einbgeloggten User gehören.
        // => Architektur des Backends muss in diesem Fall angepasst werden.
        this.archivedTasks = changes
        .filter((task: any) => this.getAllBoardsOfCurrentUser().includes(task.boardName))
        .sort((task1: any, task2: any) => task2.dueDate - task1.dueDate);
      });
    });
  }

  getAllBoardsOfCurrentUser(): string[] {
    let result: string[] = [];
    this.allBoards.forEach((board: any) => {
      if (board.author == this.auth.userUid) result.push(board.boardId);
    })
    return result;
  }

  isMobileView() {
    return window.innerWidth < 1000;
  }

  openDialogTasksDetails(taskId: string, currentTask: MyTask){
    const dialogRef = this.dialog.open(TaskDetailsComponent, {
      maxWidth: this.isMobileView() ? '100vw' : 'auto',
      maxHeight: this.isMobileView() ? '100vh' : 'auto',
      height: this.isMobileView() ? '100%' : 'auto',
      width: this.isMobileView() ? '100%' : 'auto'
    }); 
    dialogRef.componentInstance.taskId = taskId;
    dialogRef.componentInstance.currentTask = currentTask;
    dialogRef.componentInstance.activeBoard = this.allBoards.find((board: any) => currentTask.boardName == board.boardId);
  }

  deleteTaskFromArchive(taskId: string) {
    this.firestore
    .collection('archive')
    .doc(taskId)
    .delete();
  }

  getBoardNameFromId(boardId: string): string | void{
    let board = this.allBoards.find((board: any) => board.boardId == boardId);
    if(!board) return;
    return board.name;
  }

  openDialogDeleteAll() {
    this.dialog.open(DialogDeleteAllComponent)
  }

}
