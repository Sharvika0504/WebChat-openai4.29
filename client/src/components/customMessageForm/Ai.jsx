import { usePostAiTextMutation } from '@/state/api';
import { useState } from 'react';
import MessageFormUi from './MessageFormUi';

const Ai = ({props, activeChat}) => {
  const[message, setMessage] = useState("");
  const[attachment, setAttachment] = useState("");
  const[preview, setPreview] = useState("");
  const[trigger] = usePostAiTextMutation();
  const handleChange = (e) => setMessage(e.target.value);
  const handleSubmit =  async() => {
    const date = new Date().toISOString();
    const attach = attachment ? [{blob: attachment, file: attachment.name}] : [];
    const form = {
      attachments : attach,
      created : date,
      sender_username : props.username,
      text: message,
      activeChatId : activeChat.id,
    };
    props.onSubmit(form);
    trigger(form); //trigger API call  to OpenAI
    setAttachment("");
    setMessage("");
  }
  return (
    <MessageFormUi 
   setAttachment={setAttachment}
  message = {message}
  handleChange={handleChange}
  handleSubmit={handleSubmit}/>
  )
}

export default Ai
