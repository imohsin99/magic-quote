import PropTypes from "prop-types"
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {

    const currentUser = useSelector((state) => state.users.currentUser);

    if (!currentUser) {
        return <Navigate to='/auth' replace ></Navigate>
    }

    return children;
}

ProtectedRoutes.propTypes = {
  children: PropTypes.any.isRequired
}

export default ProtectedRoutes;
