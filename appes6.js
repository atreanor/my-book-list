class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book){
    // retrieve 'book-list' from DOM
    const list = document.getElementById('book-list');
    // Create a new table row <tr> to inser into 'book-list'
    const row = document.createElement('tr');
    // insert cols into row using backticks, note X to delete row  
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;
    // append created row to child element of 'book-list'
    list.appendChild(row);
  }

  showAlert(message, className){
    // Create a div
    const div = document.createElement('div');
    // Add classes to newly created div
    div.className = `alert ${className}`;
    // Add text to child element of div
    div.appendChild(document.createTextNode(message));
    // Get parent element 
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // Insert Alert - newly created div before the form element  
    container.insertBefore(div, form);
    // timeout after 3 sec - remove 'alert' div after 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }

  clearFields(){
    // set fields to empty
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

  // local storage class
class Store {
  //  -----------  getBooks  ----------
  // retrieves books from local storage
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else  {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  //  ---------- displayBooks  -----------
  // function displays books saved in local storage below form
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui = new UI;
      // Add book to UI
      ui.addBookToList(book);
    });
  }

  //  ----------  addBook   ----------
  // adds a book to local storage
  static addBook() {
    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  //  ----------  removeBook  ----------
  // removes a book from local storage
  static removeBook(isbn) {
    console.log(isbn);
  }
    
}


//  ##########  DOM load event  ##########
document.addEventListener('DOMContentLoaded', Store.displayBooks);


//  ##########  Event Listener for create book  ##########
document.getElementById('book-form').addEventListener('submit', function(e){
  // form values & save to variables
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  // Instaniate book
  const book = new Book(title, author, isbn);

  // Instaniate UI
  const ui = new UI();

  // validate the form input
  if(title === '' || author === '' || isbn === '')  {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
      // Add book to list
      ui.addBookToList(book);

      // Add book to local storage
      Store.addBook(book);

      // Show success alert
      ui.showAlert('Book Added!', 'success');
  }

  // clear fields in form
  ui.clearFields();

  console.log(book);
  e.preventDefault();
});


//  ##########  Event Listener for Delete Book  ##########
document.getElementById('book-list').addEventListener('click', function(e){
  // Instantiate UI
  const ui = new UI();
  // delete book
  ui.deleteBook(e.target);
  
  // Remove from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show message
  ui.showAlert('Boook Removed', 'success');
  e.preventDefault();
});