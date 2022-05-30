import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Board } from 'src/models/board.class';
import { MyTask } from 'src/models/task.class';
import { PomodoroTimerService } from '../pomodoro-timer.service';
import { TaskUpdateComponent } from '../task-update/task-update.component';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  taskId: string = '';
  currentTask: any = new MyTask({dueDate: new Date()});
  activeBoard: any = new Board({});
  showPlay = true;

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<TaskDetailsComponent>,
    public dialog: MatDialog,
    public timer: PomodoroTimerService
  ) { }

  ngOnInit(): void {
    this.firestore
    .collection('tasks')
    .doc(this.taskId)
    .valueChanges()
    .subscribe((changes: any) => {
      this.currentTask = new MyTask(changes);
    })
  }

  deleteTask(){
    this.firestore
    .collection('tasks')
    .doc(this.currentTask.taskId)
    .delete();
    this.dialogRef.close();
  }

  editTask(){
    const dialogRef = this.dialog.open(TaskUpdateComponent);
    dialogRef.componentInstance.taskId = this.taskId;
    dialogRef.componentInstance.activeBoard = this.activeBoard;
  }

  playTimer(){
    this.showPlay = false;
    this.timer.currentTaskId = this.taskId;
    this.timer.start();
  }

  pauseTimer(){
    this.showPlay = true;
    // this.timer.pause();
  }

}
