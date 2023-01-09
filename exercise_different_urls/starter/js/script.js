const grabRandomId = items => {};

const sendRequest = async() => {
    const response = await fetch();
    const json = await response.json();
    return json;
};

///////////////////////////////////////////////////////////////////////////////
// All menu items.
const menuItems = await sendRequest();
console.table(menuItems);

// Random menu item.
const randomMenuItemId = grabRandomId(menuItems);
const menuItem = await sendRequest();
console.log(menuItem);