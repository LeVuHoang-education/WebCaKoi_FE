import PropTypes from "prop-types";
import AdminSidebar from "../../components/admin/AdminSidebar.jsx";
import AdminNavbar from "../../components/admin/AdminNavbar.jsx";

const AdminLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen w-screen">
            <div className="w-1/5 bg-indigo-400 p-0 m-0">
                <AdminSidebar />
            </div>
            <div className="w-4/5  flex-1 flex-col">
                <div className="bg-white shadow-md w-[78vw]">
                    <AdminNavbar />
                </div>
                <div className="flex-1 bg-gray-100 p-6 w-[78vw]">
                    {children}
                </div>
            </div>
        </div>
    );
};

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminLayout;