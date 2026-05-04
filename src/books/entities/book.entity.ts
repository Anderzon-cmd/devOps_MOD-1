export class BookEntity {
  id: number;
  title: string;
  author: string;
  year: number;
  genre?: string;
  createdAt: Date;
}
