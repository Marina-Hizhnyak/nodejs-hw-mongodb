import express from "express";
import { getContactsController, getContactByIdController, createContactController, patchContactController, deleteContactController } from "../controllers/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { contactSchema, updateContactSchema } from "../validation/contacts.js";

const router = express.Router();

router.get('/', getContactsController);
router.get('/:id', isValidId, getContactByIdController);
router.post('/', validateBody(contactSchema), createContactController);
router.patch('/:id', isValidId, validateBody(updateContactSchema), patchContactController);
router.delete('/:id', isValidId, deleteContactController);
export default router;