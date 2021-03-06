const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join('db', "contacts.json");
const {v4} = require("uuid");



const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        console.table(contacts);
    }
    catch (error) {
       console.log(error);
    }
};

const getContactById = async (contactId) => {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const findContact = contacts.find(item => item.id.toString() === contactId.toString());
        console.table(findContact);
    }
    catch (error) {
        console.log(error);
    }
}

const removeContact = async (contactId) => {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const filterContacts = contacts.filter(item => item.id.toString() !== contactId.toString());
        await update(filterContacts);
        console.table(filterContacts);
    } catch (error) {
        console.log(error);
    }
}

const addContact = async (name, email, phone) => {
    const newContact = {
        name: name,
        email: email,
        phone: phone,
        id: v4()
    };
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const newContacts = [...contacts, newContact];
        await update(newContacts);
        console.table(newContacts)
    }
    catch (error) {
        console.log(error);
    }
}

const update = async (contacts) => {
    const str = JSON.stringify(contacts);
    try {
        await fs.writeFile(contactsPath, str)
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}
