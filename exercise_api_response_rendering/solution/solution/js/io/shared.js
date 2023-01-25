import {
    getFlavours,
    getFlavour,
    updateFlavour,
    addFlavour,
} from "./flavours.js";

const ROOT_URL = "http://localhost:3000/";
const API_KEY = "Vz2FpaZAXr0hu9EJP70X";

// A function that returns a function so we can set ROOT_URL and API_KEY exactly
// once.
const generateSendRequest =
    (root_url, api_key) =>
    async(method, url_part = "", body = false) => {
        const url = `${root_url}${url_part}`;
        const options = {
            method,
        };
        if (method !== "GET") {
            options.body = JSON.stringify(body);
            options.headers = {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: `Bearer ${api_key}`,
            };
        }
        // console.log(`Sending ${options.method} request to ${url}`, { options });
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

// This is the function we're going to call.
const sendRequest = generateSendRequest(ROOT_URL, API_KEY);

const getItems = itemType => {
    if (itemType === "flavours") return getFlavours();
};

const getItem = (itemType, itemId = undefined) => {
    if (itemType === "flavours") return getFlavour(itemId);
};

const addItem = async(itemType, data) => {
    // console.log("addItem", { itemType, data });
    if (itemType === "flavours") return addFlavour(data);
};

const updateItem = (itemType, itemId, data) => {
    // console.log("updateItem", { itemType, itemId, data });
    if (itemType === "flavours") return updateFlavour(itemId, data);
};

export { sendRequest, addItem, getItem, getItems, updateItem };