import { Schema, model } from "mongoose";

import { handleSaveError, setUpdateSettings } from "./hooks,js";

import { typeList } from "../../constants/contacts.js";

const contactSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    phoneNumber: {
        type: String,
        require: true,
    },
    email: {
        type: String,
    },
    isFavourite: {
        type: Boolean,
        default: false,
    },
    contactType: {
        type: String,
        enum: typeList,
        require: true,
        default: "personal",
    },
    
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", setUpdateSettings);

contactSchema.post("findOneAndUpdate", handleSaveError);

export const sortByList = ["name", "phoneNumber", "emai", "isFavourite", "contactType"];

const ContactCollection = model("contacts", contactSchema);

export default ContactCollection;