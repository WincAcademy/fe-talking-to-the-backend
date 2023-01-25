import { sendRequest } from "./shared.js";

const getFlavours = async() => {
    return await sendRequest("GET", "flavours");
};

const getFlavour = async id => {
    const flavours = await sendRequest("GET", "flavours");
    for (let flavour of flavours) {
        if (flavour.id === id) {
            return flavour;
        }
    }
};

const addFlavour = async data => {
    // We assume this always works.
    await sendRequest("POST", "flavours", data);
};

const updateFlavour = async(id, data) => {
    // We assume this always works.
    await sendRequest("PUT", `flavours/${id}`, data);
};

const deleteFlavour = async id => {
    // We assume this always works.
    await sendRequest("DELETE", `flavours/${id}`);
};

export { getFlavours, getFlavour, addFlavour, updateFlavour, deleteFlavour };