import React from "react";
import {Link, useParams} from "react-router-dom";
import blogContent from "./Blog_data.jsx";
import './Blog_category.css';

export default function Blog_category() {
    const { categoryName } = useParams();

    const filteredBlogs = blogContent.filter(blog =>
        blog.category.toLowerCase().replace(/ /g, '-') === categoryName
    );

    if (filteredBlogs.length === 0) {
        return <h2>Không có bài viết nào trong chuyên mục này</h2>;
    }

    return (
        <div>
            <div className="category-container">
                <div className="blog-grid">
                    {filteredBlogs.map((blog, index) => (
                        <div key={index} className="blog-card-category">
                            <Link to={`/blog/${blog.name.toLowerCase().replace(/ /g, '-')}`}>
                            <div className="blog-image-container">
                                <img src={blog.image} alt={blog.title} className="blog-image-category"/>
                                <div className="blog-tag">{blog.category}</div>
                            </div>
                            </Link>
                            <div className="blog-content-category">
                                <Link to={`/blog/${blog.name.toLowerCase().replace(/ /g, '-')}`}>
                                    <p className="blog-date-category">{blog.date}</p>
                                </Link>
                                <Link to={`/blog/${blog.name.toLowerCase().replace(/ /g, '-')}`}>
                                    <h2 className="blog-title-category">{blog.title}</h2>
                                </Link>
                                <p className="blog-snippet-category">{blog.description}</p>
                                <Link to={`/blog/${blog.name.toLowerCase().replace(/ /g, '-')}`}
                                   className="blog-read-more-category">Xem thêm</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
