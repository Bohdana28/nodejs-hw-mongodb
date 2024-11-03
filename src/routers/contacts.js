import { Router } from "express";
import * as contactsControllers from "../controllers/contacts.js"
import ctrlWrapper from "../utils/ctrlWrapper.js";
 
const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(contactsControllers.getContactsController));

contactsRouter.get("/:contactId", ctrlWrapper(contactsControllers.getContactByIdController));

contactsRouter.post("/", ctrlWrapper(contactsControllers.addContactController));

contactsRouter.put("/:contactId", ctrlWrapper(contactsControllers.upsertContactController));

contactsRouter.patch("/:contactId", ctrlWrapper(contactsControllers.patchContactController));

contactsRouter.delete("/:contactId", ctrlWrapper(contactsControllers.deleteContactController));

export default contactsRouter;