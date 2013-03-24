(function( $, win, doc ) {
    "use strict";

    var
        CURRENT         =   'current',
        NEXT            =   'next',
        PAST            =   'past',
        PREV            =   'previous',
        SHOW            =   'show',

        html            =   $('html'),
        htmlbody        =   html.add('body'),
        nav             =   $('nav'),
        navItem         =   nav.find('a'),
        mobileNav       =   $(doc.getElementById('mobile-nav')),
        homeLink        =   mobileNav.find('b'),
        navLink         =   mobileNav.find('i'),

        testimonials    =   $(doc.getElementById('testimonials')),
        quotes          =   testimonials.find('.quote'),
        currentSlide,
        currentIndex;

        console.log(quotes);

    function cycle(){
        switchSlide(NEXT);
        setTimeout(function() {
            cycle();
        }, 7500);
    }

    function switchSlide( direction ) {

        currentSlide    =   testimonials.find('.current');
        currentIndex    =   currentSlide.index();
        
        if ( direction === PREV ) {
            currentSlide.removeClass(PAST).removeClass(CURRENT);
            if ( currentIndex > 0 ) {
                quotes.eq(currentIndex - 1).removeClass(PAST).addClass(CURRENT);
            } else if ( currentIndex === 0 ) {
                quotes.each(function() {
                    var
                        t   =   $(this),
                        i   =   t.index();
                    if ( (i > 0) && (i < (quotes.length - 1)) ) {
                        t.addClass(PAST);
                    }
                });
                quotes.eq(quotes.length - 1).addClass(CURRENT);
            } else {
                quotes.eq(quotes.length - 1).removeClass(PAST).addClass(CURRENT);
            }
        } else {
            currentSlide.removeClass(CURRENT).addClass(PAST);
            if ( currentIndex < (quotes.length - 1) ) {
                quotes.eq(parseFloat(currentIndex + 1)).removeClass(PAST).addClass(CURRENT);
            }   else {
                quotes.eq(0).removeClass(PAST).addClass(CURRENT);
                quotes.each(function() { $(this).removeClass(PAST); });
            }
        }
    }

    function scrollToSection( target ) {

        console.log(target);

        if ( target === null || typeof target === 'undefined') {
            htmlbody.animate({scrollTop:  0}, 600);
        } else {
            var
                s                       =   $(target),
                targetURL               =   win.location.origin + '/' + target,
                elementDistanceFromTop  =   s.offset().top;
            htmlbody.animate({scrollTop: elementDistanceFromTop - 49}, 600);
        }

        // try { win._gaq.push([TRACKEVENT, ZACH, GASCROLL, target.attr(ID)]); } catch(e) {}
    }

    homeLink.on('click', function(e) {
        e.preventDefault();
        scrollToSection();
        if (nav.hasClass(SHOW)) {
            nav.removeClass(SHOW);   
        }
    });

    navItem.on('click', function(e) {
        e.preventDefault();
        scrollToSection($(this).attr('href'));
        if (nav.hasClass(SHOW)) {
            nav.removeClass(SHOW);   
        }
    });

    navLink.on('click', function() {
        nav.toggleClass(SHOW);
    });

    cycle();
    quotes.eq(0).addClass(CURRENT);

})(jQuery, window, document);