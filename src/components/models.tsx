import { useId } from "react-id-generator";

const contactID = useId();

export default interface Contact {
  id?: string;
  name: string;
  email: string;
  phone: string;
  favorite: boolean;
  picture: string;
}


 const models = () => {
  return (
    <div>Models</div>
  )
}

