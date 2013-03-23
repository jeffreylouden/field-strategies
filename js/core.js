(function( $, win, doc ) {
    "use strict";

    var
        SHOW            =   'show',
        html            =   $('html'),
        htmlbody        =   html.add('body'),
        nav             =   $('nav'),
        navItem         =   nav.find('a'),
        mobileNav       =   $('#mobile-nav'),
        navLink         =   mobileNav.find('i');

    function scrollToSection( target, duration ) {

        var
            s                       =   $(target),
            targetURL               =   win.location.origin + '/' + target,
            elementDistanceFromTop  =   s.offset().top;

        htmlbody.animate({scrollTop: elementDistanceFromTop - 49}, duration);

        // try { win._gaq.push([TRACKEVENT, ZACH, GASCROLL, target.attr(ID)]); } catch(e) {}
    }

    navItem.on('click', function(e) {
        e.preventDefault();
        scrollToSection($(this).attr('href'),600);
        if (nav.hasClass(SHOW)) {
            nav.removeClass(SHOW);   
        }
    });

    navLink.on('click', function() {
        nav.toggleClass(SHOW);
    });

})(jQuery, window, document);




