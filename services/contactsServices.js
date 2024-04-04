import Contact from "../models/Contact.js";

export const getAllContacts = ({ filter = {} }, setting = {}) =>
  Contact.find(filter, "-createdAt -updatedAt", setting);

export const countContacts = (filter) => Contact.countDocuments(filter);

export const addContact = (data) => Contact.create(data);

export const getContactByFilter = (filter) => Contact.findOne(filter);

export const updateContactByFilter = (filter, data) =>
  Contact.findOneAndUpdate(filter, data);

export const removeContactByFilter = (filter) =>
  Contact.findOneAndDelete(filter);

export const updateStatusContactByFilter = (filter, data) =>
  Contact.findOneAndUpdate(filter, data);

export const getFilteredContacts = (filter) =>
  Contact.find(filter);
