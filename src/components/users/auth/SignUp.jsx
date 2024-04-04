import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {editProfile, signup} from '../../../features/usersSlice';
import {useNavigate} from "react-router-dom";
import {Alert, Button, Form, FormControl, FormGroup, FormSelect} from "react-bootstrap";

const SignUp = () => {

    const dispatch = useDispatch();
    const signupError = useSelector((state) => state.users.signupError);
    const currentUser = useSelector((state) => state.users.currentUser);
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
      id: currentUser?.id || '',
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      username: currentUser?.username || '',
      gender: currentUser?.gender || '',
      email: currentUser?.email || '',
      password: currentUser?.password || '',
    });

    const genders = ['Male', 'Female', 'Others'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {...credentials};
        if (currentUser) {
            dispatch(editProfile(newUser));
        } else {
            dispatch(signup(newUser));
            !signupError && navigate('/home');
        }
    }

    return (
      <>
        <h2 className='text-center my-3 form-label'>{currentUser ? 'Profile' : 'Create Account'}</h2>
        {signupError && <Alert variant={"danger"}>{signupError}</Alert>}
        <Form onSubmit={handleSubmit}>
          <FormGroup className='mb-3'>
            <FormControl
              type='text'
              name='firstName'
              placeholder='First name'
              value={credentials.firstName}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup className='mb-3'>
            <FormControl
              type='text'
              name='lastName'
              placeholder='Last name'
              value={credentials.lastName}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup className='mb-3'>
            <FormControl
              type='text'
              name='username'
              placeholder='Username'
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup className='mb-3'>
            <FormSelect
              name='gender'
              className='w-25 bg-success text-light'
              value={credentials.gender}
              onChange={handleChange}
            >
              {genders.map((gender, key) => (
                <option key={key} value={gender}>
                  {gender}
                </option>
              ))}
            </FormSelect>
          </FormGroup>
          <FormGroup className='mb-3'>
            <FormControl
              type='email'
              name='email'
              placeholder='Email Address'
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup className='mb-3'>
            <FormControl
              type='password'
              name='password'
              placeholder='Password'
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <div className='text-center'>
            <Button variant={"outline-danger"}
              type='submit'
              className='btn-sm px-4 mb-3'
            >
              {currentUser ? 'Save' : 'SignUp'}
            </Button>
          </div>
        </Form>
      </>
    );
}

export default SignUp;
