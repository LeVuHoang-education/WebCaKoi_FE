import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faComments, faCaretUp, faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import './Blog_detail.css';
import blogContent from "./Blog_data.jsx";
import {useState, useEffect } from "react";


export default function Blog_detail() {
    const { blogName } = useParams();

    const blog = blogContent.find(b => b.name.toLowerCase().replace(/ /g, '-') === blogName);

    if (!blog) {
        return <h2>Blog không tồn tại</h2>;
    }

    const [isExpanded, setIsExpanded] = useState(true);

    const toggleContent = () => {
        setIsExpanded(!isExpanded);
    };

    const sortedBlogs = blogContent
        .filter(b => b.name.toLowerCase().replace(/ /g, '-') !== blogName)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [blogName]);

    const categories = [...new Set(blogContent.map(blog => blog.category))];
    const currentIndex = blogContent.findIndex(b => b.name.toLowerCase().replace(/ /g, '-') === blogName);
    const previousBlog = blogContent[currentIndex - 1];
    const nextBlog = blogContent[currentIndex + 1];
    const headings = blog.content.filter(section => section.heading);

    const scrollToHeading = (index) => {
        const element = document.getElementById(`heading-${index}`);
        if (element) {
            const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        }
    };

    return (
        <div>
            <div className="hero" style={{
                background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(${blog.image})`,
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
                            <li><Link to ={`/category/${blog.category.toLowerCase().replace(/ /g, '-')}`}>
                                {blog.category}</Link></li>
                            <li>&raquo;</li>
                            <li>{blog.title}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="blog-detail-container">
                <div className="blog-main-content">
                    {/* Blog Meta */}
                    <div className="blog-header">
                        <div className="blog-meta-item">
                            <FontAwesomeIcon icon={faCalendarAlt} className="icon"/>
                            <span>{blog.date}</span>
                        </div>
                        <div className="blog-meta-item">
                            <FontAwesomeIcon icon={faClock} className="icon"/>
                            <span>{blog.time}</span>
                        </div>
                        <div className="blog-meta-item">
                            <FontAwesomeIcon icon={faComments} className="icon"/>
                            <span>No Comments</span>
                        </div>
                    </div>

                    {/* Blog Content */}
                    {blog.content.map((section, index) => (
                        <div key={index}>
                            {section.heading && <h1 id={`heading-${index-1}`}>{section.heading}</h1>}
                            {section.subheading && <h2>{section.subheading}</h2>}
                            <div>{section.text}</div>
                        </div>
                    ))}

                    {/* Previous and Next Navigation */}
                    <div className="navigation-links">
                        {previousBlog && (
                            <Link to={`/blog/${previousBlog.name.toLowerCase().replace(/ /g, '-')}`}
                                  className="previous-link">
                                <span>BÀI TRƯỚC</span>
                                <p>{previousBlog.title}</p>
                            </Link>
                        )}
                        {nextBlog && (
                            <Link to={`/blog/${nextBlog.name.toLowerCase().replace(/ /g, '-')}`} className="next-link">
                                <span>BÀI TIẾP</span>
                                <p>{nextBlog.title}</p>
                            </Link>
                        )}
                    </div>
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
                                {headings.map((section, index) => (
                                    <li key={index}>
                                        <button onClick={() => scrollToHeading(index)} className="link-button">
                                            {section.heading}
                                        </button>
                                    </li>
                                ))}
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
                                    <Link to={`/category/${category.toLowerCase().replace(/ /g, '-')}`}>
                                        <FontAwesomeIcon icon={faCaretRight} className={"icon"}/>
                                        {category}
                                    </Link>
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
                                    <Link to={`/blog/${blog.name.toLowerCase().replace(/ /g, '-')}`}
                                          className="blog-item">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="blog-thumbnail"
                                        />
                                        {blog.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
