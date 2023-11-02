function searchBooks(query) { //query es la consulta de los libros que recibe de la API
    var apiKey = 'AIzaSyAEIZVPjeDvSgSs5UZlb9UsqGwNKzDRzXk'; // API generada
    var url = 'https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(query) + '&key=' + apiKey; //Se genera un url con la API generada


    var xhr = new XMLHttpRequest(); //Funcion que permite realizar solicitudes HTTP
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText); //Si la respuesta es correcta almacena los valores en data
            displayBooks(data.items);
        }
    };
    xhr.send();
}

function displayBooks(books) { //Funcion que muestra los libros en el HTML
    var catalog = document.getElementById('book-catalog');
    catalog.innerHTML = '';

    for (var i = 0; i < books.length; i++) {
        var book = books[i].volumeInfo;
        var title = book.title;
        var author = book.authors ? book.authors.join(', ') : 'Autor desconocido';
        var description = book.description ? book.description : 'Sin descripción disponible';
        var image = book.imageLinks ? book.imageLinks.thumbnail : 'placeholder.png';

        var bookItem = document.createElement('div'); //Parametros que recibe de la API
        bookItem.className = 'book-item';

        var bookCover = document.createElement('img');
        bookCover.src = image;
        bookCover.alt = title;
        bookItem.appendChild(bookCover);

        var bookTitle = document.createElement('h3');
        bookTitle.textContent = title;
        bookItem.appendChild(bookTitle);

        var bookAuthor = document.createElement('p');
        bookAuthor.textContent = author;
        bookItem.appendChild(bookAuthor);

        var bookDescription = document.createElement('p');
        bookDescription.textContent = description;
        bookItem.appendChild(bookDescription);

        catalog.appendChild(bookItem);
    }
}