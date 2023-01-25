import { getRoot } from "./shared.js";
import { insertIntoDom } from "./shared.js";
import { itemTypes } from "../state.js";

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

const renderTextInputField = (name, value) => {
    const label = document.createElement("label");
    const span = document.createElement("span");
    span.innerText = capitalize(name);
    label.append(span);
    const input = document.createElement("input");
    input.type = "text";
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

const renderForm = (itemType, data) => {
    const operation = data !== undefined ? "update" : "add";
    const form = document.createElement("form");
    form.classList.add(itemType);

    form.append(renderInvisibleInputField("type", itemType));

    const itemTypeFields = itemTypes[itemType];

    for (const fieldName of itemTypeFields) {
        const fieldValue = operation === "update" ? data[fieldName] : "";
        if (fieldName !== "id") {
            form.append(renderTextInputField(fieldName, fieldValue));
        } else {
            form.append(renderInvisibleInputField(fieldName, fieldValue));
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

const renderOrderForm = order => {
    const form = renderForm("orders", order);
    insertIntoDom(form);
};

const renderCustomerForm = customer => {
    const form = renderForm("customers", customer);
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