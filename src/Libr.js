;(function(global) {
    
    // supported libraries
    var supportedLibs = [
        'jquery', 
        'jqueryui',
        'bootstrap',
        'underscore',
        'lodash',  
        'angularjs',
        'backbonejs', 
        'emberjs',
        'knockoutjs',
        'reactjs',
        'd3js'
    ];
    
    // maintain latest versions of supported libs
    var latestVersion = {
        jquery: "1.12.3",
        jqueryui: "1.11.4",
        bootstrap: "3.3.6",
        underscore: "1.8.3",
        lodash: "4.10.0",
        angularjs: "1.4.10",
        backbonejs: "1.3.3",
        emberjs: "2.5.0",
        knockoutjs: "3.4.0",
        reactjs: "15.0.1",
        d3js: "3.5.16"
    }
    
    var CDNJS_PREFIX = 'https://cdnjs.cloudflare.com/ajax/libs/';
        
    // valid option params
    var validOptions = [
        'mode',
        'appendTo'
    ];
    
    // default option values
    var defaults = {
        mode: 'dev', // dev or prod
        appendTo: 'head' // head or body
    };
    
    // main
    var Libr = function( libs, options ) {
        
        return new Libr.init( libs, options );
        
    };
    
    // proto for main
    Libr.prototype = {
        // validates supplied libraries and options
        validate: function() {
            // check if the libraries have been passed as an array
            if( Object.prototype.toString.call( this.libs ) !== '[object Array]' ) {
                throw "Libraries should be passed as an array";
            }
            // loop through libraries and verify is all libraries are supported
            for(var i = 0; i < this.libs.length; i++) {
                var current = this.libs[i];
                // strip version, if present, from library name
                if(this.libs[i].indexOf( '#' )) {
                    var tmp = this.libs[i].split( '#' );
                    current = tmp[0];
                }
                if(supportedLibs.indexOf( current ) === -1) {
                    throw "Unsupported library: " + current;
                }
            }
            // check if options is a valid object and supplied with correct option params
            if(typeof this.options !== 'object') {
                throw "Options should be passed as an object i.e. {mode: 'prod'}"
            } else {
                for(var key in this.options) {
                    // to ensure option is part of this.options and not coming from proto
                    if(this.options.hasOwnProperty(key)) {
                        if(validOptions.indexOf( key ) === -1) {
                            throw "Invalid option param supplied: " + key;
                        }
                    }
                }
            }
        },
        
        // loads specified libraries
        load: function() {
            for(var j = 0; j < this.libs.length; j++) {
                // separate library and version, if applicable
                var library = this.libs[j];
                var version = -1;
                if(this.libs[j].indexOf( '#' ) !== -1) {
                    var tmp = this.libs[j].split( '#' );
                    library = tmp[0].trim();
                    version = tmp[1].trim();
                }
                var script = global.document.createElement('script');
                script.defer = true;
                switch(library) {
                    case 'jquery':
                        if(version !== -1) {
                            script.src = CDNJS_PREFIX+"jquery/"+version+"/jquery."+(this.options.mode !== 'dev' ? 'min.' : '')+"js";
                        } else {
                            script.src = CDNJS_PREFIX+"jquery/"+latestVersion.jquery+"/jquery."+(this.options.mode !== 'dev' ? 'min.' : '')+"js";
                        }
                        break;
                        
                    case 'jqueryui':
                        // load jqueryui CSS
                        var stylesheet = global.document.createElement("link");
                        stylesheet.type = "text/css";
                        stylesheet.rel = "stylesheet";
                        // load javascript
                        if(version !== -1) {
                            script.src = CDNJS_PREFIX+"jqueryui/"+version+"/jquery-ui."+(this.options.mode !== 'dev' ? 'min.' : '')+"js";
                            stylesheet.href = CDNJS_PREFIX+"jqueryui/"+version+"/jquery-ui."+(this.options.mode !== 'dev' ? 'min.' : '')+"css";
                        } else {
                            script.src = CDNJS_PREFIX+"jqueryui/"+latestVersion.jqueryui+"/jquery-ui."+(this.options.mode !== 'dev' ? 'min.' : '')+"js";
                            stylesheet.href = CDNJS_PREFIX+"jqueryui/"+latestVersion.jqueryui+"/jquery-ui."+(this.options.mode !== 'dev' ? 'min.' : '')+"css";
                        }
                        if(this.options.appendTo === 'body')
                            global.document.body.appendChild(stylesheet);
                        else
                            global.document.getElementsByTagName("head")[0].appendChild(stylesheet);
                        break;
                        
                        
                    case 'bootstrap':
                        // load bootstrap CSS
                        var stylesheet = global.document.createElement("link");
                        stylesheet.type = "text/css";
                        stylesheet.rel = "stylesheet";
                        // load javascript
                        if(version !== -1) {
                            script.src = CDNJS_PREFIX+"twitter-bootstrap/"+version+"/js/bootstrap."+(this.options.mode !== 'dev' ? 'min.' : '')+"js";
                            stylesheet.href = CDNJS_PREFIX+"twitter-bootstrap/"+version+"/css/bootstrap."+(this.options.mode !== 'dev' ? 'min.' : '')+"css";
                        } else {
                            script.src = CDNJS_PREFIX+"twitter-bootstrap/"+latestVersion.bootstrap+"/js/bootstrap."+(this.options.mode !== 'dev' ? 'min.' : '')+"js";
                            stylesheet.href = CDNJS_PREFIX+"twitter-bootstrap/"+latestVersion.bootstrap+"/css/bootstrap."+(this.options.mode !== 'dev' ? 'min.' : '')+"css";
                        }
                        if(this.options.appendTo === 'body')
                            global.document.body.appendChild(stylesheet);
                        else
                            global.document.getElementsByTagName("head")[0].appendChild(stylesheet);
                        break;
                        
                    case 'underscore':
                        if(version !== -1) {
                            script.src = CDNJS_PREFIX+"underscore.js/"+version+"/underscore-"+(this.options.mode !== 'dev' ? 'min.' : '')+"js";
                        } else {
                            script.src = CDNJS_PREFIX+"underscore.js/"+latestVersion.underscore+"/underscore-"+(this.options.mode !== 'dev' ? 'min.' : '')+"js";
                        }
                        break;
                        
                    case 'lodash':
                        if(version !== -1) {
                            script.src = CDNJS_PREFIX+"lodash.js/"+version+"/lodash."+(this.options.mode !== 'dev' ? 'min.' : '')+"js";
                        } else {
                            script.src = CDNJS_PREFIX+"lodash.js/"+latestVersion.lodash+"/lodash."+(this.options.mode !== 'dev' ? 'min.' : '')+"js";
                        }
                        break;
                        
                    case 'angularjs':
                        if(version !== -1) {
                            script.src = CDNJS_PREFIX+"angular.js/"+version+"/angular."+(this.options.mode !== 'dev' ? 'min.' : '')+"js";
                        } else {
                            script.src = CDNJS_PREFIX+"angular.js/"+latestVersion.angularjs+"/angular."+(this.options.mode !== 'dev' ? 'min.' : '')+"js";
                        }
                        break;
                        
                    case 'backbonejs':
                        if(version !== -1) {
                            script.src = CDNJS_PREFIX+"backbone.js/"+version+"/backbone-"+(this.options.mode !== 'dev' ? 'min.' : '')+"js";
                        } else {
                            script.src = CDNJS_PREFIX+"backbone.js/"+latestVersion.backbonejs+"/backbone-"+(this.options.mode !== 'dev' ? 'min.' : '')+"js";
                        }
                        break;
                        
                    case 'emberjs':
                        if(version !== -1) {
                            script.src = CDNJS_PREFIX+"ember.js/"+version+"/ember."+(this.options.mode !== 'dev' ? 'min.' : '')+"js";
                        } else {
                            script.src = CDNJS_PREFIX+"ember.js/"+latestVersion.emberjs+"/ember."+(this.options.mode !== 'dev' ? 'min.' : '')+"js";
                        }
                        break;
                        
                    case 'knockoutjs':
                        if(version !== -1) {
                            script.src = CDNJS_PREFIX+"knockout/"+version+"/knockout-"+(this.options.mode !== 'dev' ? 'min.' : '')+"js";
                        } else {
                            script.src = CDNJS_PREFIX+"knockout/"+latestVersion.knockoutjs+"/knockout-"+(this.options.mode !== 'dev' ? 'min.' : '')+"js";
                        }
                        break;
                        
                    case 'reactjs':
                        if(version !== -1) {
                            script.src = CDNJS_PREFIX+"react/"+version+"/react."+(this.options.mode !== 'dev' ? 'min.' : '')+"js";
                        } else {
                            script.src = CDNJS_PREFIX+"react/"+latestVersion.reactjs+"/react."+(this.options.mode !== 'dev' ? 'min.' : '')+"js";
                        }
                        break;
                        
                    case 'd3js':
                        if(version !== -1) {
                            script.src = CDNJS_PREFIX+"d3/"+version+"/d3."+(this.options.mode !== 'dev' ? 'min.' : '')+"js";
                        } else {
                            script.src = CDNJS_PREFIX+"d3/"+latestVersion.d3js+"/d3."+(this.options.mode !== 'dev' ? 'min.' : '')+"js";
                        }
                        break;
                        
                    default:
                        throw "Unknown / Unsupported library: " + this.libs[j];
                }
                if(this.options.appendTo === 'body')
                    global.document.body.appendChild(script);
                else
                    global.document.getElementsByTagName('head')[0].appendChild(script);
            }
        },
                
    };
    
    // initialises main with supplied libraries and options
    Libr.init = function( libs, options ) {
        // store this in variable
        var self = this;        
        // assign libs to main
        self.libs = libs || [];
        // assign options to main
        self.options = options || defaults;
        // validate
        self.validate();
    };
    
    // ensure proto of init and main point are same
    Libr.init.prototype = Libr.prototype;    
    
    // expose the main to world
    global.Libr = Libr;
    
} (window !== undefined ? window : this))