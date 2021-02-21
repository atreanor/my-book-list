// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// UI Constructor - no variables prototype functions only
function UI() {}

//  ----- addBookToList function  -----
UI.prototype.addBookToList = function(book){
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

//  -----  clearFields  function -----
UI.prototype.clearFields = function() {
  // set fields to empty
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

//  -----  showAlert function  -----
UI.prototype.showAlert = function(message, className){
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

//  -----  deleteBook function  ------
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}

// Create Event Listener for create book
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

      // Show success alert
      ui.showAlert('Book Added!', 'success');
  }

  // clear fields in form
  ui.clearFields();

  console.log(book);
  e.preventDefault();
});

// Event Listener for Delete Book
document.getElementById('book-list').addEventListener('click', function(e){
  // Instantiate UI
  const ui = new UI();

  ui.deleteBook(e.target);
  // Show message
  ui.showAlert('Boook Removed', 'success');
  e.preventDefault();
});