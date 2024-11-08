import React from 'react';
import AdminLayout from '../../pages/admin/AdminLayout.jsx';
import PropTypes from "prop-types";

const AdminRoute = ({ element }) => {
    return (
        <AdminLayout>
            {element}
        </AdminLayout>
    );
};

AdminRoute.propTypes = {
    element: PropTypes.node,
}
export default AdminRoute;