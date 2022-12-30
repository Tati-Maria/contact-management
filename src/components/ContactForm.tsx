import React, {useEffect, useState} from 'react';
import Contact from './models';

interface ContactFormProps {
   onAddcontact: (contact: Contact) => void;
   editContact?: Contact | null;
}


const ContactForm: React.FC<ContactFormProps> = ({onAddcontact, editContact}) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("")
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [picture, setPicture] = useState("");

  //pre-populate the form with the contact's information to edit

useEffect(() => {
  if(editContact) {
    setName(editContact.name);
    setEmail(editContact.email);
    setPhone(editContact.phone);
    setIsFavorite(editContact.favorite);
    setPicture(editContact.picture);
  }

}, [editContact]);

//Handle picture change
const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if(!file) {
    return
  }

  const reader = new FileReader();
  reader.onload = () => {
    if(reader.result) {
      setPicture(reader.result as string);
    }
  };
  reader.readAsDataURL(file);
}

//Submit the form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const contact: Contact = {id, name, email, phone, favorite: isFavorite, picture};
    onAddcontact(contact)
  };

  return (
    <form onSubmit={handleSubmit}>

      <label htmlFor="picture">Picture: </label>
      <input type="file" 
      accept='image/*' 
      onChange={handlePictureChange} />
      <br />
      <img src={picture} alt={name} width="200px" height="200px" style={{borderRadius: "50%"}} />

      <label htmlFor="name">Name: </label>
      <input type="text" 
      id="name" value={name} 
      onChange={e => setName(e.target.value)}
      placeholder="Enter your contact name" 
      />

      <label htmlFor="email">Email: </label>
      <input type="email" 
      value={email} 
      id="email"
      placeholder='Enter your contact email'
      onChange={e => setEmail(e.target.value)}
       />

       <label htmlFor="phone">Phone: </label>
       <input type="tel"
        name="phone" 
        id="phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder="Enter your contact phone number"
        />

         <label htmlFor="favorite">
          <input type="checkbox" 
          checked={isFavorite} 
          onChange={() => setIsFavorite(!isFavorite)} 
          />
          Favorite
         </label>

         <button type='submit'>Add Contact</button>
         
    </form>
  )
}

export default ContactForm