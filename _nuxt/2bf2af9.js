(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{374:function(t,e,n){"use strict";n.r(e);n(74);var o={props:{placement:{type:String,default:"right",validator:function(t){return["right","left"].includes(t)}}},data:function(){return{open:!1}},mounted:function(){var t=this,e=function(e){"Esc"!==e.key&&"Escape"!==e.key||(t.open=!1)};document.addEventListener("keydown",e),this.$once("hook:beforeDestroy",(function(){document.removeEventListener("keydown",e)}))}},l=n(48),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"relative z-20"},[n("button",{staticClass:"z-10 relative flex items-center focus:outline-none select-none dark:bg-gray-700 dark:text-gray-300 w-80 sm:w-40",on:{click:function(e){t.open=!t.open}}},[t._t("button")],2),t._v(" "),t.open?n("button",{staticClass:"fixed inset-0 h-full w-full cursor-default focus:outline-none",attrs:{tabindex:"-1"},on:{click:function(e){t.open=!1}}}):t._e(),t._v(" "),n("transition",{attrs:{"enter-active-class":"transition-all duration-200 ease-out","leave-active-class":"transition-all duration-750 ease-in","enter-class":"opacity-0 scale-75","enter-to-class":"opacity-100 scale-100","leave-class":"opacity-100 scale-100","leave-to-class":"opacity-0 scale-75"}},[t.open?n("div",{staticClass:"hidden md:block absolute shadow-lg w-40 rounded py-1 px-2 text-sm mt-4 bg-white dark:bg-gray-700 dark:text-gray-300"},[t._t("content")],2):t._e()]),t._v(" "),n("transition",{attrs:{"enter-active-class":"transition-all duration-200 ease-out","leave-active-class":"transition-all duration-750 ease-in","enter-class":"opacity-0 scale-75","enter-to-class":"opacity-100 scale-100","leave-class":"opacity-100 scale-100","leave-to-class":"opacity-0 scale-75"}},[t.open?n("div",{staticClass:"md:hidden fixed inset-x-0 bottom-0 bg-white w-full z-20 px-2 py-2 shadow-2xl leading-loose dark:bg-gray-700 dark:text-gray-300"},[t._t("content")],2):t._e()]),t._v(" "),t.open?n("div",{staticClass:"md:hidden fixed w-full h-full inset-0 bg-gray-900 opacity-50 z-10",on:{click:function(e){t.open=!1}}}):t._e()],1)}),[],!1,null,null,null);e.default=component.exports}}]);