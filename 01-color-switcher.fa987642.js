const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),d=document.querySelector("body");let a;function l(n){const o=`#${Math.floor(16777215*Math.random()).toString(16)}`;d.style.backgroundColor=o,a||(a=setInterval(l,1e3)),e.disabled=!0,t.disabled=!1}t.disabled=!0,e.addEventListener("click",l),t.addEventListener("click",(function(d){clearInterval(a),a=null,e.disabled=!1,t.disabled=!0}));
//# sourceMappingURL=01-color-switcher.fa987642.js.map
