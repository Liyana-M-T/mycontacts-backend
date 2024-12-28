import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";

//@desc Get all Contacts
//@route GET /api/contacts
//@access private

export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact?.find({
    user_id:req.user.id
  });
  res.status(200).json(contacts);
});

//@desc Create New Contact
//@route POST /api/contacts
//@access private

export const createContact = asyncHandler(async (req, res) => {
  console.log("the req body is: ", req.body);

  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields r mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id
  });
  res.status(201).json(contact);
});

//@desc Get Contact
//@route GET /api/contacts/:id
//@access private

export const getContact = asyncHandler(async (req, res) => {
    const contact=await Contact.findById(req.params.id);
    if(!contact){
       res.status(404);
       throw new Error("contact not found") 
    }
  res.status(200).json(contact);
});

//@desc Update Contact
//@route PUT /api/contacts/:id
//@access private

export const UpdateContact = asyncHandler(async (req, res) => {
  const contact=await Contact.findById(req.params.id);
    if(!contact){
       res.status(404);
       throw new Error("contact not found") 
    }

    if(contact.user_id.toString()!== req.user.id){
      res.status(403);
      throw new Error("user dont have permission to update other user contacts") 
    }  


  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new :true}
  )

  res.status(200).json(updatedContact);
});

//@desc Update Contact
//@route PUT /api/contacts/:id
//@access private

export const PatchContact = asyncHandler(async (req, res) => {
  const contact=await Contact.findById(req.params.id);
    if(!contact){
       res.status(404);
       throw new Error("contact not found") 
    }
  const patchedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new :true}
  )

  res.status(200).json(patchedContact);
});

//@desc delete Contact
//@route DELETE /api/contacts/:id
//@access private

export const deleteContact = asyncHandler(async (req, res) => {
  const contact=await Contact.findById(req.params.id);
    if(!contact){
       res.status(404);
       throw new Error("contact not found") 
    }
    
    if(contact.user_id.toString()!== req.user.id){
      res.status(403);
      throw new Error("user dont have permission to update other user contacts") 
    }  

    await Contact.findByIdAndDelete(req.params.id);;
  res.status(200).json(contact);
});
