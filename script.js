const bookList = document.querySelector('.book-list');
const submit = document.querySelector('#submit');
const errorMsg = document.querySelector('.error-msg');
const formInput = document.querySelectorAll('form input');
books = [];

submit.addEventListener('click', (event)=>{ event.preventDefault(); let title = formInput[0].value; let author = formInput[1].value; formInput[0].value = ''; formInput[1].value = ''; let id = Date.now(); if(title ==''|| author ==''){ errorMsg.innerHTML= "Please fill the details"; } else { books.push({title,author,id}); localStorage.setItem('books', JSON.stringify(books)); errorMsg.innerHTML=''; display(title,author,id); } }); if(localStorage.getItem('books')){ books = JSON.parse(localStorage.getItem('books')); books.forEach(item => { display(item.title,item.author,item.id); }); } 
