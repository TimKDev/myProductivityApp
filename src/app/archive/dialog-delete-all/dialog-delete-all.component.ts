import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';

@Component({
  selector: 'app-dialog-delete-all',
  templateUrl: './dialog-delete-all.component.html',
  styleUrls: ['./dialog-delete-all.component.scss']
})
export class DialogDeleteAllComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteAllComponent>,
    private firestore: AngularFirestore
    ) { }

  ngOnInit(): void {
  }

  deleteAllTasksFromArchive() {
    this.firestore
    .collection('archive')
    .valueChanges({idField: 'taskId'})
    .pipe(take(1))
    .subscribe((changes: any) => {
      changes.forEach((task: any) => {
        this.firestore
        .collection('archive')
        .doc(task.taskId)
        .delete()
      });
      this.dialogRef.close();
    });
  }

}
