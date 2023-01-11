const ROOT_URL = "http://localhost:3000/";

const sendRequest = async(method, ROOT_URL, url_part = "", body = false) => {};

const showReservations = async() => {
    let reservations = await sendRequest("GET", ROOT_URL, "reservations");

    // Only show reservations in 2024 to make it easier to see the reservations
    // we care about.
    reservations = reservations.filter(r => r.date.includes("2024"));
    console.table(reservations);
};

///////////////////////////////////////////////////////////////////////////////
// Show all reservations
await showReservations();

///////////////////////////////////////////////////////////////////////////////
// Create a new reservation.

//////////////////////////////////////////////////////////////////////////////
// Create another new reservation.

///////////////////////////////////////////////////////////////////////////////
// Update Yayoi Kusama's reservation using PUT.

///////////////////////////////////////////////////////////////////////////////
// Update Shirin's reservation using PATCH.