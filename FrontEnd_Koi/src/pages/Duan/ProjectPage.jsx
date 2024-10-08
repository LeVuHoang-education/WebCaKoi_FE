import Header from '../../components/header';
import Footer from '../../components/footer';
import ProjectList from "./ProjectList.jsx";
import Banner from "./banner";
const ProjectPage = () => {
    return (
        <div>

            <Header/>
            <Banner/>
            <ProjectList/>

            <Footer/>
        </div>
    );
};

export default ProjectPage;