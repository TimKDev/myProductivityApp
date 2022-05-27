import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { MyTask } from 'src/models/task.class';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss']
})
export class DialogAddTaskComponent implements OnInit {

  loading = false;
  newTask = new MyTask({});
  boardName!: string;
  categories: string[] = [];
  urgencies: string[] = ['Low', 'Medium', 'High'];
  column!: string;

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogAddTaskComponent>
  ) { }

  ngOnInit(): void {
  }

  checkValidInput() {
    // Hier Validierung einfügen.
    return true;
  }


  saveTask() {
    if(!this.checkValidInput()){
      alert('Please provide valid information for all input fields!');
      return;
    } 
    this.loading = true;
    let taskJSON = {
      name: this.newTask.name,
      description: this.newTask.description,
      category: this.newTask.category,
      dueDate: this.newTask.dueDate.getTime(),
      urgency: this.newTask.urgency,
      numPomodoro: this.newTask.numPomodoro,
      column: this.column,
      numPomodoroDone: 0,
      boardName: this.boardName
    };

    this.firestore
    .collection('tasks')
    .add(taskJSON)
    .then((result: any) => {
      this.loading = false;
      this.dialogRef.close();
    });
  }

}
