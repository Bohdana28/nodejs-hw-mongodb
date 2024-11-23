import { Router } from "express";

import { isValidId } from "../middlewares/isValidId.js";
import * as contactsControllers from "../controllers/contacts.js"
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";
import {contactAddSchema, contactUpdateSchema} from "../validation/contacts.js"
 
const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(contactsControllers.getContactsController));

contactsRouter.get("/:contactId", isValidId, ctrlWrapper(contactsControllers.getContactByIdController));

contactsRouter.post("/", validateBody(contactAddSchema), ctrlWrapper(contactsControllers.addContactController));

contactsRouter.put("/:contactId", isValidId, validateBody(contactAddSchema), ctrlWrapper(contactsControllers.upsertContactController));

contactsRouter.patch("/:contactId", isValidId, validateBody(contactUpdateSchema), ctrlWrapper(contactsControllers.patchContactController));

contactsRouter.delete("/:contactId", isValidId, ctrlWrapper(contactsControllers.deleteContactController));

export default contactsRouter;