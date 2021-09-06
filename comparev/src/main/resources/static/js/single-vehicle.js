import { displayHeader } from "./Header.js";
import { contactsModal } from "./modal.js";
import {displayFooter} from "./footer.js";

const clearChildren = function (element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

const displaySingleEV = function (ElectricVehicle) {

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
    carImage.style.backgroundImage = 'url("'+ElectricVehicle.imageUrl+'")';
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
    reviewSection.append(detailsSection);
    detailsSection.style.backgroundColor = "white"

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
    console.log(checkAutonomous);
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
    console.log(checkPhoneKey);
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
    standardEquipText.classList.add("standrd-equip-text");
    standardEquipText.style.listStyleType = 'none';
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
    body.append(displayFooter());

    contactsModal();

    return body;
}

export {
    displaySingleEV
}