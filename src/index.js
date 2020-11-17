//dom selectors
const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = []
getRandomUser()
getRandomUser()
getRandomUser()

//fetch random user and add the money value
async function getRandomUser() { 
    const res = await fetch('https://randomuser.me/api') //have to use await fetch for the api while using async
    const data = await res.json() //to call this api as a json and store in data

    const user = data.results[0] //setting it as first index

    const newUser = {
        name: `${user.name.first} ${user.name.last}`, //uses naming conventions from documentation for variables from randomuser api
        money: Math.floor(Math.random() * 1000000) //randomly generates an amount of money
    }
    addData(newUser)
}

//double every users money
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 }
    })
    updateDOM()
}

//sort user by richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money)

    updateDOM()
}

function showMillionaires() {
    data = data.filter(user => user.money > 1000000)

    updateDOM()
}

function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0)

    const wealthEl = document.createElement('div')
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthEl)
}

function addData(obj) {
    data.push(obj)

    updateDOM()
}

function updateDOM(providedData = data) {
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`

    providedData.forEach(item => {
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
        main.appendChild(element)
    })
}

//formats number as currency
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

//event listeners
addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortByRichest)
showMillionairesBtn.addEventListener('click', showMillionaires)
calculateWealthBtn.addEventListener('click', calculateWealth)