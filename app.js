const url =
  "https://public-api.wordpress.com/rest/v1.1/sites/oe2private.home.blog/posts/";

var blogPosts = [];

async function getBlogPosts(link) {
  let response = await fetch(link);
  let results = await response.json();
  let rawBlogPosts = results.posts;
  rawBlogPosts.forEach((rawblogPost) => {
    // postTitle = blogPost.title;
    // postContent = blogPost.content;
    // console.log(postTitle);
    // console.log(postContent);
    blogPostObject = {
      title: rawblogPost.title,
      content: rawblogPost.content,
      date: rawblogPost.date,
    };
    blogPosts.push(blogPostObject);
  });

  const blogPostsElement = document.querySelector(".blog-posts");
  blogPosts.forEach((blogPost) => {
    const postElement = document.createElement("div");
    const tempDate = new Date(blogPost.date);
    const blogPostDateFormatted = tempDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    postElement.classList.add("post");
    postElement.innerHTML = `
            <h3 class="post-title">${blogPost.title} <span class="post-date">${blogPostDateFormatted}</span></h3>
            <div class="post-content">${blogPost.content}</div>
        `;
    blogPostsElement.appendChild(postElement);
  });

  const allPostTitles = document.querySelectorAll(".post-title");
  const allPostContent = document.querySelectorAll(".post-content");
  allPostTitles.forEach((postTitle) => {
    postTitle.addEventListener("click", function () {
      allPostContent.forEach((c) => c.classList.remove("visible"));
      //   allPostContent.forEach((c) => c.classList.add("invisible"));
      if (postTitle.classList.contains("active")) {
        //   allPostTitles.classList.remove("active");
        allPostTitles.forEach((t) => t.classList.remove("active"));
        allPostContent.forEach((c) => c.classList.remove("visible"));
        // allPostContent.forEach((c) => c.classList.add("invisible"));
        //   allPostContent.classList.remove("visible");
        //   allPostContent.classList.add("invisible");
      } else {
        allPostTitles.forEach((t) => t.classList.remove("active"));
        postTitle.classList.add("active");
        // postTitle.nextElementSibling.classList.remove("invisible");
        postTitle.nextElementSibling.classList.add("visible");
        //   Make its post content visible
      }
    });
  });
}

getBlogPosts(url);
