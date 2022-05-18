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


  constructor(taskJSON: any){
    this.name = taskJSON.name;
    this.description = taskJSON.description;
    this.category = taskJSON.category;
    this.dueDate = new Date(taskJSON.dueDate);
    this.urgency = taskJSON.urgency;
    this.numPomodoro = taskJSON.numPomodoro;
    this.column = taskJSON.column;
    this.numPomodoroDone = taskJSON.numPomodoroDone; 
    this.boardName = taskJSON.boardName;
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
      boardName: this.boardName
    };
  }

  equals(task: MyTask): boolean{
    if(this.name == task.name && this.description == task.description && this.category == task.category
      && this.urgency == task.urgency && this.numPomodoro == this.numPomodoro && this.boardName == task.boardName) return true;
    return false;
  }


}