import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Board } from 'src/models/board.class';
import { MyTask } from 'src/models/task.class';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.scss']
})
export class TaskUpdateComponent implements OnInit {
  taskId!: string;
  currentTask: MyTask = new MyTask(); 
  loading = false;
  activeBoard!: Board;
  urgencies = ['Low', 'Medium', 'High']

  constructor(
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TaskUpdateComponent>
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


  saveTask(){
    this.firestore
    .collection('tasks')
    .doc(this.taskId)
    .update(this.currentTask.toJSON());
    this.dialogRef.close();
  }


  deleteTask(){
    this.firestore
    .collection('tasks')
    .doc(this.taskId)
    .delete();
    this.dialogRef.close();
  }

}
