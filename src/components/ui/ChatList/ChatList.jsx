import React, { useState, useReducer, useEffect } from 'react';
import classes from './ChatList.module.css';
import MaterialButton from '../Button/MaterialButton';
import MaterialInput from '../Input/MaterialInput';
import Icon from '@mdi/react';
import { mdiPlusThick, mdiCloseThick, mdiOpenInNew } from '@mdi/js';
import Notify from '../../Notify/Notify';

const ChatList = ({ currentChat, setCurrentChat, chatService, openFloatChat, ...props }) => {
	const [newChatName, setNewChatName] = useState('');
	const [newPrivateName, setNewPrivateName] = useState('');
	const [chats, setChats] = useState(props.items);
	const [showInputChat, setShowInputChat] = useState(false);
	const [showInputPrivate, setShowInputPrivate] = useState(false);
	const forceUpdate = useReducer(() => ({}), {})[1];

	const addChat = () => {
		if (newChatName === '' || newChatName.trim().length === 0) {
			Notify("error", "Введите название чата!");
			return;
		}
		props.addChat(newChatName);
		Notify("success", "Новый чат успешно создан!");
		setChats(props.items);
		forceUpdate();
		setNewChatName('');
		cancelClick('chat');
		chatService.newChat(newChatName);
	};

	const addPrivate = () => {
		console.log(chatService.users)
		if (newPrivateName === '' || newPrivateName.trim().length === 0) {
			Notify("error", "Введите название чата!");
			return;
		}
		if (!chatService.users.includes(newPrivateName)) {
			Notify("error", "Пользователя не существует!");
			return;
		}
		props.addChat('PRIVATE | ' + chatService.username + ' : ' +newPrivateName);
		Notify("success", "Новый личный чат успешно создан!");
		setChats(props.items);
		forceUpdate();
		setNewPrivateName('');
		cancelClick('private');
		chatService.newPrivate(newPrivateName);
	}

	useEffect(() => {
		const handleChat = (chatData) => {
			console.log(chatData)
			if (chatData.type === 'chat') {
				props.addChat(chatData.chatName);
				Notify("success", "Добавлен новый чат!");
				setChats(props.items);
				forceUpdate();
			}
		};

		chatService.setChatHandler(handleChat);

		return () => {
			chatService.removeChatHandler();
		};
	}, [chatService, chats]);

	const toggleInput = (type) => {
		if (type === 'chat') {
			setShowInputChat(!showInputChat);
		}
		else {
			setShowInputPrivate(!showInputPrivate);
		}
	};

	const cancelClick = (type) => {
		if (type === 'chat') {
			if (showInputChat) {
				setShowInputChat(false);
			}
		}
		else {
			if (showInputPrivate) {
				setShowInputPrivate(false);
			}
		}
	};

	return (
		<div className={classes.container}>
			<ul className={classes.chatList}>
				{chats.map((item) => (
					<div className={classes.itemContainer} key={item.id}>
						<li onClick={() => props.changeChat(item.id)} key={item.id}>
							<p>{item.text}</p>
						</li>
						<MaterialButton style={{ padding: '0 10px' }} onClick={() => openFloatChat(item.id)}><Icon path={mdiOpenInNew} size={1} /></MaterialButton>
					</div>
				))}
			</ul>
			{showInputChat ? (
				<div>
					<MaterialInput
						style={{ bottom: '30px', height: '40px' }}
						type='text'
						placeholder='Название чата'
						value={newChatName}
						onChange={event => setNewChatName(event.target.value)}
					/>
					<div style={{display: 'flex', flexDirection: 'column'}}>
						<MaterialButton
							onClick={addChat}
							style={{ height: "40px", width: '100%', marginTop: '10px' }}
						>
							<p style={{ fontWeight: "bold" }}>Применить</p>
							<Icon style={{ marginLeft: "4px", marginBottom: "4px" }} path={mdiPlusThick} size={1} />
						</MaterialButton>
						<MaterialButton
							onClick={() => cancelClick('chat')}
							style={{ height: "40px", width: '100%', marginTop: '10px' }}
						>
							<p style={{ fontWeight: "bold" }}>Отменить</p>
							<Icon style={{ marginLeft: "4px", marginBottom: "4px" }} path={mdiCloseThick} size={1} />
						</MaterialButton>
					</div>
				</div>
				) : (
				<MaterialButton onClick={() => toggleInput('chat')} style={{ height: "40px", width: '100%' }}>
					<p style={{ fontWeight: "bold" }}>Новый чат</p>
					<Icon style={{ marginLeft: "4px", marginBottom: "4px" }} path={mdiPlusThick} size={1} />
				</MaterialButton>
			)}
			{showInputPrivate ? (
				<div>
					<MaterialInput
						style={{ bottom: '30px', height: '40px' }}
						type='text'
						placeholder='Имя Пользователя'
						value={newPrivateName}
						onChange={event => setNewPrivateName(event.target.value)}
					/>
					<div style={{display: 'flex', flexDirection: 'column'}}>
						<MaterialButton
							onClick={addPrivate}
							style={{ height: "40px", width: '100%', marginTop: '10px' }}
						>
							<p style={{ fontWeight: "bold" }}>Применить</p>
							<Icon style={{ marginLeft: "4px", marginBottom: "4px" }} path={mdiPlusThick} size={1} />
						</MaterialButton>
						<MaterialButton
							onClick={() => cancelClick('private')}
							style={{ height: "40px", width: '100%', marginTop: '10px' }}
						>
							<p style={{ fontWeight: "bold" }}>Отменить</p>
							<Icon style={{ marginLeft: "4px", marginBottom: "4px" }} path={mdiCloseThick} size={1} />
						</MaterialButton>
					</div>
				</div>
				) : (
				<MaterialButton onClick={() => toggleInput('private')} style={{ height: "40px", width: '100%' }}>
					<p style={{ fontWeight: "bold" }}>Личное Сообщение</p>
					<Icon style={{ marginLeft: "4px", marginBottom: "4px" }} path={mdiPlusThick} size={1} />
				</MaterialButton>
			)}
		</div>
	);
};

export default ChatList;