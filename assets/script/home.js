'use strict';

/*--------------------- Declaring Elements ---------------------*/
// Posting elements
const postTxt = document.querySelector('#post-txt');
const postFile = document.querySelector('#post-file');
const fileName = document.querySelector('#file-name');
const postBtn = document.querySelector('#post-btn');
const grid = document.querySelector('.grid');

const contactRows = document.querySelector('.contact-rows');

/*----------------------- Main Functions -----------------------*/

const apiUrl = 'https://randomuser.me/api/?nat=CA&results=10';
const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    mode: 'cors'
};

async function getUsers() {
    try {
        const response = await fetch(apiUrl, options);
        if (!response.ok) {
            console.log(`${response.statusText}: ${response.status} error`);
        }
        const data = await response.json();
        for (let i = 0; i < data.results.length; i++) {
            let fullName = `${data.results[i].name.first} ${data.results[i].name.last}`;
            let cityLocation = `${data.results[i].location.city}, ${data.results[i].location.country}`;
            let picIcon = data.results[i].picture.large;

            createUserDivs(fullName, cityLocation, picIcon);
        }
    } catch (error) {
        console.log(error.message);
    }
}


function createUserDivs(name, city, pic) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('contact');
    newDiv.innerHTML = `<img src="${pic}" alt="icon"><div><h4>${name}</h4><p>${city}</p>`;
    contactRows.appendChild(newDiv);
}





getUsers();

// Posting functions
postFile.addEventListener('input', function() {
    const imageFile = postFile.files;
    for (let file of imageFile) {
        fileName.innerHTML = `${file.name}`;
    }
});

postBtn.addEventListener('click', function() {
    const textVal = postTxt.value;
    const imageFile = postFile.files;

    if (textVal.length <= 0 && imageFile.length <= 0) {
        return;
    }

    const newDiv = document.createElement('div');
    newDiv.classList.add('post');
    
    addContent(newDiv);

    grid.insertBefore(newDiv, grid.firstChild);
});

function addContent(div) {
    const postHead = document.createElement('div');
    postHead.classList.add('post-head');

    const date = new Date();
    const options = {month: 'short', day: 'numeric', year: 'numeric'};
    const formattedDate = date.toLocaleDateString('en-US', options);

    postHead.innerHTML = `<div><img src="./assets/image/main white finished.png" alt="user-icon">Fabricio Mamani</div><p>${formattedDate}</p>`;

    div.append(postHead);

    const postBody = document.createElement('div');
    postBody.classList.add('post-body');
    postBody.innerText = postTxt.value;

    div.append(postBody);

    if (postFile.files.length > 0) {
        const file = postFile.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.addEventListener('load', function() {
            const image = document.createElement('img');
            image.src = reader.result;
            div.append(image);
        });
    }
    postTxt.value = '';
    fileName.innerHTML = ``;
    postFile.value = '';
};