const url =
  "https://public-api.wordpress.com/rest/v1.1/sites/oe2private.home.blog/posts/";

var blogPosts = [];

async function getBlogPosts(link) {
  let response = await fetch(link);
  let results = await response.json();
  let rawBlogPosts = results.posts;
  rawBlogPosts.forEach((rawblogPost) => {
    blogPostObject = {
      title: rawblogPost.title,
      content: rawblogPost.content,
      date: rawblogPost.date,
      slug: rawblogPost.slug,
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
    postElement.id = blogPost.slug;
    postElement.innerHTML = `
      <h3 class="post-title"><span class="copy-link" title="Copy link to post">🔗</span> ${blogPost.title} <span class="post-date">${blogPostDateFormatted}</span></h3>
      <div class="post-content">${blogPost.content}</div>
  `;
    blogPostsElement.appendChild(postElement);
  });

  const allPostTitles = document.querySelectorAll(".post-title");
  const allPostContent = document.querySelectorAll(".post-content");
  allPostTitles.forEach((postTitle) => {
    postTitle.addEventListener("click", function () {
      allPostContent.forEach((c) => c.classList.remove("visible"));
      if (postTitle.classList.contains("active")) {
        allPostTitles.forEach((t) => t.classList.remove("active"));
        history.replaceState(null, "", " ");
        allPostContent.forEach((c) => c.classList.remove("visible"));
      } else {
        allPostTitles.forEach((t) => t.classList.remove("active"));
        postTitle.classList.add("active");
        history.replaceState(null, "", "#" + postTitle.parentElement.id);
        postTitle.nextElementSibling.classList.add("visible");
      }
    });
  });

  document.querySelectorAll(".copy-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.stopPropagation();
      const slug = this.closest(".post").id;
      const postUrl =
        window.location.origin + window.location.pathname + "#" + slug;
      navigator.clipboard.writeText(postUrl);
      this.textContent = "✔️";
      setTimeout(() => {
        this.textContent = "🔗";
      }, 4500);
    });
  });

  if (window.location.hash) {
    const targetPost = document.querySelector(window.location.hash);
    if (targetPost) {
      const targetTitle = targetPost.querySelector(".post-title");
      targetTitle.click();
      targetPost.scrollIntoView({ behavior: "smooth" });
    }
  }
}

getBlogPosts(url);
