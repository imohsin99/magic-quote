import {useEffect, useState} from 'react';
import './Auth.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../features/usersSlice';
import { useNavigate } from 'react-router-dom';
import {Button, Form, FormGroup} from "react-bootstrap";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({
        email: credentials.email,
        password: credentials.password
    }));
    setCredentials({
        email: '',
        password: ''
    });
  }

    useEffect(() => {
        if (currentUser && currentUser.role === 'admin') {
            navigate('/admin');
        } else if (currentUser) {
            navigate('/home');
        } else {
            navigate('/auth');
        }
    }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  }

  return (
    <>
        {currentUser && <span>Already logged In</span>}
        <h2 className='text-center mb-3 form-label'>Login</h2>
        <Form onSubmit={handleSubmit}>
            <FormGroup className='mb-3'>
                <Form.Control
                    autoComplete='email'
                    type='email'
                    name='email'
                    placeholder='Email Address'
                    value={credentials.email}
                    onChange={handleChange}
                    required
                />
            </FormGroup>
            <FormGroup className='mb-3'>
                <Form.Control
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
            </FormGroup>
            <Button variant={"success"}
                className='btn-sm mb-3 px-4'
                disabled={currentUser}
                type='submit'
                >
                Login
            </Button>
        </Form>
    </>
  );
};

export default Login;
