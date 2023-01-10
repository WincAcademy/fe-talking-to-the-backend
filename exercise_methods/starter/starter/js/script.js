const sendRequest = async() => {
    const response = await fetch();
    const json = await response.json();
    return json;
};

///////////////////////////////////////////////////////////////////////////////
// All reservations.
let reservations = await sendRequest();
console.table(reservations);

// A specific reservation.
const reservationId = "???";
console.log(`I am going to delete reservation ${reservationId}.`);

// Delete the specific reservation
await sendRequest();

// Check if it was deleted.
reservations = await sendRequest();
// This should show one reservation less.
console.table(reservations);