import '../../assets/css/banner.css';

export default function Banner() {
    return (
        <div className="hero">
            <div className="overlay"></div>
            <div className="content">
                <h1 className="title">Dự Án</h1>
                <div className="breadcrumbs">
                    <ul>
                        <li><a href="/">Trang chủ</a></li>
                        <li>&raquo;</li>
                        <li>Dự Án</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}