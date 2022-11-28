const bookList = document.querySelector('.book-list');
const submit = document.querySelector('#submit');
const errorMsg = document.querySelector('.error-msg');
const formInput = document.querySelectorAll('form input');
let books = [];

function display(title, author, id) {
  const li = document.createElement('li');
  li.id = id;
  li.innerHTML = `<p>${title}</p>
    <p>${author}</p>
    <button class="remove ${id}">Remove</button><hr>`;
  bookList.appendChild(li);
  const remove = document.querySelectorAll('.remove');
  remove.forEach((item) => {
    item.addEventListener('click', () => {
      books = books.filter((book) => {
        if (book.id !== item.classList[1]) {
          return true;
        }

        return false;
      });
      localStorage.setItem('books', JSON.stringify(books));
      const liList = document.querySelectorAll('.book-list li');
      liList.forEach((item1) => {
        if (item1.id === item.classList[1]) {
          item1.remove();
        }
      });
    });
  });
}

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
    books.push({ title, author, id });
    localStorage.setItem('books', JSON.stringify(books));
    errorMsg.innerHTML = '';
    display(title, author, id);
  }
});

if (localStorage.getItem('books')) {
  books = JSON.parse(localStorage.getItem('books'));
  books.forEach((item) => {
    display(item.title, item.author, item.id);
  });
}
