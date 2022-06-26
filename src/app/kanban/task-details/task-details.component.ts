import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Board } from 'src/models/board.class';
import { MyTask } from 'src/models/task.class';
import { PomodoroTimerService } from '../../../Services/pomodoro-timer.service';
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
  loading = false;

  taskInArchive = false;
  clockInit = [0, 10];


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
      if(!changes) return;
      this.currentTask = new MyTask(changes);
    });

    this.firestore
    .collection('archive')
    .doc(this.taskId)
    .valueChanges()
    .subscribe((changes: any) => {
      if(!changes) return;
      this.currentTask = new MyTask(changes);
      this.taskInArchive = true;
    })
  }


  updateTaskInFirebase(task: any){
    this.firestore
    .collection('tasks')
    .doc(task.taskId)
    .update(task.toJSON());
  }


  deleteTask(){
    this.loading = true;
    if (this.timer.currentTaskId == this.taskId){
      this.timer.restartTimer();
    }
    this.firestore
    .collection('tasks')
    .doc(this.taskId)
    .delete()
    .then(() => {
      this.firestore
      .collection('tasks', ref => ref.where('boardName', '==', this.currentTask.boardName)
        .where('column', '==', this.currentTask.column))
      .valueChanges({idField: 'taskId'})
      .pipe(take(1))
      .subscribe((changes) => {
        let numTasksUpdated = 0;
        for (let i = 0; i < changes.length; i++) {
          const task: any = changes[i];
          if(task.position > this.currentTask.position){
            // Hier werden die Positionen für alle Aufgaben aktualisiert, die an Positionen nach 
            // der gelöschten Aufgabe folgen: 
            task.position --;
            this.firestore
            .collection('tasks')
            .doc(task.taskId)
            .update(task)
            .then(() => {
              numTasksUpdated++;
              if(numTasksUpdated == changes.length - this.currentTask.position - 1){
                // Dies wird ausgeführt, wenn alle Aufgaben deren Position geupdated wurden auch geupdated wurden:
                this.loading = false; 
                this.dialogRef.close();
              }
            });
          }
        }
      })
    });
  }


  addToArchive() {
    this.firestore
    .collection('archive')
    .add(this.currentTask.toJSON());

    this.deleteTask();
  }


  deleteTaskInArchive() {
    this.firestore
    .collection('archive')
    .doc(this.taskId)
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


  startTimer() {
    this.timer.initTaskOfTimerService(this.currentTask, this.taskId, this.activeBoard);
    if (!this.timer.isTimerPaused || this.timer.isTaskFinished()){
      this.timer.currentTaskId = 'unset';
    }
    this.timer.playTimer();
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
