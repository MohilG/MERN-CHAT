import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),
	selectedMessage: null,
	setSelectedMessage:  (message) => set({ selectedMessage: message })
}));

export default useConversation;
