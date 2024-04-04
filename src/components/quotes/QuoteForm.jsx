import { nanoid } from '@reduxjs/toolkit';
import PropTypes from "prop-types"
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {Button, Form, FormControl, FormGroup} from "react-bootstrap";
const QuoteForm = ({ onSubmit, initialData }) => {

    const currentUser = useSelector((state) => state.users.currentUser);

    const [formData, setFormData] = useState({
        body: initialData?.body || '',
        tags: initialData?.tags || []
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const quote = { ...formData };
        quote.id = nanoid();
        quote.author = currentUser.username;
        quote.tags = formData.tags.split(',').map((tag) => tag.trim()).filter(item => item);
        quote.tags = [...new Set(quote.tags)];
        quote.userId = currentUser.id;
        quote.createdAt = `${currentDate.toLocaleString()}`
        onSubmit(quote);
    }

    return (
      <div>
        <div>
          <Form onSubmit={handleSubmit}>
            <FormGroup className='mb-3'>
              <FormControl
                  as='textarea'
                name='body'
                placeholder='Quote'
                value={formData.body}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup className='mb-3'>
              <FormControl onChange={handleChange} type='text' name='tags' value={formData.tags} placeholder='tags' className='w-75'>
              </FormControl>
            </FormGroup>
            <Button variant={"primary"} type='submit'>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
}

QuoteForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
}

export default QuoteForm;
