import React, {useEffect, useState, useRef, ChangeEvent} from 'react';
import Contact from './models';
import {AiFillStar, AiOutlinePlus} from "react-icons/ai"
import {v4 as uuid} from "uuid";

interface ContactFormProps {
   onAddcontact: (contact: Contact) => void;
   editContact?: Contact | null;
}


const ContactForm: React.FC<ContactFormProps> = ({onAddcontact, editContact}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [image, setImage] = useState("");
  const imageInput = useRef<HTMLImageElement>(null);
  const inputImage = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  //pre-populate the form with the contact's information to edit

useEffect(() => {
  if(editContact) {
    setName(editContact.name);
    setEmail(editContact.email);
    setPhone(editContact.phone);
    setIsFavorite(editContact.favorite);
    setImage(editContact.image);
  }

}, [editContact]);

//Handle picture change
const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if(file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string) //pass a string value
    }
    reader.readAsDataURL(file);
  }
};

//Submit the form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(name.length === 0 && phone.length === 0 && email.length === 0) {
      setError("Name, email and phone number are required fields");
      return;
    }
    const contact: Contact = {id: uuid(), name, email, phone, favorite: isFavorite, image: image };
    onAddcontact(contact);
    setName("");
    setEmail("");
    setPhone("");
    setImage("");
    setIsFavorite(false);
    if(imageInput.current) {
      imageInput.current.src = "";
    }
    if(inputImage.current) {
      inputImage.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {error && <p>{error}</p>}
      <section className='form__container' aria-label='form container'>

      <div className="image-controller" aria-label='inputs controller'>
      <input
      ref={inputImage}
      type="file"
      id='files' 
      onChange={handleImageChange} 
      accept="image/png, image/jpeg, image/gif"/>
      
      <img src={image} alt={name} ref={imageInput} width="130px" height="130px" />
      </div>

      <div className="input-controller" aria-label='inputs controller'>
      <input type="text" 
      required
      id="name" value={name} 
      onChange={e => setName(e.target.value)}
      placeholder="Enter your contact name" 
      />
      <label htmlFor="name">Name</label>
      </div>

      <div className="input-controller" aria-label='inputs controller'>
      <input type="email" 
      value={email} 
      required
      id="email"
      placeholder='Enter your contact email'
      onChange={e => setEmail(e.target.value)}
       />
      <label htmlFor="email">Email</label>
      </div>

      <div className="input-controller" aria-label='inputs controller'>
       <input type="tel"
        name="phone" 
        id="phone"
        value={phone}
        required
        onChange={e => setPhone(e.target.value)}
        placeholder="###-###-####"
        accept='^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$'
        />
       <label htmlFor="phone">Phone</label>
      </div>

      <div className="select-controller" aria-label='inputs controller'>
          <input id='favorite' type="checkbox" 
          checked={isFavorite} 
          onChange={() => setIsFavorite(!isFavorite)} 
          />
         <label htmlFor="favorite">
          Set as favorite contact <AiFillStar/>
         </label>
      </div>
         <button type='submit'><AiOutlinePlus/>Add Contact</button>
      </section>
    </form>
  )
}

export default ContactForm;