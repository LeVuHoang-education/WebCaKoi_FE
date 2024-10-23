import PropTypes from "prop-types";
import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";

const Layout = ({ children }) => {
    return (
        <div className={`flex min-h-screen w-screen flex-col`}>
            <Header/>
                {children}
            <Footer/>
        </div>
    );
}
export default Layout;

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}