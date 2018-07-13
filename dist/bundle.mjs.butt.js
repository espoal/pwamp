class Component{constructor(){this.html=()=>{};this.style=()=>{};this.data=()=>{return{}};this.scripts=()=>{};this.tags=()=>{}}render(){return this.html()}}class StaticComponent{}StaticComponent.render=()=>{return{html:StaticComponent.html(),css:StaticComponent.style(),tags:StaticComponent.tags()}};StaticComponent.html=()=>'hello world';StaticComponent.style=()=>'style';StaticComponent.tags=()=>{return{}};function ScriptTag({src:t = !1,url:r = !1,async:e = !0,defer:n = !0,type:u}){if(!r&&!t)return'';r&&(r=`src="${r}"`);return`<script ${e?'async ':''} ${n?'defer ':''} ${r||''} >${t||''}</script>`}function StyleTag({src:t = !1,url:r = !1}){if(!r&&!t)return'';r&&(r=`src="${r}"`);return`<style ${r||''} >${t||''}</style>`}function Head(t = []){return{html:`
        <head>
            
            ${unwrapTags(t)}
            
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            
        </head>
    `}}function unwrapTags(t){return t.map(t=>{switch(t.type){case 'title':return`<title> ${t.title} </title>`;case 'meta':return"<meta />";case 'style':return StyleTag(t);case 'script':return ScriptTag(t);default:return`<unknoknTag${t.type}/>`}}).join(' /n')}class Router{}let renderToString=(t,r,{HeadFactory:e,FootFactory:n = null} = {HeadFactory:Head,FootFactory:null})=>{let[u,s,l]=buildTags(t,r),c=e(u),a=n?n(s):s.join(' ');l.head=c;l.foot=a;return t.html(l)},buildTags=(t,r)=>{};buildTags.referencePrototype={html:'',style:'',exports:''};export { Component, StaticComponent, Head, unwrapTags, Router, ScriptTag, StyleTag, renderToString }