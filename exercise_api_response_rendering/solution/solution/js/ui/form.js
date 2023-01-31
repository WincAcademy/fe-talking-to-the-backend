import { getRoot } from "./shared.js";
import { insertIntoDom } from "./shared.js";
import { itemTypes } from "../business.js";
import { getCustomerEmails, getOrderStatusList } from "../business.js";

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

const renderTextInputField = (name, value) => {
    const label = document.createElement("label");
    const span = document.createElement("span");
    span.innerText = capitalize(name);
    label.append(span);
    const input = document.createElement("input");
    if (name === "date") {
        input.type = "date";
    } else {
        input.type = "text";
    }
    input.value = value;
    input.name = name;
    label.append(input);
    return label;
};

const renderInvisibleInputField = (name, value) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.value = value;
    input.name = name;
    return input;
};

const renderEmailDropdown = async(name, value = "") => {
    const allEmails = await getCustomerEmails();

    const label = document.createElement("label");
    const span = document.createElement("span");
    span.innerText = capitalize(name);
    label.append(span);

    const select = document.createElement("select");
    select.name = name;

    const option = document.createElement("option");
    option.textContent = "Select customer";
    option.value = "";
    select.append(option);

    for (const email of allEmails) {
        const option = document.createElement("option");
        option.textContent = email;
        option.value = email;
        select.append(option);
    }
    select.value = value;

    label.append(select);
    return label;
};

const renderStatusDropdown = (name, value = "") => {
    const statusList = getOrderStatusList();

    const label = document.createElement("label");
    const span = document.createElement("span");
    span.innerText = capitalize(name);
    label.append(span);

    const select = document.createElement("select");
    select.name = name;

    const option = document.createElement("option");
    option.textContent = "Select order status";
    option.value = "";
    select.append(option);

    for (const status of statusList) {
        const option = document.createElement("option");
        option.textContent = status;
        option.value = status;
        select.append(option);
    }
    select.value = value;

    label.append(select);
    return label;
};

const renderForm = async(itemType, data) => {
    const operation = data !== undefined ? "update" : "add";
    const form = document.createElement("form");
    form.classList.add(itemType);

    form.append(renderInvisibleInputField("type", itemType));

    const itemTypeFields = itemTypes[itemType];

    for (const fieldName of itemTypeFields) {
        const fieldValue = operation === "update" ? data[fieldName] : "";
        if (fieldName === "id") {
            form.append(renderInvisibleInputField(fieldName, fieldValue));
        } else if (fieldName === "customerEmail") {
            form.append(await renderEmailDropdown(fieldName, fieldValue));
        } else if (fieldName === "status") {
            form.append(renderStatusDropdown(fieldName, fieldValue));
        } else {
            form.append(renderTextInputField(fieldName, fieldValue));
        }
    }
    // For update forms we need this
    if (operation === "update") {
        form.append(renderInvisibleInputField("id", data.id));
    }
    const submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Add/Update";
    form.append(submit);

    insertIntoDom(form);
};

const getDataFromRenderedForm = () => {
    const formData = new FormData(getRoot().querySelector("form"));

    const data = {};
    for (const [name, value] of formData.entries()) {
        data[name] = value;
    }
    return data;
};

export { getDataFromRenderedForm, renderForm };