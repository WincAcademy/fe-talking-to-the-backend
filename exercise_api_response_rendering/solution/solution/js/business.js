// Business rules
import * as io from "./io.js";

const itemTypes = {
    customers: ["name", "email"],
    flavours: ["name", "price"],
    orders: ["customerId", "date", "status", "orderDescription"],
};

const flavourLowestPrice = 0.5;
const flavourHighestPrice = 10;
const flavourNameMinimumLength = 2;
const customerNameMinimumLength = 2;
const orderDescriptionMinimumLength = 8;

const getFlavours = async() => await io.getItems("flavours");

const getFlavourNames = async(filterById = -1) => {
    let flavours = await getFlavours();
    if (filterById > 0) {
        flavours = flavours.filter(flavour => flavour.id !== filterById);
    }
    return flavours.map(flavour => flavour.name);
};

const getOrderStatusList = () => ["unpaid", "paid", "transit", "delivered"];

const isANumber = value => {
    const converted = parseInt(value);
    return !Number.isNaN(converted);
};

const numberIsInRange = (number, lower, upper) =>
    number >= lower && number <= upper;

const stringHasMinimumLength = (str, length) => str.length >= length;

const stringConsistsOfLettersOnly = str => {
    // Regular expression, not necessary to know this.
    const re = /^[a-zA-Z\s]*$/;
    return re.test(str);
};

// TODO: add default order for different items.

const validateFlavour = async(operation, { name, price, id }) => {
    let errors = [];
    const currentFlavours = await getFlavourNames();

    // Cannot add flavour that already exists.
    if (operation === "add" && currentFlavours.includes(name)) {
        errors.push(`There\`s already a flavour called ${name}`);
    }

    // Cannot change flavour name to one that already exists.
    if (operation === "update") {
        const otherFlavourNames = await getFlavourNames(id);
        if (otherFlavourNames.includes(name)) {
            errors.push(`There\`s already a flavour called ${name}`);
        }
    }

    // Name must be x or more characters
    if (!stringHasMinimumLength(name, flavourNameMinimumLength)) {
        errors.push(
            `The name of an icecream flavour needs to be at least ${flavourNameMinimumLength} characters long`
        );
    } else {
        // Only letters allowed
        if (!stringConsistsOfLettersOnly(name)) {
            errors.push(
                "The name of an icecream flavour can only consist of the letters a to z and spaces in between."
            );
        }
    }

    if (!isANumber(price)) {
        errors.push("The price needs to be a number.");
    } else {
        // Only useful to validate this value when it's a number
        if (!numberIsInRange(price, flavourLowestPrice, flavourHighestPrice)) {
            // Price must be a number
            errors.push(
                `The price of a kilo of icecream needs to be between ${flavourLowestPrice} and ${flavourHighestPrice}.`
            );
        }
    }
    return errors;
};

const getCustomers = async() => await io.getItems("customers");

const getCustomerIds = async() => {
    const customers = await getCustomers();
    return customers.map(customer => customer.id);
};

const getCustomer = async id => await io.getItem("customers", id);

const getCustomerEmails = async(filterById = -1) => {
    let customers = await getCustomers();
    if (filterById > 0) {
        customers = customers.filter(customer => customer.id !== filterById);
    }
    return customers.map(customer => customer.email);
};

const validateCustomer = async(operation, { email, name, id }) => {
    let errors = [];

    if (email === "") {
        errors.push("The email address is required.");
    } else {
        // Cannot add customer email that already exists.
        if (operation === "add") {
            const currentCustomerEmails = await getCustomerEmails();
            if (currentCustomerEmails.includes(email)) {
                errors.push(`There\`s already a customer with email address ${email}`);
            }
        }

        // Cannot change customer email to one that already exists.
        if (operation === "update") {
            const otherCustomerEmails = await getCustomerEmails(id);
            if (otherCustomerEmails.includes(email)) {
                errors.push(`There\`s already a customer with email address ${email}`);
            }
        }
    }
    // Name must be 2 or more characters.
    if (!stringHasMinimumLength(name, customerNameMinimumLength)) {
        errors.push(
            `The name of a customer needs to be at least ${customerNameMinimumLength} characters long`
        );
    } else {
        // Only letters allowed
        if (!stringConsistsOfLettersOnly(name)) {
            errors.push(
                "The name of customer can only consist of the letters a to z and spaces in between."
            );
        }
    }
    return errors;
};
const validateOrder = async(
    operation, { customerId, date, status, orderDescription }
) => {
    let errors = [];

    // Customer must exist.
    const customerIds = await getCustomerIds();
    if (!customerIds.includes(customerId)) {
        errors.push(`Please select a customer for this order.`);
    }

    // Date is required, validation is too complex for now.
    if (date === "") {
        errors.push("Date is a required field");
    }

    // Status must be one of the valid values.
    if (!getOrderStatusList().includes(status)) {
        errors.push("The given status is not valid.");
    }

    // Order description must be x or more characters.
    if (!stringHasMinimumLength(orderDescription, orderDescriptionMinimumLength)) {
        errors.push(
            `The description of an order needs to be at least ${orderDescriptionMinimumLength} characters long`
        );
    }
    return errors;
};

const validateAddUpdate = async(operation, itemType, data) => {
    let errors = [];
    switch (itemType) {
        case "flavours":
            errors = await validateFlavour(operation, data);
            break;
        case "customers":
            errors = await validateCustomer(operation, data);
            break;
        case "orders":
            errors = await validateOrder(operation, data);
            break;
        default:
            errors = ["Incorrect itemType"];
            break;
    }
    // We return [errorsFound (a bool), the array of errors]
    return [errors.length > 0, errors];
};

const validateDelete = () => {
    // Delete a customer only possible if they have no orders.
};

const addItem = (itemType, data) => {
    return io.addItem(itemType, data);
};
const updateItem = (itemType, itemId, data) => {
    return io.updateItem(itemType, itemId, data);
};
const deleteItem = (itemType, itemId) => {
    return io.deleteItem(itemType, itemId);
};

// Orders
// We can add orders.
// We can only delete orders that are unpaid.
// We can only update the status of an order.
// Status can be: unpaid, paid, transit, delivered. And only in that order.
// customerId, date, status are required, items needs to be > 0

export {
    getCustomerEmails,
    getCustomers,
    getCustomer,
    getOrderStatusList,
    itemTypes,
    addItem,
    updateItem,
    deleteItem,
    validateAddUpdate,
    validateDelete,
};