import Layout from '../pages/layoutUser/Layout.jsx';
import PropTypes from "prop-types";

const UserRoute = ({ element: Component }) => {
    return (
        <Layout>
            <Component />
        </Layout>
    );
}
export default UserRoute;
UserRoute.propTypes = {
    element: PropTypes.node,
}