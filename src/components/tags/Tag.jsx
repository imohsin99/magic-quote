import {useDispatch, useSelector} from "react-redux";
import capitalize from "../../utils/capitalize.js";
import {deleteTag, follow} from "../../features/tagsSlice.js";
import {followTag, removeTags} from '../../features/usersSlice.js';
import {Button, Card, CardBody, CardTitle, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {removeTag} from "../../features/quoteSlice.js";

const Tag = () => {

    const currentUser = useSelector((state) => state.users.currentUser);
    const tags = useSelector((state) => state.tags.tags);
    const dispatch = useDispatch();

    const handleFollowClick = (tag) => {
        dispatch(follow({
            id: tag.id,
            followerId: currentUser.id
        }));
        dispatch(followTag({
            id: currentUser.id,
            tagName: tag.name
        }));
    };

    const handleDeleteClick = (tag) => {
        dispatch(deleteTag(tag.id));
        dispatch(removeTag(tag.name));
        dispatch(removeTags(tag.name));
    }

    return (
        <div className='my-4'>
            <h3 className='text-center mb-4'>Tags</h3>
            <Row>
                {tags &&
                    tags.map((tag) => (
                        <div key={tag.id} className='col-sm-6 mb-4'>
                            <Card>
                                <CardBody>
                                    <CardTitle>
                                        {capitalize(tag.name)}
                                    </CardTitle>
                                    { currentUser.role !== 'admin' && (
                                        tag.followers.includes(currentUser.id) ? (
                                            <Button variant={"primary"} className='btn-sm px-3'
                                                    onClick={() => handleFollowClick(tag)}>
                                                Unfollow
                                            </Button>
                                        ) : (
                                            <Button variant={"primary"} className='btn-sm px-3'
                                                    onClick={() => handleFollowClick(tag)}>
                                                Follow
                                            </Button>
                                        )
                                    )}
                                    { currentUser.role === 'admin' && (
                                        <Button variant={"danger"} onClick={() => handleDeleteClick(tag)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    )}
                                </CardBody>
                            </Card>
                        </div>
                    ))}
            </Row>
        </div>
    )
}

export default Tag;
