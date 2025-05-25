import type { Book } from "./types/Books";
import { loadBooks, saveBooks } from "./utils/BookStore";


class BookLibrary{
  private books: Book[] = [];

  constructor() {
    this.books = loadBooks;
    this.renderBooks();
    this.blindEvents();
  }

  addBook(book: Book): void{
    this.books.push(book);
    this.saveAndRender();
  }

  editBook(id: string, updated: Partial<Book>): void{
    this.books = this.books.map(book => book.id === id ? { ...book, ...updated } : book);
    this.saveAndRender();
  }

  deleteBook(id: string): void {
    this.books = this.books.filter(book => book.id !== id);
    this.saveAndRender();
  }

  searchBooks(query: string): Book[] {
    const q = query.toLowerCase();
    return this.books.filter(book =>
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.genre.toLowerCase().includes(q)
    );
  }

  private saveAndRender(): void {
    saveBooks(this.books);
    this.renderBooks();
  }

  private renderBooks(): void {
    // render list to DOM
  }

  private bindEvents(): void {
    // listen to form submissions and search
  }
}