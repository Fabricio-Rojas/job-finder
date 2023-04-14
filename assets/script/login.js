'use strict';

/*--------------------- Declaring Elements ---------------------*/

const emailInp = document.querySelector('#login-username');
const passwordInp = document.querySelector('#login-password');
const loginBtn = document.querySelector('#login-btn');
const errorText = document.querySelector('#error-text');

/*----------------------- Main Functions -----------------------*/

localStorage.setItem('email', 'johndoe@gmail.com');
localStorage.setItem('password', 'Qweasd123!');

loginBtn.addEventListener('click', () => {
    let emailVal = emailInp.value;
    let passwordVal = passwordInp.value;
    let correctEmail = localStorage.getItem('email');
    let correctPassword = localStorage.getItem('password');

    if (emailVal === correctEmail && passwordVal === correctPassword) {
        window.open('./home.html', '_self');
    } else {
        errorText.innerHTML = 'Incorrect username or password';
    }
})