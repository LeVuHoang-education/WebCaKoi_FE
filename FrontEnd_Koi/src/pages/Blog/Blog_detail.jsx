import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faComments, faCaretUp, faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import './Blog_detail.css';
import blogContent from "./Blog_data.jsx";
import {useState} from "react";


export default function Blog_detail() {
    const { blogName } = useParams(); // Lấy tên blog từ URL

    // Tìm bài viết tương ứng với tên trong URL
    const blog = blogContent.find(b => b.name.toLowerCase().replace(/ /g, '-') === blogName);

    if (!blog) {
        return <h2>Blog không tồn tại</h2>; // Nếu không tìm thấy blog
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isExpanded, setIsExpanded] = useState(true);

    // Toggle function to expand/collapse content
    const toggleContent = () => {
        setIsExpanded(!isExpanded);
    };

    const sortedBlogs = blogContent
        .filter(b => b.name.toLowerCase().replace(/ /g, '-') !== blogName)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const categories = [...new Set(blogContent.map(blog => blog.category))];

    return (
        <div>
            <div className="hero" style={{
                backgroundImage: `url(${blog.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: "16rem 0",
            }}>
                <div className="content-banner">
                    <h1 className="title" style={{paddingRight: "3rem"}}>{blog.title}</h1>
                    <div className="breadcrumbs">
                        <ul>
                            <li><a href="/Home"> Trang chủ</a></li>
                            <li>&raquo;</li>
                            <li><a href={`/category/${blog.category.toLowerCase().replace(/ /g, '-')}`}>
                                {blog.category}</a></li>
                            <li>&raquo;</li>
                            <li>{blog.title}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="blog-detail-container">
                <div className="blog-main-content">
                    <div className="blog-header">
                        <div className="blog-meta-item">
                            <FontAwesomeIcon icon={faCalendarAlt} className="icon"/>
                            <span>19/10/2024</span>
                        </div>
                        <div className="blog-meta-item">
                            <FontAwesomeIcon icon={faClock} className="icon"/>
                            <span>9:40 Sáng</span>
                        </div>
                        <div className="blog-meta-item">
                            <FontAwesomeIcon icon={faComments} className="icon"/>
                            <span>No Comments</span>
                        </div>
                    </div>
                    <h1>Ngành thiết kế nội thất là gì?</h1>
                    <p>
                        Ngành thiết kế nội thất là một ngành nghề tiềm năng trong tương lai, được rất nhiều người trẻ
                        lựa chọn theo học...
                    </p>
                </div>

                {/*side bar*/}
                <div className="blog-sidebar">
                    <div className="sidebar-section noi-dung">
                        <div className="section-header" onClick={toggleContent}>
                            <h3>NỘI DUNG CHÍNH</h3>
                            <button className="toggle-btn">
                                {isExpanded ? (
                                    <FontAwesomeIcon icon={faCaretUp}/>
                                ) : (
                                    <FontAwesomeIcon icon={faCaretDown}/>
                                )}
                            </button>
                        </div>

                        {/* Collapsible content */}
                        <div className={`section-content-animation ${isExpanded ? 'expanded' : ''}`}>
                            <ul className="section-content">
                                <li><a href="#">Ngành thiết kế nội thất là gì?</a></li>
                                <li><a href="#">Ngành thiết kế nội thất sẽ học những gì?</a></li>
                                <li><a href="#">Học ngành thiết kế nội thất cần có những gì?</a></li>
                                <li><a href="#">Nên học ngành thiết kế nội thất ở đâu?</a></li>
                                <li><a href="#">Ngành thiết kế nội thất lương bao nhiêu?</a></li>
                                <li><a href="#">Học thiết kế nội thất ra trường làm công việc gì?</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="sidebar-section">
                        <div className={"section-header"}>
                            <h3>CHUYÊN MỤC</h3>
                        </div>
                        <ul className={"section-content"}>
                            {categories.map((category, index) => (
                                <li key={index}>
                                    <a href={`/category/${category.toLowerCase().replace(/ /g, '-')}`}>
                                        <FontAwesomeIcon icon={faCaretRight} className={"icon"}/>
                                        {category}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="sidebar-section">
                        <div className={"section-header"}>
                            <h3>BÀI VIẾT MỚI</h3>
                        </div>
                        <ul className="section-content">
                            {sortedBlogs.map((blog, index) => (
                                <li key={index}>
                                    <a href={`/blog/${blog.name.toLowerCase().replace(/ /g, '-')}`}
                                       className="blog-item">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="blog-thumbnail"
                                        />
                                        {blog.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="sidebar-section">
                        <div className={"section-header"}>
                        <h3>DỊCH VỤ</h3>
                        </div>
                        <div className={"section-content-service"}>
                            <ul>
                                <a href="#">
                                    <li>Thiết kế kiến trúc</li>
                                </a>
                                <a href="#">
                                    <li>Thiết kế nhà vườn</li>
                                </a>
                                <a href="#">
                                    <li>Thiết kế & thi công cảnh quan</li>
                                </a>
                                <a href="#">
                                    <li>Thiết kế & thi công sân vườn</li>
                                </a>
                                <a href="#">
                                    <li>Thiết kế & thi công hồ cá Koi</li>
                                </a>
                                <a href="#">
                                    <li>Thiết kế & thi công tường cây</li>
                                </a>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}