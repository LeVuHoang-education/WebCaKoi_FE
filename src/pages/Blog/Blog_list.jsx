import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/banner.css';
import './Blog_list.css';
import blogData from './Blog_data.jsx';


export default function Blog_list() {
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 6;

    // Logic để hiển thị các thẻ hiện tại
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;

    //để cắt dữ liệu
    const currentCards = blogData.slice(indexOfFirstCard, indexOfLastCard);

    // Tạo các số trang cho pagination
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(blogData.length / cardsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className="hero"
                 style={{backgroundImage: "url('https://sgl.com.vn/wp-content/uploads/2023/10/banner-chung-chinh-1920-700-e1697443857714.png')",
                     padding: "16rem 0"}}>
                <div className="content-banner">
                    <h1 className="title">Blog</h1>
                    <div className="breadcrumbs">
                        <ul>
                            <li><a href="/Home">Trang chủ</a></li>
                            <li>&raquo;</li>
                            <li>Blog</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="blog-container">
                {currentCards.map((blog) => (
                    <div key={blog.id} className="blog-card">
                        <Link to={`/blog/${blog.name.toLowerCase().replace(/ /g, '-')}`}>
                        <img src={blog.image} alt={blog.title}/>
                        <div className="blog-post_text">
                            <h2 className="blog-post_title">{blog.title}</h2>
                            <div className="blog-post_description">
                                <p>{blog.description}</p>
                            </div>
                        </div>
                        <div className="blog-post_meta">
                            <span className="blog-post-date">{blog.date}</span>
                        </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination Page */}
            <div className="pagination">
                {pageNumbers.map((number) => (
                    <span
                        key={number}
                        onClick={() => paginate(number)}
                        className={number === currentPage ? "active" : ""}
                    >
                        {number}
                    </span>
                ))}
            </div>
        </div>
    );
}
