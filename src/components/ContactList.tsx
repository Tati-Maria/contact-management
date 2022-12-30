import Contact from './models';

interface ContactListProps {
    contacts: Contact[];
    onEditContact: (contact: Contact) => void;
    onDeleteContact: (email: string) => void;
    editContact: Contact | null;
    showFavoritesOnly: boolean;
}

const ContactList: React.FC<ContactListProps> = ({contacts, onEditContact, editContact, onDeleteContact, showFavoritesOnly}) => {
  //filter the contact list between favorites and not favorites
  const filteredContacts = showFavoritesOnly 
  ? contacts.filter((c) => c.favorite) 
  : contacts;


  return (
    <div>
        {filteredContacts.map((contact, index) => (
            <div key={contact.id}>
                <h3>{contact.name}</h3>
                <p>Email: {contact.email}</p>
                <p>Phone: {contact.phone}</p>
                {editContact?.email !== contact.email && 
                (<>
                <button onClick={() => onEditContact(contact)}>Edit</button>
                <button onClick={() => onDeleteContact(contact.email)}>Delete</button>
                </>)}
                
            </div>
        ))}
    </div>
  )
}

export default ContactList;