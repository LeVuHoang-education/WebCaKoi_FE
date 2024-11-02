import Layout from '../pages/layoutUser/Layout.jsx';
import PropTypes from "prop-types";

const UserRoute = ({ element }) => {
    return (
        <Layout>
            {element}
        </Layout>
    );
}
export default UserRoute;
UserRoute.propTypes = {
    element: PropTypes.node,
}