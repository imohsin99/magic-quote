import {useDispatch, useSelector} from 'react-redux';
import {follow} from '../../features/usersSlice';
import {useState} from 'react';
import './User.css';
import {Container, Row} from "react-bootstrap";
import UserCard from "./UserCard.jsx";

const Users = () => {

    const [showAddReport, setShowAddReport] = useState(null);

    const currentUser = useSelector((state) => state.users.currentUser);
    const usersList = useSelector((state) => state.users.users);
    const users = usersList.filter(user => user.id !== currentUser.id && user.role !== 'admin');
    const dispatch = useDispatch();

    const handleFollowClick = (userId) => {
        dispatch(follow({
            id: userId,
            followerId: currentUser.id
        }))
    };

    const addReportToggle = (id) => {
        setShowAddReport(id);
    };

    return (
        <div className='my-4'>
            <h3 className='text-center mb-4'>Users</h3>
            <section className='mt-5'>
                <Container className='h-100'>
                    <Row className='h-100'>
                        {users && users.map((user) => (
                            <UserCard
                                key={user.id}
                                user={user}
                                currentUser={currentUser}
                                handleFollowClick={handleFollowClick}
                                addReportToggle={addReportToggle}
                                showAddReport={showAddReport}
                            />
                        ))}
                    </Row>
                </Container>
            </section>
        </div>
    );
}

export default Users;
