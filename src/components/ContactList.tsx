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
    setShowFavoritesOnly: (showFavoritesOnly: boolean) => void;
}

const ContactList: React.FC<ContactListProps> = ({contacts, onEditContact, editContact, onDeleteContact, showFavoritesOnly, setShowFavoritesOnly}) => {
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
    <div className='contact'>
     <div className="contact__container">
     <section className='contact__header'>
        <h1>Contact List</h1>
        <button onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}>
        {showFavoritesOnly ? "Show All" : "Show Favorites Only"}
        </button>
      </section>
        {contacts.length === 0 ? (<NoContacts />) : (
          filteredContacts.map((contact) => (
            <div key={contact.id} className="contact__cards">
              <div className='contact__cards-card'>
              <div>
                {contact.image && <img src={contact.image} alt={contact.name} width="100px" height="100px"/>}
              </div>
                <h3><AiOutlineProfile/>{contact.name}</h3>
                <p><AiOutlineMail />{contact.email}</p>
                <p><AiOutlinePhone/>{contact.phone}</p>
                {editContact?.id !== contact.id && 
                (<>
                <div className='buttons'>
                <button onClick={() => handleDelete(contact.id!)}><AiOutlineDelete /></button>
                <button onClick={() => onEditContact(contact)}><AiOutlineEdit /></button>
                </div>
                </>)}
              </div>
                
            </div>
        ))
        )} 
     </div>
    </div>
  )
}

export default ContactList;