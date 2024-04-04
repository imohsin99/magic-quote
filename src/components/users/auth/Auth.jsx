import { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import {Badge, Container} from "react-bootstrap";

const Auth = () => {

    const [loginFormState, setLoginFormState] = useState(true);

    const toggleAuthType = () => {
        setLoginFormState(!loginFormState);
    }

    return (
        <div className='main-sec'>
            <Container className='d-flex justify-content-center'>
                <div className='auth-card'>
                    {loginFormState ? <Login /> : <SignUp />}
                    <div>
                        {loginFormState ? (
                            <span>Dont have an account? </span>
                        ) : (
                            <span>Already have an account?</span>
                        )}
                        <Badge bg={"primary"} onClick={toggleAuthType} className='ms-2 auth-toggle-link'>
                            {loginFormState ? 'Sign Up' : 'Log In'}
                        </Badge>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Auth;
