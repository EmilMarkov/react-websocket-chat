import React from 'react'
import classes from './MessageList.module.css'
import MessageItem from '../MessageItem/MessageItem'

const MessageList = ({ ...props }) => {
	return (
		<div className={classes.messageListContainer}>
			<div className={classes.messageList}>
				{props.messages.map(message => 
					<MessageItem key={message.id} currentUser={props.currentUser} text={message.text} author={message.author} date={message.date} />	
				)}
			</div>
		</div>
	)
}

export default MessageList
