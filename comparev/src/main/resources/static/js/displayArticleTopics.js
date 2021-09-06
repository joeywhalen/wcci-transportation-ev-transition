const displayAllTopics = function (ArticleTopics) {

    const bodyElement = document.querySelector("body");

    const wrapperElement = document.createElement("div");
    wrapperElement.classList.add("wrapper");
    bodyElement.append(wrapperElement);

    const ArticleTopicsOne = function (ArticleTopic) {
        const paralaxElementOne = document.createElement("div");
        paralaxElementOne.classList.add("parallax-one");
        bodyElement.append(paralaxElementOne);

        const paralaxTextElementOne = document.createElement("h1");
        paralaxTextElementOne.classList.add("text-over-parallax");
        paralaxTextElementOne.innerText = ArticleTopic.articleTopicTitle;
        bodyElement.append(paralaxTextElementOne);

        const topicElementOne = document.createElement("div");
        topicElementOne.classList.add("topic1");
        bodyElement.append(topicElementOne);

        const articleFlexElementOne = document.createElement("div");
        articleFlexElementOne.classList.add("article-flex");
        topicElementOne.append(articleFlexElementOne);

        ArticleTopic.articles.forEach((Article) => {
            const articleElement = document.createElement("div");
            articleElement.classList.add("article");
            articleFlexElementOne.appendChild(articleElement);

            const articleLinkElement = document.createElement("img");
            articleLinkElement.setAttribute("src", Article.imageUrl);
            articleLinkElement.setAttribute("id", Article.id);
            articleElement.appendChild(articleLinkElement);

            const articleTitleElement = document.createElement("p");
            articleTitleElement.innerText = Article.articleTitle;
            articleElement.appendChild(articleTitleElement);
        
        })
    }
        return ArticleTopicsOne;
    
}
export {
    displayAllTopics
}

//  <body>
//  <div class="wrapper"></div>
//     <!-- topic1 -->
//    <div class="parallax-one">
//        <h1 class="text-over-parallax">Why We Should Transition To EVs</h1>
//    </div>
//    <div class="topic1">
//     <div class="article-flex">
//         <div class="article">
//             <a href="single-article-prototype.html"><img src="images/blog-article1.gif"></a>
//             <p>No More Road Accidents </p>      
//         </div>
//         <div class="article">
//             <a href="single-article-prototype.html"><img src="images/blog-article2.png"></a>
//             <p>Consider Switching Now...</p>
//         </div>
//     </div>
//    </div>
//    <!-- topic2 -->
//    <div class="parallax-two">
//         <h1 class="text-over-parallax">How To Charge At Home And On The Road</h1>
//    </div>
//    <div class="topic2">
//     <div class="article-flex">
//         <div class="article">
//             <a href="single-article-prototype.html"><img src="images/blog-article3.webp"></a>
//             <p>Charge your Ev At Home... </p>
//         </div>
//         <div class="article">
//             <a href="single-article-prototype.html"><img src="images/blog-article4.png"></a>
//             <p>OR on The Road </p>
//         </div>
//     </div>
//    </div>
//    <!-- topic3 -->
//    <div class="parallax-three">
//         <h1 class="text-over-parallax">Electric Vehicles - Separating Fact From Fiction</h1>
//    </div>
//    <div class="topic3">
//     <div class="article-flex">
//         <div class="article">
//            <a href="single-article-prototype.html"><img src="images/blog-article5.jpg"></a>
//            <p>Know Your Facts</p>
//         </div>
//         <div class="article">
//             <a href="single-article-prototype.html"><img src="images/blog-article6.png"></a>
//             <p>Don't Be Misled</p>
//         </div>
//     </div>
//    </div>
//  </body>