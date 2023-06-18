import { mdiContentSaveSettingsOutline } from '@mdi/js';
import Notify from '../../components/Notify/Notify';

export default class ChatService {
	constructor() {
		this.ws = new WebSocket('ws://localhost:8080');
		this.username = '';
		this.connected = false;
		this.history = [];
		this.users = [];
		this.messageHandler = null;
		this.chatHandler = null;
		window.addEventListener('beforeunload', () => {
			this.close();
		});
	}

	setMessageHandler(handler) {
		this.messageHandler = handler;
	}

	removeMessageHandler() {
		this.messageHandler = null;
	}

	setChatHandler(handler) {
		this.chatHandler = handler;
	}

	removeChatHandler() {
		this.chatHandler = null;
	}

	connect(username, navigate) {
		this.ws = new WebSocket('ws://localhost:8080');

		this.ws.onopen = () => {
			const message = {
				type: 'auth',
				name: username,
			};
			this.ws.send(JSON.stringify(message));
			this.connected = true;
		};

		this.ws.onmessage = (event) => {
			const messageData = JSON.parse(event.data);
			if (messageData.type === 'auth') {
				this.username = messageData.name;
				this.history = messageData.history;
				this.users = messageData.users;
				Notify('success', `Подключено как ${this.username}`);
				navigate('/chat', { state: this.username });
			}
			else if (messageData.type === 'message') {
				if (this.messageHandler) {
					this.messageHandler(messageData);
				}
			}
			else if (messageData.type === 'chat') {
				if (this.chatHandler) {
					this.chatHandler(messageData);
				}
			}
		};

		this.ws.onclose = () => {
			Notify('info', 'Соединение с сервером WebSocket закрыто');
			navigate('/auth', { state: this.username });
			this.connected = false;
		};
	}

	sendMessage(chatId, message) {
		if (this.ws && this.ws.readyState === WebSocket.OPEN) {
			const messageData = {
				type: 'message',
				content: message,
				chatId: chatId
			};
			this.ws.send(JSON.stringify(messageData));
		}
	}

	newChat(chatName) {
		if (this.ws && this.ws.readyState === WebSocket.OPEN) {
			const chatData = {
				type: 'chat',
				chatName: chatName
			};
			this.ws.send(JSON.stringify(chatData));
		}
	}

	newPrivate(addressee) {
		if (this.ws && this.ws.readyState === WebSocket.OPEN) {
			const chatData = {
				type: 'private',
				addressee: addressee
			};
			this.ws.send(JSON.stringify(chatData));
		}
	}

	close() {
		if (this.ws) {
			this.ws.close();
		}
	}

	isConnected() {
		return this.connected;
	}
}