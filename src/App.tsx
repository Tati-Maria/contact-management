import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import { useState } from "react";
import Contact from "./components/models";




const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editContact, setEditContact] = useState<Contact | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);


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
    <button onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}>
      {showFavoritesOnly ? "Show All" : "Show Favorites Only"}
    </button>
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
      />
    </>
  )
}

export default App;
