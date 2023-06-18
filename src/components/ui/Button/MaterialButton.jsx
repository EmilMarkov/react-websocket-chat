import React from 'react'
import classes from './MaterialButton.module.css'

const MaterialButton = ({ children, ...props }) => {
	return (
		<button {...props} className={classes.materialBtn}>
			{children}
		</button>
	)
}

export default MaterialButton
