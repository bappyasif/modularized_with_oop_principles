import StatesManager from "./usingClass/statesManager.js";

let urlAPI = "https://covidnigeria.herokuapp.com/api";
let statesContainer = document.querySelector(".states-container");

fetch(urlAPI)
.then(res => res.json())
.then(jsonObj => {
    let stateManager = new StatesManager(jsonObj.data.states);
    statesContainer.appendChild(stateManager.domEl)
}).catch(err => console.log(err));