/**
 * Interface for the 'Todo' data
 */
export interface TodoEntity {
  _id?: string; // Primary ID
  name: string;
  description: string;
  createdAt: Date;
  deadline: Date;
}
