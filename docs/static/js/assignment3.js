!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=47)}({1:
/*!*******************************************************!*\
  !*** ./src/common/render/2d/twoDimensionConverter.ts ***!
  \*******************************************************/
/*! exports provided: twoDimensionConverter */
/*! exports used: twoDimensionConverter */function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r=function(t){for(var e=[],n=0;n<t.length;n++)e.push(t[n]),n%2==1&&e.push(0);return e}},10:
/*!*******************************************!*\
  !*** ./src/common/render/2d/rectangle.ts ***!
  \*******************************************/
/*! exports provided: renderRectangle */
/*! exports used: renderRectangle */function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(/*! ./twoDimensionConverter */1),o=function(t,e){var n=e.position.x-e.dimensions.width/2,o=e.position.y-e.dimensions.height/2,i=e.position.x+e.dimensions.width/2,a=e.position.y+e.dimensions.height/2,c=[n,o,i,o,n,a,n,a,i,o,i,a];"z"in e.position&&(c=Object(r.a)(c)),t.bufferData(t.ARRAY_BUFFER,new Float32Array(c),t.STATIC_DRAW),t.drawArrays(t.TRIANGLES,0,6)}},11:
/*!**************************************!*\
  !*** ./src/common/render/2d/star.ts ***!
  \**************************************/
/*! exports provided: renderStar */
/*! exports used: renderStar */function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var r=n(/*! ./twoDimensionConverter */1);function o(t){return function(t){if(Array.isArray(t))return i(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var a=function(t,e){for(var n=e.dimensions.height/2,i=e.dimensions.width/e.dimensions.height,a=2*Math.PI/5,c=e.position.x,s=e.position.y,u={},f=0;f<5;f++){var l=Math.PI/2-f*a,d=c+n*Math.cos(l)*i,h=s-n*Math.sin(l);u["".concat(f+1)]=[d,h]}u[6]=[c,s+n*(Math.tan(.2*Math.PI)-Math.tan(.1*Math.PI))];var b=[].concat(o(u[1]),o(u[3]),o(u[6])),p=[].concat(o(u[1]),o(u[6]),o(u[4])),g=[].concat(o(u[5]),o(u[2]),o(u[6])),v=[].concat(o(b),o(p),o(g));"z"in e.position&&(v=Object(r.a)(v)),t.bufferData(t.ARRAY_BUFFER,new Float32Array(v),t.STATIC_DRAW),t.drawArrays(t.TRIANGLES,0,9)}},12:
/*!******************************************!*\
  !*** ./src/common/render/2d/triangle.ts ***!
  \******************************************/
/*! exports provided: renderTriangle */
/*! exports used: renderTriangle */function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(/*! ./twoDimensionConverter */1),o=function(t,e){var n=e.position.x-e.dimensions.width/2,o=e.position.y+e.dimensions.height/2,i=e.position.x+e.dimensions.width/2,a=e.position.y+e.dimensions.height/2,c=[n,o,e.position.x,e.position.y-e.dimensions.height/2,i,a];"z"in e.position&&(c=Object(r.a)(c)),t.bufferData(t.ARRAY_BUFFER,new Float32Array(c),t.STATIC_DRAW),t.drawArrays(t.TRIANGLES,0,3)}},13:
/*!******************************************************!*\
  !*** ./src/common/setup/createProgramFromScripts.ts ***!
  \******************************************************/
/*! exports provided: createProgramFromScripts */
/*! exports used: createProgramFromScripts */function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r=function(t,e,n){var r=t.createShader(t.VERTEX_SHADER);t.shaderSource(r,e),t.compileShader(r);var o=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(o,n),t.compileShader(o);var i=t.createProgram();return t.attachShader(i,r),t.attachShader(i,o),t.linkProgram(i),i}},16:
/*!***************************************************!*\
  !*** ./src/common/model/canvas2DShapeBuilders.ts ***!
  \***************************************************/
/*! exports provided: buildRectangle, buildTriangle, buildStar, buildCircle, buildShape */
/*! exports used: buildRectangle, buildShape, buildTriangle */function(t,e,n){"use strict";function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"a",(function(){return c})),n.d(e,"c",(function(){return s})),n.d(e,"b",(function(){return u}));var a=function(t){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o({type:t,position:{x:0,y:0},dimensions:{width:1,height:1},color:{red:0,green:0,blue:0},translation:{x:0,y:0},rotation:{z:0},scale:{x:1,y:1}},e)}},c=a("RECTANGLE"),s=a("TRIANGLE"),u=(a("STAR"),a("CIRCLE"),function(t,e){return a(t)(e)})},17:
/*!********************************************!*\
  !*** ./src/common/form/getElementValue.ts ***!
  \********************************************/
/*! exports provided: getElementValue */
/*! exports used: getElementValue */function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r=function(t){var e=document.querySelector(t);if(null===e)throw new Error("Element ".concat(t," does not exist"));return e.value}},2:
/*!***********************************!*\
  !*** ./src/common/util/colors.ts ***!
  \***********************************/
/*! exports provided: hexToRgb, rgbToHex */
/*! exports used: hexToRgb, rgbToHex */function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return i}));var r=function(t){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t),n={red:parseInt(e[1],16),green:parseInt(e[2],16),blue:parseInt(e[3],16)};return n.red/=255,n.green/=255,n.blue/=255,n},o=function(t){var e=(255*t).toString(16);return 1===e.length?"0".concat(e):e},i=function(t){console.assert(t.red<=1,"Red is greater than 1");var e=o(t.red);console.assert(t.green<=1,"Green is greater than 1");var n=o(t.green);console.assert(t.blue<=1,"Blue is greater than 1");var r=o(t.blue);return"#".concat(e).concat(n).concat(r)}},20:
/*!***************************************!*\
  !*** ./src/common/render/2d/index.ts ***!
  \***************************************/
