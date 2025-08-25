export type TodoTypes = {
  id: string;
  title: string;
  status: "pending" | "in_progress" | "completed" | "archived";
  createdAt?: Date;
  updatedAt?: Date;
};
