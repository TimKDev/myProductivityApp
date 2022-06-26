import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsComponent } from 'src/app/kanban/task-details/task-details.component';
import { MyTask } from 'src/models/task.class';

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
  ) { }

  ngOnInit(): void {
    this.firestore
    .collection('archive')
    .valueChanges({idField: 'taskId'})
    .subscribe((changes: any) => {
      this.archivedTasks = changes.sort((task1: any, task2: any) => task2.dueDate - task1.dueDate);
    });

    this.firestore
    .collection('boards')
    .valueChanges({idField: 'boardId'})
    .subscribe((changes: any) => {
      this.allBoards = changes;
    });
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

}
