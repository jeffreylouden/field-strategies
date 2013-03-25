(function( $, win, doc ) {
    "use strict";

    var
        ACTIVE          =   'active',
        CURRENT         =   'current',
        ID              =   'id',
        NEXT            =   'next',
        OFFSETBOTTOM    =   'data-offset-bottom',
        OFFSETTOP       =   'data-offset-top',
        PAST            =   'past',
        PREV            =   'previous',
        SHOW            =   'show',

        html            =   $('html'),
        htmlbody        =   html.add('body'),
        nav             =   $('nav'),
        navLogo         =   $(doc.getElementById('nav-logo')),
        navItem         =   nav.find('a'),
        mobileNav       =   $(doc.getElementById('mobile-nav')),
        homeLink        =   mobileNav.find('b'),
        navLink         =   mobileNav.find('i'),

        header          =   $(doc.getElementById('hd')),
        intro          =   $(doc.getElementById('intro')),
        contact         =   $(doc.getElementById('contact')),

        main            =   $(doc.getElementById('main')),
        sections        =   main.find('article'),
        scrollDistance,
        currentSection,

        testimonials    =   $(doc.getElementById('testimonials')),
        quotes          =   testimonials.find('.quote'),
        currentSlide,
        currentIndex;

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

        if ( target === null || typeof target === 'undefined') {
            htmlbody.animate({scrollTop:  0}, 600);
        } else {
            var
                s                       =   $(target),
                targetURL               =   win.location.origin + '/' + target,
                elementDistanceFromTop  =   s.offset().top;
            htmlbody.animate({scrollTop: elementDistanceFromTop - 56}, 600);
        }

        // try { win._gaq.push([TRACKEVENT, ZACH, GASCROLL, target.attr(ID)]); } catch(e) {}
    }

    function sectionHighlight( scrollPosition ) {
        sections.each(function(){
            var
                t               =   $(this),
                sectionId       =   t.attr(ID);
            if ( (scrollPosition >= t.attr(OFFSETTOP)) && ( scrollPosition < t.attr(OFFSETBOTTOM)) && ( sectionId !== currentSection) ) {

                if (!navLogo.hasClass(SHOW)) {
                    navLogo.addClass(SHOW);
                }

                currentSection = sectionId;

                switch (currentSection) {
                    case 'testimonials':
                        currentSection = 'clients';
                        break;
                    case 'full-list':
                        currentSection = 'services';
                        break;
                }

                nav.find('.active').removeClass(ACTIVE);
                $(nav.find('[href=#' + currentSection + ']').closest('li')).addClass(ACTIVE);

            } else {
                if ( scrollPosition <= header.attr(OFFSETBOTTOM)) {
                        nav.find('.active').removeClass(ACTIVE);
                        navLogo.removeClass(SHOW);
                        currentSection = '';
                }
                if ( scrollPosition >= contact.attr(OFFSETTOP)) {
                    currentSection = 'contact';
                    nav.find('.active').removeClass(ACTIVE);
                    $(nav.find('[href=#contact]').closest('li')).addClass(ACTIVE);
                }
            }
        });
    }

    function setSections() {
        sections.each(function() {
            var s                 =   $(this);
            s.attr(OFFSETTOP, Math.floor(s.offset().top) - 56);
            s.attr(OFFSETBOTTOM, parseInt(s.attr(OFFSETTOP),10) + parseInt(s.outerHeight(true), 10));
        });

        contact.attr(OFFSETTOP, Math.floor(contact.offset().top) - 56);
        contact.attr(OFFSETBOTTOM, parseInt(contact.attr(OFFSETTOP),10) + parseInt(contact.outerHeight(true), 10));

        header.attr(OFFSETTOP, Math.floor(header.offset().top) - 56);
        header.attr(OFFSETBOTTOM, parseInt(header.attr(OFFSETTOP),10) + parseInt((header.outerHeight(true) + intro.outerHeight(true)), 10));
    }

    function init() {
        cycle();
        quotes.eq(0).addClass(CURRENT);

        setSections();
    }

    homeLink.on('click', function(e) {
        e.preventDefault();
        scrollToSection();
        if (nav.hasClass(SHOW)) {
            nav.removeClass(SHOW);
        }
    });

    navLogo.on('click', function(e) {
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

    $(win).resize(function(){
        setSections();
    });

    $(win).scroll(function(){

        scrollDistance  =   $(this).scrollTop();
        scrollDistance  =   scrollDistance ? scrollDistance : 0;

        sectionHighlight(scrollDistance);
    });

    init();

})(jQuery, window, document);

