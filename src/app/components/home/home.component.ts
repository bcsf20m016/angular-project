import { Component, inject } from '@angular/core';
import { ListBooksComponent } from '../list-books/list-books.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { BookService } from '../../services/book-service.service';
import { Book } from '../../Models/Book';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListBooksComponent, AboutUsComponent, ContactUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  bookSrv = inject(BookService);
  books:Book[] = [];

  ngOnInit(){
    this.getBooks();
  }

  getBooks(){
    this.bookSrv.getAllBooks().subscribe((result)=>{
      this.books = result;
    })
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
