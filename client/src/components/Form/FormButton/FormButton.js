import { Button } from '@material-ui/core'
import React from 'react'
import clsx from 'clsx';

import useStyles from './styles'

const FormButton = ({ children, className, ...rest }) => {
    const classes = useStyles()
    return (
        <Button
            className={clsx(classes.submit, className)}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            {...rest}
        >
            {children}
        </Button>


    )
}

export default FormButton
