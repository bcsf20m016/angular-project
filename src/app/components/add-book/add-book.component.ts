import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../../Models/Book';
import { BookService } from '../../services/book-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {

  book:Book = new Book();
  bookId:number = 0;
  isBookLoaded:boolean = false;
  isSubmitted:boolean = false;
  title:string = 'Add Book';
  buttonText:string = 'Add';

  constructor(private route:ActivatedRoute, private bookSrv:BookService, private router:Router) {
    
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.bookId = params['id'] || 0;
    })
    if(this.bookId == 0)
    {
      this.book.imageUrl = 'https://via.placeholder.com/150';
    }
    else
    {
      this.title = 'Update Book';
      this.buttonText = 'Update';
      this.bookSrv.getBookById(this.bookId).subscribe(
        result =>{
          this.book.id = result.id;
          this.book.title = result.title;
          this.book.author = result.author;
          this.book.description = result.description;
          this.book.imageUrl = result.imageUrl;
          
          //setTimeout is used just for adding attractive animations
          setTimeout(() => {
            this.isBookLoaded = true;
          }, 700);

        },
        error=>{
          alert(error.error.message);
          this.router.navigate(['/']);
        }
      )
    }
  }

  submit(){
    this.isSubmitted = true;
    if(this.bookId == 0)
    {
      this.buttonText = '<span class="spinner-border spinner-border-sm"></span> Adding...';
      this.bookSrv.addBook(this.book).subscribe(
        (result)=>{
          
          //setTimeout is used just for adding attractive animations
          setTimeout(() => {
            this.buttonText = 'Done';
            this.isSubmitted = false;
          }, 1000);
          setTimeout(() => {
            alert("Book added successfully");
            this.router.navigate(["/"]);
          }, 1050);
      },
      (error)=>{
        alert(error.error.message);
      }
    );
    }
    else
    {
      this.buttonText = '<span class="spinner-border spinner-border-sm"></span> Updating...';
      this.bookSrv.editBook(this.bookId, this.book).subscribe(
        (result)=>{
          setTimeout(() => {
            this.buttonText = 'Done';
            this.isSubmitted = false;
          }, 700);
          setTimeout(() => {
            alert(result.message);
            this.router.navigate(["/"]);
          }, 750);
      },
      (error)=>{
          alert(error.error.message);
          this.router.navigate(['/']);
      }
    );
    }
    
  }
}
