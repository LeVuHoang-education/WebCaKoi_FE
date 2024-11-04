import React from "react";
import "../../assets/css/gioithieu.css";
import cakoi2 from "../../assets/image/ca-koi-2.jpg";
import trantrieuvy from "../../assets/image/tran-trieu-vy-avatar (1).png";
import phonhcanh from "../../assets/image/phong cảnh.jpg";
import { size } from "@cloudinary/url-gen/qualifiers/textFit";
import { Link } from "react-router-dom";

const GioiThieu = () => {
  return (
    <div>
      {/* phần đầu tiên */}
      <div className="gioithieu_dau">
        {/* <img src="./img/ca-koi-1.jpg" alt="cá koi" /> */}
        <div className="noidung">
          <h1>Giới Thiệu</h1>
          <div className="test">
            <a>
              <Link to={"/Home"}>Trang chủ</Link>
            </a>
            <span>&gt;&gt;</span>
            <a>
              {" "}
              <Link to={"/Gioithieu"}>Giới Thiệu</Link>
            </a>
          </div>
        </div>
      </div>

      <div className="wapper">
        {/* phần thứ 2 */}
        <div className="gioithieu_us">
          <div className="mota">
            <img src={cakoi2} alt="cá koi" />
          </div>
          <div className="chitiet">
            <div className="title">
              <h1>About Us</h1>
            </div>

            <p>
              Được thành lập từ năm 2013 với tên gọi ban đầu là CÔNG TY TNHH TƯ
              VẤN THIẾT KẾ VÀ CẢNH QUAN SGL. Đến năm 2019, sau khi trải qua quá
              trình tích luỹ kinh nghiệm và phát triển, chúng tôi đổi tên thành
              CÔNG TY TNHH KIẾN TRÚC – CẢNH QUAN SGL để phản ánh rõ hơn về
              chuyên môn hoạt động của mình.
            </p>
            <p>
              Trải qua các giai đoạn phát triển, năm 2021, chúng tôi đã tiến
              hành tái cơ cấu bộ máy điều hành và vận hành, tăng cường năng lực
              quản lý để đáp ứng mạnh mẽ với sự phức tạp ngày càng tăng của thị
              trường kiến trúc và cảnh quan.
            </p>
            <p>
              Năm 2022, chúng tôi đã mở rộng và xác định lại các mảng dịch vụ
              khách hàng, tập trung vào việc mang đến giải pháp sáng tạo và chất
              lượng cho các dự án kiến trúc và cảnh quan.
            </p>
            <p>
              Năm 2023, chúng tôi kết hợp với các đối tác uy tín và thành lập
              SGL Vietnam, nhằm tạo ra sự đa dạng và phong phú trong quy trình
              sáng tạo và triển khai dự án.
            </p>
            <p>
              Chúng tôi tự hào tích lũy được nhiều kinh nghiệm quý báu thông qua
              việc thực hiện nhiều dự án lớn trên khắp cả nước, từ biệt thự, nhà
              phố, resort, khu du lịch, khu công nghiệp cho đến quán cafe và khu
              dân cư. Sứ mệnh của chúng tôi là “Thổi hồn vào các công trình kiến
              trúc & cảnh quan để biến chúng trở thành tác phẩm nghệ thuật.” Mỗi
              công trình của chúng tôi được thực hiện với sự chỉn chu đến từng
              chi tiết nhỏ nhất, để mỗi đá, mỗi cây cỏ đều mang theo một câu
              chuyện và truyền tải một thông điệp triết lý.
            </p>
            <p>
              Được thành lập từ năm 2013 với tên gọi ban đầu là CÔNG TY TNHH TƯ
              VẤN THIẾT KẾ VÀ CẢNH QUAN SGL. Đến năm 2019, sau khi trải qua quá
              trình tích luỹ kinh nghiệm và phát triển, chúng tôi đổi tên thành
              CÔNG TY TNHH KIẾN TRÚC – CẢNH QUAN SGL để phản ánh rõ hơn về
              chuyên môn hoạt động của mình.
            </p>

            <a href="#">Xem Profile</a>
          </div>
        </div>

        {/* phần OUR TEAM */}
        <div className="phan2">
          <div className="test">
            <h1 style={{ textAlign: "center", marginTop: "210px" }}>
              OUR TEAM
            </h1>
            <div className="outteam">
              {/* card tv */}
              <div className="card">
                <div className="card__img">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmxQzMbQgn77w4SNtzmLqS1_Dm-R1UzUmGqA&s"
                    alt="gái xinh"
                  />
                </div>
                <h2 className="name"> Thành Vinh</h2>
                <p className="major">Fullstack Developer</p>
                <div className="social">
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-tiktok"></i>
                  </a>
                </div>
                <button>Contact me</button>
              </div>
              {/* card tv */}
              <div className="card">
                <div className="card__img">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmxQzMbQgn77w4SNtzmLqS1_Dm-R1UzUmGqA&s"
                    alt="gái xinh"
                  />
                </div>
                <h2 className="name">Đức Thịnh</h2>
                <p className="major">Fullstack Developer</p>
                <div className="social">
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-tiktok"></i>
                  </a>
                </div>
                <button>Contact me</button>
              </div>
              {/* card tv */}
              <div className="card">
                <div className="card__img">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmxQzMbQgn77w4SNtzmLqS1_Dm-R1UzUmGqA&s"
                    alt="gái xinh"
                  />
                </div>
                <h2 className="name">Tiến dũng</h2>
                <p className="major">Fullstack Developer</p>
                <div className="social">
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-tiktok"></i>
                  </a>
                </div>
                <button>Contact me</button>
              </div>
              {/* card tv */}
              <div className="card">
                <div className="card__img">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmxQzMbQgn77w4SNtzmLqS1_Dm-R1UzUmGqA&s"
                    alt="gái xinh"
                  />
                </div>
                <h2 className="name">Hữu Đại</h2>
                <p className="major">Fullstack Developer</p>
                <div className="social">
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-tiktok"></i>
                  </a>
                </div>
                <button>Contact me</button>
              </div>
              {/* card tv */}
              <div className="card">
                <div className="card__img">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmxQzMbQgn77w4SNtzmLqS1_Dm-R1UzUmGqA&s"
                    alt="gái xinh"
                  />
                </div>
                <h2 className="name">Minh Phúc</h2>
                <p className="major">Fullstack Developer</p>
                <div className="social">
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-tiktok"></i>
                  </a>
                </div>
                <button>Contact me</button>
              </div>
              {/* card tv */}
              <div className="card">
                <div className="card__img">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmxQzMbQgn77w4SNtzmLqS1_Dm-R1UzUmGqA&s"
                    alt="gái xinh"
                  />
                </div>
                <h2 className="name">Nguyễn Quí</h2>
                <p className="major">Fullstack Developer</p>
                <div className="social">
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-tiktok"></i>
                  </a>
                </div>
                <button>Contact me</button>
              </div>
              {/* card tv */}
              <div className="card">
                <div className="card__img">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmxQzMbQgn77w4SNtzmLqS1_Dm-R1UzUmGqA&s"
                    alt="gái xinh"
                  />
                </div>
                <h2 className="name">Vũ hoàng</h2>
                <p className="major">Fullstack Developer</p>
                <div className="social">
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-tiktok"></i>
                  </a>
                </div>
                <button>Contact me</button>
              </div>
            </div>
          </div>
        </div>

        {/* phần thứ 3 */}
        <div className="phan3">
          <div className="container">
            <div className="phan3__1">
              <div className="phan3__logo">
                <div className="phan3__logo--icon">
                  <i className="fa-solid fa-otter"></i>
                </div>
                <div className="phan3__logo--noidung">
                  <strong>
                    Bạn cho tôi không gian, tôi tặng bạn cảm xúc!!!
                  </strong>
                </div>
              </div>
              <div className="phan3__loikhuyen">
                <div className="phan3__loikhuyen--1">
                  <p>
                    Tôi tin rằng không gian cảnh quan không chỉ là nơi, nó là
                    cách bạn trải nghiệm cuộc sống. Sứ mệnh của tôi là mang đến
                    cho khách hàng những không gian sống nên thơ, yên bình và
                    thanh lịch, qua phong cách thiết kế tinh tế và đầy triết lý
                    Nhật.
                  </p>
                </div>
                <div className="phan3__loikhuyen--2">
                  <p>
                    Mỗi công trình cảnh quan của tôi là một tác phẩm độc đáo,
                    phản ánh sự thành công và phong cách sống của khách hàng.
                  </p>
                  <div className="phan3__loikhuyen--ceo">
                    <img
                      className="phan3__loikhuyen--hinh"
                      src={trantrieuvy}
                      alt="ceo"
                    />
                    <p className="phan3__loikhuyen--ten">
                      <strong>CEO TRẦN TRIỆU VỸ</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="phan3__phongcanh hinh">
              <img src={phonhcanh} alt="phong cảnh" />
            </div>
          </div>
        </div>

        {/* phần Báo chí & truyền thông */}
        <div className="baochi">
          <div className="container">
            <h2 className="baochi__tieude title">Báo chí & truyền thông</h2>
            <p>Nói về chúng tôi</p>
            <div className="baochi__nhanhang">
              {[...Array(5)].map((_, i) => (
                <div className={`imgs img${i + 1}`} key={i}></div>
              ))}
            </div>
            <ul className="bapchi__dieukhoang">
              <span className="danhsachtext">Điều khoản sử dụng</span>|
              <span className="danhsachtext">
                <Link to={"/csbm"}>Chính sách bảo mật</Link>
              </span>
              |
              <span className="danhsachtext">Chính sách và quy định chung</span>
            </ul>
          </div>
        </div>

        {/* phần Đánh giá (sao) */}
        <div className="danhgia">
          {[...Array(5)].map((_, i) => (
            <div className="sao" key={i}>
              <i className="fa-regular fa-star"></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GioiThieu;
