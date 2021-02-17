import State from "./state.js";
/**
 * these functions can be used to sort our state data, when we make headers handle click events
 * and sorted/updated states, and re ran domElem's we could make this a sortable data table
 */
let numericSort = (a, b) => a - b;
let reverseNumericSort = (a, b) => numericSort(a, b) * -1;
let alphanumericSort = (a, b) => a.localeCompare(b);
let reverseAlphanumericSort = (a, b) => alphanumericSort(a, b) * -1;

/**
 * statesManager does create each of State class constructor objects in its states array
 * furthermore, calling it's domElem will render all state domElems calls and display in DOM
 */
class StatesManager {
    constructor(statesArray) {
        // this.states = statesArray.map(stateObj => new State(stateObj).sort((a, b) => alphanumericSort(a.state, b.state)));
        this.states = statesArray.map((stateObj) => new State(stateObj)).sort((a, b) => alphanumericSort(a.state, b.state)); //
        this.sort = {
            by: "state",
            ascSort: alphanumericSort,
            descSort: reverseAlphanumericSort,
            ascending: true
        }
        this._domEl = document.createRange().createContextualFragment(
            `<div class="states">
                <h3 class="state-data m-auto p-3 text-center">Data By State</h3>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th data-sort="state" class="text-center">State</th>
                            <th data-sort="casesOnAdmission" class="text-center">On.Adm.</th>
                            <th data-sort="confirmedCases" class="text-center">Confirmed</th>
                            <th data-sort="death" class="text-center">Deaths</th>
                            <th data-sort="discharged" class="text-center">Discharged</th>
                        </tr>
                    </thead>
                    <tbody> 
                    <tbody>
                </table>
            </div>
            `).firstChild;
        // events delegation for <th>'s
        this._domEl.querySelectorAll("thead th").forEach(header => {
            header.addEventListener("click", evt => {
                this.sortBy(evt.target.dataset.sort);
            });
        });
        // working on particular domEl
        this._domEl.addEventListener("click", evt => {
            if (evt.target.dataset.state) {
                let name = evt.target.dataset.state;
                this.states = this.states.map(stateObj => {
                    if (stateObj.state === name) {
                        stateObj.state = stateObj.state.toUpperCase();
                    }
                    return stateObj; //
                });
                this._domEl.querySelector("tbody").innerHTML = ""; //
                this.states.forEach(state => this._domEl.querySelector("tbody").appendChild(state.domElem));
            }
        });
        this.states.forEach(state => this._domEl.querySelector("tbody").appendChild(state.domElem)); //
    }
    // this function will handle sorting mechanism, if we pass in a property name that we're already sorting by
    // it toggles current sorting on click, if we pass in a new property name then it will sort by that "ascending"
    // when passed in no property name, it simply runs existing sort
    // this could be useful if we've added a few more states after a sort
    sortBy(prop = null) {
        if (prop) {
            if (prop !== this.sort.by) {
                this.sort = {
                    by: prop,
                    ascSort: typeof (this.states[0][prop]) === "string" ? alphanumericSort : numericSort,
                    descSort: typeof (this.states[0][prop]) === "string" ? reverseAlphanumericSort : reverseNumericSort,
                    ascending: true
                }
            } else {
                this.sort = {
                    ...this.sort,
                    ascending: !this.sort.ascending
                }
            }
        }
        // sort function is a combination of sorting mechanism, order of sorting and property to sort data by
        let sortFunc = this.sort.ascending
            ? (a, b) => this.sort.ascSort(a[this.sort.by], b[this.sort.by])
            : (a, b) => this.sort.descSort(a[this.sort.by], b[this.sort.by]);

        this.states.sort(sortFunc);
        this._domEl.querySelector("tbody").innerHTML = "";
        this.states.forEach(state => this._domEl.querySelector("tbody").appendChild(state.domElem))
    }

    add(stateObj) {
        this.states = [...this.states, new State(stateObj)];
    }

    get domEl() {
        return this._domEl;
    }
}

export default StatesManager;