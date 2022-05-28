export class MyTask{
  name!: string;
  description!: string;
  category!: string;
  dueDate!: Date;
  urgency!: string;
  numPomodoro!: number;
  numPomodoroDone!: number;
  column!: string;
  boardName!: string;
  position!: number;


  constructor(taskJSON?: any){
    this.name = taskJSON ? taskJSON.name : '';
    this.description = taskJSON ? taskJSON.description: '';
    this.category = taskJSON ? taskJSON.category: '';
    this.dueDate =  taskJSON ? new Date(taskJSON.dueDate): new Date();
    this.urgency = taskJSON ? taskJSON.urgency: '';
    this.numPomodoro = taskJSON ? taskJSON.numPomodoro: 0;
    this.column = taskJSON ? taskJSON.column: '';
    this.numPomodoroDone = taskJSON ? taskJSON.numPomodoroDone: 0; 
    this.boardName = taskJSON ? taskJSON.boardName: '';
    this.position = taskJSON ? taskJSON.position: 0;
  }

  toJSON() {
    return {
      name: this.name,
      description: this.description,
      category: this.category,
      dueDate: this.dueDate.getTime(),
      urgency: this.urgency,
      numPomodoro: this.numPomodoro,
      column: this.column,
      numPomodoroDone: this.numPomodoroDone,
      boardName: this.boardName,
      position: this.position
    };
  }


}