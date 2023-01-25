import { getRoot, renderList, renderHome } from "./ui/shared.js";
import { getDataFromRenderedForm, renderForm } from "./ui/form.js";
import {
    addItem,
    updateItem,
    getItem,
    getItems,
    deleteItem,
} from "./io/shared.js";

// We listen to all events under <main>
const handleSubmitEvent = async event => {
    // Just cancel, we handle the data in another event.
    event.preventDefault();
    const formData = getDataFromRenderedForm();

    const itemType = formData.type;
    delete formData.type;

    // TODO: talk to business layer first, that talks to IO
    if (formData.id === undefined) {
        await addItem(itemType, formData);
    } else {
        const id = formData.id;
        delete formData.id;
        await updateItem(itemType, id, formData);
    }
    renderList(itemType);
};

const handleEdit = async event => {
    const itemType = event.target.dataset.itemType;
    const itemId = parseInt(event.target.dataset.itemId);
    renderForm(itemType, await getItem(itemType, itemId));
};

const handleDelete = async event => {
    const itemType = event.target.dataset.itemType;
    const itemId = parseInt(event.target.dataset.itemId);
    await deleteItem(itemType, itemId);
    renderList(itemType);
};

const handleAdd = event => {
    const itemType = event.target.dataset.itemType;
    renderForm(itemType);
};

const handleClickEvent = async event => {
    // Only react to add/edit button clicks.
    if (event.target.classList.contains("edit")) handleEdit(event);
    if (event.target.classList.contains("add")) handleAdd(event);
    if (event.target.classList.contains("delete")) handleDelete(event);
};

const handleMenuClickEvent = event => {
    const menuItem = event.target.dataset.link;
    if (menuItem === "home") {
        renderHome();
    } else {
        renderList(menuItem);
    }
};

const addEventListeners = () => {
    getRoot().addEventListener("submit", handleSubmitEvent);
    getRoot().addEventListener("click", handleClickEvent);
    document
        .querySelectorAll("nav")
        .forEach(element =>
            element.addEventListener("click", handleMenuClickEvent)
        );
};

export { addEventListeners };