/*global jQuery, document, window, smoothScroll, google, behanceAPI, CBPFWTabs, WOW*/
/* ==========================================================================
Document Ready Function
========================================================================== */
jQuery(document).ready(function () {

    'use strict';

    var fixed_header_menu, header_menu, onMobile, Nestocookie, filter_item, filter_header, filter_container, filter_item_string, behance_key, behance_username, behance_images_count, withanimation, wow;


    header_menu = jQuery('#header-menu').html();
    fixed_header_menu = jQuery('#fixed-header-menu');

    filter_item =  jQuery('.filter-item');
    filter_header = jQuery('.filter-header');
    filter_container = jQuery('#filter-container');


    /* ==========================================================================
    Placeholder
    ========================================================================== */
    jQuery('input, textarea').placeholder();


    /* ==========================================================================
    Data Spy
    ========================================================================== */
    jQuery('body').attr('data-spy', 'scroll').attr('data-target', '#fixed-header-menu').attr('data-offset', '71');

    /* ==========================================================================
    Scroll To top
    ========================================================================== */
    jQuery('#to-top a').on('click', function () {
        jQuery('html, body').animate({scrollTop: '0'}, 800);
        return false;
    });


    /* ==========================================================================
    Notification Alert ( Cookie )
    ========================================================================== */
    Nestocookie = jQuery.cookie('NestoLabCookie');

    if (Nestocookie === 'displaynone') {
        jQuery('#notification-alert').css('display', 'none');
    } else {
        jQuery('#notification-alert').delay(750).slideDown(500);
    }

    jQuery('#close-alert').on('click', function (event) {
        event.preventDefault();
        jQuery('#notification-alert').slideUp(500);
        jQuery.cookie('NestoLabCookie', 'displaynone', { expires: 10 });
        return false;
    });


    /* ==========================================================================
    Fixed Header Menu
    ========================================================================== */
    fixed_header_menu.html(header_menu);
    jQuery('#header-menu').find('a').addClass('scrollto');
    jQuery('#fixed-header-menu').find('a').addClass('scrollto');
    jQuery('a.scrollto').on('click', function () {
        jQuery('.navbar-collapse').removeClass('in');
    });


    /* ==========================================================================
    Portfolio Menu
    ========================================================================== */
    filter_container.on({
        'mouseover': function () {
            filter_container.addClass('filter-list-open');
        },
        'mouseleave': function () {
            filter_container.removeClass('filter-list-open');
        }
    });

    filter_header.on('click', function () {
        filter_container.toggleClass('filter-list-open');
    });

    filter_item.on('click', function () {
        filter_item.removeClass('active-item');
        jQuery(this).addClass('active-item');
        filter_item_string = jQuery(this).html();
        filter_header.text(filter_item_string);
        filter_container.removeClass('filter-list-open');
    });

    filter_item_string = filter_container.find('div.filter-item:first-child').html();
    filter_header.text(filter_item_string);
    jQuery('div.filter-item:first-child').addClass('active-item');


    /* ==========================================================================
    Fancy Box
    ========================================================================== */
    jQuery('.fancybox').fancybox({
        helpers: {
            title: null,
            media: {},
            overlay: {
                speedOut: 0
            }
        }
    });


    /* ==========================================================================
    Map
    ========================================================================== */
    jQuery('#map-open-button').on('click', function (e) {

        jQuery('#map-section').addClass('map-height');

        var myLatlng, mapOptions, mapElement, map, markerimage, marker, styleSs;

        myLatlng = new google.maps.LatLng(45.5200, -122.6819);

        mapOptions = {
            zoom: 14,
            panControl: false,
            scrollwheel: false,
            mapTypeControl: false,
            center: myLatlng,
            styles: [
                {
                    "featureType": "landscape",
                    "stylers": [
                        {"saturation": -100},
                        {"lightness": 65},
                        {"visibility": "on"}
                    ]
                }, {
                    "featureType": "poi",
                    "stylers": [
                        {"saturation": -100},
                        {"lightness": 51},
                        {"visibility": "simplified"}
                    ]
                }, {
                    "featureType": "road.highway",
                    "stylers": [
                        {"saturation": -100},
                        {"visibility": "simplified"}
                    ]
                }, {
                    "featureType": "road.arterial",
                    "stylers": [
                        {"saturation": -100},
                        {"lightness": 30},
                        {"visibility": "on"}
                    ]
                }, {
                    "featureType": "road.local",
                    "stylers": [
                        {"saturation": -100},
                        {"lightness": 40},
                        {"visibility": "on"}
                    ]
                }, {
                    "featureType": "transit",
                    "stylers": [
                        {"saturation": -100},
                        {"visibility": "simplified"}
                    ]
                }, {
                    "featureType": "administrative.province",
                    "stylers": [
                        {"visibility": "off"}
                    ]
                }, {
                    "featureType": "water",
                    "elementType": "labels",
                    "stylers": [
                        {"visibility": "on"},
                        {"lightness": -25},
                        {"saturation": -100}
                    ]
                }, {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {"hue": "#ffff00"},
                        {"lightness": -25},
                        {"saturation": -97}
                    ]
                }
            ]
        };
        mapElement = document.getElementById('map');
        map = new google.maps.Map(mapElement, mapOptions);
        markerimage = 'images/marker.png';
        marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            icon: markerimage
        });
        map.panBy(100, 0);

        google.maps.event.trigger(map, 'resize');

    });
    jQuery('#map-close-button').on('click', function (e) {
        jQuery('#map-section').removeClass('map-height');
    });


    /* ==========================================================================
    WOW Animation
    ========================================================================== */
    withanimation = true; /* Change it to false to disable the animation */
    if (withanimation === true) {
        wow = new WOW({
            offset: 40,
            mobile: false
        });
        wow.init();
    }


    /* ==========================================================================
    Tabs
    ========================================================================== */
    [].slice.call(document.querySelectorAll('.tabs')).forEach(function (el) {
        var nestoTabs = new CBPFWTabs(el);
    });


    /* ==========================================================================
    on mobile ?
    ========================================================================== */
    onMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) { onMobile = true; }

    if (onMobile === true) {

        /* ==========================================================================
        Remove Parallax
        ========================================================================== */
        jQuery('.parallax-section').css({backgroundAttachment: 'scroll'});

        /* ==========================================================================
        Smooth Scroll
        ========================================================================== */
        smoothScroll.init({
            offset: 0,
            speed: 500,
            updateURL: false
        });

    } else {

        /* ==========================================================================
        Parallax
        ========================================================================== */
        jQuery('#map-section').parallax('50%', 0.5);
        jQuery('.quote-section').parallax('50%', 0.5);
        jQuery('.numbers-section').parallax('50%', 0.5);
        jQuery('.process-section').parallax('50%', 0.5);
        jQuery('.subscribe-section').parallax('50%', 0.5);
        jQuery('.breadcrumb-section').parallax('50%', 0.5);

        /* ==========================================================================
        Smooth Scroll
        ========================================================================== */
        smoothScroll.init({
            offset: 70,
            speed: 800,
            updateURL: false
        });

    }

    /* ==========================================================================
    Image Slider Version
    ========================================================================== */
    jQuery(function ($) {
        jQuery('body.image-slider-version .home-section').supersized({
            slide_interval: 5000, // Length between transitions
            transition: 1,
            transition_speed: 900, // Speed of transition
            slide_links: '0',
            slides: [
                {image: 'images/slider/001.jpg', title : '', thumb : '', url : ''},
                {image: 'images/slider/002.jpg', title : '', thumb : '', url : ''}
            ]
        });
    });


}); // JavaScript Document




