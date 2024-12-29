import createHttpError from "http-errors";

import * as contactServices from "../services/contacts.js";

import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";

import { sortByList } from "../db/models/Contact.js";


export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
    const { _id: userId } = req.user;
    

   

        const data = await contactServices.getContacts({ userId, page, perPage, sortBy, sortOrder});
        
        res.json({
        status: 200,
        message: "Successfully found contacts!",
        data,
        })
    
};

export const getContactByIdController = async (req, res) => {
    
    const { contactId } = req.params;
    const { _id: userId } = req.user;
        const data = await contactServices.getContactById(contactId, userId);
       
        if (!data) {
            throw createHttpError(404, 'Contact not found');
        }

        res.json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data,
        });
    
};

export const addContactController = async (req, res) => {
    const { _id: userId } = req.user;
    
    const data = await contactServices.addContact({ ...req.body, userId });

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    });
};

export const upsertContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const data = await contactServices.updateContact (contactId, req.body, {
            upsert: true,
    });
    if (!data) {
        next(createHttpError(404, "Contact not found"));
        return;
    }
    
    const status = result.isNew ? 201 : 200;

    res.status(status).json({
        status,
        message: " Contact upserted successfully",
        data: result.data,
    });
};
    
export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;

    const result = await contactServices.updateContact(contactId, req.body, {userId});

    if (!result) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result.data,
    });
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;

    const data = await contactServices.deleteContact({ _id:contactId, userId });

    if (!data) {
        throw createHttpError(404, "Contact not found");
        
    }
    
    res.status(204).send();
}