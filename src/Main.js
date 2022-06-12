import $ from 'jquery';

$(function () {

    var siteMenuClone = function () {

        $('body').on('click', '.arrow-collapse', function (e) {

            var $this = $(this);

            if ($this.closest('li').find('.collapse').hasClass('show')) {

                $this.removeClass('active');

                $("body").css("overflow", "unset");

            } else {

                $this.addClass('active');

                $("body").css("overflow", "hidden");

            }

            e.preventDefault();

        });

        $(window).resize(function () {

            var $this = $(this),

                w = $this.width();

            if (w > 768) {

                if ($('body').hasClass('offcanvas-menu')) {

                    $('body').removeClass('offcanvas-menu');

                    $("body").css("overflow", "unset");

                }

            }

        })

        $('body').on('click', '.js-menu-toggle', function (e) {

            var $this = $(this);

            e.preventDefault();

            if ($('body').hasClass('offcanvas-menu')) {

                $('body').removeClass('offcanvas-menu');

                $this.removeClass('active');

                $("body").css("overflow", "unset");

            } else {

                $('body').addClass('offcanvas-menu');

                $this.addClass('active');

                $("body").css("overflow", "hidden");

            }

        })

        // click outisde offcanvas

        $(document).mouseup(function (e) {

            var container = $(".site-mobile-menu");

            if (!container.is(e.target) && container.has(e.target).length === 0) {

                if ($('body').hasClass('offcanvas-menu')) {

                    $('body').removeClass('offcanvas-menu');

                    $("body").css("overflow", "unset");

                }

            }

        });

    };

    siteMenuClone();

});

var coll = document.getElementsByClassName("collapsible-nav");

var i;

for (i = 0; i < coll.length; i++) {

  coll[i].addEventListener("click", function() {

    this.classList.toggle("collapsible-active");

    var content = this.nextElementSibling;

    if (content.style.maxHeight){

      content.style.maxHeight = null;

      content.style.marginBottom = "unset";

    } else {

      content.style.maxHeight = content.scrollHeight + "px";

      content.style.marginBottom = "20px";

    } 

  });

}