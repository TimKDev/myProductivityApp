import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeWhile } from 'rxjs';
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
  subscribtion!: any;

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<TaskDetailsComponent>,
    public dialog: MatDialog,
    public timer: PomodoroTimerService
  ) { }

  ngOnInit(): void {
    if (!this.timer.timerPaused) this.showPlay = false;
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

  updateCurrentTaskInFirebase(){
    this.firestore
    .collection('tasks')
    .doc(this.taskId)
    .update(this.currentTask.toJSON());
  }


  subscribeToTimerOf(){
    if (this.timer.currentTaskId == this.taskId) return; // Stop multiple subscribtions for the same task
    this.timer.currentTaskId = this.taskId;
    this.subscribtion = this.timer.timerEnd
    // Mit .pipe(takeWhile(callback(value))) wird eine Observable nur noch geändert, bis die callback Funktion,
    // die als Parameter den aktuellen Value der Observable erhält, den Wert false zurück gibt. D.h. solange 
    // die callback Funktion true zurückgibt, ist man noch subscribed und sobald einmal false zurückgegeben wird,
    // endet die Subscribtion bzw. die Observable gibt keine neuen Werte mehr zurück. Ähnlich wie man mit take(n)
    // nach n Änderungen des Observable Werts keine weiteren mehr zulässt, die Observable also effektive killed. 
    .pipe(takeWhile(() => 
      (this.currentTask.numPomodoro != this.currentTask.numPomodoroDone) && 
      (this.timer.currentTaskId == this.taskId)
    )) // Stops subscribtion when all Pomodoros of the task are done or if a different task is selected for the timer
    .subscribe((timerFinished: boolean) => {
      if (!timerFinished) return;
      this.showPlay = true;
      this.currentTask.numPomodoroDone++;
      this.updateCurrentTaskInFirebase();
    })
  }

  playTimer(){
    this.showPlay = false;
    this.subscribeToTimerOf();
    this.timer.start();
  }

  pauseTimer(){
    this.showPlay = true;
    this.timer.pause();
  }

  restartTimer(){
    this.showPlay = true;
    this.subscribtion.unsubscribe();
    this.timer.restart();
  }

  addFiveMinutes() {
    this.timer.addFiveMinutes();
  }

  finishPomodoro() {
    this.timer.finishTimer();
    this.subscribtion.unsubscribe();
    this.showPlay = true;
  }

  addPomodoro() {
    this.currentTask.numPomodoro++;
    this.updateCurrentTaskInFirebase();
  }

  removePomodoro() {
    if(this.currentTask.numPomodoro - this.currentTask.numPomodoroDone == 0) return;
    this.currentTask.numPomodoro--;
    this.updateCurrentTaskInFirebase();
  }

}
