import { MyTask } from "./task.class";

export class Board {
  name!: string;
  categories: string[] = ['Work', 'Freetime'];
  columns: string[] = ['To do', 'Do today', 'Doing', 'Done'];
  author!: string;

  constructor(taskJSON: any){
    this.name = taskJSON.name;
    this.categories = taskJSON.categories;
    this.columns = taskJSON.columns;
    this.author = taskJSON.author;
  }

  toJSON() {
    return {
      name: this.name,
      columns: this.columns,
      categories: this.categories,
      author: this.author
    };
  }
  
} 