/*!
 *
 *  Copyright (c) David Bushell | http://dbushell.com/
 *
 */
(function(window, document, undefined)
{

    // helper functions

    var trim = function(str)
    {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
    };

    var hasClass = function(el, cn)
    {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
    };

    var addClass = function(el, cn)
    {
        if (!hasClass(el, cn)) {
            el.className = (el.className === '') ? cn : el.className + ' ' + cn;
        }
    };

    var removeClass = function(el, cn)
    {
        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
    };

    var hasParent = function(el, id)
    {
        if (el) {
            do {
                if (el.id === id) {
                    return true;
                }
                if (el.nodeType === 9) {
                    break;
                }
            }
            while((el = el.parentNode));
        }
        return false;
    };

    // normalize vendor prefixes

    var doc = document.documentElement;

    var transform_prop = window.Modernizr.prefixed('transform'),
        transition_prop = window.Modernizr.prefixed('transition'),
        transition_end = (function() {
            var props = {
                'WebkitTransition' : 'webkitTransitionEnd',
                'MozTransition'    : 'transitionend',
                'OTransition'      : 'oTransitionEnd otransitionend',
                'msTransition'     : 'MSTransitionEnd',
                'transition'       : 'transitionend'
            };
            return props.hasOwnProperty(transition_prop) ? props[transition_prop] : false;
        })();

    window.App = (function()
    {

        var _init = false, app = { };

        var inner = document.getElementById('inner-wrap'),

            nav_open = false,

            nav_class = 'js-nav';


        app.init = function()
        {
            if (_init) {
                return;
            }
            _init = true;

            var closeNavEnd = function(e)
            {
                if (e && e.target === inner) {
                    document.removeEventListener(transition_end, closeNavEnd, false);
                }
                nav_open = false;
            };

            app.closeNav =function()
            {
                if (nav_open) {
                    // close navigation after transition or immediately
                    var duration = (transition_end && transition_prop) ? parseFloat(window.getComputedStyle(inner, '')[transition_prop + 'Duration']) : 0;
                    if (duration > 0) {
                        document.addEventListener(transition_end, closeNavEnd, false);
                    } else {
                        closeNavEnd(null);
                    }
                }
			     
				  document.getElementById("nav-open-btn").focus();
			
                removeClass(doc, nav_class);
            };

            app.openNav = function()
            {
                if (nav_open) {
                    return;
                }
				
                addClass(doc, nav_class);
				setTimeout(doSomething, 200);

				function doSomething() {
				  document.getElementById("q").focus();
				}
				
                nav_open = true;
				
				
            };

            app.toggleNav = function(e)
            {
                if (nav_open && hasClass(doc, nav_class)) {
                    app.closeNav();
					setTimeout(doSomething, 500);

					function doSomething() {
					   document.getElementById('off-canvas-nav-wrapper').style.display = "none";
					}
					
                } else {
					
					document.getElementById('off-canvas-nav-wrapper').style.display = "block";
				
					setTimeout(app.openNav, 100);
					
					
                }

                if (e) {
                    e.preventDefault();
                }
            };

            // open nav with main "nav" button
            document.getElementById('nav-open-btn').addEventListener('click', app.toggleNav, false);

		   // close nav with main "close" button
		            document.getElementById('nav-close-btn-link').addEventListener('click', app.toggleNav, false);
		
	
	    	// close nav by touching off the responsive nav
					            document.getElementById('dim-overlay').addEventListener('click', app.toggleNav, false);


            

            addClass(doc, 'js-ready');

        

        window.onload = function () {
            var mq = window.matchMedia("(max-width: 870px)");
            mqChange(mq);
        };

          if (window.matchMedia) {

                var mqLarge = window.matchMedia("(max-width: 870px)");
                
                mqLarge.addListener( function() {
                 mqChange(mqLarge);
                });


                window.addEventListener("orientationchange", function() {
                  mqChange(window.matchMedia("(max-width: 870px)"));
                }, false);

			
              
                mqChange(mq);
            }

           	

            // media query change
            function mqChange(mq) {
				 
                if (mq.matches) {
                    // window width is less than 870px

                    // nav should close whenever screen is resized to avoid error
                   
                     if(nav_open) {
                        app.toggleNav();
                     } 

                    
                    //show bottom navigation
                    bottomNav.style.display = "block";
                    
                    document.getElementById('off-canvas-nav-wrapper').appendChild(
                        document.getElementById('nav')
                      );
                    
                        
                    document.getElementById('search-wrapper-mobile').appendChild(
                        document.getElementById('search-tool-box')
                      );    

                    
                }
                else {
                    // window width is at least 870px
                    

                    // nav should close whenever screen is resized to avoid error

                    if(nav_open) {
                        app.toggleNav();
                     } 

                    //hide bottom navigation
                    bottomNav.style.display = "none";
                    
                    document.getElementById('desktop-nav-wrapper').appendChild(
                        document.getElementById('nav')
                      );
                    
                    document.getElementById('search-wrapper').appendChild(
                        document.getElementById('search-tool-box')
                      );

                   
                   
                    }


            } 

        };

        return app;

    })();

    if (window.addEventListener) {
        window.addEventListener('DOMContentLoaded', window.App.init, false);
    }

	
	//create bottom navigation on page.
	
	var bottomNavHtml = document.getElementById('nav').getElementsByTagName('ul')[0];	
	var bottomNav = document.createElement('div');
	var searchBox = document.getElementById('search-tool-box').cloneNode(true);	
	searchBox.id = 'bottom-nav-search-box';
	var target = document.getElementById('static-footer-nav');
	
	//clone search box and add to footer navigation
	
	bottomNav.appendChild(searchBox);
	bottomNav.appendChild(bottomNavHtml.cloneNode(true));
	bottomNav.id = "bottom-navigation";	
	/*
	if(document.getElementById('nav').classList.contains("light-background") ){
        target.classList.add('light-background');
    }

    if(document.getElementById('nav').classList.contains("dark-background") ){
        target.classList.add('dark-background');
    }

	target.appendChild(bottomNav);
	document.getElementById('bottom-navigation').classList.add('sixteen');	
	document.getElementById('bottom-navigation').classList.add('columns');
	*/
	
	if(findClass(document.getElementById('nav').className,"light-background") == true){
        target.className = target.className + ' light-background';
    }

    if(findClass(document.getElementById('nav').className,"dark-background") == true){
        target.className = (target.className + ' dark-background');
    }

	target.appendChild(bottomNav);
	document.getElementById('bottom-navigation').className = document.getElementById('bottom-navigation').className + ' sixteen columns';	
	//document.getElementById('bottom-navigation').classList.add('columns');
	






	// this opens and closes the second and third level nav with an accordian function
	
	
	var levelOneLinks = Array.prototype.slice.call(document.querySelectorAll(".level-one>a"));

    var levelTwoLinks = Array.prototype.slice.call(document.querySelectorAll(".level-two>a"));
        
    var topLevelLinks = levelOneLinks.concat(levelTwoLinks);

    var currentActive = "";
        
        for(var i = 0; i < topLevelLinks.length; i++) {
            var topLevelLink = topLevelLinks[i];
             
                topLevelLink.onclick = function() {                 
				
                    if(findClass(this.parentElement.className,"active") == true){							
                            
                            this.parentElement.className = this.parentElement.className.replace("active","");							
							currentActive = "";
                                
                        } else {
                            if ((currentActive != "") && (hasParent(currentActive, 'desktop-nav-wrapper')) ) {								
                                currentActive.parentElement.className = currentActive.parentElement.className.replace("active","");
                            }
                            this.parentElement.className = this.parentElement.className.trim() + " active";
                            currentActive = this;
                        }  
                }
        }

        // this closes all nav levels when a click occurs outside of the nav structure
        document.addEventListener('click', function(e)
                    { 
                        if ((!hasParent(e.target, 'nav')) && (!hasParent(e.target, 'static-footer-nav')) ){
                          
                          
                            for(var i = 0; i < topLevelLinks.length; i++) {
                                var topLevelLink = topLevelLinks[i];								
                                topLevelLink.parentElement.className = topLevelLink.parentElement.className.replace("active","");
								
                            }
                        }
                    },
                    false);


           
       
})(window, window.document);

//IE <10 does not support classList property

function findClass(cssClasses, findTarget) {
	if(cssClasses.split(' ').indexOf(findTarget)=== -1) {
		return false;
	}
	
	else {
		return true;
	}
}
