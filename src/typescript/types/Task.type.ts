export type TaskForm = {
  taskName: string;
  taskPriority: string;
  taskDescription: string;
  deadline: string;
  taskCompleted: boolean;
};
export type TaskProps = {
  Tasks: TaskForm;
  id: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onCompleted: (id: number) => void;
  isEdit: boolean;
};
