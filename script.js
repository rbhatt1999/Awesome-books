const bookList = document.querySelector('.book-list');
const submit = document.querySelector('#submit');
const errorMsg = document.querySelector('.error-msg');
const formInput = document.querySelectorAll('form input');

class booksList {
  constructor(){
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }
  addBook(title,author,id){
    if(this.books){
      bookList.classList.add('black-border');
    }
    this.title = title;
    this.author = author;
    this.id = id;
    this.books.push({title,author,id});
    localStorage.setItem('books', JSON.stringify(this.books));
    this.display(this.title, this.author, this.id);    
  }

  display(title,author,id){
    if(this.books){
      bookList.classList.add('black-border');
    }
    const li = document.createElement('li');
    li.id = id;
    li.innerHTML = `<p class = "title-author">"${title}" by ${author} </p>
      <button class="remove ${id}">Remove</button>`;
    bookList.appendChild(li);
    this.remove();
  }

  remove(){
    const remove = document.querySelectorAll('.remove');
    remove.forEach((item) => {
      item.addEventListener('click', () => {
        this.books = this.books.filter((book) => {
          if (book.id !== JSON.parse(item.classList[1])) {
            return true;
          }
  
          return false;
        });
        localStorage.setItem('books', JSON.stringify(this.books));
        if(this.books.length == 0){
          bookList.classList.remove('black-border');
        }
        const liList = document.querySelectorAll('.book-list li');
        liList.forEach((item1) => {
          if (item1.id === item.classList[1]) {
            item1.remove();
          }
        });
      });
    });
  }
  

}

let books = new booksList();
submit.addEventListener('click', (event) => {
  event.preventDefault();
  const title = formInput[0].value;
  const author = formInput[1].value;
  formInput[0].value = '';
  formInput[1].value = '';
  const id = Date.now();
  if (title === '' || author === '') {
    errorMsg.innerHTML = 'Please fill the details';
  } else {
    books.addBook(title, author, id);
    errorMsg.innerHTML = '';
  }
});

if (localStorage.getItem('books')) {
  JSON.parse(localStorage.getItem('books')).forEach((item) => {
    books.display(item.title, item.author, item.id);
  });
}
