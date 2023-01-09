const ROOT_URL = "http://localhost:3000/";

const grabRandomId = items => {
    // Not a pure function so don't use this for production.
    // Grab an item based on random index.
    const highestIndex = items.length - 1;

    const index = Math.round(Math.random() * highestIndex);
    return items[index]["id"];
};

const sendRequest = async(ROOT_URL, url_part) => {
    const response = await fetch(`${ROOT_URL}${url_part}`);
    const json = await response.json();
    return json;
};

///////////////////////////////////////////////////////////////////////////////
// All menu items.
const menuItems = await sendRequest(ROOT_URL, "menu");
console.table(menuItems);

// Random menu item.
const randomMenuItemId = grabRandomId(menuItems);
const menuItem = await sendRequest(ROOT_URL, `menu/${randomMenuItemId}`);
console.log(menuItem);

///////////////////////////////////////////////////////////////////////////////
// All tables.
const tables = await sendRequest(ROOT_URL, "tables");
console.table(tables);

// Random table.
const randomTableId = grabRandomId(tables);
const randomTable = await sendRequest(ROOT_URL, `tables/${randomTableId}`);
console.log(randomTable);

///////////////////////////////////////////////////////////////////////////////
// All reservations.
const reservations = await sendRequest(ROOT_URL, "reservations");
console.table(reservations);

// Random reservation.
const randomReservationId = grabRandomId(reservations);
const randomReservation = await sendRequest(
    ROOT_URL,
    `reservations/${randomReservationId}`
);
console.log(randomReservation);