import React from "react";
import "./reset.css";
import "./csbm.css";
import Header from "../../components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CSBM = () => {
  return (
    <div>
      <Header />
      {/* phần đầu tiền */}
      <div className="gioithieu_dau">
        {/* <img src="./img/ca-koi-1.jpg" alt="cá koi" /> */}
        <div className="noidung">
          <h1>Chính sách bảo mật</h1>
          <div className="test">
            <a href="#">Trang chủ</a>
            <span>&gt;&gt;</span>
            <a>
              <Link to={"/Gioithieu"}>Giới Thiệu</Link>
            </a>
            <span>&gt;&gt;</span>
            <a>
              <Link to={"/csbm"}>Chính sách bảo mật</Link>
            </a>
          </div>
        </div>
      </div>

      {/* wapper */}
      <div className="wapper">
        <div className="csbm">
          <div className="container">
            <p className="csbm__camket">
              <strong>Công ty TNHH Kiến trúc Cảnh quan SGL</strong> cam kết sẽ
              bảo mật những thông tin mang tính riêng tư của khách hàng. Quý
              khách vui lòng đọc bản “<strong>Chính sách bảo mật</strong>” dưới
              đây để hiểu hơn những cam kết mà <strong>SGL</strong> (
              <em>chúng tôi</em>) thực hiện, nhằm tôn trọng và bảo vệ quyền lợi
              của người truy cập.
            </p>
            <h2 className="csbm__tieude1 content">
              <strong>1. Mục đích và phạm vi thu thập thông tin</strong>
            </h2>
            <p>
              Khi bạn truy cập trang web của chúng tôi, chúng tôi sẽ tự động thu
              thập một số thông tin nhất định về thiết bị của bạn, bao gồm thông
              tin về trình duyệt web, địa chỉ IP, múi giờ và một số cookie được
              cài đặt trên thiết bị của bạn. Ngoài ra, khi bạn truy cập, chúng
              tôi sẽ thu thập thông tin về các trang hoặc sản phẩm riêng lẻ mà
              bạn xem, trang web hoặc công cụ tìm kiếm nào đưa bạn đến
              www.sgl.com.vn và thông tin về cách bạn tương tác với các trang
              trên website của chúng tôi. Thông tin được thu thập tự động này
              được gọi là Thông tin thiết bị.
            </p>
            <p>
              Chúng tôi thu thập thông tin thiết bị dựa vào cookies, logfiles,
              web beacons, tags và pixel.
            </p>
            <p>
              Ngoài ra, nếu bạn điền vào một biểu mẫu trên website của chúng
              tôi, ví dụ như biểu mẫu liên hệ, biểu mẫu đăng ký hoặc nhận xét về
              bài đăng trên blog. Chúng tôi có thể lưu trữ thông tin liên quan
              mà bạn đã đồng ý cung cấp cho chúng tôi, ví dụ như địa chỉ email
              và thông tin cá nhân khác theo yêu cầu của biểu mẫu.
            </p>
            <p className="bieumau">
              <em>Họ và tên:</em>
              <br />
              <em>Địa chỉ:</em>
              <br />
              <em>Điện thoại:</em>
              <br />
              <em>Email:</em>
            </p>
            {/* Additional Content Sections - Continue Similarly */}
            <p>
              Ngoài thông tin cá nhân là các thông tin về dịch vụ: Loại dịch vụ
              và yêu cầu tư vấn của khách hàng.
            </p>
            <h2 className="csbm__tieude2 content">
              <strong>2. Phạm vi sử dụng thông tin</strong>
            </h2>
            <p>
              Các thông tin thu thập thông qua website sgl.com.vn sẽ giúp chúng
              tôi:
            </p>
            <p>
              <em>Hỗ trợ khách hàng khi cần tư vấn về dịch vụ và sản phẩm</em>
            </p>
            <p>
              <em>Giải đáp thắc mắc khách hàng</em>
            </p>
            <p>
              <em>Thực hiện các bản khảo sát khách hàng</em>
            </p>
            <p>
              <em>
                Thực hiện các hoạt động quảng bá liên quan đến các sản phẩm và
                dịch vụ của SGL.
              </em>
            </p>
            <p>
              Chúng tôi có thể sử dụng Thông tin cá nhân bạn cung cấp để gửi tin
              tức, chương trình khuyến mãi hoặc quảng cáo và các thông tin khác
              có thể bạn quan tâm. Bạn có thể từ chối nhận bất kỳ hoặc tất cả
              các thông tin liên lạc này từ chúng tôi bằng cách hủy đăng ký theo
              hướng dẫn được cung cấp trong bất kỳ email nào chúng tôi gửi.
            </p>
            <p>
              Thông tin cá nhân thu thập được sẽ chỉ được sử dụng trong nội bộ
              công ty.
            </p>
            <h2 className="csbm__tieude3 content">
              <strong>3. Thời gian lưu trữ thông tin</strong>
            </h2>
            <p>
              Thời gian lưu trữ Cookie khách hàng tối đa là 540 ngày đối với
              hành vi truy cập trang website https://sgl.com.vn. Chúng tôi lưu
              trữ Cookie khách hàng phù hợp với quy định, chính sách bảo mật
              thông tin của Google LLC và chính sách lưu trữ thông tin Cookie
              của Google Analytics.
            </p>
            <p>
              Quý khách hàng có quyền yêu cầu từ chối nhận thông tin chúng tôi
              cung cấp bất cứ lúc nào, hoặc liên hệ với quản trị web
              https://sgl.com.vn để được hỗ trợ.
            </p>
            <h2 className="csbm__tieude4 content">
              <strong>
                4. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân
              </strong>
            </h2>
            <p className="khac">Công ty TNHH Kiến trúc Cảnh quan SGL</p>
            <p className="khac">Mã số thuế: 0316287084</p>
            <p className="khac">
              Studio: 70 Số 33, P. Bình An, Quận 2, Thành phố Hồ Chí Minh
            </p>
            <p className="khac">
              Văn phòng:18-20 Đường 28, Phường An Phú, Quận 2, Hồ Chí Minh
            </p>
            <p className="khac">
              Vườn ươm: Đường Vĩnh Phú 14, Vĩnh Phú, Thuận An, Bình Dương
            </p>
            <p className="khac">Số điện thoại: 0933 606 119</p>
            <p className="khac">Email: info@sgl.com.vn</p>
            <p className="khac">Website: sgl.com.vn</p>
            <h2 className="csbm__tieude5 content">
              <strong>
                5. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ
                liệu cá nhân của mình
              </strong>
            </h2>
            <p>
              Khách hàng có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ
              thông tin cá nhân của mình bằng cách liên hệ với ban quản trị
              website sgl.com.vn thực hiện việc này.
            </p>
            <p>
              Thành viên có quyền chỉnh sửa, xóa nội dung đã bình luận trên
              website sgl.com.vn bất cứ lúc nào.
            </p>
            <p>
              Thành viên có quyền gửi khiếu nại về nội dung bảo mật thông tin đề
              nghị liên hệ Ban quản trị của website sgl.com.vn. Khi tiếp nhận
              những phản hồi này, chúng tôi sẽ xác nhận lại thông tin, trường
              hợp đúng như phản ánh của thành viên tùy theo mức độ, chúng tôi sẽ
              có những biện pháp xử lý kịp thời.
            </p>
            <h2 className="csbm__tieude6 content">
              <strong>
                6. Cơ chế tiếp nhận và giải quyết khiếu nại của người tiêu dùng
              </strong>
            </h2>
            <p>
              Mọi tranh chấp phát sinh giữa SGL và khách hàng sẽ được giải quyết
              trên cơ sở thương lượng. Trường hợp không đạt được thỏa thuận như
              mong muốn, một trong hai bên có quyền đưa vụ việc ra Tòa án nhân
              dân có thẩm quyền để giải quyết.
            </p>
            <p>
              Khi không giải quyết được qua thương lượng, hòa giải như trên, thì
              tập hợp các chứng cứ như email, tin nhắn… và liên lạc với SGL.
              Công ty SGL sẽ liên lạc lại với người khiếu nại để giải quyết.
            </p>
            <p>
              Nếu vụ việc vượt quá thẩm quyền của mình, Công ty SGL sẽ đề nghị
              chuyển vụ việc cho các cơ quan chức năng có thẩm quyền. Trong
              trường hợp này, Công ty vẫn phối hợp hỗ trợ để bảo vệ tốt nhất bên
              bị vi phạm.
            </p>
            <p>
              Thông tin cá nhân của thành viên được cam kết bảo mật tuyệt đối
              theo chính sách bảo vệ thông tin cá nhân. Việc thu thập và sử dụng
              thông tin của mỗi thành viên chỉ được thực hiện khi có sự đồng ý
              của khách hàng đó trừ những trường hợp pháp luật có quy định khác.
            </p>
            <p>
              Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ
              3 nào về thông tin cá nhân của thành viên khi không có sự cho phép
              đồng ý từ thành viên.
            </p>
            <p>
              Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn
              đến mất mát dữ liệu cá nhân thành viên, chúng tôi sẽ có trách
              nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp
              thời và thông báo cho thành viên được biết.
            </p>
            <p>
              Ban quản lý yêu cầu các cá nhân khi đăng ký dịch vụ phải cung cấp
              đầy đủ thông tin cá nhân có liên quan như: Họ và tên, địa chỉ liên
              lạc, email, điện thoại,… và chịu trách nhiệm về tính pháp lý của
              những thông tin trên. Ban quản lý không chịu trách nhiệm cũng như
              không giải quyết mọi khiếu nại có liên quan đến quyền lợi của
              thành viên đó nếu xét thấy tất cả thông tin cá nhân của thành viên
              đó cung cấp khi đăng ký ban đầu là không chính xác.
            </p>
            <p>
              SGL hiểu rằng quyền lợi của bạn trong việc bảo vệ thông tin cá
              nhân cũng chính là trách nhiệm của chúng tôi nên trong bất kỳ
              trường hợp có thắc mắc, góp ý nào liên quan đến chính sách bảo mật
              của sgl.com.vn, và liên quan đến việc thông tin cá nhân bị sử dụng
              sai mục đích hoặc phạm vi đã thông báo vui lòng liên hệ qua số
              hotline: 0933 606 119 hoặc email: info@sgl.com.vn để được giải
              quyết kịp thời.
            </p>

            <h2 className="csbm__tieude7 content">
              <strong>7. Cam kết bảo mật thông tin cá nhân khách hàng</strong>
            </h2>
            <p>
              Tại SGL, chúng tôi hiểu rằng sự riêng tư của khách truy cập vào
              website sgl.com.vn là cực kỳ quan trọng, chúng tôi nỗ lực để bản
              vệ sự riêng tư và an toàn cho Quý khách hàng.
            </p>
            <p>
              Chúng tôi không chia sẻ thông tin hoặc đem ra mua bán, trao đổi
              thông tin của quý khách cho bất kỳ một công ty nào khác, ngoại trừ
              khách hàng yêu cầu giao hàng, chuyển hàng thì chúng tôi sẽ thỏa
              thuận với khách hàng để cho bên thứ ba có thông tin để họ trực
              tiếp giao hàng, vận chuyển hàng cho quý khách.
            </p>
            <p>
              <em>
                (a) khi có yêu cầu của các cơ quan pháp luật có thẩm quyền;
              </em>
            </p>
            <p>
              <em>
                (b) trong trường hợp mà chúng tôi tin rằng điều đó sẽ giúp chúng
                tôi bảo vệ quyền lợi chính đáng của mình trước pháp luật;
              </em>
            </p>
            <p>
              <em>(c) tình huống khẩn cấp và cần thiết khác.</em>
            </p>
            <p>
              SGL cam kết tuân thủ Đạo luật Bảo Mật và các Nguyên tắc Bảo mật
              Quốc gia Việt Nam.
            </p>
            <p>
              Nếu quý khách cho rằng bảo mật của quý khách bị chúng tôi xâm
              phạm, xin vui lòng liên hệ trực tiếp với Công ty TNHH Kiến trúc
              Cảnh quan SGL để được giải quyết.
            </p>
            <p>
              Chúng tôi có quyền thay đổi, bổ sung các CHÍNH SÁCH BẢO MẬT để phù
              hợp với Quy định và Pháp luật của Việt Nam mà không cần phải xin
              phép hay khai báo trước với Quý khách hàng.
            </p>
          </div>
        </div>
        <div className="csbm__danhgia">
          {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} />
          ))}
          <strong>5</strong>
          <span>/</span>
          <strong>5</strong>
          <span>
            {" "}
            (<strong>1</strong> bình chọn)
          </span>
        </div>
      </div>
    </div>
  );
};

export default CSBM;
