import { Component, Input } from '@angular/core';
import { Book } from '../../Models/Book';
import { BookService } from '../../services/book-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-books',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.css'
})
export class ListBooksComponent {

  @Input() booksList:Book[] = [];
  filteredBooks:Book[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  isFull: boolean = false;
  searchType:string = 'title';
  placeholder:string = 'Enter book title';

  constructor(private bookSrv:BookService){

  }

  ngOnInit(){
    this.loadMoreBooks();
  }

  removeBook(bookId: number) {
    const isConfirmed = confirm('Are you sure you want to delete this book?');
    
    if (isConfirmed) {
      this.bookSrv.deleteBook(bookId).subscribe(
        (result) => {
          this.booksList = this.booksList.filter(book => book.id!==bookId);
          this.filteredBooks = this.filteredBooks.filter(book => book.id!==bookId);
        },
        (error) => {
          alert(error.error.message);
        }
      );
    }
  }
  
  loadMoreBooks(){
    let totalBooks = this.booksList.length - 1;
    let end = (this.currentPage * this.pageSize) + 10;

    if(end <= totalBooks)
    {
      this.filteredBooks = this.booksList.slice(0, end);
      this.currentPage++;
    }
    else
    {
      this.filteredBooks = this.booksList.slice(0, totalBooks+1);
      this.currentPage++;
      this.isFull = true;
    }
    
  }

  onSelectChange(event:Event){
    const selectElement = event.target as HTMLSelectElement;
    const elementValue = selectElement.value;
    if(elementValue == 'title')
    {
      this.searchType = 'title';
      this.placeholder = 'Enter book title';
    }
    else
    {
      this.searchType = 'author';
      this.placeholder = 'Enter author name';
    }
  }

  searchBooks(event:Event){
    const searchElement = event.target as HTMLInputElement;
    const name = searchElement.value.trim();
    if(name != '')
    {
      this.isFull = true;
      if(this.searchType == 'title')
      {
        this.filteredBooks = this.booksList.filter(book => book.title.toLowerCase().includes(name.toLowerCase()));
      }
      else
      {
        this.bookSrv.getBookByAuthor(name).subscribe(
          (result)=>{
            this.filteredBooks = result;
          }
        )
      }
    }
    else
    {
      this.currentPage = 0;
      this.loadMoreBooks();
      this.isFull = true;
    }
    
  }

}
