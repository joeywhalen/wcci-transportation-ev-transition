import {
  contactsModal
} from "./modal.js";

// Displays header 
const displayHeader = function () {
  const header = document.createElement("header");
  header.classList.add("header-container");
  header.innerHTML = '<div class="header"><ul><li class="website-title"><h1>Compar<span>EV</span></h1></li></ul></div><input type="checkbox" class="openSidebarMenu" id="openSidebarMenu"><label for="openSidebarMenu" class="sidebarIconToggle"><div class="spinner diagonal part-1"></div><div class="spinner horizontal"></div><div class="spinner diagonal part-2"></div></label><div id="sidebarMenu"><ul class="sidebarMenuInner"><li><a href="./index.html">Home</a></li><li><a href="./all-evs.html">Vehicles</a></li><li><a href="./all-article-topics.html">Articles</a></li><li id="myBtn"><a>Contacts</a></li><div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span><li><a href="https://adambundschuh.github.io/" target="_blank">Adam Bundschuh</a></li><li><a href="http://georgefought.github.io/" target="_blank">George Fought</a></li><li><a href="https://joeywhalen.github.io/ProfessionalPortfolio/" target="_blank">Joey Whalen</a></li><li><a href="https://micaeladiloreto.github.io/index.html" target="_blank">Micaela DiLoreto</a></li><li><a href="https://nyirenkyi17.github.io" target="_blank">Nana Yirenkyi</a></li><li><a href="https://jorgeherrerajr.github.io/" target="_blank">Jorge Herrera</a></li></div></div></ul></div>'

  return header;

}

export {
  displayHeader
}