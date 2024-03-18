import Header from "@/components/customHeader";
import Ai from "@/components/customMessageForm/Ai";
import AiCode from "@/components/customMessageForm/AiCode";
import StandardMessageForm from "@/components/customMessageForm/StandardMessageForm";
import { MultiChatSocket, MultiChatWindow, useMultiChatLogic } from 'react-chat-engine-advanced';

const Chat = ({user, passcode}) => {
    const chatProps = useMultiChatLogic(
        import.meta.env.VITE_PROJECT_ID,
        user,
        passcode
    )
    const timezoneOffset = -7;
  return (
    <div style={{flexBasis: "100%"}}>
      <MultiChatSocket{...chatProps} offset={timezoneOffset}/>
      <MultiChatWindow
        {...chatProps}
        style = {{height : "100vh"}}
        renderChatHeader={(chat) => <Header chat ={chat}/>}
        renderMessageForm={(props) => {
          if(chatProps.chat?.title.startsWith("AiChat_")){
            return <Ai props = {props} activeChat = {chatProps.chat}/>//render the AI componenet - depending on the member of the chatgroup
          }
          if(chatProps.chat?.title.startsWith("AiCode_")){
            return <AiCode props = {props} activeChat = {chatProps.chat}/>//render the AI componenet - depending on the member of the chatgroup
          }
            return (<StandardMessageForm props = {props} activeChat = {chatProps.chat}/>
            
            )
        }}
      />
    </div>
  )
}

export default Chat;

