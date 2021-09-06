import {
    indexArticles
} from "./indexArticles.js"

import {displayHeader} from "./Header.js"
import { displaySingleEV } from "./single-vehicle.js";

fetch("/api/ice/states")
    .then(response => response.json())
    .then(states => genStates(states))
    .catch(error => console.log(error))

fetch("/api/ice/years")
    .then(response => response.json())
    .then(years => genYears(years))
    .catch(error => console.log(error))

const clearChildren = function (element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

const mainContent = document.querySelector(".main-content")
const formContainer = document.querySelector(".form-container")
const topSection = document.querySelector(".top-section")
const stateSelectElement = document.querySelector("#states")
const yearSelectElement = document.querySelector("#years")

const makeSelectElement = document.querySelector("#makes")
const modelSelectElement = document.querySelector("#models")
const submitButton = document.querySelector(".user-form-submit-button")

let userStateObj = null;
let userChargeObj = null;

//SUBMIT BUTTON FOR USER VEHICLE DROP-DOWN FORM
submitButton.addEventListener("click", () => {

    clearChildren(formContainer)

    const userStateIndex = stateSelectElement.selectedIndex - 1
    const userYearIndex = yearSelectElement.selectedIndex - 1
    const userMakeIndex = makeSelectElement.selectedIndex - 1
    const userModelIndex = modelSelectElement.selectedIndex - 1

    const userStateId = stateSelectElement.getElementsByClassName("state-option")[userStateIndex].getAttribute("id")
    const userYearId = yearSelectElement.getElementsByClassName("year-option")[userYearIndex].getAttribute("id")
    const userMakeId = makeSelectElement.getElementsByClassName("make-option")[userMakeIndex].getAttribute("id")
    const userModelId = modelSelectElement.getElementsByClassName("model-option")[userModelIndex].getAttribute("id")

    fetch("/api/ice/userVehicle/" + userStateId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(userState => userStateObj = userState)
        .catch(error => console.log(error))

    // /api/ice/userVehicle/{year}/{make}/{model}
    fetch("/api/ice/userVehicle/" + userYearId + "/" + userMakeId + "/" + userModelId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(userVehicle => genUserVehicleComp(userVehicle, userStateObj))
        .catch(error => console.log(error))

})

const genStates = function (states) {
    clearChildren(stateSelectElement);
    const stateOption = document.createElement("option");
    stateOption.setAttribute("value", "choose-state");
    stateOption.innerText = 'State';
    stateSelectElement.appendChild(stateOption);

    states.forEach((state) => {
        const newOptionElement = document.createElement("option");
        newOptionElement.classList.add("state-option")
        newOptionElement.setAttribute("value", state.state);
        newOptionElement.setAttribute("id", state.id)
        newOptionElement.innerText = state.state
        stateSelectElement.appendChild(newOptionElement)
    })
}

const genYears = function (years) {

    clearChildren(yearSelectElement)
    const defaultOption = document.createElement("option")
    defaultOption.setAttribute("value", "choose-year")
    defaultOption.innerText = 'Year'
    yearSelectElement.appendChild(defaultOption)

    years.forEach((year) => {
        const newOptionElement = document.createElement("option")
        newOptionElement.classList.add("year-option")
        newOptionElement.setAttribute("value", year.year)
        newOptionElement.setAttribute("id", year.id)
        newOptionElement.innerText = year.year
        yearSelectElement.appendChild(newOptionElement)
    })

    yearSelectElement.addEventListener("change", () => {

        clearChildren(makeSelectElement)
        clearChildren(modelSelectElement)

        fetch("/api/ice/years/" + yearSelectElement.value, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(makes => genMakes(makes))
            .catch(error => console.log(error))

    })
}

const genMakes = function (makes) {

    clearChildren(modelSelectElement)
    const makeDefault = document.createElement("option")
    makeDefault.setAttribute("value", "choose-make")
    makeDefault.innerText = 'Make'
    makeSelectElement.appendChild(makeDefault)

    makes.forEach((make) => {
        const newOptionElement = document.createElement("option")
        newOptionElement.classList.add("make-option")
        newOptionElement.setAttribute("value", make.makeName)
        newOptionElement.setAttribute("id", make.id)
        newOptionElement.innerText = make.makeName
        makeSelectElement.appendChild(newOptionElement)
    })

    makeSelectElement.addEventListener("change", () => {

        let userMake = makeSelectElement.value
        // /api/ice/years/2012/ford
        fetch("/api/ice/years/" + yearSelectElement.value + "/" + userMake.toLowerCase(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(models => genModels(models))
            .catch(error => console.log(error))

    })
}

const genModels = function (models) {

    clearChildren(modelSelectElement)

    const defaultOption = document.createElement("option")
    defaultOption.setAttribute("value", "choose-model")
    defaultOption.innerText = 'Model'
    modelSelectElement.appendChild(defaultOption)

    models.forEach((model) => {
        const newOptionElement = document.createElement("option")
        newOptionElement.classList.add("model-option")
        newOptionElement.setAttribute("value", model.modelName)
        newOptionElement.setAttribute("id", model.id)
        newOptionElement.innerText = model.modelName
        modelSelectElement.appendChild(newOptionElement)
    })

    modelSelectElement.addEventListener("change", () => {

    })
}

const genUserVehicleComp = function (userVehicle, userStateObj) {

    const formH1 = document.querySelector(".form-h1")
    formH1.innerText = "What is your current vehicle lifestyle?"

    const formH3 = document.querySelector(".form-h3")
    formH3.innerText = "What is important in your next vehicle?"

    const lifestyleForm = document.createElement("form")
    const lifestyleDiv = document.createElement("div")
    lifestyleDiv.classList.add("lifestyle-form")

    const priceRangeInput = document.createElement("input")
    priceRangeInput.setAttribute("type", "text")
    priceRangeInput.setAttribute("id", "user-price-range")
    priceRangeInput.setAttribute("name", "user-price-range")
    priceRangeInput.setAttribute("placeholder", "Price Range")

    const weeklyMilesInput = document.createElement("input")
    weeklyMilesInput.setAttribute("type", "text")
    weeklyMilesInput.setAttribute("id", "user-weekly-miles")
    weeklyMilesInput.setAttribute("name", "user-weekly-miles")
    weeklyMilesInput.setAttribute("placeholder", "Miles Driven Weekly")

    const lifestyleSubmit = document.createElement("a")
    lifestyleSubmit.classList.add("lifestyle-submit-button")
    for (let i = 0; i < 5; i++) {
        let spanElement = document.createElement("span")
        lifestyleSubmit.appendChild(spanElement)
    }
    lifestyleSubmit.innerText = "Submit"

    lifestyleDiv.appendChild(priceRangeInput)
    lifestyleDiv.appendChild(document.createElement("br"))
    lifestyleDiv.appendChild(weeklyMilesInput)
    lifestyleDiv.appendChild(document.createElement("br"))
    lifestyleDiv.appendChild(lifestyleSubmit)
    lifestyleForm.appendChild(lifestyleDiv)
    formContainer.appendChild(lifestyleForm)

    lifestyleSubmit.addEventListener("click", () => {

        clearChildren(formContainer)
        genEVComparison(priceRangeInput.value, userVehicle, userStateObj, weeklyMilesInput.value)
    })
}

const genEVComparison = function (priceRange, userVehicle, userStateObj, weeklyMiles) {

    console.log("/api/ev/charge/" + stateSelectElement.value)

    fetch("/api/ev/charge/" + stateSelectElement.value, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(returned => userChargeObj = returned)
        .catch(error => console.log(error))

    fetch("/api/electricVehicles/compare/" + priceRange, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(evResponse => displayEVs(evResponse, userVehicle, userStateObj, weeklyMiles, userChargeObj))
        .catch(error => console.log(error))
}

const displayEVs = function (allEVs, userVehicle, userStateObj, weeklyMiles, userChargeObj) {

    const mainContent = document.querySelector(".main-content")
    clearChildren(mainContent)

    //generate the user vehicle DIV
    //this will be appended to main-content DIV
    const userVehicleInfoDiv = document.createElement("div")
    userVehicleInfoDiv.classList.add("user-vehicle-info")

    const compareGridElement = document.createElement("div")
    compareGridElement.classList.add("compare-grid")

    userVehicleInfoDiv.appendChild(compareGridElement)

    const userVehicleElement = document.createElement("div")
    userVehicleElement.classList.add("user-vehicle")
    userVehicleElement.style.backgroundImage = 'url(' + userVehicle.imageUrl + ')'
    compareGridElement.appendChild(userVehicleElement)

    const userVehicleStatsDiv = document.createElement("div")
    userVehicleStatsDiv.classList.add("user-vehicle__list-stats")
    userVehicleElement.appendChild(userVehicleStatsDiv)

    const userVehicleTitle = document.createElement("h1")
    userVehicleTitle.innerHTML = 'Comparing:<br>' + userVehicle.makeName + ' ' +  userVehicle.modelName
    userVehicleStatsDiv.appendChild(userVehicleTitle)

    const userVehicleMsrp = document.createElement("h2")
    userVehicleMsrp.innerText = 'MSRP: $' + userVehicle.msrp
    userVehicleStatsDiv.appendChild(userVehicleMsrp)

    const userVehicleMGP = document.createElement("h2")
    userVehicleMGP.innerText = 'Avgerage MPG: ' + userVehicle.mpg
    userVehicleStatsDiv.appendChild(userVehicleMGP)

    const userStateGasPrice = document.createElement("h2")
    userStateGasPrice.innerText = userStateObj.state + "'s Average Gas Price: $" + userStateObj.pricePerGal + ' per gallon'
    userVehicleStatsDiv.appendChild(userStateGasPrice)

    const galPerMonth = (weeklyMiles / userVehicle.mpg) * 4
    const monthlyGasCost = parseInt(galPerMonth * userStateObj.pricePerGal)
    const yearlyGasCost = monthlyGasCost * 12

    const userWeeklyMiles = document.createElement("h2")
    userWeeklyMiles.innerText = 'Your Annual Gas Cost: $' + yearlyGasCost
    userVehicleStatsDiv.appendChild(userWeeklyMiles)

    //loop through EVs creating grid items
    for (let i = 1; i < 5; i++) {

        const evDivElement = document.createElement("div")
        evDivElement.classList.add('ev' + i)
        compareGridElement.appendChild(evDivElement)

        const evTitle = document.createElement("h2")
        evTitle.innerText = allEVs[i].modelName
        evDivElement.appendChild(evTitle)

        const evImageElement = document.createElement("img")
        evImageElement.setAttribute("id", "vehicle1")
        evImageElement.setAttribute("src", allEVs[i].imageUrl)
        evImageElement.setAttribute("width", "100%")
        evDivElement.appendChild(evImageElement)

        const paraMsrpElement = document.createElement("p")
        evDivElement.appendChild(paraMsrpElement)

        const evMSRP = document.createElement("span")
        evMSRP.classList.add("compare-stat-one")
        evMSRP.innerText = 'MSRP: $' + allEVs[i].msrp
        paraMsrpElement.appendChild(evMSRP)

        paraMsrpElement.appendChild(document.createElement("br"))

        const iceMSRP = document.createElement("span")
        var msrpCostDiff = allEVs[i].msrp - userVehicle.msrp
        var isMsrpNeg = Boolean(msrpCostDiff > 0)
        if (isMsrpNeg) {
            iceMSRP.classList.add("compare-stat-minus")
            iceMSRP.innerText = '$' + msrpCostDiff + ' over your vehicle'

        } else {
            iceMSRP.classList.add("compare-stat-plus")
            iceMSRP.innerText = '$ ' + msrpCostDiff + ' under your vehicle'
        }

        paraMsrpElement.appendChild(iceMSRP)
        let rebateAmount = 0;
        const rebate = document.createElement("span")
        if (allEVs[i].taxCredit) {

            rebate.innerHTML = '<br>$7,500 Tax Credit Eligible: <img src="./images/check.png" height="15" width="15">'
            rebateAmount += 7500
        } else {
            rebate.innerHTML = '<br>Tax Credit Eligible: <img src="./images/x.png" height="15" width="15">'
        }

        paraMsrpElement.appendChild(rebate)

        const evMPGElement = document.createElement("p")
        evDivElement.appendChild(evMPGElement)

        const evRange = parseInt(allEVs[i].range)
        const userYearlyMiles = weeklyMiles * 52
        const numOfChargesPerYear = userYearlyMiles / evRange
        const chargeCost = numOfChargesPerYear * userChargeObj.costPerHomeCharge

        const evMPG = document.createElement("span")
        evMPG.classList.add("compare-stat-one")
        evMPG.innerText = 'Yearly Charge Costs: $' + Math.round(chargeCost)
        evMPGElement.appendChild(evMPG)

        evMPGElement.appendChild(document.createElement("br"))

        const gasSavings = yearlyGasCost - chargeCost
        const iceMPG = document.createElement("span")
        iceMPG.classList.add("compare-stat-plus")
        iceMPG.innerText = 'You would save $' + Math.round(gasSavings) + ' per year'
        evMPGElement.appendChild(iceMPG)

        evDivElement.appendChild(document.createElement("hr"))

        const paraTotalsElement = document.createElement("p")
        evDivElement.appendChild(paraTotalsElement)

        // 475 per year saved with electric vs gas on maint
        const totalSavingsPerYear = parseInt(gasSavings + 475)
        const msrpDiffElement = document.createElement("h2")
        paraTotalsElement.appendChild(msrpDiffElement)
        var totalToRound = (msrpCostDiff - rebateAmount) / totalSavingsPerYear
        var yearsUntilPayOff = Math.round(totalToRound * 10) / 10
        if (yearsUntilPayOff > 0) {
            msrpDiffElement.innerText = 'Years Until Payoff: ' + yearsUntilPayOff
        } else {
            msrpDiffElement.innerText = 'Years Until Payoff: INSTANT'
        }

        const compareExploreButton = document.createElement("button");
        compareExploreButton.classList.add("compare-explore-button");
        compareExploreButton.innerText = "Explore"
        evDivElement.appendChild(compareExploreButton);

        compareExploreButton.addEventListener("click", (clickEvent) => {
            
            clickEvent.preventDefault;
            
            displayComparedEV(allEVs[i],allEVs, userVehicle, userStateObj, weeklyMiles, userChargeObj)

        })

    }

    mainContent.appendChild(userVehicleInfoDiv)

    const toRemove = document.querySelector(".article-section")
    toRemove.remove()
    const toRemoveTwo = document.querySelector(".parallax-two")
    toRemoveTwo.remove()
}

const displayComparedEV = function (ElectricVehicle,allEVs, userVehicle, userStateObj, weeklyMiles, userChargeObj) {

    const body = document.querySelector("body");
    clearChildren(body);
    window.scrollTo(0, 0);

    body.classList.add("svBody");
    body.append(displayHeader());
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    body.append(wrapper);

    // ----------------------Car Image Section-------------------------

    const mainElement = document.createElement("div");
    mainElement.classList.add("main-content");
    
    body.append(mainElement);
    const carImage = document.createElement("div");
    carImage.classList.add("car-image");
    carImage.style.backgroundImage = 'url("' + ElectricVehicle.imageUrl + '")';
    carImage.style.color = 'rgb(255,255,255)';
    carImage.style.height = '100vh';
    carImage.style.backgroundAttachment = 'fixed';
    carImage.style.backgroundPosition = 'center center';
    carImage.style.backgroundRepeat = 'no-repeat';
    carImage.style.backgroundSize = 'cover';
    carImage.style.position = 'relative';
    carImage.style.marginTop = '3.2%';

    mainElement.append(carImage);

    const imageText = document.createElement("div");
    imageText.classList.add("car-image-text");
    carImage.append(imageText);

    const carMake = document.createElement("div");
    carMake.classList.add("car-make");
    carMake.innerText = ElectricVehicle.makeName;
    imageText.append(carMake);

    const carModel = document.createElement("div");
    carModel.classList.add("car-model");
    carModel.innerText = ElectricVehicle.modelName;
    imageText.append(carModel);

    const carPrice = document.createElement("div");
    carPrice.classList.add("car-price");
    carPrice.innerText = "$" + ElectricVehicle.msrp;
    imageText.append(carPrice);

    const carMileage = document.createElement("div");
    carMileage.classList.add("car-mileage");
    carMileage.innerText = "MPGe: " + ElectricVehicle.mpgE;
    imageText.append(carMileage);

    // ---------------------Review Section-------------------------

    const reviewSection = document.createElement("div");
    reviewSection.classList.add("review-section");
    mainElement.appendChild(reviewSection);

    const reviewAuthorElement = document.createElement("h3");
    reviewAuthorElement.classList.add("single-vehicle-author");
    reviewAuthorElement.innerText = "By: " + ElectricVehicle.authorName;
    reviewSection.appendChild(reviewAuthorElement);

    const center = document.createElement("center");
    center.innerHTML = '<div id="colored-rectangle"></div>';
    reviewSection.appendChild(center);

    const reviewTextElement = document.createElement("p");
    reviewTextElement.classList.add("single-review-content");
    reviewTextElement.innerText = ElectricVehicle.reviewContent;
    reviewSection.appendChild(reviewTextElement);

    // ---------------------White Details Section-------------------------

    const detailsSection = document.createElement("div");
    detailsSection.classList.add("details-section");
    detailsSection.style.backgroundColor = "white"
    
    detailsSection.style.margin = 0
    mainElement.append(detailsSection);

    const detailsTitle = document.createElement("div");
    detailsSection.innerHTML = '<h1 class="vehicle-details-title">Vehicle Details</h1>';
    detailsSection.append(detailsTitle);

    const centerOne = document.createElement("center");
    centerOne.innerHTML = '<div id="colored-rectangle"></div>';
    detailsSection.prepend(centerOne);

    // -----------Basic Info Section -----------

    const basicInfoSection = document.createElement("div");
    basicInfoSection.classList.add("basic-info-section");
    basicInfoSection.innerHTML = '<h5 class="basic-info-title">Basic Information</h5>';
    detailsSection.append(basicInfoSection);

    const basicInfoText = document.createElement("ul");
    basicInfoText.classList.add("basic-info-text");
    basicInfoSection.append(basicInfoText);

    const makeElement = document.createElement("li");
    makeElement.innerText = ElectricVehicle.makeName;
    basicInfoText.append(makeElement);

    const modelElement = document.createElement("li");
    modelElement.innerText = ElectricVehicle.modelName;
    basicInfoText.append(modelElement);

    const rangeElement4 = document.createElement("li");
    rangeElement4.innerText = "Range: " + ElectricVehicle.range + " miles";
    basicInfoText.append(rangeElement4);

    const mpgEElement = document.createElement("li");
    mpgEElement.innerText = "MPGe: " + ElectricVehicle.mpgE;
    basicInfoText.append(mpgEElement);

    const zeroElement = document.createElement("li");
    zeroElement.innerText = "0 - 60: " + ElectricVehicle.zeroToSixty + " seconds";
    basicInfoText.append(zeroElement);

    const topSpeedElement = document.createElement("li");
    topSpeedElement.innerText = "Top speed: " + ElectricVehicle.topSpeed + " mph";
    basicInfoText.append(topSpeedElement);

    const driveElement = document.createElement("li");
    driveElement.innerText = "Drive: " + ElectricVehicle.wheelDrive;
    basicInfoText.append(driveElement);

    const homeChargeElement = document.createElement("li");
    homeChargeElement.innerText = "Home charging: " + ElectricVehicle.homeCharge + " hours";
    basicInfoText.append(homeChargeElement);

    const travelChargeElement = document.createElement("li");
    travelChargeElement.innerText = "Travel charging (10% - 80%): " + ElectricVehicle.travelCharge + " minutes";
    basicInfoText.append(travelChargeElement);

    const autonomousElement = document.createElement("li");
    let checkAutonomous = ElectricVehicle.autonomous;
    if (checkAutonomous) {
        autonomousElement.innerHTML = 'Autonomous? <img src="./images/check.png" height="15" width="15">'
    } else {
        autonomousElement.innerHTML = 'Autonomous? <img src="./images/x.png" height="15" width="15">'
    }
    basicInfoText.append(autonomousElement);

    const nhtsaElement = document.createElement("li");
    nhtsaElement.innerText = "NHTSA Rating: " + ElectricVehicle.safetyRating + "/5";
    basicInfoText.append(nhtsaElement);

    const phoneKeyElement = document.createElement("li");
    let checkPhoneKey = ElectricVehicle.phoneKey;
    if (checkPhoneKey) {
        phoneKeyElement.innerHTML = 'Phone as key? <img src="./images/check.png" height="15" width="15">'
    } else {
        phoneKeyElement.innerHTML = 'Phone as key? <img src="./images/x.png" height="15" width="15">'
    }
    basicInfoText.append(phoneKeyElement);

    // -----------Standard Equipment Section -----------

    const centerTwo = document.createElement("center");
    centerTwo.innerHTML = '<div id="colored-rectangle"></div>';
    detailsSection.append(centerTwo);

    const standardEquipSection = document.createElement("div");
    standardEquipSection.classList.add("standard-equip-section");
    standardEquipSection.innerHTML = '<h5 class="standard-equip-title">Standard Equipment</h5>';
    detailsSection.append(standardEquipSection);

    const standardEquipText = document.createElement("ul");
    standardEquipText.classList.add("standard-equip-text");
    standardEquipSection.append(standardEquipText);

    const seatingItem = document.createElement("li");
    seatingItem.innerText = "Seating: " + ElectricVehicle.seating + " adults";
    standardEquipText.append(seatingItem);

    const driverAssistItem = document.createElement("li");
    let checkDriverAssist = ElectricVehicle.driverAssist;
    if (checkDriverAssist) {
        driverAssistItem.innerHTML = 'Driver assist? <img src="./images/check.png" height="15" width="15">'
    } else {
        driverAssistItem.innerHTML = 'Driver assist? <img src="./images/x.png" height="15" width="15">'
    }
    standardEquipText.append(driverAssistItem);

    const freeOtaItem = document.createElement("li");
    let checkFreeOta = ElectricVehicle.freeOtaUpdate;
    if (checkFreeOta) {
        freeOtaItem.innerHTML = 'Free Over the Air Updates? <img src="./images/check.png" height="15" width="15">'
    } else {
        freeOtaItem.innerHTML = 'Free Over the Air Updates? <img src="./images/x.png" height="15" width="15">'
    }
    standardEquipText.append(freeOtaItem);

    const rearCargoItem = document.createElement("li");
    rearCargoItem.innerText = "Rear Cargo Area: " + ElectricVehicle.rearCargoSpace + " cu. in.";
    standardEquipText.append(rearCargoItem);

    const frunkItem = document.createElement("li");
    frunkItem.innerText = "Frunk Cargo Area: " + ElectricVehicle.frunkSpace + " cu. in.";
    standardEquipText.append(frunkItem);

    // -------------Price Details Section -------------

    const centerThree = document.createElement("center");
    centerThree.innerHTML = '<div id="colored-rectangle"></div>';
    detailsSection.append(centerThree);

    const priceDetailsSection = document.createElement("div");
    priceDetailsSection.classList.add("price-details-section");
    priceDetailsSection.innerHTML = '<h5 class="price-details-title">Price Details</h5>';
    detailsSection.append(priceDetailsSection);

    const priceDetailsText = document.createElement("ul");
    priceDetailsText.classList.add("price-details-text");
    priceDetailsSection.append(priceDetailsText);

    const msrpElement = document.createElement("li");
    msrpElement.innerText = "MSRP: $" + ElectricVehicle.msrp;
    priceDetailsText.append(msrpElement);

    const taxCreditElement = document.createElement("li");
    let checkTaxCredit = ElectricVehicle.taxCredit;
    if (checkTaxCredit) {
        taxCreditElement.innerHTML = 'Eligible for $7500 Federal Tax Credit? <img src="./images/check.png" height="15" width="15">'
    } else {
        taxCreditElement.innerHTML = 'Eligible for $7500 Federal Tax Credit? <img src="./images/x.png" height="15" width="15">'
    }
    priceDetailsText.append(taxCreditElement);

    const maintCostElement = document.createElement("li");
    maintCostElement.innerText = "Average Annual Maintenance Cost: $" + ElectricVehicle.yearlyMaintenanceCost;
    priceDetailsText.append(maintCostElement);

    const centerFour = document.createElement("center");
    centerFour.innerHTML = '<div id="colored-rectangle"></div>';
    maintCostElement.append(centerFour);

    const reviewCommentsNotationElement = document.createElement("review-comments");
    reviewCommentsNotationElement.classList.add("review-comments-notation");
    reviewCommentsNotationElement.innerText = "Comments: ";
    maintCostElement.append(reviewCommentsNotationElement);

    const centerFive = document.createElement("center");
    centerFive.innerHTML = '<div id="colored-rectangle"></div>';
    maintCostElement.append(centerFive);

    if (ElectricVehicle.reviewComments !== null && ElectricVehicle.reviewComments.length !== 0) {
        ElectricVehicle.reviewComments.forEach((reviewComment) => {
            let reviewCommentsElement = document.createElement("section");
            reviewCommentsElement.classList.add("review-comments-section");
            let singleReviewCommentElement = document.createElement("p");
            singleReviewCommentElement.innerText = reviewComment;
            reviewCommentsElement.appendChild(singleReviewCommentElement);
            priceDetailsText.appendChild(reviewCommentsElement);
        });
    }

    const form = document.createElement("form");
    form.classList.add("new-comment-form");
    const reviewCommentInput = document.createElement("input");
    reviewCommentInput.classList.add("input-form");
    reviewCommentInput.setAttribute("type", "text");
    reviewCommentInput.setAttribute("placeholder", "Enter your comment...");
    const submitReviewCommentButton = document.createElement("button");
    submitReviewCommentButton.classList.add("comment-button-bouncy");
    submitReviewCommentButton.innerText = "Submit";

    form.appendChild(reviewCommentInput);
    form.appendChild(submitReviewCommentButton);
    priceDetailsText.appendChild(form);

    submitReviewCommentButton.addEventListener("click", (clickEvent) => {
        clickEvent.preventDefault();
        clearChildren(body);
        if (reviewCommentInput.value !== "") {
            const json = JSON.stringify(reviewCommentInput.value);
            const unqoutedJson = json.replace(/\"/g, "");
            fetch("/api/electricVehicles/" + ElectricVehicle.id + "/comments", {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: unqoutedJson
                })
                .then(response => response.json())
                .then(ElectricVehicle => displaySingleEV(ElectricVehicle))
                .catch(error => console.log(error));
        }
    })
    
    body.appendChild(mainElement);

    return body;

}

fetch("/api/articles")
    .then(response => response.json())
    .then(articles => indexArticles(articles))
    .catch(error => console.log(error))

export {
    clearChildren
}