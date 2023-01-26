// Basics Exercise: simple fetching.

// Create an async function fetchUsers.
const fetchUsers = async function () {
  const response = await fetch(`http://localhost:3000/users`);
  const users = await response.json();
  console.table(users);
};

// Call the fetchUsers function.
// fetchUsers();

// Comment out the call to fetchUsers once you have a button to trigger the request.

// Select the button that is on the page.
const fetchButton = document.querySelector(".fetch-users");

// Add fetchUsers as the event listener to the button.
fetchButton.addEventListener("click", fetchUsers);

// End of Basics Exercise.
