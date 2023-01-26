// Advanced Exercise: fire off multiple requests.

// A helper function
const fetchJson = async function (url) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

// Store the base path in a constant.
const SERVER = "http://localhost:3000/";

// Rewrite the fetchPostAndComments async function.
const fetchPostAndComments = async function (postId) {
  // First, we should not await any of the fetches.
  const asyncUsers = fetchJson(`${SERVER}users`);
  const asyncPost = fetchJson(`${SERVER}posts/${postId}`);
  const asyncComments = fetchJson(`${SERVER}comments?postId=${postId}`);

  // Await users and post.
  const users = await asyncUsers;
  const post = await asyncPost;

  // Log out the post's author and the body.
  const postAuthor = users.find((user) => user.id === post.userId);
  console.log(postAuthor.name, "-", post.body);

  // Await the comments.
  const comments = await asyncComments;

  for (const comment of comments) {
    // For each comment find the author, and log their name, and the comment.
    const commentAuthor = users.find((user) => user.id === comment.userId);
    console.log(commentAuthor.name, "-", comment.comment);
  }
};

// Select the button that is on the page.
const fetchButton = document.querySelector(".fetch-post");

// Fetch a specific Post and its comments on clicking the button.
fetchButton.addEventListener("click", () => fetchPostAndComments("892a4ba3"));

// End of Advanced Exercise.
