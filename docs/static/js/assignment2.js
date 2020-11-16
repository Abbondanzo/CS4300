!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=36)}([
/*!*******************************************************!*\
  !*** ./src/common/render/2d/twoDimensionConverter.ts ***!
  \*******************************************************/
/*! exports provided: twoDimensionConverter */
/*! exports used: twoDimensionConverter */,function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r=function(t){for(var e=[],n=0;n<t.length;n++)e.push(t[n]),n%2==1&&e.push(0);return e}},,,
/*!***************************************************!*\
  !*** ./src/common/setup/getScriptContentsById.ts ***!
  \***************************************************/
/*! exports provided: getScriptContentsById */
/*! exports used: getScriptContentsById */,function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r=function(t){return document.getElementById(t).text}},,,
/*!****************************************!*\
  !*** ./src/common/render/2d/circle.ts ***!
  \****************************************/
/*! exports provided: renderCircle */
/*! exports used: renderCircle */,function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(/*! ./twoDimensionConverter */1),o=function(t,e){for(var n=e.dimensions.height/2,o=e.dimensions.width/e.dimensions.height,a=2*Math.PI/i,c=e.position.x,u=e.position.y,s=[c,u],f=i;f>=0;f--){var d=f*a,l=c+n*Math.cos(d)*o,h=u-n*Math.sin(d);s.push(l,h)}"z"in e.position&&(s=Object(r.a)(s)),t.bufferData(t.ARRAY_BUFFER,new Float32Array(s),t.STATIC_DRAW),t.drawArrays(t.TRIANGLE_FAN,0,i+2)},i=24},
/*!*******************************************!*\
  !*** ./src/common/render/2d/rectangle.ts ***!
  \*******************************************/
/*! exports provided: renderRectangle */
/*! exports used: renderRectangle */function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(/*! ./twoDimensionConverter */1),o=function(t,e){var n=e.position.x-e.dimensions.width/2,o=e.position.y-e.dimensions.height/2,i=e.position.x+e.dimensions.width/2,a=e.position.y+e.dimensions.height/2,c=[n,o,i,o,n,a,n,a,i,o,i,a];"z"in e.position&&(c=Object(r.a)(c)),t.bufferData(t.ARRAY_BUFFER,new Float32Array(c),t.STATIC_DRAW),t.drawArrays(t.TRIANGLES,0,6)}},
/*!**************************************!*\
  !*** ./src/common/render/2d/star.ts ***!
  \**************************************/
/*! exports provided: renderStar */
/*! exports used: renderStar */function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var r=n(/*! ./twoDimensionConverter */1);function o(t){return function(t){if(Array.isArray(t))return i(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var a=function(t,e){for(var n=e.dimensions.height/2,i=e.dimensions.width/e.dimensions.height,a=2*Math.PI/5,c=e.position.x,u=e.position.y,s={},f=0;f<5;f++){var d=Math.PI/2-f*a,l=c+n*Math.cos(d)*i,h=u-n*Math.sin(d);s["".concat(f+1)]=[l,h]}s[6]=[c,u+n*(Math.tan(.2*Math.PI)-Math.tan(.1*Math.PI))];var p=[].concat(o(s[1]),o(s[3]),o(s[6])),b=[].concat(o(s[1]),o(s[6]),o(s[4])),y=[].concat(o(s[5]),o(s[2]),o(s[6])),m=[].concat(o(p),o(b),o(y));"z"in e.position&&(m=Object(r.a)(m)),t.bufferData(t.ARRAY_BUFFER,new Float32Array(m),t.STATIC_DRAW),t.drawArrays(t.TRIANGLES,0,9)}},
/*!******************************************!*\
  !*** ./src/common/render/2d/triangle.ts ***!
  \******************************************/
/*! exports provided: renderTriangle */
/*! exports used: renderTriangle */function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(/*! ./twoDimensionConverter */1),o=function(t,e){var n=e.position.x-e.dimensions.width/2,o=e.position.y+e.dimensions.height/2,i=e.position.x+e.dimensions.width/2,a=e.position.y+e.dimensions.height/2,c=[n,o,e.position.x,e.position.y-e.dimensions.height/2,i,a];"z"in e.position&&(c=Object(r.a)(c)),t.bufferData(t.ARRAY_BUFFER,new Float32Array(c),t.STATIC_DRAW),t.drawArrays(t.TRIANGLES,0,3)}},
/*!******************************************************!*\
  !*** ./src/common/setup/createProgramFromScripts.ts ***!
  \******************************************************/
/*! exports provided: createProgramFromScripts */
/*! exports used: createProgramFromScripts */function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r=function(t,e,n){var r=t.createShader(t.VERTEX_SHADER);t.shaderSource(r,e),t.compileShader(r);var o=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(o,n),t.compileShader(o);var i=t.createProgram();return t.attachShader(i,r),t.attachShader(i,o),t.linkProgram(i),i}},,
/*!***************************************************!*\
  !*** ./src/common/model/canvas2DShapeBuilders.ts ***!
  \***************************************************/
