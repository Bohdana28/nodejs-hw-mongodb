import ContactCollection from "../db/models/Contact.js";

export const getContacts = () => ContactCollection.find();

export const getContactById = contactId => ContactCollection.findById(contactId);

export const addContact = payload => ContactCollection.create(payload);

export const updateContact = async ({ _contactId, payload, options = {} }) => {
    
    const rawResult = await ContactCollection.findOneAndUpdate({ _contactId }, payload, { ...options, new: true, includeResultMetadata: true, });
  
    if (!rawResult || !rawResult.value) return null;

    return {
        data: rawResult.value,
        isNew: Boolean(rawResult.lastErrorObject.upserted)
    }
}

export const deleteContact = async (filter) => ContactCollection.findOneAndDelete(filter);

