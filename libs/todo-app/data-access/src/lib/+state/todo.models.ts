/**
 * Interface for the 'Todo' data
 */
export interface TodoEntity {
  id: string | number; // Primary ID
  name: string;
  description: string;
  createdAt: Date;
  deadline: Date;
}
