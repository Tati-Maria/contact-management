import Contact from './models';
import {AiOutlineStar, 
  AiOutlineEdit, 
  AiOutlineDelete,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineProfile
} from "react-icons/ai"
import NoContacts from './NoContacts';

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

  const handleDelete =(id: string) => {
    //the contact list will only have an id after its submition
    const deleteId = id || '';
    if(confirm("Are you sure you want to delete this contact?")) {
      onDeleteContact(deleteId);
    }
  }

  return (
    <div>
        {contacts.length === 0 ? (<NoContacts />) : (
          filteredContacts.map((contact, index) => (
            <div key={contact.id}>
              <div>
                {contact.image && <img src={contact.image} alt={contact.name} width="100px" height="100px"/>}
              </div>
                <h3><AiOutlineProfile/>{contact.name}</h3>
                <p><AiOutlineMail />Email: {contact.email}</p>
                <p><AiOutlinePhone/>Phone: {contact.phone}</p>
                {editContact?.email !== contact.email && 
                (<>
                <button onClick={() => onEditContact(contact)}><AiOutlineEdit /> Edit</button>
                <button onClick={() => handleDelete(contact.id!)}><AiOutlineDelete /> Delete</button>
                </>)}
                
            </div>
        ))
        )} 
    </div>
  )
}

export default ContactList;