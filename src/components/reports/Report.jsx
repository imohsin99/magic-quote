import {useSelector} from 'react-redux';
import capitalize from '../../utils/capitalize';
import {Card, CardBody, CardHeader, CardText, Row} from "react-bootstrap";

const Report = () => {

    const quotes = useSelector((state) => state.quotes.quotes);
    const currentUser = useSelector(state => state.users.currentUser);
    const reportsList = useSelector(state => state.reports.reports);
    let reports = [];
    if (currentUser.role === 'admin') {
        reports = [...reportsList];
    } else {
        reports = reportsList.filter((report) => report.authorId === currentUser.id);
    }

    const getQuote = (id) => {
        return quotes.find(quote => quote.id === id);
    }

    return (
        <div className='my-4'>
            <h3 className='text-center mb-4'>Reports</h3>
            <Row>
                {reports &&
                    reports.map((report) =>
                        (
                            <div key={report.id} className='col-sm-6 mb-4'>
                                <Card>
                                    <CardHeader className='small fw-bold'>
                                        <span className='fw-light'>Reported By:</span>
                                        {'  '} {capitalize(report.username)}
                                    </CardHeader>
                                    <CardBody>
                                        <p className='small'>
                                            <span className='fw-bold'>Description:</span>
                                            {'  '} {capitalize(report.description)}
                                        </p>
                                        {report.quoteId && (
                                            <CardText className='small'>
                                                <span className='fw-bold'>Quote:</span>
                                                {'  '}{capitalize(getQuote(report?.quoteId).body)}
                                            </CardText>
                                        )}
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    )
                }
            </Row>
        </div>
    );
}

export default Report;
