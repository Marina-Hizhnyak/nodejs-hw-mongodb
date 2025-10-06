import { Contact } from '../models/contact.js';

export async function getAllContacts({ page, perPage, sortBy, sortOrder, filter, userId }) {
  const skip = page > 0 ? (page - 1) * perPage : 0;


  const dbFilter = { userId };
  if (typeof filter?.isFavourite === 'boolean') {
    dbFilter.isFavourite = filter.isFavourite;
  }

  const contactQuery = Contact.find(dbFilter);

  const [contacts, total] = await Promise.all([
    contactQuery.clone().sort({ [sortBy]: sortOrder }).skip(skip).limit(perPage),
    Contact.countDocuments(dbFilter),
  ]);

  const totalPages = Math.ceil(total / perPage);
  return {
    data: contacts,
    total,
    page,
    perPage,
    totalPages,
    hasNextPage: totalPages > page,
    hasPreviousPage: page > 1,
  };
}
export async function getContactById(id) {
  const contact = await Contact.findById(id);
  return contact;
}

export async function createContact(payload, userId) {
  const contact = await Contact.create({ ...payload, userId });
  return contact;
}

export const updateContact = async (contactId, payload, options = {}) => {

  const { userId, ...queryOptions } = options;

  if ('userId' in payload) delete payload.userId;

  const filter = userId ? { _id: contactId, userId } : { _id: contactId };

  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({ _id: contactId, userId });

  return contact;
};