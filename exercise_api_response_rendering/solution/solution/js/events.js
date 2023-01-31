import { getRoot, renderList, renderHome } from "./ui/shared.js";
import { getDataFromRenderedForm, renderForm } from "./ui/form.js";
import {
    addItem,
    updateItem,
    deleteItem,
    validateAddUpdate,
    validateDelete,
} from "./business.js";
import { getItem } from "./io.js";

// We listen to all events under <main>
const handleSubmitEvent = async event => {
    // Just cancel, we handle the data in another event.
    event.preventDefault();
    const formData = getDataFromRenderedForm();

    const itemType = formData.type;
    delete formData.type;

    const operation = formData.id === undefined ? "add" : "update";

    const [errorsFound, errors] = await validateAddUpdate(
        operation,
        itemType,
        formData
    );

    if (errorsFound) {
        renderForm(itemType, formData, errors);
        return;
    }

    if (operation === "add") {
        await addItem(itemType, formData);
    } else {
        const id = formData.id;
        delete formData.id;
        await updateItem(itemType, id, formData);
    }
    renderList(itemType);
};

const getItemType = event => event.target.dataset.itemType;
const getItemId = event => parseInt(event.target.dataset.itemId);

const handleEdit = async(itemType, itemId) => {
    renderForm(itemType, await getItem(itemType, itemId));
};

const handleDelete = async(itemType, itemId) => {
    // TODO: validate
    await deleteItem(itemType, itemId);
    renderList(itemType);
};

const handleClickEvent = async event => {
    // Only react to add/edit/delete button clicks.
    // We assume classList only contains one of these.
    if (event.target.classList.contains("edit")) {
        handleEdit(getItemType(event), getItemId(event));
    }
    if (event.target.classList.contains("delete")) {
        handleDelete(getItemType(event), getItemId(event));
    }
    if (event.target.classList.contains("add")) {
        renderForm(getItemType(event));
    }
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
    // We use "event bubbling" here to listen to all events inside of the root
    // element.
    getRoot().addEventListener("submit", handleSubmitEvent);
    getRoot().addEventListener("click", handleClickEvent);
    document
        .querySelectorAll("nav")
        .forEach(element =>
            element.addEventListener("click", handleMenuClickEvent)
        );
};

export { addEventListeners };