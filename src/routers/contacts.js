import { Router } from "express";

import { isValidId } from "../middlewares/isValidId.js";
import * as contactsControllers from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";
import { contactAddSchema, contactUpdateSchema } from "../validation/contacts.js";

import { authenticate } from '../middlewares/authenticate.js';


import { upload } from '../middlewares/multer.js';

 
const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", ctrlWrapper(contactsControllers.getContactsController));

contactsRouter.get("/:contactId", isValidId, ctrlWrapper(contactsControllers.getContactByIdController));

contactsRouter.post("/", upload.single('photo'), validateBody(contactAddSchema), ctrlWrapper(contactsControllers.addContactController));

contactsRouter.put("/:contactId", isValidId, upload.single('photo'), validateBody(contactAddSchema), ctrlWrapper(contactsControllers.upsertContactController));

contactsRouter.patch("/:contactId", isValidId, upload.single('photo'), validateBody(contactUpdateSchema), ctrlWrapper(contactsControllers.patchContactController));

contactsRouter.delete("/:contactId", isValidId, ctrlWrapper(contactsControllers.deleteContactController));

contactsRouter.post(
  '/register',
  validateBody(contactAddSchema),
  ctrlWrapper(contactsControllers.addContactController),
);

export default contactsRouter;