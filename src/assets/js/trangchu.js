// Nút Toggle Menu
$(document).ready(function () {
    $('#toggle-button').click(function () {
        $('nav').slideToggle();
        $(window).resize(function () {
            if ($(window).width() > 768) {
                $('nav').show();
            } else {
                $('nav').hide();
            }
        });
    });

});

// Đổi màu thanh nav khi cuộn chuột và nút toggle khi bị thu nhỏ
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 10) {
            $('nav').addClass('nav-scroll');
            $('#toggle-button').addClass('nav-scroll');
        } else {
            $('nav').removeClass('nav-scroll');
            $('#toggle-button').removeClass('nav-scroll');
        }
    });
});

