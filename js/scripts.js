/*global $, jQuery, alert*/
(function ($) {
    "use strict";




    function navSlide() {
        $(window).on("scroll", function () {
            // Navbar On Scroll Animation
            var navbar = $(".navbar.sticky"),
            HeroHeight = $("#hero").height();
            if ($(window).scrollTop() >= HeroHeight) {
                navbar.addClass("nav-collapsed");
            }
            else {
                navbar.removeClass("nav-collapsed");
            }
        })
    };




    function navbarCollapse() {
        var collapsedDropdown = $(".collapsed-dropdown"),
            hamburgerButton = $(".hamburger-menu button");
        hamburgerButton.on("click", function() {
            $(this).toggleClass("clicked");
            collapsedDropdown.fadeToggle(200);
        })
        $(".collapsed-dropdown>ul>li.dropdown>a").on("click", function(forester) {
            $(this).next().slideToggle();
            forester.preventDefault();
        })

        $("nav.navbar ul.nav-menu>li>a").on("click", function(forester) {
            if ($(this).parent().hasClass("dropdown")) {
                forester.preventDefault();
            }
        })
        $(".collapsed-dropdown>ul>li:not(.dropdown)>a").on("click", function() {
            collapsedDropdown.fadeOut(200);
            hamburgerButton.toggleClass("clicked");
        })
        if ($("nav.navbar").hasClass("navbar-static")) {
            $("#hero .hero-content").css("padding-top", "0px")
        }
    }




    // Isotope Init & Options
    function foresterPortfolio() {
        var itPortfolio = $('.portfolio-forester'),
            initFilter = $('.portfolio-filters'),
            Filters = $('.portfolio-filters li'),
            portfolioItems = $('.portfolio-forester > div'),
            initialCat;

        // Init Filter to class except *all
        initFilter.each(function () {
            var dataOption = $(this).attr('data-initial-filter');
            $(this).attr('data-initial-filter', '.' + dataOption);
            if ($(initFilter).data('initial-filter') === '.*') {
                $(this).attr('data-initial-filter', '*');
            }
        });

        // Filters data to class except first
        Filters.not(':first').each(function () {
            var dataOption = $(this).attr('data-filter');
            $(this).attr('data-filter', "." + dataOption);
        });

        // Items data to class
        portfolioItems.each(function () {
            var dataOption = $(this).attr('data-filter');
            $(this).addClass(dataOption);
        });

        // Animate Items
        portfolioItems.waypoint(function () {
            portfolioItems.each(function (i) {
                var eachItem = $(this);
                setTimeout(function () { eachItem.addClass('reveal'); }, (i * 3) * 60);
            });
        }, { offset: '100%', triggerOnce: true });
        initialCat = initFilter.attr('data-initial-filter');

        // Add active class to filter
        $('.portfolio-filters li[data-filter="' + initialCat + '"]').addClass('active');

        // Init Isotope Filters
        Filters.on('click', function () {
            $('.portfolio-filters li.active').removeClass('active');
            $(this).addClass('active');
            var filterValue = $(this).attr('data-filter');
            itPortfolio.isotope({
                filter: filterValue
            });
        });
        var $grid = itPortfolio.imagesLoaded(function() {

            // init Isotope after all images have loaded
            $grid.isotope({
                    itemSelector: '.portfolio-forester > div',
                    percentPosition: true,
                    filter: initialCat,
                    masonry: {
                        columnWidth: '.portfolio-forester > div'
                }
            });
        });
    }
    $(window).resize(function (){
        setTimeout(function(){ 
            $('.portfolio-filters .active').trigger('click');
        }, 600);
    });




    // Lightbox init & options
    function lightbox() {
        $('.lightbox').magnificPopup({
            delegate: 'a',
            type: 'iframe',
            gallery: {
                enabled: true,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"><img src="img/assets/slider-left-thin-arrow.png"></button>',
            },
            mainClass: 'mfp-zoom-in',
            removalDelay: 500, //delay removal to allow out-animation
            callbacks: {
                beforeOpen: function() {
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                },
                elementParse: function(item){
                    if(item.el.context.className == 'video-link') {
                        item.type = 'iframe';
                    } else {
                        item.type = 'image';
                    }
                }
            },
            closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
            midClick: true
        });
        $('.popup-youtube, .popup-vimeo, .popup-video').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

    }




    function smoothScroll() {
        SmoothScroll({
            // Scrolling Core
            animationTime: 350, // [ms]
            stepSize: 100 // [px]
        })
    }




    function progressCircles() {
    $('.progress-circle').waypoint(function () {
        var totalProgress, progress, circles;
        circles = document.querySelectorAll('.progress-svg');
            for(var i = 0; i < circles.length; i++) {
                totalProgress = circles[i].querySelector('circle').getAttribute('stroke-dasharray');
                progress = circles[i].parentElement.getAttribute('data-circle-percent');
                circles[i].querySelector('.bar').style['stroke-dashoffset'] = totalProgress * progress / 100;
            }
        }, { offset: '70%', triggerOnce: true });
    }




    // counter Init & Options
    function counterUp() {
        $('.counter').counterUp({
            delay: 10,
            time: 3000
        });
    }




    // Smooth Scroll To Anchor Script
    $('.btn-scroll').on('click', function () {
        var $anchor = $(this);
        function scrollToAnchor() {
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - offsetVar
            }, 1000, 'easeInOutExpo');
            event.preventDefault();
        }
        if ($(window).width() > 992) {
            var offsetVar = '59';
            scrollToAnchor();
        } else {
            var offsetVar = '0';
            scrollToAnchor();
        }
    });




    // Progress Circles
    function progressCircles() {
        $('.progress-circle').waypoint(function () {
            var totalProgress, progress, circles;
            circles = document.querySelectorAll('.progress-svg');
                for(var i = 0; i < circles.length; i++) {
                    totalProgress = circles[i].querySelector('circle').getAttribute('stroke-dasharray');
                    progress = circles[i].parentElement.getAttribute('data-circle-percent');
                    circles[i].querySelector('.bar').style['stroke-dashoffset'] = totalProgress * progress / 100;
                }
        }, { offset: '70%', triggerOnce: true });
    }




    // Counter Up
    function counterUp() {
        $('.counter').counterUp({
            delay: 8,
            time: 1400
        });
    }




    // Accordions & Tabs
    function AccordionsAndTabs() {
        $('#accordion, #accordion2').on('show.bs.collapse', function () {
            $('#accordion .in').collapse('hide');
        });
        $('#buttonTabs a, #iconTabs a').on("click", function (e) {
            e.preventDefault();
            $(this).tab('show');
        });

    }




    function owlHeroSlider() {
        $('.owl-hero-slider').owlCarousel({
            items: 1,
            autoplay: true,
            loop: true,
            autoHeight: true,
            autoplayTimeout: 4200,
            autoplaySpeed: 500,
            dots: false
        })
    }



    function owlTestimonials() {
        $('.owlTestimonials').owlCarousel({
            items: 1,
            autoplay: true,
            loop: true,
            autoplayTimeout: 4200,
            autoplaySpeed: 500,
            dots: true
        })
    }




    function owlTeam() {
        $('.owlTeam').owlCarousel({
            items: 3,
            autoplay: false,
            autoplayTimeout: 7500,
            autoplaySpeed: 500,
            dots: true,
            rewind: true,
            responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
        })
    }




    function owlClients() {
        $('.owlClients').owlCarousel({
            items: 4,
            autoplay: true,
            autoplayTimeout: 4500,
            autoplaySpeed: 500,
            dots: false,
            rewind: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1200: {
                    items: 5
                }
            }
        })
    }




    function owlService() {
        $('.owlService').owlCarousel({
            items: 1,
            autoplay: true,
            autoplayTimeout: 7500,
            autoplaySpeed: 500,
            dots: true,
            rewind: true,
            responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
        })
    }




    function owlBlogfullWidth_4() {
        $('.owl-blog-fullwidth-4').owlCarousel({
            items: 4,
            autoplay: true,
            autoplayTimeout: 5500,
            autoplaySpeed: 500,
            dots: true,
            rewind: true,
            responsive: {
            0: {
                items: 1
            },
            1500: {
                items: 4
            }
        }
        })
    }




    function owlBlogfullWidth_3() {
        $('.owl-blog-fullwidth-3').owlCarousel({
            items: 3,
            autoplay: true,
            autoplayTimeout: 5500,
            autoplaySpeed: 500,
            dots: true,
            rewind: true,
            responsive: {
            0: {
                items: 1
            },
            1200: {
                items: 2
            }
        }
        })
    }




    function owlBlogfullWidth_2() {
        $('.owl-blog-fullwidth-2').owlCarousel({
            items: 3,
            autoplay: true,
            autoplayTimeout: 5500,
            autoplaySpeed: 500,
            dots: true,
            rewind: true,
            responsive: {
            0: {
                items: 1
            },
            1200: {
                items: 2
            }
        }
        })
    }




    function owlBlogBoxed_3() {
        $('.owl-blog-boxed-3').owlCarousel({
            items: 3,
            autoplay: true,
            autoplayTimeout: 5500,
            autoplaySpeed: 500,
            dots: true,
            rewind: true,
            responsive: {
            0: {
                items: 1
            },
            1200: {
                items: 3
            }
        }
        })
    }




    function owlBlogBoxed_2() {
        $('.owl-blog-boxed-2').owlCarousel({
            items: 2,
            autoplay: true,
            autoplayTimeout: 5500,
            autoplaySpeed: 500,
            dots: true,
            rewind: true,
            responsive: {
            0: {
                items: 1
            },
            1200: {
                items: 2
            }
        }
        })
    }




    function owlBlogBoxed_1() {
        $('.owl-blog-boxed-1').owlCarousel({
            items: 1,
            autoplay: true,
            autoplayTimeout: 5500,
            autoplaySpeed: 500,
            dots: true,
            rewind: true,
            responsive: {
            0: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
        })
    }



    function SinglePostSlider() {
        $('.owl-blog-post-slider').owlCarousel({
            items: 1,
            autoplay: true,
            autoplayTimeout: 4500,
            autoplaySpeed: 500,
            dots: true,
            rewind: true,
            responsive: {
            0: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
        })
    }




    function commentsToggle() {
        var show_comments = $('.blog-post-single > .blog-post-commentcount > h5.show-comments'),
        hide_comments = $('.blog-post-single > .blog-post-commentcount > h5.hide-comments');
        
        show_comments.on("click", function() {
            $('.blog-post-comments').slideDown(300, "linear");
            show_comments.fadeOut(200, function() {
                hide_comments.fadeIn(200);
            });
        })
        hide_comments.on("click", function() {
            $('.blog-post-comments').slideUp(300, "linear");
            hide_comments.fadeOut(200, function() {
                show_comments.fadeIn(200);
            });
        })
    }




    $(document).ready( function () {
        navbarCollapse();
        navSlide();
        jsParallax();
        smoothScroll();
        foresterPortfolio();
        lightbox();
        progressCircles();
        counterUp();
        AccordionsAndTabs();
        owlHeroSlider()
        owlTestimonials();
        owlTeam();
        owlClients();
        owlService();
        owlBlogfullWidth_4();
        owlBlogfullWidth_3();
        owlBlogfullWidth_2();
        owlBlogBoxed_3();
        owlBlogBoxed_2();
        owlBlogBoxed_1();
        SinglePostSlider()
        commentsToggle();
    });




}(jQuery));


