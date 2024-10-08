import { useState } from 'react';
import './ProjectList.css';

const projects = [
    { id: 1, name: "VIEN LE JARDIN", category: "Design", image: "https://sgl.com.vn/wp-content/uploads/2024/03/vien-le-jardin-720x720.jpg" },
    { id: 2, name: "ONSEN GÒ VẤP", category: "Design", image: "https://sgl.com.vn/wp-content/uploads/2024/02/onsen-go-vap-720x720.jpg" },
    { id: 3, name: "DAKNONG FARMSTAY", category: "Design", image: "https://sgl.com.vn/wp-content/uploads/2024/01/farmstay-daknong-720x720.jpg" },
    { id: 4, name: "NHÀ MẪU LÀNG THONG DONG", category: "Design & Build", image: "https://sgl.com.vn/wp-content/uploads/2024/01/nha-mau-khu-10-lang-thong-dong-720x720.jpg" },
    { id: 5, name: "PENTHOUSE OPAL TOWER", category: "Design", image: "https://sgl.com.vn/wp-content/uploads/2024/01/penthouse-opal-tower-feature-img.jpg" },
    { id: 6, name: "Vườn Tự Tại", category: "Architecture", image: "https://sgl.com.vn/wp-content/uploads/2019/11/para-720x720.jpg" },
];

export default function ProjectList() {
    const [filter, setFilter] = useState('All');

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(project => project.category === filter);

    return (
        <div className="container">
            <div className="filters">
                <button onClick={() => setFilter('All')} className={`filter-button ${filter === 'All' ? 'active' : ''}`}>
                    All
                </button>
                <button onClick={() => setFilter('Architecture')} className={`filter-button ${filter === 'Architecture' ? 'active' : ''}`}>
                    Architecture
                </button>
                <button onClick={() => setFilter('Design')} className={`filter-button ${filter === 'Design' ? 'active' : ''}`}>
                    Design
                </button>
                <button onClick={() => setFilter('Design & Build')} className={`filter-button ${filter === 'Design & Build' ? 'active' : ''}`}>
                    Design & Build
                </button>
            </div>
            <div className="project-grid">
                {filteredProjects.map(project => (
                    <div key={project.id} className="project-card">
                        <div className="image-container">
                            <img src={project.image} alt={project.name} className="project-image" />
                            <div className="overlay">
                                <h3 className="project-title">{project.name}</h3>
                            </div>
                        </div>
                        <div className="project-info">
                            <h3 className="project-name">{project.name}</h3>
                            <p className="project-category">{project.category}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}