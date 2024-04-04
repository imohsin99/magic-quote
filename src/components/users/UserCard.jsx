// components/UserCard.js
import PropTypes from "prop-types"
import React from 'react';
import { Card, CardBody, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import AddReport from '../reports/AddReport';
import capitalize from '../../utils/capitalize';
import ProfileImg from "../../assets/img.png";

const UserCard = ({ user, currentUser, handleFollowClick, addReportToggle, showAddReport }) => {
    return (
        <div className='col-sm-6 my-3'>
            <Card>
                <CardBody className='p-4'>
                    <div className='d-flex text-black'>
                        <div className='flex-shrink-0'>
                            <img
                                src={ProfileImg}
                                alt='profile'
                                className='img-fluid profile-img'
                            />
                        </div>
                        <div className='flex-grow-1 ms-3'>
                            <h5 className='mb-1 text-capitalize'>{user.firstName + ' ' + user.lastName}</h5>
                            <p className='mb-2 pb-1 username-text'>{capitalize(user.username)}</p>
                            <div className='tags d-flex justify-content-start rounded-3 p-2 mb-2'>
                                <div className='mx-4'>
                                    <p className='small text-muted mb-1'>Tags</p>
                                    <p className='mb-0'>{user.tags ? user.tags.length : '0'}</p>
                                </div>
                                <div className='mx-4'>
                                    <p className='small text-muted mb-1'>Followers</p>
                                    <p className='mb-0'>{user.followers ? user.followers.length : '0'}</p>
                                </div>
                                <div className='mx-4'>
                                    <p className='small text-muted mb-1'>Following</p>
                                    <p className='mb-0'>{user.followings ? user.followings.length : '0'}</p>
                                </div>
                            </div>
                            <div className='d-flex pt-1'>
                                {currentUser.role !== 'admin' && (user.followers.includes(currentUser.id) ? (
                                    <Button variant={"dark"}
                                            className='btn-sm px-3'
                                            onClick={() => handleFollowClick(user.id)}
                                    >
                                        Unfollow
                                    </Button>
                                ) : (
                                    <Button variant={"dark"}
                                            className='btn-sm px-4'
                                            onClick={() => handleFollowClick(user.id)}
                                    >
                                        Follow
                                    </Button>
                                ))}
                                {(showAddReport !== user.id && currentUser.role !== 'admin') && (
                                    <Button variant={"outline-dark"}
                                            className='btn-sm ms-3 px-3'
                                            onClick={() => addReportToggle(user.id)}
                                    >
                                        Report <FontAwesomeIcon icon={faTriangleExclamation}/>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        {showAddReport === user.id && (
                            <AddReport
                                key={user.id}
                                user={currentUser}
                                setState={addReportToggle}
                                reportUser={user}
                            />
                        )}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

UserCard.propTypes = {
  addReportToggle: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.any,
    role: PropTypes.string
  }).isRequired,
  handleFollowClick: PropTypes.func.isRequired,
  showAddReport: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    followers: PropTypes.shape({
      includes: PropTypes.func,
      length: PropTypes.any
    }),
    followings: PropTypes.shape({
      length: PropTypes.any
    }),
    id: PropTypes.any,
    lastName: PropTypes.any,
    tags: PropTypes.shape({
      length: PropTypes.any
    }),
    username: PropTypes.any
  }).isRequired
}

export default UserCard;
