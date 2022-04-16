import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('')
  
    const submitHandler = (e) => {
      e.preventDefault()
      if (keyword.trim()) {
        navigate(`/search/${keyword}`)
      } else {
        navigate('/')
      }
    }
  
    return (
      <Form className="d-flex border header-searchbox">
        <Form.Control
          type="text"
          name="q"
         className=''
          onChange={((e) => setKeyword(e.target.value))}
          placeholder="Search Shoes and More..."
          height='1rem'
        ></Form.Control>
       
        <Button type="submit" variant="outline-light" onClick={submitHandler} className="px-3 bg-info" style={{height:'2.8rem',paddingTop:'0.5rem'}}>
        <i class="fa-solid fa-magnifying-glass"></i>
        </Button>
        
      </Form>
    )
}

export default SearchBar