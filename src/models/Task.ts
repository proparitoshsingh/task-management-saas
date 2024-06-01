export interface Task {
   id: string;
   title: string;
   description: string;
   dueDate: Date;
   status: 'To Do' | 'In Progress' | 'Done';
}
