import express from "express";
import { getContactsController, getContactByIdController, createContactController, patchContactController, deleteContactController } from "../controllers/contacts.js";

const router = express.Router();

router.get('/', getContactsController);
router.get('/:id', getContactByIdController);
router.post('/', createContactController);
router.patch('/:id', patchContactController);
router.delete('/:id', deleteContactController);
export default router;