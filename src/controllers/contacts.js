import createHttpError from 'http-errors';
import { createContact, deleteContact, getAllContacts, getContactById, updateContact } from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export async function getContactsController(req, res) {

  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  console.log({ page, perPage });
  const contacts = await getAllContacts({ page, perPage, sortBy, sortOrder, filter, userId: req.user.id });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactByIdController(req, res) {

  const { id } = req.params;
  const contact = await getContactById(id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
}

export async function createContactController(req, res) {
  const contact = await createContact(req.body, req.user.id);
  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};


export async function patchContactController(req, res) {
  const { id } = req.params;
  const result = await updateContact(id, req.body, { userId: req.user.id });

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: "Successfully patched a contact!",
    data: result.contact,
  });
};


export async function deleteContactController(req, res) {
  const { id } = req.params;

  const contact = await deleteContact(id, req.user.id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};