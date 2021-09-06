import { displayArticle } from "./displayArticle.js";
import { contactsModal } from "./modal.js";

const displayAllTopics = function (ArticleTopics) {

    const bodyElement = document.querySelector("body");

    const wrapperElement = document.createElement("div");
    wrapperElement.classList.add("wrapper");
    bodyElement.append(wrapperElement);

    ArticleTopics.forEach((ArticleTopic) => {
        const parallaxImageElement = document.createElement("div");
        parallaxImageElement.classList.add("parallax");
        parallaxImageElement.style.backgroundImage = 'url("' + ArticleTopic.articleTopicParallaxUrl + '")';
        parallaxImageElement.setAttribute("id", ArticleTopic.id);
        bodyElement.append(parallaxImageElement);

        const parallaxTextElement = document.createElement("h1");
        parallaxTextElement.classList.add("text-over-parallax");
        parallaxTextElement.innerText = ArticleTopic.articleTopicTitle;
        bodyElement.append(parallaxTextElement);

        const topicElement = document.createElement("div");
        topicElement.classList.add("topic");
        bodyElement.append(topicElement);

        const articleFlexElement = document.createElement("div");
        articleFlexElement.classList.add("article-flex");
        topicElement.append(articleFlexElement);

        ArticleTopic.articles.forEach((Article) => {
            const articleElement = document.createElement("div");
            articleElement.classList.add("article");
            articleFlexElement.appendChild(articleElement);

            const articleLinkElement = document.createElement("img");
            articleLinkElement.setAttribute("src", Article.imageUrl);
            articleLinkElement.setAttribute("id", Article.id);
            articleElement.appendChild(articleLinkElement);

            const articleTitleElement = document.createElement("p");
            articleTitleElement.classList.add("articleTitle");
            articleTitleElement.innerText = Article.articleTitle;
            articleElement.appendChild(articleTitleElement);
            articleLinkElement.addEventListener("click", (clickEvent) => {
                clickEvent.preventDefault;
                displayArticle(Article)
            });
        
        })
    })

}

export {displayAllTopics}