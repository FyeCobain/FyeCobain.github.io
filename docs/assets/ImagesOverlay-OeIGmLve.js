import{r as u,I as A,j as a,a as k,G as b,g as E}from"./index-IH4ubrui.js";function w(e,t,n,r,i,c,d){const g=e-n,m=t-r,h=m>=c&&Math.abs(g)<=d,v=g*-1>=c&&Math.abs(m)<=d,x=m*-1>=c&&Math.abs(g)<=d,o=g>=c&&Math.abs(m)<=d;i.onUpDrag!==null&&h&&i.onUpDrag(),i.onRightDrag!==null&&v&&i.onRightDrag(),i.onDownDrag!==null&&x&&i.onDownDrag(),i.onLeftDrag!==null&&o&&i.onLeftDrag()}function j(e,t=null){(t===null||t.classList.contains("images-overlay__slider")||t.classList.contains("images-overlay__close-button"))&&(e.setImages([]),e.setCurrentImageIndex(0),e.setMaxHeight(!1))}function M(){return Array.from(document.querySelectorAll(".images-overlay__slider > DIV"))}function N(e){return e.findIndex(t=>!t.classList.contains("prev")&&!t.classList.contains("next"))}function S(e,t){const n=document.querySelector('[class*="images-overlay__prev-button"]'),r=document.querySelector('[class*="images-overlay__next-button"]');n===null||r===null||(e===0?n.classList.add("hide"):n.classList.remove("hide"),e===t-1?r.classList.add("hide"):r.classList.remove("hide"))}function y(e){const t=M();if(t.length<=1)return;const n=N(t);n!==0&&(t[n].classList.add("next"),t[n-1].classList.remove("prev"),e.setCurrentImageIndex(n-1),S(n-1,t.length))}function I(e){const t=M();if(t.length<=1)return;const n=N(t);n!==t.length-1&&(t[n].classList.add("prev"),t[n+1].classList.remove("next"),e.setCurrentImageIndex(n+1),S(n+1,t.length))}function C(e,t){const n=e.target.parentNode;n.style.left=`${E(e)-E(t)}px`}function p(e,t){t?e.classList.add("cursor-grab"):e.classList.remove("cursor-grab");const n=e.parentNode;t?n.classList.add("no-transitions"):n.classList.remove("no-transitions")}function D(e){e!==void 0&&(e.target.parentNode.style.left="")}function q(){const e=u.useContext(A),t=u.useRef(null),n=u.useRef(!1),[r,i]=u.useState(),[c,d]=u.useState(),[g,m]=u.useState(),[h,v]=u.useState(!1),x=u.useCallback(l=>{var f,s;switch(l.key){case"Escape":j(e);break;case"ArrowUp":(f=t.current)==null||f.scrollTo({left:t.current.scrollLeft,top:t.current.scrollTop-105,behavior:"smooth"});break;case"ArrowLeft":y(e);break;case"ArrowDown":(s=t.current)==null||s.scrollTo({left:t.current.scrollLeft,top:t.current.scrollTop+105,behavior:"smooth"});break;case"ArrowRight":I(e);break}},[e.images]);u.useEffect(()=>(!n.current&&e.images.length>0&&document.addEventListener("keydown",x),()=>{e.images.length>0&&(n.current=!0),document.removeEventListener("keydown",x,!0)}),[x]),u.useEffect(()=>{var l,f;(l=t==null?void 0:t.current)==null||l.querySelectorAll(".images-overlay__image:not(:first-of-type)").forEach(s=>{s.classList.add("next")}),(f=t==null?void 0:t.current)==null||f.querySelectorAll(".images-overlay__image").forEach(s=>{s.removeAttribute("style")})},[e.images]);function o(){return e.images.length<=1}function _(l){o()||c===void 0||g===void 0||(p(l.target,!1),D(c),w(c.touches[0].clientX,c.touches[0].clientY,g.touches[0].clientX,g.touches[0].clientY,L,60,40))}const L={onUpDrag:null,onRightDrag:()=>y(e),onDownDrag:null,onLeftDrag:()=>I(e)};return a.jsxs("div",{className:"images-overlay",onClick:l=>{h?v(!1):j(e,l.target)},children:[a.jsx("div",{ref:t,className:"images-overlay__slider",children:e.images.map((l,f)=>a.jsx("div",{className:"images-overlay__image",style:{left:f===0?"0%":"100%"},children:a.jsx("img",{src:l,alt:l,className:((e.images.length<=1?"":"cursor-pointer")+(e.maxHeight?" max-height-100vh":"")).trim(),onTouchStart:s=>{o()||(p(s.target,!0),d(s))},onTouchMove:s=>{o()||s.touches.length>1||(m(s),c!==void 0&&C(s,c))},onTouchCancel:_,onTouchEnd:_,onMouseDown:s=>{o()||s.button!==0||(s.preventDefault(),p(s.target,!0),i(s),v(!0))},onMouseMove:s=>{o()||h&&r!==void 0&&C(s,r)},onMouseLeave:s=>{o()||h&&(p(s.target,!1),D(r),i(void 0))},onMouseUp:s=>{o()||(p(s.target,!1),D(r),v(!1),r!==void 0&&w(r.clientX,r.clientY,s.clientX,s.clientY,L,70,50))}})},f))}),a.jsx("div",{className:"images-overlay__close-button",children:a.jsx(k,{className:!0})}),a.jsx("div",{className:"images-overlay__current-info"+(o()?" display-none":""),children:a.jsx("p",{children:`${e.currentImageIndex+1} / ${e.images.length}`})}),a.jsx("div",{className:"images-overlay__prev-button content-center hide"+(o()?" display-none":""),onClick:()=>y(e),children:a.jsx(b,{})}),a.jsx("div",{className:"images-overlay__next-button content-center"+(o()?" display-none":""),onClick:()=>I(e),children:a.jsx(b,{})})]})}export{q as default};
