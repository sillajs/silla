var e,n=document.createElement("i");export default function(t,r,a,c){var i=(t||"").match(/^([^\s#]*)(?:#(\S+))?(.*)$/)||[],o=(i[1]||"").split(".");n.innerHTML="<".concat(o[0]||"div"," ").concat(i[3],">");var l=n.children[0].cloneNode();i[2]&&(l.id=i[2]);for(var d=1;d<o.length;d++)l.classList.add(o[d]);if(r instanceof Element)c=a,a=r;else if("function"==typeof r){var f=e;e=l,r(l),e=f}else null!=r&&(l.innerText=r);var s=a||e||document.body;return c?s.insertBefore(l,c):s.append(l),l}
