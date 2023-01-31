// Business rules
import * as io from "./io.js";

const itemTypes = {
    customers: ["name", "email"],
    flavours: ["name", "price"],
    orders: ["customerEmail", "date", "status", "order description"],
};

const getCustomerEmails = async() => {
    const customers = await io.getItems("customers");
    return customers.map(customer => customer.email);
};

const getOrderStatusList = () => ["unpaid", "paid", "transit", "delivered"];

const addItem = io.addItem;
const updateItem = io.updateItem;
const deleteItem = io.deleteItem;

// Flavours
// We can add, update and delete flavours.
// Name and price are required
// Price > 0, under 10
// No two flavours with the same name.
// Delete a flavour only possible if no orders with that flavour.

// Customers
// We can add, update and delete customers.
// Name and email are required
// Name > 0 characters
// Customers cannot have the same email
// Delete a customer only possible if they have no orders.

// Orders
// We can add orders.
// We can only delete orders that are unpaid.
// We can only update the status of an order.
// Status can be: unpaid, paid, transit, delivered. And only in that order.
// customerId, date, status are required, items needs to be > 0

export {
    getCustomerEmails,
    getOrderStatusList,
    itemTypes,
    addItem,
    updateItem,
    deleteItem,
};