/*! exports provided: buildRectangle, buildTriangle, buildStar, buildCircle, buildShape */
/*! exports used: buildRectangle, buildShape, buildTriangle */,function(t,e,n){"use strict";function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"a",(function(){return c})),n.d(e,"c",(function(){return u})),n.d(e,"b",(function(){return s}));var a=function(t){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o({type:t,position:{x:0,y:0},dimensions:{width:1,height:1},color:{red:0,green:0,blue:0},translation:{x:0,y:0},rotation:{z:0},scale:{x:1,y:1}},e)}},c=a("RECTANGLE"),u=a("TRIANGLE"),s=(a("STAR"),a("CIRCLE"),function(t,e){return a(t)(e)})},
/*!********************************************!*\
  !*** ./src/common/form/getElementValue.ts ***!
  \********************************************/
/*! exports provided: getElementValue */
/*! exports used: getElementValue */function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r=function(t){var e=document.querySelector(t);if(null===e)throw new Error("Element ".concat(t," does not exist"));return e.value}},,
/*!***************************************!*\
  !*** ./src/common/render/2d/index.ts ***!
  \***************************************/
/*! exports provided: renderShape */
/*! exports used: renderShape */,function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var r=n(/*! ./circle */9),o=n(/*! ./rectangle */10),i=n(/*! ./star */11),a=n(/*! ./triangle */12),c=function(t,e){switch(e.type){case"RECTANGLE":Object(o.a)(t,e);break;case"TRIANGLE":Object(a.a)(t,e);break;case"CIRCLE":Object(r.a)(t,e);break;case"STAR":Object(i.a)(t,e);break;default:console.error("Rendering unhandled shape type",e)}}},,,,,,,,,,,,,,,
/*!**********************************!*\
  !*** ./src/assignment2/index.ts ***!
  \**********************************/
/*! no exports provided */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is an entry point */,function(t,e,n){"use strict";n.r(e);var r,o,i,a,c=n(/*! ../common/form/getElementValue */17),u=n(/*! ../common/model/canvas2DShapeBuilders */16),s=n(/*! ../common/render/2d */20),f=n(/*! ../common/setup/createProgramFromScripts */13),d=n(/*! ../common/setup/getScriptContentsById */5),l=[Object(u.a)({position:{x:200,y:100},dimensions:{width:50,height:50},color:{red:Math.random(),green:Math.random(),blue:Math.random()}})],h=function(){r.bindBuffer(r.ARRAY_BUFFER,a),r.vertexAttribPointer(o,2,r.FLOAT,!1,0,0),l.forEach((function(t){r.uniform4f(i,t.color.red,t.color.green,t.color.blue,1),Object(s.a)(r,t)}))},p=function(t){t.preventDefault(),t.stopPropagation();var e=parseInt(Object(c.a)("#x")),n=parseInt(Object(c.a)("#y")),r=parseInt(Object(c.a)("#width")),o=parseInt(Object(c.a)("#height")),i=Object(u.a)({position:{x:e,y:n},dimensions:{width:r,height:o},color:{red:Math.random(),green:Math.random(),blue:Math.random()}});l.push(i),h()};document.addEventListener("DOMContentLoaded",(function(){!function(){var t=document.querySelector("#canvas");r=t.getContext("webgl");var e=Object(f.a)(r,Object(d.a)("vertex-shader-2d"),Object(d.a)("fragment-shader-2d"));r.useProgram(e),document.querySelector("#addRectangle").addEventListener("click",p),o=r.getAttribLocation(e,"a_coords");var n=r.getUniformLocation(e,"u_resolution");i=r.getUniformLocation(e,"u_color"),r.enableVertexAttribArray(o),a=r.createBuffer(),r.uniform2f(n,r.canvas.width,r.canvas.height),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT)}(),h()}))}]);
//# sourceMappingURL=../maps/static/js/assignment2.js.map