import Header from '../header/Header';
import {Container} from "react-bootstrap";
import {Outlet} from "react-router-dom";

const AdminLayout = () => {
    return (
        <div>
            <Header />
            <Container>
                <Outlet />
            </Container>
        </div>
    )
}

export default AdminLayout;
