# Libr.js
Libr.js is a simple utilit for developers to quickly include any common javascript library or framework in their code without having to downloading or copying long URLs of CDNs.

## Usage
If you need to include jquery in your code, do this.

```
var l = Libr(['jquery']);
l.load();
```

It'll include the latest version of jquery from cdnjs in your code. You can optionally pass the version of desired library if you need to work with a specific version as shown below.

```
var l = Libr(['jquery#1.9.1']);
l.load();
```

This will include jquery version 1.9.1. You can include multiple libraries as shown below with or without specifying the versions.

```
var l = Libr(['jquery#1.9.1', 'jqueryui', 'underscore#1.6.0']);
l.load();
```

**Important** 
* In case of multiple libraries, order is important if there are dependencies. For example, if you need to include bootstrap then you need to include jquery and jqueryui before bootstrap as shown below.
```
Libr(['jquery', 'jqueryui', 'bootstrap']);
```
* Libr includes CSS file for bootstrap and jqueryui so you need include them separately.

## Options
Libr accepts couple of optional parameters as shown below.
* **mode** 
`mode` accepts `dev` or `prod` as values for development or production environment respectively. If you have chosen the `dev` mode, Libr loads un-minified version of the files and in `prod` mode, it loads minified version of files. Defaults to `dev`.
* **appendTo**
`appendTo` accepts `head` or `body` as values to specify whether you would like to include the files in your web page's head or body. Defaults to `head`.

### Example usage with options
```
var l = Libr([
      'jquery', 
      'jqueryui', 
      'bootstrap'
    ], {
      mode: 'prod',
      appendTo: 'body'
    }
);
l.load();
```

## Supported Libraries
Currently Libr supports the following libraries/frameworks
* jquery (https://jquery.com/)
* jqueryui - loads both JS and CSS (https://jqueryui.com/)
* bootstrap - loads both JS and CSS (http://getbootstrap.com/)
* underscore - (http://underscorejs.org/)
* lodash (https://lodash.com/)
* angularjs (https://angularjs.org/)
* backbonejs (http://backbonejs.org/)
* emberjs (http://emberjs.com/)
* knockoutjs (http://knockoutjs.com/)
* reactjs (https://facebook.github.io/react/)
* d3js (https://d3js.org/)

It's easy to add support for additional libraries. I have used [cdnjs] (https://cdnjs.com/) since it supports most number of javascript librraies and frameworks.
