import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useSelector} from 'react-redux';
import {faQuoteLeft, faQuoteRight} from '@fortawesome/free-solid-svg-icons';
import capitalize from '../../utils/capitalize';
import {Card, CardBody, Col, Container, Row} from "react-bootstrap";

const MagicQuote = () => {

    const currentUser = useSelector((state) => state.users.currentUser);
    const quotes = useSelector((state) => state.quotes.quotes);

    const userQuotes = quotes.filter((quote) => currentUser.followings.includes(quote.userId) || quote.userId === currentUser.id || quote.tags.some((tag) =>
        currentUser.tags.some((uTag) => uTag === tag)
    ));

    const randomIndex = Math.floor(Math.random() * (userQuotes.length - 1));
    let quote = null;
    if (userQuotes.length) {
        quote = userQuotes.length && userQuotes[randomIndex];
    }

    return (
        <div>
            {quote && (
                <section className='mt-5'>
                    <Container className='py-5 h-100'>
                        <Row className='d-flex justify-content-center align-items-center h-100'>
                            <Col className='col-lg-9 col-xl-7'>
                                <Card>
                                    <CardBody className='py-5'>
                                        <div className='text-center mb-4 pb-2'>
                                            <img
                                                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-quotes/bulb.webp'
                                                alt='bulb'
                                                width={100}
                                            />
                                        </div>
                                        <figure className='text-center mb-0'>
                                            <blockquote className='blockquote'>
                                                <p className='pb-3'>
                                                    <FontAwesomeIcon icon={faQuoteLeft} className='text-primary'/>
                                                    <span className='lead fst-italic mx-3'>
                                                        {quote && capitalize(quote.body)}
                                                    </span>
                                                    <FontAwesomeIcon icon={faQuoteRight} className='text-primary'/>
                                                </p>
                                            </blockquote>
                                            <figcaption className='blockquote-footer mb-0'>
                                                {quote && capitalize(quote.author)}
                                            </figcaption>
                                        </figure>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>
            )}
        </div>
    );
}

export default MagicQuote;
