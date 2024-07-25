import React, { useState } from 'react';

const RichContact = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [search, setSearch] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  const addOrUpdateContact = () => {
    if (editIndex !== null) {
      const updatedContacts = [...contacts];
      updatedContacts[editIndex] = { name, email, phone };
      setContacts(updatedContacts);
      setEditIndex(null);
    } else {
      setContacts([...contacts, { name, email, phone }]);
    }
    setName('');
    setEmail('');
    setPhone('');
  };

  const deleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);

    if (selectedContact === contacts[index]) {
      setSelectedContact(null);
    }
  };

  const editContact = (index) => {
    const contact = contacts[index];
    setName(contact.name);
    setEmail(contact.email);
    setPhone(contact.phone);
    setEditIndex(index);
  };

  const selectContact = (index) => {
    setSelectedContact(contacts[index]);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase()) ||
      contact.phone.includes(search)
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Management</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={addOrUpdateContact}
          className="bg-blue-500 text-white px-4 py-2"
        >
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2"
        />
      </div>
      <ul>
        {filteredContacts.map((contact, index) => (
          <li
            key={index}
            className="border-b p-2 flex flex-col justify-between items-center cursor-pointer"
            onClick={() => selectContact(index)}
          >
            <div className="text-center">
              <p className="font-bold">{contact.name}</p>
              <p>{contact.email}</p>
              <p>{contact.phone}</p>
            </div>
            <div className="mt-2 flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  editContact(index);
                }}
                className="bg-yellow-500 text-white px-4 py-2"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteContact(index);
                }}
                className="bg-red-500 text-white px-4 py-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedContact && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl font-bold mb-2">Contact Details</h2>
          <p><strong>Name:</strong> {selectedContact.name}</p>
          <p><strong>Email:</strong> {selectedContact.email}</p>
          <p><strong>Phone:</strong> {selectedContact.phone}</p>
        </div>
      )}
    </div>
  );
};

export default RichContact;
