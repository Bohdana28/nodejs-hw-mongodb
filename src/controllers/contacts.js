import createHttpError from "http-errors";


import * as contactServices from "../services/contacts.js";

import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";

import { sortByList } from "../db/models/Contact.js";

import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';


import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from "../utils/env.js";


export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
    const { _id: userId } = req.user;
    

   

        const data = await contactServices.getContacts({ userId, page, perPage, sortBy, sortOrder});
        
    res.json({
        status: 200,
        message: "Successfully found contacts!",
        data,
    });
    
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

export const addContactController = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const photo = req.file ? await savePhoto(req.file) : null;

    const data = await contactServices.addContact({
      ...req.body,
      userId,
      photo,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const upsertContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;

    const data = await contactServices.updateContact (contactId, userId, req.body, {
            upsert: true,
    });
    if (!data) {
        next(createHttpError(404, "Contact not found"));
        return;
    }
    
    const status = data.isNew ? 201 : 200;

    res.status(status).json({
        status,
        message: " Contact upserted successfully",
        data: data.data,
    });
};
    

export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id: userId } = req.user;

    const photo = req.file ? await savePhoto(req.file) : null;

    const result = await contactServices.updateContact(
      contactId,
      { userId },
      {
        ...req.body,
        ...(photo && { photo }),
      },
    );
    if (!result) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result.data, 
    });
  } catch (error) {
    next(error);
  }
};

const savePhoto = async (file) => {
  if (env('ENABLE_CLOUDINARY') === 'true') {
    return await saveFileToCloudinary(file);
  }
  return await saveFileToUploadDir(file);
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;

    const data = await contactServices.deleteContact({ _id: contactId, userId });

    if (!data) {
        throw createHttpError(404, "Contact not found");
        
    }
    
    res.status(204).send();
};