import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './ProjectDetail.css';

const projects = [
    {
        id: 1,
        name: "VIEN LE JARDIN",
        category: "Design",
        thumbnail: "https://sgl.com.vn/wp-content/uploads/2024/03/vien-le-jardin-720x720.jpg",
        image: "https://sgl.com.vn/wp-content/uploads/2024/01/farmstay-daknong.jpg",
        customer: "Ms. Minh",
        location: "Đà Lạt",
        area: "700m2",
        yearCompleted: 2023,
        ablum:[
            "https://sgl.com.vn/wp-content/uploads/2024/03/vien-le-jardin-2.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/03/vien-le-jardin-4.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/03/vien-le-jardin-5.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/03/vien-le-jardin-7.jpg",

        ]
    },
    {
        id: 2,
        name: "ONSEN GÒ VẤP",
        category: "Design",
        thumbnail: "https://sgl.com.vn/wp-content/uploads/2024/02/onsen-go-vap-720x720.jpg",
        image:"https://sgl.com.vn/wp-content/uploads/2024/02/onsen-go-vap.jpg",
        customer: "Ms. Hương",
        location: "Gò Vấp",
        area: "80m2",
        yearCompleted: 2023,
        ablum:[
            "https://sgl.com.vn/wp-content/uploads/2024/02/onsen-go-vap-2.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/02/onsen-go-vap-3.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/02/onsen-go-vap-4.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/02/onsen-go-vap-5.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/02/onsen-go-vap-6.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/02/onsen-go-vap-7.jpg",
        ]
    },
    {
        id: 3,
        name: "DAKNONG FARMSTAY",
        category: "Design",
        thumbnail: "https://sgl.com.vn/wp-content/uploads/2024/01/farmstay-daknong-720x720.jpg",
        image:"https://sgl.com.vn/wp-content/uploads/2024/01/farmstay-daknong.jpg",
        customer: "Mr. Tuấn",
        location: "Đắk Nông",
        area: "ha",
        yearCompleted: 2022,
        ablum: ["https://sgl.com.vn/wp-content/uploads/2024/01/farmstay-daknong-7.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/01/farmstay-daknong-2.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/01/farmstay-daknong-3.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/01/farmstay-daknong-4.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/01/farmstay-daknong-5.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/01/farmstay-daknong-6.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/01/farmstay-daknong-8.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/01/farmstay-daknong-9.jpg"]
    },
    {
        id: 4,
        name: "NHÀ MẪU LÀNG THONG DONG",
        category: "Design & Build",
        thumbnail: "https://sgl.com.vn/wp-content/uploads/2024/01/nha-mau-khu-10-lang-thong-dong-720x720.jpg",
        image:"https://sgl.com.vn/wp-content/uploads/2024/01/nha-mau-khu-10-lang-thong-dong.jpg",
        customer: "Cty CP Nhật Nguyên",
        location: "Đà Lạt",
        area: "630 m2",
        yearCompleted: 2023,
        ablum:[
            "https://sgl.com.vn/wp-content/uploads/2024/01/nha-mau-khu-10-lang-thong-dong-2.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/01/nha-mau-khu-10-lang-thong-dong-3.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/01/nha-mau-khu-10-lang-thong-dong-4.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/01/nha-mau-khu-10-lang-thong-dong-5.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/01/nha-mau-khu-10-lang-thong-dong-6.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/01/nha-mau-khu-10-lang-thong-dong-7.jpg",
        ]

    },
    {
        id: 5,
        name: "PENTHOUSE OPAL TOWER",
        category: "Design",
        thumbnail: "https://sgl.com.vn/wp-content/uploads/2024/01/penthouse-opal-tower-feature-img.jpg",
        image: "https://sgl.com.vn/wp-content/uploads/2024/01/du-an-thiet-ke-san-vuon-penthouse-opal-tower-1.jpg",
        customer: "APS Concept",
        location: "Bình Thạnh, TP.HCM",
        area: "310 m2",
        yearCompleted:2023,
        ablum:[
            "https://sgl.com.vn/wp-content/uploads/2024/01/du-an-thiet-ke-san-vuon-penthouse-opal-tower-2.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/01/du-an-thiet-ke-san-vuon-penthouse-opal-tower-3.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/01/du-an-thiet-ke-san-vuon-penthouse-opal-tower-4.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/01/du-an-thiet-ke-san-vuon-penthouse-opal-tower-5.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/01/du-an-thiet-ke-san-vuon-penthouse-opal-tower-6.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/01/du-an-thiet-ke-san-vuon-penthouse-opal-tower-7.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/01/du-an-thiet-ke-san-vuon-penthouse-opal-tower-8.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/01/du-an-thiet-ke-san-vuon-penthouse-opal-tower-9.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/01/du-an-thiet-ke-san-vuon-penthouse-opal-tower-10.jpg",
            "https://sgl.com.vn/wp-content/uploads/2024/01/du-an-thiet-ke-san-vuon-penthouse-opal-tower-11.jpg",

        ]
    },
    {
        id: 6,
        name: "Vườn Tự Tại",
        category: "Architecture",
        thumbnail: "https://sgl.com.vn/wp-content/uploads/2019/11/para-720x720.jpg",
        image: "https://sgl.com.vn/wp-content/uploads/2019/11/para.jpg",
        customer: "Mr. Ngôn",
        location: "Xuyên Mộc, Bà Rịa – Vũng Tàu",
        area: "7.100m2",
        yearCompleted: 2021,
        ablum:[
            "https://sgl.com.vn/wp-content/uploads/2022/04/tu-tai-zen-garden-19.jpg",
            "https://sgl.com.vn/wp-content/uploads/2022/04/tu-tai-zen-garden-18.jpg",
            "https://sgl.com.vn/wp-content/uploads/2022/04/tu-tai-zen-garden-17.jpg",
            "https://sgl.com.vn/wp-content/uploads/2022/04/tu-tai-zen-garden-16.jpg",
            "https://sgl.com.vn/wp-content/uploads/2022/04/tu-tai-zen-garden-40.jpg",
            "https://sgl.com.vn/wp-content/uploads/2022/04/tu-tai-zen-garden-22.jpg",
            "https://sgl.com.vn/wp-content/uploads/2022/04/tu-tai-zen-garden-20.jpg",
            "https://sgl.com.vn/wp-content/uploads/2022/04/tu-tai-zen-garden-21.jpg",
        ],
        Description: ""

    },
];



