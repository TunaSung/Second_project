import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [activeRoom, setActiveRoom] = useState(null); // { roomId, receiverId }

    return (
        <ChatContext.Provider value={{ isChatOpen, setIsChatOpen, activeRoom, setActiveRoom }}>
            {children}
        </ChatContext.Provider>
    );
};

export function useChat() {
  return useContext(ChatContext);
}