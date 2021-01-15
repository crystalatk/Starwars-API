'use strict';

function getStarWarsPeople(apiNumber) {
    const url = `https://swapi.dev/api/people/${apiNumber}`;
    get(url).then(function (response) {
        console.log(response);
        fillInModal(response);
    })
}

function getApiInforGeneral (url, selector) {
    get(url).then(function (response) {
        fillInDetails(response, selector);
    })
}

function fillInDetails(response, selector) {
    const modalarea = document.querySelector(selector);
    const newli = document.createElement('li'); 
    newli.innerHTML = response.name || response.title;
    modalarea.appendChild(newli);
}

function eventListener(imageButton, index) {
    imageButton.addEventListener('click', function (event) {
        event.preventDefault();
        const userAPISelection = characterIndex[index].apiNumber;
        getStarWarsPeople(userAPISelection);

    })
}

function fillInModal(response) {
    const {name, films, homeworld, starships, birth_year} = response;
    const modalTitle = document.querySelector('#modalCharacterName');
    const modalBirthYear = document.querySelector('#modalBirthYear');
    modalTitle.innerHTML = name;
    modalBirthYear.innerHTML = birth_year;
    getApiInforGeneral(homeworld, '#modalHomeworld');
    starships.forEach((starship) => {
        getApiInforGeneral(starship, '#starships');
    })
    for (let i = 0; i < films.length; i++) {
        const film = films[i];
        getApiInforGeneral(film, '#films');
    }
}

function clearModal() {
    const button = document.querySelector('#buttonClose');
    button.addEventListener('click', function (event) {
        const ulElemModal = document.querySelectorAll('.clearModalUponClose');
        for (let ul of ulElemModal) {
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
        }
    })
}


const characterIndex = [
    {name: '#buttonObiWan', 
    apiNumber : '10',},
    {name: '#buttonLuke',
    apiNumber: '1'},
    {name:'#buttonC3PO', 
    apiNumber: '2'},
    {name:'#buttonR2D2',
    apiNumber: '3'},
    {name:'#buttonDarthVader',
    apiNumber: '4'},
    {name:'#buttonLeia', 
    apiNumber: '5'},
]

characterIndex.forEach((character, index) => {
    const buttonID = character.name;
    const button = document.querySelector(buttonID);
    eventListener(button, index);
    clearModal()
    })

