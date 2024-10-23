import  {useEffect, useState, useRef} from 'react';
import Modal from "react-modal";
import PropTypes from "prop-types";
import * as Proptypes from "prop-types";
import {getProjectById} from "../../service/ProjectApi.jsx";
import ProjectGallery from "./SlideShowProject.jsx";

Modal.setAppElement('#root');

const ModalProjectDetail = ({isOpen, onRequestClose, project}) => {
    const [dataProject, setDataProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const modalRef = useRef(null);

    useEffect(() => {
        if (project && isOpen) {
            const getOrder = async () => {
                try {
                    const data = await getProjectById(project.id);
                    setDataProject(data);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };
            getOrder();
        }
    }, [project, isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {

            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onRequestClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onRequestClose]);
    if (loading) return (
        <div>Loading....</div>
    )
    if (error) return (
        <div>Error: {error.message}</div>
    )
    if (!project || !dataProject) return null;

    return (
        <Modal isOpen={isOpen}
               onRequestClose={onRequestClose}
               className={`w-full h-full flex flex-col items-center justify-center`}
               overlayClassName={`fixed inset-0 bg-black bg-opacity-50`}
               shouldCloseOnOverlayClick={true}>
            <div
                ref={modalRef}
                className={`relative w-1/2 max-w-screen-md bg-white rounded-lg p-6 bg-[url('/img/25097.jpg')] bg-cover bg-center`}>
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={onRequestClose}
                >
                    &#x2715;
                </button>
                <div className={`grid grid-cols-3 overflow-auto gap-5`}>
                    <div className={`row-span-5 col-span-2`}>
                        <h2 className="text-lg font-semibold mx-5">{dataProject.name}</h2>
                        <ProjectGallery images={dataProject.album}/>
                    </div>
                    <div className={`w-full h-auto p- text-center text-2xl font-semibold row-span-2`}>
                        <span>
                            Information
                        </span>
                    </div>
                    <div className={`flex-1 flex-col mx-auto`}>
                        <p className={`p-2`}>Location: {dataProject.location}</p>
                        <p className={`p-2`}>Area: {dataProject.area} m²</p>
                        <p className={`p-2`}>Price: ${dataProject.price}</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

ModalProjectDetail.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    project:
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            location: Proptypes.string.isRequired,
            area: Proptypes.number.isRequired,
            image_path: PropTypes.string.isRequired,
            album: Proptypes.arrayOf(Proptypes.string).isRequired,
            price: Proptypes.number.isRequired,
        })
}
export default ModalProjectDetail;