/* ==========================================================================
Window Resize
========================================================================== */
jQuery(window).resize(function () {

    'use strict';

    /* ==============================================
    Refresh Data Spy
    =============================================== */
    jQuery('[data-spy="scroll"]').each(function () {
        var $spy = jQuery(this).scrollspy('refresh');
    });

});




/* ==========================================================================
Window Scroll
========================================================================== */
jQuery(window).scroll(function () {

    'use strict';

    var current_position, enable_opacity, home_section_height;


    current_position = jQuery(document).scrollTop();
    home_section_height = jQuery('.home-section').height() + 100;


    /* ==============================================
    Fixed Header
    =============================================== */
    if (current_position >= 500) {
        jQuery('#to-top').addClass('topdisplay');
        jQuery('#fixed-header-menu').addClass('fixed-menu');
    } else {
        jQuery('#to-top').removeClass('topdisplay');
        jQuery('#fixed-header-menu').removeClass('fixed-menu');
    }


    /* ==============================================
    Home Section Opacity
    =============================================== */
    enable_opacity = true;
    if (enable_opacity === true) {
        jQuery('.home-section').css({opacity: (1 - current_position / home_section_height * 1.2)});
        jQuery('.hero-container').css('top', current_position * 0.60);
    }


    /* ==============================================
    Image Slider Version
    =============================================== */
    jQuery('body.image-slider-version #supersized li a img').css('top', current_position * -0.60);


});




/* ==========================================================================
Window Load
========================================================================== */
jQuery(window).load(function () {

    'use strict';

    var loader_delay, loading_loader, portfolio_grid;


    /* ==============================================
    Loader
    =============================================== */
    loader_delay = 350;

    function hideLoader() {
        loading_loader = jQuery('#loader');
        loading_loader.css({height: 0});
        loading_loader.css({display: 'none'});
        jQuery('#loader-container').css({display: 'none'});
    }
    hideLoader();


    /* ==========================================================================
    Isotope Portfolio
    ========================================================================== */
    portfolio_grid = jQuery('.portfolio-grid');
    portfolio_grid.isotope({
        filter: '*',
        itemSelector: 'li',
        layoutMode: 'masonry',
        animationOptions: {
            duration: 850,
            easing: 'linear',
            queue: false
        }
    });

    jQuery('.filter-item').on('click', function (e) {
        var selector = jQuery(this).attr('data-filter');
        portfolio_grid.isotope({
            filter: selector,
            animationOptions: {
                duration: 850,
                easing: 'linear',
                queue: false
            }
        });
        return false;
    });


    /* ==============================================
    Image Slider Version
    =============================================== */
    jQuery('body.image-slider-version #supersized li a img').css({top: '0'});

    /* ==============================================
    Random Quote
    =============================================== */
    var lastIndex = 0;
    var pickIndex = function() {
        var index = Math.round(Math.random() * 100) % jQuery('.hero-quote h1').length;
        if (index === lastIndex) {
            return pickIndex();
        }
        return (lastIndex = index);
    };
    var displayRandomQuote = function() {
        jQuery('.hero-quote h1:visible').fadeOut(600, function() {
            jQuery('.hero-quote h1:eq(' + pickIndex() + ')').fadeIn(600);
        });
    };
    setInterval(displayRandomQuote, 8000);
    displayRandomQuote();

});
