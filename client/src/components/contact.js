import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Modal, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalContacts, setTotalContacts] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [jobTitle, setJobTitle] = useState('');

    const fetchContacts = async () => {
        const response = await fetch(`http://localhost:5000/contacts?page=${page}&limit=5`);
        const data = await response.json();
        setContacts(data.contacts);
        setTotalContacts(data.totalContacts);
    };

    useEffect(() => {
        fetchContacts();
    }, [page]);

    const addContact = async () => {
        await fetch('http://localhost:5000/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, phone, company, jobTitle }),
        });
        setShowModal(false);
        fetchContacts();
    };

    const deleteContact = async (id) => {
        await fetch(`http://localhost:5000/contacts/${id}`, {
            method: 'DELETE',
        });
        fetchContacts();
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Contact Management</h1>

            <div className="flex justify-center mb-8">
                <Button
                    onClick={() => setShowModal(true)}
                    variant="contained"
                    startIcon={<AddIcon />}
                    color="primary"
                >
                    Add Contact
                </Button>
            </div>

            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>Phone</strong></TableCell>
                            <TableCell><strong>Company</strong></TableCell>
                            <TableCell><strong>Job Title</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contacts.map((contact) => (
                            <TableRow key={contact._id}>
                                <TableCell>
                                    <PersonIcon style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                                    {contact.name}
                                </TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{contact.phone}</TableCell>
                                <TableCell>{contact.company}</TableCell>
                                <TableCell>{contact.jobTitle}</TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => deleteContact(contact._id)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className="flex justify-center mt-8">
                <Button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    variant="contained"
                    color="secondary"
                >
                    Previous
                </Button>
                <span className="mx-4">Page {page}</span>
                <Button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= Math.ceil(totalContacts / 5)}
                    variant="contained"
                    color="secondary"
                >
                    Next
                </Button>
            </div>

            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="add-contact-modal"
                aria-describedby="add-a-new-contact"
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '400px',
                        backgroundColor: 'white',
                        padding: '16px',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <h2 id="add-contact-modal" className="text-xl font-semibold mb-4">
                        Add New Contact
                    </h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            addContact();
                        }}
                        className="space-y-4"
                    >
                        <TextField
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Job Title"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            fullWidth
                        />
                        <div className="flex justify-end space-x-4 mt-4">
                            <Button
                                onClick={() => setShowModal(false)}
                                variant="outlined"
                                color="secondary"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Add Contact
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default Contacts;
