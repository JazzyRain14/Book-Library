import type { Book } from "../types/Books";

const STORAGE_KEY = 'book-library';

export const saveBooks = (books: Book[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
};

export const loadBooks = (): Book[] => {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : [];
}