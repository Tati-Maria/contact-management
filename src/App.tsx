import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Contact from "./components/models";
import './main.scss';
import { useEffect, useState } from "react";
import {Route, Routes} from "react-router-dom"

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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact-form" element={<ContactForm onAddcontact={function (contact: Contact): void {
          throw new Error("Function not implemented.");
        } } />} />
      <Route path="/contact-list" element={<ContactList contacts={[]} onEditContact={function (contact: Contact): void {
          throw new Error("Function not implemented.");
        } } onDeleteContact={function (email: string): void {
          throw new Error("Function not implemented.");
        } } editContact={null} showFavoritesOnly={false} />} />
      <Route path="*"errorElement={<PageNotFound />} />
    </Routes>
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
