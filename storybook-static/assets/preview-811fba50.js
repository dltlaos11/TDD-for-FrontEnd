import{_ as a}from"./iframe-6f50c074.js";import"../sb-preview/runtime.js";const{global:s}=__STORYBOOK_MODULE_GLOBAL__;var _=Object.entries(s.TAGS_OPTIONS??{}).reduce((e,r)=>{let[t,o]=r;return o.excludeFromDocsStories&&(e[t]=!0),e},{}),d={docs:{renderer:async()=>{let{DocsRenderer:e}=await a(()=>import("./DocsRenderer-K4EAMTCU-b463ef18.js"),["./DocsRenderer-K4EAMTCU-b463ef18.js","./iframe-6f50c074.js","./index-c013ead5.js","./_commonjsHelpers-725317a4.js","./react-18-170c9fcf.js","./index-169ee69c.js","./index-6c627374.js","./index-d8983a70.js","./index-e8cc0344.js","./index-356e4a49.js"],import.meta.url);return new e},stories:{filter:e=>{var r;return(e.tags||[]).filter(t=>_[t]).length===0&&!((r=e.parameters.docs)!=null&&r.disable)}}}};export{d as parameters};
