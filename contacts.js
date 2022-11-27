import * as fs from "node:fs/promises";
import * as path from "node:path";

const contactsPath = path.resolve("db/contacts.json");
const listContacts = async () => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    console.table(contacts);
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));

    const curruntContact = contacts.find((contact) => contact.id === contactId);
    console.log(curruntContact);
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));

    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
  } catch (err) {
    console.log(err);
  }
};

const addContact = async ({ id, name, email, phone }) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));

  await fs.writeFile(
    contactsPath,
    JSON.stringify([...contacts, { id, name, email, phone }])
  );
};

export { listContacts, removeContact, getContactById, addContact };
