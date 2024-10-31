import createHttpError from "http-errors";

import * as contactServices from "../services/contacts.js"

export const getContactsController = async (req, res) => {

        const data = await contactServices.getContacts();
        
        res.json({
        status: 200,
        message: "Successfully found contacts!",
        data,
        })
    
};

export const getContactByIdController = async (req, res) => {
    
        const { contactId } = req.params;
        const data = await contactServices.getContactById(contactId);
       
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
    const data = await contactServices.addContact(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    });
};

export const upsertContactController = async (req, res) => {
    const { id: _contactId } = req.params;
    const data = await contactServices.updateContact({id, payload: req.body, options: {
            upsert: true
        }
    });
    
    const status = result.isNew ? 201 : 200;

    res.status(status).json({
        status,
        message: " Contact upserted successfully",
        data: result.data,
    })
};
    
export const patchContactController = async (req, res) => {
    const { id: _contactId } = req.params;
    const result = await contactServices.updateContact({ _contactId, payload: req.body });

    if (!result) {
        throw createHttpError(404, 'Contact not found');
    }

    res.json({
        status: 200,
        message: "Successfully patched a contact!",
	    data: result.data,
    })
}

export const delateContactController = async (req, res) => {
    const { id: _contactId } = req.params;

    const data = await contactServices.delateContact({_contactId});

    if (!data) {
            throw createHttpError(404, 'Contact not found');
    }
    
    res.status(204).send();
}