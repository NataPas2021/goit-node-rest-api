import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  if ("favorite" in req.query) {
    console.log("here");
    const { favorite } = req.query;
    const result = await contactsService.getFilteredContacts({
      owner,
      favorite,
    });
    if (!result) {
      throw HttpError(
        404,
        "Unfortunately, you don't have favorite contacts yet"
      );
    }
    res.status(200).json(result);
  }
  const result = await contactsService.getAllContacts(
    { owner },
    {
      skip,
      limit,
    }
  );
  const total = await contactsService.countContacts({ owner });
  res.json({ total, page, result });
};

const getOneContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await contactsService.getContactByFilter({ owner, _id: id });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const deleteContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await contactsService.removeContactByFilter({
    owner,
    _id: id,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await contactsService.addContact({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await contactsService.updateContactByFilter(
    { owner, _id: id },
    req.body
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const updateContactStatus = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await contactsService.updateStatusContactByFilter(
    { owner, _id: id },
    { favorite },
    { new: true }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateContactStatus: ctrlWrapper(updateContactStatus),
};
