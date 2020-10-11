'use strict';
const STORAGE_KEY = 'projectsDB';
var gProjects = createProjects();

function createProjects() {
    var projects = loadFromStorage(STORAGE_KEY)
    if (!projects || !projects.length) {
        projects = [
            {
                id: "minesweeper",
                name: "MineSweeper",
                title: "Track the mines",
                desc: "The good old game in a modern UX version",
                url: "projs/minesweeper/index.html",
                publishedAt: 1448693940000,
                labels: ["Games ", "UX"],
                img: "img/portfolio/minesweeper.png"
            },
            {
                id: "balloons",
                name: "Balloons",
                title: "Balloon Popper",
                desc: "An easy game of popping balloons before they hit the top",
                url: "projs/balloons/index.html",
                publishedAt: 1448693940000,
                labels: ["Games ", "Kids"],
                img: "img/portfolio/balloons.png"
            },
            {
                id: "book-shop",
                name: "Book-Shop",
                title: "Admin Page",
                desc: "A sample of admin management page, for managing goods in store",
                url: "projs/book-shop/index.html",
                publishedAt: 1448693940000,
                labels: ["E-Commerce ", "Management"],
                img: "img/portfolio/book-shop.png"
            },
            {
                id: "plnts",
                name: "PLNTS",
                title: "Plants Shop",
                desc: "Designed E-Commerce for Plants, pots and all that related to urban jungle",
                url: "projs/plnts/index.html",
                publishedAt: 1448693940000,
                labels: ["E-Commerce ", "LifeStyle"],
                img: "img/portfolio/plnts.png"
            },
            {
                id: "trivia",
                name: "Trivia",
                title: "Cities quiz",
                desc: "An easy game of identifying the city in the picture",
                url: "projs/trivia/index.html",
                publishedAt: 1448693940000,
                labels: ["Games ", "Kids"],
                img: "img/portfolio/trivia.png"
            },
            {
                id: "guess-me",
                name: "Guess Me",
                title: "A game that makes magic",
                desc: "An app that asks questions of yes and no, till figuring the character you're thinking of",
                url: "projs/guess-me/index.html",
                publishedAt: 1448693940000,
                labels: ["Games ", "Magic"],
                img: "img/portfolio/guess-me.png"
            },
            {
                id: "pacman",
                name: "PacMan",
                title: "The old beloved game",
                desc: "Mika the dog is going after bones in order to win, beware of the cats!",
                url: "projs/pacman/index.html",
                publishedAt: 1448693940000,
                labels: ["Games ", "Kids"],
                img: "img/portfolio/pacman.png"
            },
            {
                id: "balls",
                name: "Balls",
                title: "Collect the balls",
                desc: "Easy-going and fun game, in which you need to catch as many balls as you can",
                url: "projs/balls/index.html",
                publishedAt: 1448693940000,
                labels: ["Games ", "Kids"],
                img: "img/portfolio/balls.png"
            },
            {
                id: "chateau",
                name: "Chateau du brunch",
                title: "landing page",
                desc: "Designed landing page for an american diner in the center of TLV",
                url: "projs/chateau/index.html",
                publishedAt: 1448693940000,
                labels: ["Table Order ", "Marketing"],
                img: "img/portfolio/chateau.png"
            }
        ]
    }
    saveToStorage(STORAGE_KEY, projects)
    return projects
}

function getProjs() {
    return gProjects
}


function _saveToStorage() {
    saveToStorage(STORAGE_KEY, gProjects)
}

function getProjById(projId) {
    var proj = gProjects.find(function (proj) {
        return projId === proj.id
    })
    return proj
}