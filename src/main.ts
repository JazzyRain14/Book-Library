import type { Book } from "./types/Books";
import { loadBooks, saveBooks } from "./utils/BookStore";


class BookLibrary {
  private books: Book[] = [];

  constructor() {
    this.books = loadBooks();
    this.renderBooks();
    this.blindEvents();
  }

  private generateId(): string {
    return Date.now().toString();
  }

  private blindEvents(): void {
    const form = document.getElementById("bookForm") as HTMLFormElement;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = (document.getElementById("title") as HTMLInputElement).value;
      const author = (document.getElementById("author") as HTMLInputElement).value;
      const genre = (document.getElementById("genre") as HTMLInputElement).value;
      const publicationDate = (document.getElementById("pubDate") as HTMLInputElement).value;

      const newBook: Book = {
        id: this.generateId(),
        title,
        author,
        genre,
        publicationDate
      };

      this.books.push(newBook);
      this.saveAndRender();
      form.reset();
    });

    const searchInput = document.getElementById("searchInput") as HTMLInputElement;
    searchInput.addEventListener("input", () => {
      const results = this.searchBooks(searchInput.value);
      this.renderBooks(results);
    });

  }

  private saveAndRender(): void {
    saveBooks(this.books);
    this.renderBooks();

  }

  private searchBooks(query: string): Book[] {
    const lower = query.toLowerCase();
    return this.books.filter(book =>
      book.title.toLowerCase().includes(lower) || book.author.toLowerCase().includes(lower) || book.genre.toLowerCase().includes(lower)
    );
  }

  private renderBooks(filteredBooks: Book[] = this.books): void {
    const container = document.getElementById("booksContainer") as HTMLDivElement;
    container.innerHTML = "";

    if (filteredBooks.length === 0) {
      container.innerHTML = "<p> No books found.</p>";
      return;
    }

    filteredBooks.forEach(book => {
      const div = document.createElement("div");
      div.className = "book-card";
      div.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Genre:</strong> ${book.genre}</p>
      <p><strong>Published:</strong> ${book.publicationDate}</p>
      <div class="actions">
      <button data-id="${book.id}" class="edit">Edit</button>
      <button data-id="${book.id}" class="delete">Delete</button>
      </div>
      `;
      container.appendChild(div);
    });

    this.bindActionButtons()
  }
  
  private bindActionButtons(): void {
    document.querySelectorAll(".delete").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = (btn as HTMLButtonElement).dataset.id;
        if (id) this.deleteBook(id);
      });
    })
    document.querySelectorAll(".edit").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = (btn as HTMLButtonElement).dataset.id;
        if (id) this.editBook(id);
      });
    })

  }


  private deleteBook(id: string): void {
    this.books = this.books.filter(book => book.id !== id);
    this.saveAndRender();
  }

  private editBook(id: string): void {
    const book = this.books.find(b => b.id === id);
    if (!book) return;
    const newTitle = prompt("Edit Title", book.title) || book.title;
    const newAuthor = prompt("Edit Author", book.author) || book.author;
    const newGenre = prompt("Edit Genre", book.genre) || book.genre;
    const newDate = prompt("Edit Publication Date", book.publicationDate) || book.publicationDate;

    const updatedBook: Book = { ...book, title: newTitle, author: newAuthor, genre: newGenre, publicationDate: newDate };
    this.books = this.books.map(b => (b.id === id ? updatedBook : b));
    this.saveAndRender();
  }


}

new BookLibrary();