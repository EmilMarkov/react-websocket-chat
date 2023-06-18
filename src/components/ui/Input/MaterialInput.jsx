import React from 'react'
import classes from './MaterialInput.module.css'

const MaterialInput = ({ ...props }) => {
	return <input className={classes.materialInput} {...props} />
}

export default MaterialInput
