!function(e){function t(a){if(n[a])return n[a].exports;var r=n[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=6)}([function(e,t){function n(e){function t(e){}function n(e){}function a(t){if(null!=o.mesh){var n=o.mesh.meshArray,a=t.target.getBoundingClientRect();o.x=t.clientX-a.left,o.y=t.clientY-a.top;var r=o.x,i=o.y;o.latitude=Math.round(1e4*(e.mapInfo.startLatitude-i*e.mapInfo.widthLongitude),4)/1e4,o.longitude=Math.round(1e4*(e.mapInfo.startLongitude+r*e.mapInfo.widthLatitude),4)/1e4,o.value=n[i][r],document.getElementById("pos").innerHTML="("+r+" , "+i+")",document.getElementById("lati").innerHTML="("+o.latitude+" , "+o.longitude+")",document.getElementById("value").innerHTML=o.value+" mm",document.getElementById("v_m1m1").innerHTML=n[i-1][r-1],document.getElementById("v_0m1").innerHTML=n[i-1][r],document.getElementById("v_p1m1").innerHTML=n[i-1][r+1],document.getElementById("v_m10").innerHTML=n[i][r-1],document.getElementById("v_00").innerHTML=n[i][r],document.getElementById("v_p10").innerHTML=n[i][r+1],document.getElementById("v_m1p1").innerHTML=n[i+1][r-1],document.getElementById("v_0p1").innerHTML=n[i+1][r],document.getElementById("v_p1p1").innerHTML=n[i+1][r+1]}}function r(e){null!=o.mesh&&(o.params.clickHandlers.forEach(function(e){e({latitude:o.latitude,longitude:o.longitude,value:o.value})}),document.getElementById("click_pos").innerHTML="("+o.x+" , "+o.y+")",document.getElementById("click_lati").innerHTML="("+o.latitude+" , "+o.longitude+")",document.getElementById("click_value").innerHTML=o.value+" mm")}var o=this;o.params=e,o.canvas=document.getElementById("mycanvas"),o.context=o.canvas.getContext("2d"),o.mesh=null,o.x=0,o.y=0,o.canvas.addEventListener("mouseover",t,!1),o.canvas.addEventListener("mouseout",n,!1),o.canvas.addEventListener("mousemove",a,!1),o.canvas.addEventListener("click",r,!1),o.drawMesh=function(e){o.mesh=e;var t=e.meshArray;o.canvas.width=t[0].length,o.canvas.height=t.length;for(var n=10,a=0,r=Array.prototype.concat.apply([],t),i=0;i<r.length;i++)n<r[i]?n=r[i]:a>r[i]&&(a=r[i]);for(var u=o.context.getImageData(0,0,o.canvas.width,o.canvas.height),d=u.width,s=u.height,c=u.data,l=0;l<s;++l)for(var m=0;m<d;++m){var p=4*(l*d+m),g=t[l][m],f=255*(g-a)/(n-a),v=255-f;c[p+0]=v,c[p+1]=v,c[p+2]=v,c[p+3]=255}o.canvas.style.display="block",document.getElementById("drop_msg").style.display="none",o.context.putImageData(u,0,0)}}e.exports=n},function(e,t,n){function a(e){function t(e){e.stopPropagation(),e.preventDefault(),e.dataTransfer.dropEffect="copy"}function n(t){t.stopPropagation(),t.preventDefault();for(var n,a=t.dataTransfer.files,o=[],i=0;n=a[i];i++)o.push(n);o.sort(function(e,t){return e.name>t.name?1:e.name<t.name?-1:0});for(var i=0;i<o.length;i++){var n=o[i],u=(escape(n.name),new FileReader);u.onload=function(t){return function(n){var a=new r(t.name,n.target.result);e.createMeshHandlers.forEach(function(e){e(a)})}}(n),u.readAsText(n)}}this.params=e;var a=document.getElementById(e.id);a.addEventListener("dragover",t,!1),a.addEventListener("drop",n,!1)}var r=n(5);e.exports=a},function(e,t){function n(e){var t=this;t.params=e;var n=new google.maps.LatLng(38.65,138.25),a={zoom:5,center:n,mapTypeId:google.maps.MapTypeId.ROADMAP};t.map=new google.maps.Map(document.getElementById(e.id),a),t.marker=new google.maps.Marker({position:n}),t.heatmap=null,t.setHeartMap=function(n){for(var a=n.meshArray,r=20,o=0,i=Array.prototype.concat.apply([],a),u=0;u<i.length;u++)r<i[u]?r=i[u]:o>i[u]&&(o=i[u]);for(var d=a[0].length,s=a.length,c=[],l=0;l<s;++l)for(var m=0;m<d;++m){var p=a[l][m],g=255*(p-o)/(r-o),f=e.mapInfo.startLatitude-l*e.mapInfo.widthLongitude,v=e.mapInfo.startLongitude+m*e.mapInfo.widthLatitude;0!=g&&c.push({location:new google.maps.LatLng(f,v),weight:g})}null!=t.heatmap&&t.heatmap.setMap(null),t.heatmap=new google.maps.visualization.HeatmapLayer({data:c,radius:10,maxIntensity:255,opacity:.4}),t.heatmap.setMap(t.map)},t.setMarker=function(e){var n=new google.maps.LatLng(e.latitude,e.longitude);t.map.panTo(n),t.marker.setMap(t.map),t.marker.setPosition(n)}}e.exports=n},function(e,t){e.exports={startLatitude:46.7,startLongitude:120,widthLatitude:.0625,widthLongitude:.05}},function(e,t){function n(e){var t=this;t.params=e,t.meshes=[],t.active=null,t.add=function(n){t.meshes.push(n),null==t.active&&(t.active=n,e.changeActiveMeshHandlers.forEach(function(e){e(n)})),console.log(t.meshes.length)}}e.exports=n},function(e,t){function n(e,t){function n(e){return e.split("\n").filter(function(e){return""!=e}).map(function(e){return e.split(",").filter(function(e){return""!=e})})}var a=this;a.name=e,a.meshArray=n(t)}e.exports=n},function(e,t,n){var a=n(2),r=n(1),o=n(0),i=n(4),u=n(3),d=new a({id:"map_canvas",mapInfo:u}),s=new o({id:"mycanvas",mapInfo:u,moveHandlers:[],clickHandlers:[d.setMarker]}),c=new i({changeActiveMeshHandlers:[s.drawMesh,d.setHeartMap]});new r({id:"drop_zone",createMeshHandlers:[c.add]})}]);