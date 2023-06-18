import React from 'react'
import classes from './MessageItem.module.css'

const MessageItem = ({ currentUser, author, text, date }) => {
	const isAuthor = author === currentUser

	const messageContainerClasses = isAuthor
		? `${classes.messageContainer} ${classes.textRightAlign}`
		: `${classes.messageContainer} ${classes.textLeftAlign}`

	const messageInfoClasses = isAuthor
		? `${classes.messageInfo} ${classes.infoRightAlign}`
		: `${classes.messageInfo} ${classes.infoLeftAlign}`

	return (
		<div className={messageContainerClasses}>
			<div className={classes.messageText}>
				<p>{text}</p>
			</div>
			<div className={messageInfoClasses}>
				<span>{author}</span>
				<span>{date}</span>
			</div>
		</div>
	)
}

export default MessageItem
