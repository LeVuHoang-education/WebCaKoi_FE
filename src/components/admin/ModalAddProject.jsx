import {useFormik} from "formik";
import Modal from "react-modal";
import PropTypes from "prop-types";
import {addProject, getAllProjects} from "../../service/ProjectApi.jsx";
import {useEffect, useRef, useState} from "react";
import {UpLoadImage} from "../../service/UploadImage.jsx";

Modal.setAppElement('#root');

export const AddProjectModal = ({isOpen, onRequestClose}) => {
    const [nextID, setNextID] = useState(1);
    const modalRef = useRef(null);

    useEffect(()=>{
        const handleClickOutside = (event) => {
            if(modalRef.current && !modalRef.current.contains(event.target)) {
                onRequestClose();
            }
        };
        if(isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[isOpen,onRequestClose]);
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projects = await getAllProjects();
                if (projects.length > 0) {
                    const lastId = Math.max(...projects.map(project => project.id));
                    setNextID(lastId + 1);
                } else {
                    setNextID(1);
                }
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            }
        };
    },[]);

    const formik = useFormik({
        initialValues: {
            id: nextID,
            name: '',
            category: '',
            location: '',
            area: '',
            image_path: '',
            album: [],
            price: '',
            description: '',
        },
        onSubmit: async (values) => {
            console.log('Submitting project with values:', values);
            try {
                const imageUrl = await UpLoadImage(values.image_path);
                const albumUrls = await Promise.all(Array.from(values.album).map(file => UpLoadImage(file)));
                await addProject({
                    ...values,
                    image_path: imageUrl,
                    album: albumUrls,
                });
                onRequestClose();
                setNextID(prevId => prevId + 1);
            } catch (error) {
                console.error('Error adding project:', error);
            }
        },
    });
    return(
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}
               shouldCloseOnOverlayClick={true}
               className={`w-full h-full flex flex-col items-center justify-center`}
               overlayClassName={`fixed inset-0 bg-black bg-opacity-50`}>
            <div ref={modalRef} className={`bg-gradient-to-r from-cyan-500 to-violet-500 relative w-2/3 h-auto rounded-lg p-6 shadow-2xl text-white opacity-1`}>
                <button
                    className="absolute top-4 right-4 text-white focus:outline-none"
                    onClick={onRequestClose}
                >
                    &#x2715;
                </button>
                <h2 className={`w-full h-auto text-2xl text-center mb-4`}>Add new project</h2>
                <h3 className={`w-full h-auto text-xl text-center mb-4`}>Fill all information</h3>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className={`flex items-center mb-4 flex-col`}>
                        <div className={`flex mb-4 w-full text-white justify-evenly text-left`}>
                            <div className={`flex items-center w-1/2 mb-4`}>
                                <label htmlFor="name" className={`mb-1 w-1/6`}>Project name: </label>
                                <input
                                    id="name"
                                    type="text"
                                    {...formik.getFieldProps('name')}
                                    className={`border p-2 w-1/2 text-black rounded-full focus:outline-none ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''}`}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="text-red-500">{formik.errors.name}</div>
                                ) : null}
                            </div>

                            <div className={`flex items-center w-1/2 mb-4`}    >
                                <label htmlFor="category" className={`mb-1 w-1/6`}>Category: </label>
                                <input
                                    id="category"
                                    type="text"
                                    {...formik.getFieldProps('category')}
                                    className={`border p-2 w-1/2 text-black rounded-full focus:outline-none ${formik.touched.category && formik.errors.category ? 'border-red-500' : ''}`}
                                />
                                {formik.touched.category && formik.errors.category ? (
                                    <div className="text-red-500">{formik.errors.category}</div>
                                ) : null}
                            </div>
                        </div>


                        <div className={`flex mb-4 w-full text-white justify-evenly text-left`}>
                            <div className={`flex items-center w-1/2 mb-4`}>
                                <label htmlFor="location" className={`mb-1 w-1/6`}>Location: </label>
                                <input
                                    id="location"
                                    type="text"
                                    {...formik.getFieldProps('location')}
                                    className={`border p-2 w-1/2 text-black rounded-full focus:outline-none ${formik.touched.location && formik.errors.location ? 'border-red-500' : ''}`}
                                />
                                {formik.touched.location && formik.errors.location ? (
                                    <div className="text-red-500">{formik.errors.location}</div>
                                ) : null}
                            </div>

                            <div className={`flex items-center w-1/2 mb-4`}>
                                <label htmlFor="area" className={`mb-1 w-1/6`}>Area:</label>
                                <input
                                    id="area"
                                    type="text"
                                    {...formik.getFieldProps('area')}
                                    className={`border p-2 w-1/2 text-black rounded-full focus:outline-none ${formik.touched.area && formik.errors.area ? 'border-red-500' : ''}`}
                                />
                                {formik.touched.area && formik.errors.area ? (
                                    <div className="text-red-500">{formik.errors.area}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className={`flex w-full items-start mb-4`}>
                            <div className={`w-1/2 pr-4`}>
                                <div className={`flex flex-col w-full`}>
                                    <label htmlFor="image_path" className={`mb-1`}>Image</label>
                                    <input
                                        id="image_path"
                                        type="file"
                                        onChange={(event) => {
                                            formik.setFieldValue("image_path", event.currentTarget.files[0]);
                                        }}
                                        className={`border p-2 w-full rounded-full focus:outline-none ${formik.touched.image_path && formik.errors.image_path ? 'border-red-500' : ''}`}
                                    />
                                    {formik.touched.image_path && formik.errors.image_path ? (
                                        <div className="text-red-500">{formik.errors.image_path}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div className={`w-1/2 pl-4`}>
                                <div className={`flex flex-col w-auto`}>
                                    <label htmlFor="album" className={`mb-1`}>Album (one or many)</label>
                                    <input
                                        id="album"
                                        type="file"
                                        accept="image/*"
                                        multiple={true}
                                        onChange={(event) => {
                                            formik.setFieldValue("album", event.currentTarget.files);
                                        }}
                                        className={`border p-2 w-full rounded-full focus:outline-none ${formik.touched.album && formik.errors.album ? 'border-red-500' : ''}`}
                                    />
                                    {formik.touched.album && formik.errors.album ? (
                                        <div className="text-red-500">{formik.errors.album}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        <div className={`w-full h-auto flex-col flex`}>
                            <div className={`flex flex-col mb-4 w-1/4`}>
                                <label htmlFor="price" className={`mb-1`}>Giá</label>
                                <input
                                    id="price"
                                    type="number"
                                    {...formik.getFieldProps('price')}
                                    className={`border p-2 w-ful text-black rounded-full focus:outline-none ${formik.touched.price && formik.errors.price ? 'border-red-500' : ''}`}
                                />
                                {formik.touched.price && formik.errors.price ? (
                                    <div className="text-red-500">{formik.errors.price}</div>
                                ) : null}
                            </div>

                            <div className={`flex flex-col mb-4 w-full`}>
                                <label htmlFor="description" className={`mb-1`}>Mô tả</label>
                                <textarea
                                    id="description"
                                    {...formik.getFieldProps('description')}
                                    className={`border p-4 w-full text-black rounded-full focus:outline-none ${formik.touched.description && formik.errors.description ? 'border-red-500' : ''}`}
                                />
                                {formik.touched.description && formik.errors.description ? (
                                    <div className="text-red-500">{formik.errors.description}</div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className={`flex items-center justify-evenly mb-4`}>
                        <button
                            className={`bg-gray-500 text-white rounded px-4 py-2 transform duration-500 hover:bg-white hover:text-black`}
                            type="submit">Add
                        </button>
                        <button
                            className={`bg-gray-500 text-white rounded px-4 py-2 transform duration-500 hover:bg-white hover:text-black`}
                            type="button" onClick={onRequestClose}>Cancel
                        </button>
                    </div>
                </form>

            </div>
        </Modal>
    );

}

AddProjectModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    project: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        area: PropTypes.number.isRequired,
        location: PropTypes.string.isRequired,
        image_path: PropTypes.string.isRequired,
        album: PropTypes.arrayOf(PropTypes.string),
        price: PropTypes.number.isRequired,
        description: PropTypes.string,
    }),
}