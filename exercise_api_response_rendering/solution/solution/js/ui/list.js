import { insertIntoDom } from "./shared.js";

const renderItemProperty = (name, value) => {
    const li = document.createElement("li");
    let text;
    if (name === "name") {
        text = value;
    } else {
        text = `${name}: ${value}`;
    }
    li.innerText = text;

    return li;
};

const renderItemProperties = item => {
    const ul = document.createElement("ul");
    ul.classList.add("item_properties");
    for (let [name, value] of Object.entries(item)) {
        if (name === "id") {
            continue;
        }
        ul.append(renderItemProperty(name, value));
    }
    return ul;
};

const renderEditButton = (itemType, itemId) => {
    const button = document.createElement("input");
    button.type = "button";
    button.value = "Edit";
    button.classList.add("edit");
    button.dataset.itemType = itemType;
    button.dataset.itemId = itemId;
    return button;
};

const renderItem = (item, itemType) => {
    const li = document.createElement("li");
    li.append(renderItemProperties(item));
    li.append(renderEditButton(itemType, item.id));
    return li;
};

const renderAddButton = itemType => {
    const li = document.createElement("li");

    const button = document.createElement("input");
    button.classList.add("add");
    button.dataset.itemType = itemType;
    button.type = "button";
    button.value = `Add new ${itemType.slice(0, itemType.length - 1)}`;

    li.append(button);
    return li;
};

const renderItemList = (items, itemType) => {
    const ul = document.createElement("ul");
    ul.classList.add("items");
    ul.classList.add(itemType);
    ul.append(renderAddButton(itemType));
    for (let item of items) {
        ul.append(renderItem(item, itemType));
    }
    return ul;
};

const renderFlavourList = flavours => {
    insertIntoDom(renderItemList(flavours, "flavours"));
};

// const renderCustomerList = customers => {
//     const customerList = renderItemList(customers);
//     emptyRoot();
//     getRoot().append(customerList);
// };

// const renderCustomerList = customers => {};

// const renderOrderList = orders => {};

export { renderFlavourList };