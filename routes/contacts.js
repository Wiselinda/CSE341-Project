const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// Get all contacts
router.get('/', async (req, res) => {
  console.log("GET request to /contacts");
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one contact by ID
router.get('/:id', async (req, res) => {
  console.log(`GET request to /contacts/${req.params.id}`);
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new contact
router.post('/', async (req, res) => {
  console.log("POST request to /contacts", req.body);
  try {
    const contact = new Contact({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    });

    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
