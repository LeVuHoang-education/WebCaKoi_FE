import React from "react";
import { useParams } from "react-router-dom";
import blogContent from "./Blog_data.jsx";
import './Blog_category.css';

export default function Blog_category() {
    const { categoryName } = useParams(); // Lấy tên category từ URL

    // Lọc các bài viết theo category
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
                            <a href={`/blog/${blog.name.toLowerCase().replace(/ /g, '-')}`}>
                            <div className="blog-image-container">
                                <img src={blog.image} alt={blog.title} className="blog-image-category"/>
                                <div className="blog-tag">{blog.category}</div>
                            </div>
                            </a>
                            <div className="blog-content-category">
                                <a href={`/blog/${blog.name.toLowerCase().replace(/ /g, '-')}`}>
                                    <p className="blog-date-category">{blog.date}</p>
                                </a>
                                <a href={`/blog/${blog.name.toLowerCase().replace(/ /g, '-')}`}>
                                    <h2 className="blog-title-category">{blog.title}</h2>
                                </a>
                                <p className="blog-snippet-category">{blog.description}</p>
                                <a href={`/blog/${blog.name.toLowerCase().replace(/ /g, '-')}`}
                                   className="blog-read-more-category">Xem thêm</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
