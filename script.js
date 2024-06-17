'use strict';
// 1. Удалить рекламу со страницы - удаление всех рекламных элементов
let ad = document.querySelector('.adv');
while (ad) {
    ad.remove();
    ad = document.querySelector('.adv');
};

const books = document.getElementsByClassName('book');
const bookTitles = document.querySelectorAll('.book > h2 > a');

// 2. Восстановить порядок книг - сортировка divов по содержимому (по алфавиту)
for (let i = 1; i < books.length; i++) {
    if (books[i].textContent.trimStart().substring(0, 9) < books[i - 1].textContent.trimStart().substring(0, 9)) {
        books[i - 1].before(books[i]);
        // console.log('moved', i, 'before', i - 1);
        i = 1;
    };
};

// 3. Заменить картинку заднего фона на другую из папки image - замена фона у body
document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

// 4. Исправить заголовок в книге 3 (Получится - "Книга 3. this и Прототипы Объектов") - замена слова в названии книги
for (let i = 0; i < bookTitles.length; i++) {
    bookTitles[i].textContent = bookTitles[i].textContent.replace('Пропопипы', 'Прототипы');
};

// 5. Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
const sortChapters = function (book) {
    const bookChapters = book.getElementsByTagName('li');
    const lastId = bookChapters.length - 1;
    const moveDown = function (word) {
        for (let i = 0; i < lastId; i++) {
            if (bookChapters[i].textContent.trimStart().substring(0, 12).toLowerCase().includes(word)) {
                bookChapters[lastId].after(bookChapters[i]);
            };
        };
    };
    const sorting = function (word) {
        for (let n = 0; n < lastId; n++) {
            let chapter1 = bookChapters[n].textContent.trimStart().substring(0, 12).toLowerCase();
            if (chapter1.includes(word)) {
                for (let m = n + 1; m <= lastId; m++) {
                    let chapter2 = bookChapters[m].textContent.trimStart().substring(0, 12).toLowerCase();
                    if (chapter2.includes(word)) {
                        if (chapter2 < chapter1) {
                            bookChapters[n].before(bookChapters[m]);
                            n--;
                            break;
                        };
                    };
                };
            };
        };
    };
    if (lastId > 1) {
        sorting('глава');
        moveDown('приложение');
        sorting('приложение');
    };
};
sortChapters(books[1]);
sortChapters(books[4]);


// 6. в шестой книге добавить главу "Глава 8: За пределами ES6" и поставить её в правильное место
const newChapter = document.createElement('li');
newChapter.textContent = 'Глава 8: За пределами ES6';
books[5].append(newChapter);
sortChapters(books[5]);