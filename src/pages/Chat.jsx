import '../styles/Chat.css'
import MaterialSidebar from '../components/Sidebar/MaterialSidebar'
import { useLocation } from 'react-router-dom'
import { useState, useEffect, useReducer } from 'react'

const Chat = ({ chatService }) => {
    const { state } = useLocation()
	const [chatsItems, setChatsItems] = useState(chatService.history);
	const [currentChat, setCurrentChat] = useState(0)
	const forceUpdate = useReducer(() => ({}), {})[1];

    const addChat = (chatName) => {
		const last_id = chatsItems[chatsItems.length - 1] ? chatsItems[chatsItems.length - 1].id : -1;
        const newChat = {
            id: last_id + 1,
            text: chatName,
            messages: []
        }
		console.log(newChat)
        chatsItems.push(newChat)
	}

    const sendMessage = (chatId, text, author) => {
		let last_id = 0;

		if (chatsItems[currentChat] !== undefined) {
			if (chatsItems[currentChat].messages[chatsItems[currentChat].messages.length - 1] !== undefined) {
				last_id = chatsItems[currentChat].messages[chatsItems[currentChat].messages.length - 1].id
			}
		}

		const now = new Date();
		const timeString = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

		const newMessage = {
			id: last_id + 1,
			text: text,
			author: author,
			date: timeString
		}

		console.log(chatsItems, chatId)
        chatsItems[chatId].messages.push(newMessage)
		setChatsItems(chatsItems)

		chatService.sendMessage(chatId, newMessage);
	}

	useEffect(() => {
		const handleMessage = (messageData) => {
			if (messageData.type === 'message') {
				const chatId = messageData.chatId;
				const message = messageData.message;
				chatsItems[chatId].messages.push(message);
				setChatsItems(chatsItems);
				forceUpdate();
			}
		};

		chatService.setMessageHandler(handleMessage);

		return () => {
			chatService.removeMessageHandler();
		};
	}, [chatService, chatsItems]);

	return (
		<div className='Chat'>
			<MaterialSidebar
				addChat={addChat}
				sendMessage={sendMessage}
				username={state}
				items={chatsItems}
				setItems={setChatsItems}
				currentChat={currentChat}
				setCurrentChat={setCurrentChat}
				chatService={chatService}
			/>
		</div>
	)
}

export default Chat
