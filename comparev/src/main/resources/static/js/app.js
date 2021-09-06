import {
    displayHeader
} from "./Header.js"

import {
     displayAllVehicles
 } from "./display-all-vehicle.js"

import {
    displaySingleEV
} from "./single-vehicle.js"

 import {
     displayFooter
 } from "./footer.js"



//----------------------All EVs-------------------------

const body = document.querySelector(".body")

body.append(displayHeader());

await fetch("/api/electricVehicles")
.then(response => response.json())
.then(allElectricVehicles => displayAllVehicles(allElectricVehicles))
.catch(error => console.log(error))

body.append(displayFooter());