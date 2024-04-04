import PropTypes from "prop-types";
import { useState } from 'react';
import {Button, Form, FormControl, FormGroup} from "react-bootstrap";

const AddComment = ({ onSubmit, editData }) => {

    const [data, setData] = useState({
        id: editData?.id,
        body: editData?.body || ''
    });

    const handleChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(data);
    }

    return (
      <div className='my-3'>
        <Form onSubmit={handleSubmit}>
          <FormGroup className='mb-3'>
            <FormControl
              placeholder='Comment ...'
              as='textarea'
              name='body'
              value={data.body}
              onChange={handleChange}
              required
            ></FormControl>
          </FormGroup>
          <div className='text-end'>
            <Button variant={"success"} className='btn-sm px-4' type='submit'>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    );
}

AddComment.propTypes = {
  editData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
}

export default AddComment;
