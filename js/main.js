const topButton = document.querySelector('#top-button');

/** Scroll To Top Button */

//remonter en haut de page qaund on clique sur le bouton
topButton.addEventListener('click', scrollToTop);

//rendre le scroll smooth
function scrollToTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    })
}

//faire pop la bouton quand on scroll trop bas
window.addEventListener('scroll', () => {
    if (window.scrollY * 4 > window.innerHeight) {
        topButton.style.scale = 1;
    } else {
        topButton.style.scale = 0;
    }
});

//contient les icones de motif de la création d'un projet
const purposes = {
    personnal: "fa-solid fa-user",
    educational: "fa-solid fa-graduation-cap",
};

const cors = require('cors');
const { append } = require('vary');

app.use(cors());

/*récupère le informations sur les projets contenues dans le fichier json*/
fetch('projects.json')

    .then(response => response.json())
    .then(data => {
        const cards = data.projects;

        cards.forEach(card => {
            document.querySelector(`#${card.containerId} .cards-container`).insertAdjacentHTML('beforeend', generateCardCode(card));
        });
    })
    .catch(error => console.error("Unable to load projects' card content :", error));

//Génère le code pour la carte passée en paramètre
function generateCardCode(card) {
    let cardCode = `
    <div class="card">
    <div class="head">
        <img class="language-logo" src="../res/img/languages/${card.language}.png" alt="logo du ${card.language}">
        <i class="${purposes[card.purpose]}"></i>
        <p>${card.date}</p>
    </div>
    <img class="thumb" src="${card.thumb}" alt="aperçu du projet">
    <h4>${card.title}</h4>
    </div>
    `
    return cardCode;
};

/*curseur de la souris personnalisé*/
let innerCursor = document.querySelector('.inner-cursor');
let outerCursor = document.querySelector('.outer-cursor');


document.addEventListener('mousemove', moveCursor);

function moveCursor(e) {
    let x = e.clientX;
    let y = e.clientY;

    innerCursor.style.left = `${x}px`;
    innerCursor.style.top = `${y}px`;

    outerCursor.style.left = `${x}px`;
    outerCursor.style.top = `${y}px`;
}


let links = document.querySelectorAll("a, li, input, button, .top-btn, .card, .unfold-button, .clickable");


links.forEach((link) => {
    link.addEventListener('mouseover', () => {
        innerCursor.classList.add("grow");
    });

    link.addEventListener('mouseleave', () => {
        innerCursor.classList.remove('grow');
    });
})

document.addEventListener('mousedown', popCursor);

function popCursor(e) {
    innerCursor.style.width = "5px";
    innerCursor.style.height = "5px";
    innerCursor.style.backgroundColor = "orange";
}

document.addEventListener('mouseup', popupCursor);

function popupCursor(e) {
    innerCursor.style.width = "10px";
    innerCursor.style.height = "10px";
    innerCursor.style.backgroundColor = "";
}

/*boutons pour plier ou déplier les sections de projets*/
const allFoldButtons = document.querySelectorAll('.unfold-button');

allFoldButtons.forEach(element => {

    element.addEventListener('click', function () {

        const currentChoice = this.parentNode.parentNode.parentNode.childNodes[3];

        const height = currentChoice.scrollHeight;

        if (this.src.includes('plus')) {
            this.src = '../res/img/minus.svg';

            gsap.to(currentChoice, { duration: 0.2, height: height + 40, opacity: 1, padding: '20px 15px' })
        } else if (this.src.includes('minus')) {
            this.src = '../res/img/plus.svg';
            gsap.to(currentChoice, { duration: 0.2, height: 0, opacity: 0, padding: '0px 15px' })
        }

    })

})

window.addEventListener("resize", adaptFolded);

function adaptFolded() {
    allFoldButtons.forEach(element => {
        if (element.src.includes('minus')) {
            const currentChoice = element.parentNode.parentNode.parentNode.childNodes[3];
            currentChoice.style.height = "0px";
            const height = currentChoice.scrollHeight;
            gsap.to(currentChoice, { duration: 0.2, height: height + 40, opacity: 1, padding: '20px 15px' })
        }
    })
}

/*effet d'apparition au scroll*/
const slidingElements = document.querySelectorAll('.slide-in');

window.addEventListener('scroll', () => {

    const { scrollTop, clientHeight } = document.documentElement;

    slidingElements.forEach(element => {
        const topElementToTopViewport = element.getBoundingClientRect().top;

        if (scrollTop > (scrollTop + topElementToTopViewport).toFixed() - clientHeight * 0.8) {
            element.classList.add('active')
        }
    })
})

/*validation du formulaire*/
const sendButton = document.querySelector("#send");
const formInputs = document.querySelectorAll("#contact input")
sendButton.addEventListener('click', validate);

function validate() {

    formInputs.forEach(input => {
        if (!input.checkValidity()) {
            input.classList.add('not-verified');
        }
    })
}

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        if (input.className.includes("not-verified")) {
            input.classList.remove('not-verified');
        }
    })
})

/*effet de blur sur le header*/
const header = document.querySelector("header");

window.addEventListener('scroll', () => {
    if (window.scrollY < 20) {
        opacHeader();
    } else if (document.querySelector("header:hover") == null) {
        transparentHeader();
    }
})

function opacHeader() {
    header.style.background = "linear-gradient(135deg, rgba(13, 108, 224, 1), rgba(13, 108, 224, 1))";
}

function transparentHeader() {
    header.style.background = "linear-gradient(135deg, rgba(13, 108, 224, .8), rgba(13, 108, 224, .8))";
}

header.addEventListener('mouseover', opacHeader);

header.addEventListener('mouseout', () => {
    if (window.scrollY > 20) {
        transparentHeader();
    }
});

/*menu hamburger*/
let toggle = document.querySelector('.toggle-icons');
let body = document.querySelector('body');

toggle.addEventListener('click', function () {
    body.classList.toggle('opened');
})

let mainNavLis = document.querySelectorAll('#main-nav li');

mainNavLis.forEach(li => {
    li.addEventListener('click', () => {
        if (mobileMenuOpened()) {

            body.classList.toggle('opened');
        }
    })
})

function mobileMenuOpened() {
    return body.classList.contains('opened');
}
