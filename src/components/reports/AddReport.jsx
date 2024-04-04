import PropTypes from "prop-types"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReport } from '../../features/reportSlice';
import {Button, Form, FormControl, FormGroup} from "react-bootstrap";

const AddReport = ({ quote, user, setState, reportUser }) => {

    const [formData, setFormData] = useState({
        description: ''
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReport = { ...formData };
        newReport.quoteId = quote?.id || null;
        newReport.userId = user.id;
        newReport.authorId = quote?.userId || reportUser.id;
        newReport.username = user.username;
        newReport.authorName = quote?.author;
        dispatch(addReport(newReport));
        setState(false);
    }

    return (
        <div className='my-3'>
            <Form onSubmit={handleSubmit}>
                <FormGroup className='mb-3'>
                    <FormControl
                        as='textarea'
                        placeholder='Report description ...'
                        name='description'
                        value={formData.description}
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

AddReport.propTypes = {
  quote: PropTypes.shape({
    id: PropTypes.any,
    userId: PropTypes.any,
    author: PropTypes.any,
  }),
  user: PropTypes.shape({
    id: PropTypes.any,
    username: PropTypes.any
  }).isRequired,
  setState: PropTypes.func.isRequired,
  reportUser: PropTypes.object,
}

export default AddReport;
