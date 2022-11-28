import { Command } from "commander";
import {
  listContacts,
  removeContact,
  getContactById,
  addContact,
} from "./contacts.js";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      // ...
      await listContacts();
      break;

    case "get":
      // ... id
      await getContactById(`${id}`);
      break;

    case "add":
      // ... name email phone
      await addContact({ id, name, email, phone });
      break;

    case "remove":
      // ... id
      await removeContact(`${id}`);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

(async () => {
  await invokeAction(argv);
})();
