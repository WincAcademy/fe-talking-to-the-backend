const response = await fetch("http://localhost:3000/todo");
const json = await response.json();
console.table(json);