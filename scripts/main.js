import { getQuery } from './pentaho.js';

let users = document.querySelector('.users');
let dateFrom = document.querySelector('.date-from');
let dateTo = document.querySelector('.date-to');

const btn = document.querySelector('.btn');

const queryContent = document.querySelector('.query-content');

btn.addEventListener('click', () => {
    dateFrom = new Date(dateFrom.value);
    console.log(dateFrom.value);
    console.log(dateTo.value);
    users = users.value;
    console.log(getQuery(dateFrom, 7, users))

    queryContent.textContent = getQuery(dateFrom, 7, users);
})