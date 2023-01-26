// Intermediate Exercise: fetching multiple related resources.

// A helper function
const fetchJson = async function (url) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

// Store the base path in a constant.
const SERVER = "http://localhost:3000/";

// Write the fetchPostAndComments async function.
const fetchPostAndComments = async function (postId) {
  // First store the users in a constant. Here we are using the helper function we wrote
  // above.
  const users = await fetchJson(`${SERVER}users`);
  // Fetch the post.
  const post = await fetchJson(`${SERVER}posts/${postId}`);
  // Fetch the comments.
  const comments = await fetchJson(`${SERVER}comments?postId=${postId}`);
  // Find the author of the post.
  const postAuthor = users.find((user) => user.id === post.userId);
  // Log the author's name and the content of the post.
  console.log(postAuthor.name, "-", post.body);

  // Loop over the comments
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

// End of Intermediate Exercise.
