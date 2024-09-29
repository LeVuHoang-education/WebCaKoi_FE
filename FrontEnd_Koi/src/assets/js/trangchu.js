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
// Về slide-show của trang chủ
$(document).ready(function () {
    let currentIndex = 0;
    const items = $('.slider .list .item');
    const itemAmt = items.length;

    function cycleItems() {
        const item = $('.slider .list .item').eq(currentIndex);
        items.hide();
        item.css('display', 'inline-block');
        $('.slider .dots li').removeClass('active');
        $('.slider .dots li').eq(currentIndex).addClass('active');
    }

    $('.slider #next').click(function () {
        currentIndex += 1;
        if (currentIndex > itemAmt - 1) {
            currentIndex = 0;
        }
        cycleItems();
    });

    $('.slider #prev').click(function () {
        currentIndex -= 1;
        if (currentIndex < 0) {
            currentIndex = itemAmt - 1;
        }
        cycleItems();
    });

    cycleItems();
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

// viết hiệu ứng tự chuyển slide
$(document).ready(function () {
    let currentIndex = 0;
    const items = $('.slider .list .item');
    const itemAmt = items.length;

    function cycleItems() {
        const item = $('.slider .list .item').eq(currentIndex);
        items.hide();
        item.css('display', 'inline-block');
        $('.slider .dots li').removeClass('active');
        $('.slider .dots li').eq(currentIndex).addClass('active');
    }

    function autoSlide() {
        currentIndex += 1;
        if (currentIndex > itemAmt - 1) {
            currentIndex = 0;
        }
        cycleItems();
    }

    let slideAuto = setInterval(autoSlide, 5000);

    $('.slider').hover(function () {
        clearInterval(slideAuto);
    }, function () {
        slideAuto = setInterval(autoSlide, 5000);
    });

    $('.slider #next').click(function () {
        currentIndex += 1;
        if (currentIndex > itemAmt - 1) {
            currentIndex = 0;
        }
        cycleItems();
    });

    $('.slider #prev').click(function () {
        currentIndex -= 1;
        if (currentIndex < 0) {
            currentIndex = itemAmt - 1;
        }
        cycleItems();
    });

    cycleItems();
});
