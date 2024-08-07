
create procedure GetAllBooks
As
Begin
	select * from Book
End
Go

create procedure GetBookById
	@bookId INT
As
Begin
	select * from Book where id = @bookId
End
Go

create procedure AddBook
	@title varchar(100),
	@author varchar(50),
	@description varchar(500),
	@imageUrl varchar(100)
As
Begin
	insert into Book(Title, Author, Description, ImageUrl)
	values(@title, @author, @description, @imageUrl)
End
Go

create procedure UpdateBook
	@id INT,
	@title varchar(100),
	@author varchar(50),
	@description varchar(500),
	@imageUrl varchar(100)
As
Begin
	update Book
	set Title = @title,
	Author = @author,
	Description = @description,
	ImageUrl = @imageUrl
	where Id = @id
End
Go

create procedure DeleteBook
	@id INT
As
Begin
	delete from Book
	where Id = @id
End
Go

create procedure GetBookByAuthor
	@author varchar(50)
As
Begin
	select * from Book where LOWER(Author) like '%' + LOWER(@author) + '%'
End
Go

create procedure GetLastBookId
As
Begin
	select IDENT_CURRENT('Book') as id
End
Go