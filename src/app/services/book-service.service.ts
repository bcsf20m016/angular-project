import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../Models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiUrl:string = 'https://localhost:7219/api/Books';

  constructor(private http:HttpClient) { }

  getAllBooks(){
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBookById(id:number){
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  getBookByAuthor(author:string){
    return this.http.get<Book[]>(`${this.apiUrl}/author/${author}`);
  }
  
  addBook(book:Book){
    return this.http.post<Book>(this.apiUrl, book);
  }

  editBook(id:number, book:Book){
    return this.http.put<{message:string}>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id:number){
    return this.http.delete<{message:string}>(`${this.apiUrl}/${id}`);
  }
}
