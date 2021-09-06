import { displaySingleEV } from "./single-vehicle.js";
import { contactsModal } from "./modal.js";

const displayAllVehicles = function (ElectricVehicles) {

    const body = document.querySelector(".body")

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    body.append(wrapper);

    const pageTitle = document.createElement("div");
    pageTitle.classList.add("vehicle-page-title");
    pageTitle.innerHTML = '<h1 class="title-text">Check Out The Wide Selection of EVs</h1>'
    body.append(pageTitle);

    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");
    body.append(gridContainer);

    ElectricVehicles.forEach((ElectricVehicle) => {

        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridContainer.appendChild(gridItem);

        const vehicle1 = document.createElement("img");
        vehicle1.setAttribute("src", ElectricVehicle.imageUrl);
        vehicle1.setAttribute("id", ElectricVehicle.id);
        gridItem.appendChild(vehicle1);

        const textContainer = document.createElement("div");
        textContainer.classList.add("text-container");
        gridItem.appendChild(textContainer);

        const vehicleModel = document.createElement("p");
        vehicleModel.innerText = ElectricVehicle.makeName;
        textContainer.appendChild(vehicleModel);

        const vehicleName = document.createElement("p");
        vehicleName.innerText = ElectricVehicle.modelName;
        textContainer.appendChild(vehicleName);

        const vehiclePrice = document.createElement("p");
        vehiclePrice.innerText = "$" + ElectricVehicle.msrp;
        textContainer.appendChild(vehiclePrice);

        const mPG = document.createElement("p");
        mPG.innerText = "MPGe " + ElectricVehicle.mpgE;
        textContainer.appendChild(mPG);

        const exploreButton = document.createElement("button");
        exploreButton.classList.add("explore-button");
        exploreButton.innerText = "Explore"
        textContainer.appendChild(exploreButton);

        gridItem.addEventListener("click", (clickEvent) => {
            clickEvent.preventDefault;
            displaySingleEV(ElectricVehicle)
        });
    })

    contactsModal();

}

export {
    displayAllVehicles
}