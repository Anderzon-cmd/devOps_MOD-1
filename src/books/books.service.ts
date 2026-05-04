import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BooksService {
  private books: BookEntity[] = [];
  private idCounter = 1;

  create(createBookDto: CreateBookDto): BookEntity {
    const book: BookEntity = {
      id: this.idCounter++,
      ...createBookDto,
      createdAt: new Date(),
    };

    this.books.push(book);
    return book;
  }

  findAll(): BookEntity[] {
    return this.books;
  }

  findOne(id: number): BookEntity {
    const book = this.books.find((currentBook) => currentBook.id === id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  update(id: number, updateBookDto: UpdateBookDto): BookEntity {
    const book = this.findOne(id);
    Object.assign(book, updateBookDto);
    return book;
  }

  remove(id: number): void {
    const index = this.books.findIndex((book) => book.id === id);
    if (index === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    this.books.splice(index, 1);
  }
}
