const ROOT_URL = "http://localhost:3000/";

const sendRequest = async(method, ROOT_URL, url_part) => {
    const response = await fetch(`${ROOT_URL}${url_part}`, { method });
    let result;
    switch (response.status) {
        case 200:
        case 201:
            result = await response.json();
            break;
        default:
            console.log(`The backend responded with status ${response.status}.`);
            break;
    }
    return result;
};

///////////////////////////////////////////////////////////////////////////////
// Send a correct request
const reservations = await sendRequest("GET", ROOT_URL, "reservations");
console.table(reservations);

const mistake = await sendRequest("GET", ROOT_URL, "i_dont_exist");
console.table(mistake);