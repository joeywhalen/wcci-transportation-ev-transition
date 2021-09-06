import { displayHeader } from "./Header.js";
import { displayAllTopics } from "./articleTopics.js";
import { displayArticle } from "./displayArticle.js";
import { displayFooter } from "./footer.js";

const bodyElement = document.querySelector("body");

bodyElement.append(displayHeader());

await fetch("/api/articleTopics")
    .then(response => response.json())
    .then(allArticleTopics => displayAllTopics(allArticleTopics))
    .catch(error => console.log(error))
    

bodyElement.append(displayFooter());