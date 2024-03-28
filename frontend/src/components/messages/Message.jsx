import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation,setSelectedMessage,selectedMessage } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";
	const handleEditSubmit = () => {
        // Call a function to update the message content
        // This function should update the message in your store or backend
        // Example:
        // updateMessage(selectedMessage.id, editedMessage);
        // Reset edit mode and clear the edited message state
        toggleEditMode();
        setEditedMessage("");
    };
	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}`} onDoubleClick={() => {
            setSelectedMessage(message);
            toggleEditMode();
            setEditedMessage(message.message);
        }} pb-2>
            {isEditing && selectedMessage.id === message.id ? (
                <>
                    <input type="text" value={editedMessage} onChange={(e) => setEditedMessage(e.target.value)} />
                    <button onClick={handleEditSubmit}>Save</button>
                </>
            ) : (
                <div>{message.message}</div>
            )}
        </div>			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;
