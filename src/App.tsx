import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Contact from "./components/models";
import './main.scss';
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";

//Retrive data from the local storage
const storedContacts = localStorage.getItem("contacts");
const initialContacts = storedContacts ? JSON.parse(storedContacts) : [];

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [isEditing, setIsEditing] = useState(false);
  const [editContact, setEditContact] = useState<Contact | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts))
  }, [contacts]);



const handleAddContact = (contact: Contact) => {
    if(isEditing) {
      const updatedContacts = contacts.map((c) => {
        if(c.id === editContact?.id) {
          return contact;
        }
        return c;
      });

      setContacts(updatedContacts);
    } else {
      setContacts([...contacts, contact])
    }
    setIsEditing(false);
    setEditContact(null);
}


const handleEditContact = (contact: Contact) => {
    setIsEditing(true);
    setEditContact(contact)
}
  
  //Delete a contact
  const handleDeleteContact = (id: string) => {
    //remove the contact based on email since we don't have an id
    setContacts(contacts.filter((c) => c.id !== id))
  }

  return (

    <>
    <NavBar />
      <ContactForm 
      onAddcontact={handleAddContact} 
      editContact={editContact} 
      />
      <ContactList 
      contacts={contacts} 
      onEditContact={handleEditContact} 
      editContact={editContact} 
      onDeleteContact={handleDeleteContact}
      showFavoritesOnly={showFavoritesOnly}
      setShowFavoritesOnly={setShowFavoritesOnly}
      />
    </>
  )
}

export default App;
