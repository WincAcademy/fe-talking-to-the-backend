const ROOT_URL = "http://localhost:3000/";

const sendRequest = async(method, ROOT_URL, url_part = "", body = false) => {
    const url = `${ROOT_URL}${url_part}`;
    const options = {
        method,
    };
    if (method !== "GET") {
        options.body = JSON.stringify(body);
        options.headers = {
            "Content-Type": "application/json;charset=utf-8",
        };
    }
    const response = await fetch(url, options);

    let result;
    switch (response.status) {
        case 200:
        case 201:
            result = await response.json();
            break;
        default:
            console.log(`🚨 The backend responded with status ${response.status}.`);
            console.log(`URL: ${url}`);
            console.log(`options:`, options);
            break;
    }
    return result;
};

const showReservations = async() => {
    let reservations = await sendRequest("GET", ROOT_URL, "reservations");
    console.table(reservations);
};

///////////////////////////////////////////////////////////////////////////////
// Show all reservations
await showReservations();

///////////////////////////////////////////////////////////////////////////////
// Create a new reservation.
const kusamaReservation = {
    name: "Yayoi Kusama",
    people: 3,
    date: "05/05/2024",
    time: "20:00",
};
const kusamaReservationResult = await sendRequest(
    "POST",
    ROOT_URL,
    "reservations",
    kusamaReservation
);
if (kusamaReservationResult) {
    console.log(
        `ℹ️ Reservation created for Yayoi Kusama with id ${kusamaReservationResult.id}`
    );
} else {
    console.log("No reservation created.");
}
await showReservations();

// Create another new reservation.
const neshatReservation = {
    name: "Shirin Neshat",
    people: 7,
    date: "19/01/2024",
    time: "17:30",
};
const neshatReservationResult = await sendRequest(
    "POST",
    ROOT_URL,
    "reservations",
    neshatReservation
);
if (neshatReservationResult) {
    console.log(
        `ℹ️ Reservation created for Shirin Neshat with id ${neshatReservationResult.id}`
    );
} else {
    console.log("No reservation created.");
}
await showReservations();

///////////////////////////////////////////////////////////////////////////////
if (kusamaReservationResult) {
    // Update Yayoi Kusama's reservation.
    // Make a copy of the previous reservation and change two properties using
    // the spread syntax.
    const kusamaReservationUpdated = {
        ...kusamaReservation,
        name: "Ms Yayoi Kusama",
        time: "21:00",
    };

    // Send PUT request to update the reservation.

    await sendRequest(
        "PUT",
        ROOT_URL,
        `reservations/${kusamaReservationResult.id}`,
        kusamaReservationUpdated
    );
    console.log("ℹ️ Reservation for Ms Yayoi Kusama has been updated.");
    await showReservations();
}

///////////////////////////////////////////////////////////////////////////////
if (neshatReservationResult) {
    // Update reservation using PATCH

    // We can just send an object with the properties we want to update.
    const neshatReservationPartialUpdate = {
        people: 12,
        time: "20:00",
    };
    await sendRequest(
        "PATCH",
        ROOT_URL,
        `reservations/${neshatReservationResult.id}`,
        neshatReservationPartialUpdate
    );
    console.log("ℹ️ Reservation for Shirin Neshat has been updated.");
    await showReservations();
}