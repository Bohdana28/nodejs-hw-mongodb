import { Schema, model } from "mongoose";

const contactSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    phoneNumber: {
        type: String,
        require: true,
    },
    isFavourite: {
        type: Boolean,
        default: false,
    },
    contactType: {
        type: String,
        enum: ["work", "home", "personal"],
        require: true,
        default: "personal",
    },
    
});

const ContactCollection = model("contacts", contactSchema);

export default ContactCollection;