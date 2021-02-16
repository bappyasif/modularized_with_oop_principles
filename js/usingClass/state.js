/**
 * this State class simply wraps up state object 
 * and gives us back a table node to use in our DOM
 */
class State {
    constructor({
        _id,
        state,
        confirmedCases,
        casesOnAdmission,
        discharged,
        deaths
    }) {
        this._id = _id;
        this.state = state;
        this.confirmedCases = confirmedCases;
        this.casesOnAdmission = casesOnAdmission;
        this.discharged = discharged;
        this.deaths = deaths;
    }

    get domElem() {
        let domString = 
        `<table><tr class="text-center justify-content-center">
            <th data-state=${this.state} scope="row">${this.state}</th>
            <td>${this.casesOnAdmission}</td>
            <td>${this.confirmedCases}</td>
            <td>${this.deaths}</td>
            <td>${this.discharged}</td>
        </tr></table>`;
        let stateDOM = 
        document.createRange().createContextualFragment(domString);
        return stateDOM.querySelector("tr");
    }
}

export default State;