export default function ProjectDetail() {
    const { projectName } = useParams();
    const project = projects.find(p => p.name.toLowerCase().replace(/ /g, '-') === projectName);

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <div>
            <div className="hero" style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div className="content-banner">
                    <h1 className="title">{project.name}</h1>
                    <div className="breadcrumbs">
                        <ul>
                            <li><a href="/Trangchu"> Trang chủ</a></li>
                            <li>&raquo;</li>
                            <li><a href="/Project">Dự Án</a></li>
                            <li>&raquo;</li>
                            <li>{project.name}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="project-container">
                <div className="project-description">
                    <h2>{project.name}</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam magni, vitae! Alias architecto dolor dolore eos id nam nostrum placeat, reprehenderit sequi similique. Animi asperiores cumque dolores et possimus rerum saepe! Ab architecto corporis cupiditate doloremque error expedita facere in iste itaque iusto laboriosam maxime modi molestias, natus neque nihil nostrum numquam, officiis optio pariatur quae quasi quisquam ratione sunt tempore vel vitae! Aliquid commodi delectus dicta dolorem, ea earum eveniet excepturi incidunt ipsum itaque laborum magni maiores, minus provident quas quisquam quos saepe sit tempore voluptate! Aut deleniti dolores, esse eveniet fugit in laboriosam magnam minima nihil non omnis quas reprehenderit repudiandae soluta tempora tempore ullam voluptatibus. Beatae esse iure labore! Alias aperiam aspernatur assumenda cum dicta, eius eos eveniet, excepturi illum incidunt ipsum itaque nam nobis optio quis repellendus sint tempora unde. Deleniti earum iste nostrum nulla praesentium quas quidem ullam vero. Architecto at commodi consectetur molestias reiciendis vel. Dolorem eaque expedita explicabo maxime modi odit perferendis quasi tempora. Aliquam, animi distinctio ex minima quasi recusandae voluptas? Debitis eaque incidunt ipsam laudantium libero, maiores non odit placeat quaerat, quisquam quo rem repellendus sint tempora totam vero voluptate? Adipisci officia tempore vel voluptatum. Ab eum impedit recusandae ullam voluptas.
                    </p>
                </div>
                <div className="project-details">
                    <h3>CHI TIẾT DỰ ÁN</h3>
                    <ul>
                        <li><strong>Khách hàng:</strong> {project.customer}</li>
                        <li><strong>Địa điểm:</strong> {project.location}</li>
                        <li><strong>Diện tích:</strong> {project.area}</li>
                        <li><strong>Hạng mục:</strong> {project.category}</li>
                        <li><strong>Năm hoàn thành:</strong> {project.yearCompleted}</li>
                    </ul>
                </div>
            </div>
            <div className="gallery-container">
                {project.ablum.map((image, index) => (
                    <div className="gallery-item" key={index}>
                        <img src={image} alt={`Farmstay Image ${index + 1}`}/>
                    </div>
                ))}
            </div>
            <div className="related-projects">
                <h2>Các dự án khác</h2> <br></br>
                <div className="project-grid">
                    {projects.slice(0, 4).map((relatedProject) => (
                        <div className="project-card" key={relatedProject.id}>
                            <a href={`/project/${relatedProject.name.toLowerCase().replace(/ /g, '-')}`}>
                                <div className="image-container">
                                    <img src={relatedProject.thumbnail} alt={relatedProject.name} className="project-image" />
                                    <div className="overlay">
                                        <div className="project-title">{relatedProject.name}</div>
                                    </div>
                                </div>
                                <div className="project-info">
                                    <h3 className="project-name">{relatedProject.name}</h3>
                                    <p className="project-category">{relatedProject.category}</p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}