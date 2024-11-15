const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const corsOptions = {
    origin: function (origin, callback) {
        callback(null, true); 
    },
    credentials: true 
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

const PORT=5000;
mongoose.connect("mongodb+srv://pratikgupta1603:Pratik%402003@cluster0.dpwlcw0.mongodb.net/")
.then(() => {
    app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`));
})
.catch((error) => console.log(`${error} did not connect`));

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    company: String,
    jobTitle: String,
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);


app.post('/contacts', async (req, res) => {
    const contact = new Contact(req.body);
    try {
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/contacts', async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'name' } = req.query;
    try {
        const contacts = await Contact.find()
            .sort({ [sortBy]: 1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const totalContacts = await Contact.countDocuments();
        res.json({ contacts, totalContacts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(contact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.delete('/contacts/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

