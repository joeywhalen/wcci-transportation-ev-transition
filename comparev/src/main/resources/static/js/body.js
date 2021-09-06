import { displayForm } from "./form.js"

const displayHomeBody = function (){

    const mainElement = document.createElement("div");
    mainElement.classList.add("about-section");

    const aboutSection = document.createElement("div");
    aboutSection.classList.add("about-ev");
    aboutSection.innerHTML = '<p>Electric Vehicles (EVs) run on a battery instead of gasoline and oil, and an electric motor instead of an internal combustion engine. EVs are better for the environment, because they produce zero direct emissions. EVs are also cheaper to fuel and maintain.</p><hr>'
    mainElement.appendChild(aboutSection);
    
    const parallax = document.createElement("div");
    parallax.classList.add("parallax");

    const articleSection = document.createElement("div");
    articleSection.classList.add("article-section");
    const articlesRectangle = document.createElement("div");
    articlesRectangle.classList.add("rectangle");
    const articlesTitle = document.createElement("p");
    articlesTitle.classList.add("articles-title");
    articlesTitle.innerHTML = '<p>Articles</p>';

    return aboutSection;

}

export {displayHomeBody}

// <div class="about-section">
// <div class="about-ev">
//         <p>
//             Electric vihicles(EVs) have a battery instead of a tank, an electric motor instead of a gasoline
//             tank, and an electric motor instead of an internal combustion engine. Plug-in hybrid electric vehicles
//              (PHEVs) are a combination of gasoline and electric vehicles, so they have a battery, an electric motor,
//               a gasoline tank, and an internal combustion engine. PHEVs use both gasoline and electricity as fuel sources.
//         </p>
//         <hr>
// </div>
// </div>
// <div class="parallax"></div>
// <div class="article-section">
// <div class="rectangle">
//     <p class="articles-title">Articles</p>
//  </div>
//  <div class="row"> 
//     <div class="column">
//         <a href="index.html">
//             <img src="./images/article1.jpg" style="width:100%">
//         </a>
//     </div>
//     <div class="column">
//         <a href="index.html">
//             <img src="./images/article10.jpg" style="width:100%">
//             <img src="./images/article3.jpg" style="width:100%">
//             <img src="./images/article15.PNG" style="width:100%">
//         </a>
//     </div>  
//     <div class="column">
//         <a href="index.html">
//             <img src="./images/article12.jpg" style="width:100%">
//             <img src="./images/artitlce18.PNG" style="width:100%">
//         </a>
//     </div>
//     <div class="column">
//         <a href="index.html">
//         <img src="./images/article11.jpg" style="width:100%">
//     </a>
//   </div>
// </div>