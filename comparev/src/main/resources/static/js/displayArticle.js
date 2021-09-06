import { displayHeader } from "./Header.js";
import { contactsModal } from "./modal.js";
import {displayFooter} from "./footer.js";

const clearChildren = function (element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

const displayArticle = function (article) {

    const bodyElement = document.querySelector("body");
    clearChildren(bodyElement);
    window.scrollTo(0, 0);
    const mainElement = document.createElement("div");
    mainElement.classList.add("main-content");
    bodyElement.append(mainElement);
    bodyElement.append(displayHeader());
    const articleElement = document.createElement("div");
    articleElement.classList.add("article-content");
    articleElement.style.backgroundColor = "white"
    const articleTopicElement = document.createElement("h1");
    articleTopicElement.classList.add('article-topic');
    articleTopicElement.innerText = article.articleTopicTitle;
    const articleImageElement = document.createElement("img");
    articleImageElement.classList.add("single-article-img");
    articleImageElement.src = article.imageUrl;
    const articleTitleElement = document.createElement("h2");
    articleTitleElement.classList.add("single-article-title");
    articleTitleElement.innerText = article.articleTitle;
    const articleAuthorElement = document.createElement("h3");
    articleAuthorElement.classList.add("single-article-author");
    articleAuthorElement.innerText = "By: " + article.authorName;

    const centerOne = document.createElement("center");
    centerOne.innerHTML = '<div id="colored-rectangle"></div>';

    const articleTextElement = document.createElement("p");
    articleTextElement.classList.add("single-article-content");
    articleTextElement.innerText = article.articleContent;

    const centerTwo = document.createElement("center");
    centerTwo.innerHTML = '<div id="colored-rectangle"></div>';

    const articleCommentsNotationElement = document.createElement("article-comments");
    articleCommentsNotationElement.classList.add("article-comments-notation");
    articleCommentsNotationElement.innerText = "Comments: ";

    const centerThree = document.createElement("center");
    centerThree.innerHTML = '<div id="colored-rectangle"></div>';

    articleElement.appendChild(articleTopicElement);
    articleElement.appendChild(articleTitleElement);
    articleElement.appendChild(articleImageElement);
    articleElement.appendChild(articleAuthorElement);
    articleElement.appendChild(centerOne);
    articleElement.appendChild(articleTextElement);
    articleElement.appendChild(centerTwo);
    articleElement.appendChild(articleCommentsNotationElement);
    articleElement.appendChild(centerThree);

    if (article.articleComments !== null && article.articleComments.length !== 0) {
        article.articleComments.forEach((articleComment) => {
            let articleCommentsElement = document.createElement("section");
            articleCommentsElement.classList.add("article-comments-section");
            let singleArticleCommentElement = document.createElement("p");
            singleArticleCommentElement.innerText = articleComment;
            articleCommentsElement.appendChild(singleArticleCommentElement);
            articleElement.appendChild(articleCommentsElement);
        });
    }

    const form = document.createElement("form");
    form.classList.add("new-comment-form");
    const articleCommentInput = document.createElement("input");
    articleCommentInput.classList.add("input-form")
    articleCommentInput.setAttribute("type", "text");
    articleCommentInput.setAttribute("placeholder", "Enter your comment...");
    const submitArticleCommentButton = document.createElement("button");
    submitArticleCommentButton.classList.add("comment-button-bouncy");
    submitArticleCommentButton.innerText = "Submit";

    form.appendChild(articleCommentInput);
    form.appendChild(submitArticleCommentButton);
    articleElement.appendChild(form);

    submitArticleCommentButton.addEventListener("click", (clickEvent) => {
        clickEvent.preventDefault();
        const articleElement = document.querySelector(".article-content");
        clearChildren(articleElement);
        if (articleCommentInput.value !== "") {
            const json = JSON.stringify(articleCommentInput.value);
            const unqoutedJson = json.replace(/\"/g, "");
            fetch("/api/articleTopics/" + article.articleTopicId + "/articles/" + article.id + "/comments", {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: unqoutedJson
            })
                .then(response => response.json())
                .then(article => displayArticle(article))
                .catch(error => console.log(error));
        }
    })

    mainElement.appendChild(articleElement);
    mainElement.append(displayFooter());
    contactsModal();
    return mainElement;
}
export {
    displayArticle
}

export {
    clearChildren
}

{/* <div class="main-content">
        <img class="single-article-img"
            src="https://www.zerohedge.com/s3/files/inline-images/2019-07-21_13-21-38.png?itok=NQxqZjHQ">
        <h1 class="single-article-title">
            <font color="green">Electric Vehicle Benefits and</font>
            <font color="orange">Considerations</font>
        </h1>
        <h3 class="single-article-author"> By Jackie Brown</h3>
        <hr class="single-article-line" width="900px" size="5px" color="black">
        <p class="single-article-content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>
        <hr class="single-article-line" width="900px" size="5px" color="black">
    </div>
    <body>
    <h1 class="single-article-topic">Why We Should Transition To EVs</h1>
    <h2 class="single-article-title"> Electric Vehicle Benefits and Considerations</h2>
    <img class="single-article-img"
        src="https://www.zerohedge.com/s3/files/inline-images/2019-07-21_13-21-38.png?itok=NQxqZjHQ">
    <h3 class="single-article-author"> By: Jackie Brown<h3>
            <p class="single-article-content">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Facere soluta beatae porro provident ut rerum quas quae maxime ex doloribus eligendi aspernatur,
                distinctio at neque iusto asperiores velit consequatur et!
            <p>
</body> */}