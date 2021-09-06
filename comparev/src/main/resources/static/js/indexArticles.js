import { clearChildren } from "./userVehicleForm.js";
import { displayHeader } from "./Header.js";
import { contactsModal } from "./modal.js";
import { displayFooter } from "./footer.js";

const indexArticles = function (articles) {
  const articlesGridElement = document.querySelector(".articles-grid");
  clearChildren(articlesGridElement);

  let articleCount = 1;
  articles.forEach((article) => {

    let articleElement = document.createElement("div");
    articleElement.classList.add("article"+articleCount);
    let articleLinkElement = document.createElement("a");
    articleElement.style.backgroundImage = 'url("'+article.imageUrl+'")'
    let articleTitleElement = document.createElement("h3");
    
    articleTitleElement.innerText = article.articleTitle;

    articleElement.addEventListener("click", (clickEvent) => {
      displaySingleArticle(article)
    });
    articleLinkElement.appendChild(articleTitleElement);
    articleElement.appendChild(articleLinkElement);
    articlesGridElement.appendChild(articleElement);
    articleCount++;
  });

  const body = document.querySelector("body");
  contactsModal();
}

const displaySingleArticle = function (article) {
    const bodyElement = document.querySelector("body");
    clearChildren(bodyElement);
    window.scrollTo(0, 0);
    const mainElement = document.createElement("div");
    mainElement.classList.add("main-content");
    bodyElement.append(mainElement);
    bodyElement.prepend(displayHeader());
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
    articleCommentInput.classList.add("input-form");
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
                .then(article => displaySingleArticle(article))
                .catch(error => console.log(error));
        }
    })

    mainElement.appendChild(articleElement);
    mainElement.append(displayFooter());

    contactsModal();
}

export { indexArticles }

/* <div class="article-section">
        <div class="rectangle">
            <p class="articles-title">Articles</p>
        </div> 
        <div class="articles-wrapper">
            <div class="articles-grid">
              <div class="article1">
                  <a href="/frontend-spa/single-article-prototype.html">
                    <h3>This is an article</h3>
                    <p>You can find all kinds of car related things here.</p>
                 </a>
              </div>
              <div class="article2">
                  <a href="/frontend-spa/single-article-prototype.html">
                     <h3>This is also an article</h3>
                     <p>blah blah blah blah</p>
                 </a>
              </div>
              <div class="article3">
                  <a href="/frontend-spa/single-article-prototype.html">
                    <h3>Cars are really cool</h3>
                    <p>blahhhhhhhhhhh</p>
                 </a>
              </div>
              <div class="article4">
                  <a href="/frontend-spa/single-article-prototype.html">
                    <h3>i love cars</h3>
                    <p>i really..... love cars </p>
                </a>
              </div>
              <div class="article5">
                  <a href="/frontend-spa/single-article-prototype.html">
                    <h3>This is another article</h3>
                    <p>car stuff</p>
                 </a>
            </div>
              <div class="article6">
                  <a href="/frontend-spa/single-article-prototype.html">
                    <p>cars cars cars cars carrrrs </p>
                 </a>
                </div>
            </div>
            </div>
        </div> */