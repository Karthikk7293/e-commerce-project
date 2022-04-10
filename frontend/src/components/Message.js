import React from 'react';
import {Alert } from 'react-bootstrap'

const Message = ({variant,children}) => {
  return (
        <Alert className='w-100 text-danger h5' style={{maxWidth:"100"}}  variant={variant}>

            {children}

        </Alert>
  )
};

Message.defaultProps={variant:'info',}

export default Message;
