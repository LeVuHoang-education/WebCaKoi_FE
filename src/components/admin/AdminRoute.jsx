import React from 'react';
import AdminLayout from '../../pages/admin/AdminLayout.jsx';
import PropTypes from "prop-types";

const AdminRoute = ({ element: Component }) => {
    return (
        <AdminLayout>
            <Component />
        </AdminLayout>
    );
};

AdminRoute.propTypes = {
    element: PropTypes.node,
}
export default AdminRoute;