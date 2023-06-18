import React, { useReducer, useState } from 'react'
import ChatList from '../ui/ChatList/ChatList'
import MessageList from '../MessageList/MessageList'
import MaterialInput from '../ui/Input/MaterialInput'
import MaterialButton from '../ui/Button/MaterialButton'
import classes from './MaterialSidebar.module.css'
import { Link } from 'react-router-dom'
import FloatingChat from '../FloatingChat/FloatingChat'
import { mdiSend } from '@mdi/js'
import Icon from '@mdi/react'

const MaterialSidebar = ({ ...props }) => {
	const [inputValue, setInputValue] = useState('')
	const [floatInputValue, setFloatInputValue] = useState('')
	const [floatChat, setFloatChat] = useState(0)
	const [currentUser, setCurrentUser] = useState(props.username)
	const forceUpdate = useReducer(() => ({}), {})[1];
	const [isContainerOpen, setContainerOpen] = useState(false);

	const changeChat = (chatId) => {
		props.setCurrentChat(chatId)
	}

	const logout = () => {
		props.chatService.close();
	}

	const sendBtnClick = () => {
		if (!inputValue) {
			return;
		}
		forceUpdate()
		props.sendMessage(props.currentChat, inputValue, currentUser)
		setInputValue('')
	}

	const floatSendBtnClick = () => {
		if (!floatInputValue) {
			return;
		}
		forceUpdate()
		props.sendMessage(floatChat, floatInputValue, currentUser)
		setFloatInputValue('')
	}

	const openFloatChat = (chatId) => {
		setContainerOpen(true)
		setFloatChat(chatId)
	};

	const closeFloatChat = () => {
		setContainerOpen(false)
	};

	return (
		<div className={classes.container}>
			<FloatingChat closeFloatChat={closeFloatChat} isContainerOpen={isContainerOpen}>
				<div style={{height: 'calc(100% - 50px)'}} className={classes.content}>
					<MessageList currentUser={currentUser} messages={props.items[floatChat] ? props.items[floatChat].messages : []}/>
					<div className={classes.inputs}>
						<MaterialInput
							type='text'
							placeholder='Сообщение'
							value={floatInputValue}
							onChange={event => setFloatInputValue(event.target.value)}
						/>
						<MaterialButton onClick={floatSendBtnClick}>
							<Icon path={mdiSend} size={1} />
						</MaterialButton>
					</div>
				</div>
			</FloatingChat>
			<div className={classes.logout}>
				<h1>{currentUser}</h1>
				<Link to='/auth'>
					<MaterialButton onClick={logout}>Отключиться</MaterialButton>
				</Link>
			</div>
			<div className={classes.sidebar}>
				<ChatList currentChat={props.currentChat} setCurrentChat={props.setCurrentChat} chatService={props.chatService} openFloatChat={openFloatChat} addChat={props.addChat} changeChat={changeChat} items={props.items} />
				<div className={classes.content}>
					<MessageList currentUser={currentUser} messages={props.items[props.currentChat] ? props.items[props.currentChat].messages : []}/>
					<div className={classes.inputs}>
						<MaterialInput
							type='text'
							placeholder='Сообщение'
							value={inputValue}
							onChange={event => setInputValue(event.target.value)}
						/>
						<MaterialButton onClick={sendBtnClick}>Отправить</MaterialButton>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MaterialSidebar