/*! exports provided: renderShape */
/*! exports used: renderShape */function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var r=n(/*! ./circle */9),o=n(/*! ./rectangle */10),i=n(/*! ./star */11),a=n(/*! ./triangle */12),c=function(t,e){switch(e.type){case"RECTANGLE":Object(o.a)(t,e);break;case"TRIANGLE":Object(a.a)(t,e);break;case"CIRCLE":Object(r.a)(t,e);break;case"STAR":Object(i.a)(t,e);break;default:console.error("Rendering unhandled shape type",e)}}},47:
/*!**********************************************!*\
  !*** ./src/assignment3/index.ts + 1 modules ***!
  \**********************************************/
/*! no exports provided */
/*! all exports used */
/*! ModuleConcatenation bailout: Cannot concat with ./src/common/form/getElementValue.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/common/model/canvas2DShapeBuilders.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/common/render/2d/index.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/common/setup/createProgramFromScripts.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/common/setup/getScriptContentsById.ts */
/*! ModuleConcatenation bailout: Cannot concat with ./src/common/util/colors.ts */function(t,e,n){"use strict";n.r(e);var r=n(17),o=n(16),i=n(5),a=n(2),c=n(20),s=n(13);function u(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var f,l=function(){function t(e,n,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var o=document.querySelector(e);this.gl=o.getContext("webgl");var i=Object(s.a)(this.gl,n,r);this.gl.useProgram(i),this.attributeCoords=this.gl.getAttribLocation(i,"a_coords");var a=this.gl.getUniformLocation(i,"u_resolution");this.uniformColor=this.gl.getUniformLocation(i,"u_color"),this.gl.enableVertexAttribArray(this.attributeCoords),this.bufferCoords=this.gl.createBuffer(),this.gl.uniform2f(a,this.gl.canvas.width,this.gl.canvas.height),this.clearCanvas()}var e,n,r;return e=t,(n=[{key:"clearCanvas",value:function(){this.gl.clearColor(0,0,0,0),this.gl.clear(this.gl.COLOR_BUFFER_BIT)}},{key:"render",value:function(t){var e=this;this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.bufferCoords),this.gl.vertexAttribPointer(this.attributeCoords,2,this.gl.FLOAT,!1,0,0),t.forEach((function(t){e.gl.uniform4f(e.uniformColor,t.color.red,t.color.green,t.color.blue,1),Object(c.a)(e.gl,t)}))}}])&&u(e.prototype,n),r&&u(e,r),t}(),d=Object(a.a)("#FF0000"),h=Object(a.a)("#0000FF"),b=[Object(o.a)({position:{x:200,y:100},dimensions:{width:50,height:50},color:h}),Object(o.c)({position:{x:300,y:100},dimensions:{width:50,height:50},color:d})],p=function(t){var e=Object(r.a)("input[name='shape']:checked"),n=parseInt(Object(r.a)("#x")),i=parseInt(Object(r.a)("#y")),c={position:t||{x:n,y:i},dimensions:{width:parseInt(Object(r.a)("#width")),height:parseInt(Object(r.a)("#height"))},color:Object(a.a)(Object(r.a)("#color"))};switch(e){case"RECTANGLE":b.push(Object(o.a)(c)),f.render(b);break;case"TRIANGLE":b.push(Object(o.c)(c)),f.render(b);break;default:console.error("Adding unhandled shape type",e)}},g=function(t){var e=t.target.getBoundingClientRect(),n=t.clientX-e.left,r=t.clientY-e.top;p({x:n,y:r})},v=function(t){t.preventDefault(),t.stopPropagation(),p()},y=function(t){t.preventDefault(),t.stopPropagation(),b=[],f.clearCanvas()};document.addEventListener("DOMContentLoaded",(function(){f=new l("#canvas",Object(i.a)("vertex-shader-2d"),Object(i.a)("fragment-shader-2d")),document.querySelector("#canvas").addEventListener("mousedown",g,!1),f.render(b),document.querySelector("#addShape").addEventListener("click",v),document.querySelector("#clearCanvas").addEventListener("click",y)}))},5:
/*!***************************************************!*\
  !*** ./src/common/setup/getScriptContentsById.ts ***!
  \***************************************************/
/*! exports provided: getScriptContentsById */
/*! exports used: getScriptContentsById */function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r=function(t){return document.getElementById(t).text}},9:
/*!****************************************!*\
  !*** ./src/common/render/2d/circle.ts ***!
  \****************************************/
/*! exports provided: renderCircle */
/*! exports used: renderCircle */function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(/*! ./twoDimensionConverter */1),o=function(t,e){for(var n=e.dimensions.height/2,o=e.dimensions.width/e.dimensions.height,a=2*Math.PI/i,c=e.position.x,s=e.position.y,u=[c,s],f=i;f>=0;f--){var l=f*a,d=c+n*Math.cos(l)*o,h=s-n*Math.sin(l);u.push(d,h)}"z"in e.position&&(u=Object(r.a)(u)),t.bufferData(t.ARRAY_BUFFER,new Float32Array(u),t.STATIC_DRAW),t.drawArrays(t.TRIANGLE_FAN,0,i+2)},i=24}});
//# sourceMappingURL=../maps/static/js/assignment3.js.map