import {useEffect, useState,useRef} from "react";
import {getAllProjects,deleteProject} from "../../service/ProjectApi.jsx";
import ModalProjectDetail from "../../components/admin/ModalProjectDetail.jsx";
import ModalUpdateProject from "../../components/admin/ModalEditProject.jsx";
import {AddProjectModal} from "../../components/admin/ModalAddProject.jsx";

const ProjectManagePages = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const toggleMenu = (orderId) => {
        setActiveMenu(activeMenu === orderId ? null : orderId);
    }
    const closeAllMenu = () => {
        setActiveMenu(null);
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModal, setIsEditModal] = useState(false);
    const [isAddModal, setIsAddModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const OpenModal = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    }
    const OpenEditModal = (project) => {
        setSelectedProject(project);
        setIsEditModal(true);
    }
    const CloseEditModal = () => {
        setSelectedProject(null);
        setIsEditModal(false);
    }
    const OpenAddModal = (project) => {
        setSelectedProject(project);
        setIsAddModal(true);
    }
    const CloseAddModal = () => {
        setSelectedProject(null);
        setIsAddModal(false);
    }
    const menuRef = useRef(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const projectPerPages=8;
    useEffect(() => {
        const getProjects = async () => {
            try {
                const OrderList = await getAllProjects();
                setProjects(OrderList);
            }catch (error) {
                setError(error.message);
            }finally {
                setLoading(false);
            }
        };
        getProjects();
    },[])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    if(loading) return (
        <div>Loading...</div>
    );

    if(error) return (
        <div>Error: {error.message}</div>
    );

    const totalPages = Math.ceil(projects.length/projectPerPages);
    const indexOfLastPages = currentPage * projectPerPages;
    const indexOfFirstPages = indexOfLastPages - projectPerPages;
    const currentProject = projects.slice(indexOfFirstPages, indexOfLastPages);

    const handdleChangePages = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    const handleDelete = async (projectId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this project?");
        if (confirmDelete) {
            try {
                await deleteProject(projectId); // Call the delete API
                setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId)); // Update state
            } catch (error) {
                setError(error.message);
            }
        }
    };
    return (
        <div className={`flex flex-col`}>
            <div className={`w-[80%] h-auto py-4 mx-auto flex justify-between items-center`}>
                <div>
                    <input type="text" className={`p-2 rounded-full mx-2 focus:outline-none`} placeholder="Search..." />
                    <button className={`p-2 rounded-full bg-cyan-300 transition duration-[1s] hover:bg-orange-300 hover:text-white   `}>Search</button>
                </div>
                <img onClick={()=>
                    {
                        closeAllMenu();
                        OpenAddModal();
                    }
                } className={`w-12 h-auto hover:cursor-pointer`} src="/img/icons8-add-100.png" alt=""/>
            </div>
            <div className={`grid grid-cols-4 gap-5`}>
                {currentProject.map(data => (
                    <div
                        className="relative max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4 hover:cursor-pointer"
                        key={data.id}>
                        <img className="w-full h-56 object-cover object-center " onClick={() => OpenModal(data)}
                             src={`${data.image_path}`}
                             alt="Project image"/>
                        {activeMenu === data.id && (
                            <ul ref={menuRef} className="absolute right-5 top-7 z-10 mt-2 w-48 p-5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <li>
                                    <button
                                        className="block flex items-center px-4 py-2 h-full w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-500"
                                        onClick={() => {
                                            toggleMenu(data.id);
                                            OpenEditModal(data)}
                                        }>Edit
                                    </button>

                                </li>
                                <li>
                                    <button
                                        className="block flex items-center px-4 py-2 h-full w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-500"
                                        onClick={() => {
                                            toggleMenu(data.id);
                                            handleDelete(data.id)}
                                        }>Delete</button>
                                </li>
                            </ul>
                        )}
                        <img onClick={() => toggleMenu(data.id)} src="/img/icons8-menu-vertical-100.png" alt=""
                             className={`absolute top-2 right-2 w-6 h-6 hover:bg-white hover:opacity-80 bg-gray-200 opacity-50 rounded-full p-1 `}/>
                        <div onClick={() => OpenModal(data)} className="flex items-center px-6 py-3 bg-gray-900">
                            <img src="/img/icons8-house-100.png" className={`h-6 w-6 text-white fill-current`} alt=""/>
                            <h1 className="mx-3 text-white font-semibold text-lg">{data.category}</h1>
                        </div>
                        <div className="py-4 px-6" onClick={() => OpenModal(data)}>
                            <h1 className="text-2xl font-semibold text-gray-800"></h1>
                            <p className="py-2 text-lg text-gray-700 line-clamp-2">{data.description}</p>
                            <div className="flex items-center mt-4 text-gray-700">
                                <img src="/img/icons8-villa-100.png" className={`h-6 w-6 fill-current`} alt="housename"/>
                                <h1 className="px-2 text-sm">{data.name}</h1>
                            </div>
                            <div className="flex items-center mt-4 text-gray-700">
                                <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                                    <path
                                        d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z"/>
                                </svg>
                                <h1 className="px-2 text-sm">{data.location}</h1>
                            </div>
                            <div className="flex items-center mt-4 text-gray-700">
                                <img src="/img/icons8-ohio-100.png" className={`h-6 w-6 fill-current`} alt="Area"/>
                                <h1 className="px-2 text-sm">{data.area}</h1>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ModalProjectDetail isOpen={isModalOpen}
                                onRequestClose={closeModal}
                                project={selectedProject}/>
            <ModalUpdateProject isOpen={isEditModal}
                                onRequestClose={CloseEditModal}
                                project={selectedProject}/>/
            <AddProjectModal isOpen={isAddModal}
                             onRequestClose={CloseAddModal}/>
    <div className={"flex justify-center mt-4"}>
        <button disabled={currentPage === 1}
                onClick={() => handdleChangePages(currentPage - 1)}
                className={"px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"}
        >
            &lt;
        </button>

        {[...Array(totalPages)].map((_, index) => (
            <button
                key={index}
                onClick={() => handdleChangePages(index + 1)}
                className={`px-4 py-2 mx-1 rounded-full ${currentPage === index + 1 ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
                {index + 1}
            </button>
        ))}

        <button disabled={currentPage === totalPages}
                onClick={() => handdleChangePages(currentPage + 1)}
                className={"px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"}
        >
            &gt;
        </button>
    </div>
        </div>


    );
}

export default ProjectManagePages;
