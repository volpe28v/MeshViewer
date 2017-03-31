!function(e){function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}var t={};n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=10)}([function(e,n){function t(e){function n(e){}function t(e){}function r(e){if(null!=m.mesh){var n=e.target.getBoundingClientRect();m.x=e.clientX-n.left,m.y=e.clientY-n.top,a(),m.params.moveHandlers.forEach(function(e){e({x:m.x,y:m.y})})}}function a(){m.cursor_ctx.clearRect(0,0,m.canvas.width,m.canvas.height),o(m.cursor_ctx,0,m.y,m.cursor.width,m.y,"deepskyblue",.3),o(m.cursor_ctx,m.x,0,m.x,m.cursor.height,"deepskyblue",.3),null!=m.x&&(o(m.cursor_ctx,m.fix_x-10,m.fix_y,m.fix_x+10,m.fix_y,"red",.5),o(m.cursor_ctx,m.fix_x,m.fix_y-10,m.fix_x,m.fix_y+10,"red",.5))}function o(e,n,t,r,a,o,i){e.globalAlpha=i,e.beginPath(),e.strokeStyle=o,e.moveTo(n,t),e.lineTo(r,a),e.closePath(),e.stroke()}function i(e){if(null!=m.mesh){var n=m.x,t=m.y;m.fix_x=n,m.fix_y=t,a(),m.params.clickHandlers.forEach(function(e){e({x:n,y:t})})}}var m=this;m.params=e,m.canvas=document.getElementById("draw_canvas"),m.context=m.canvas.getContext("2d"),m.cursor=document.getElementById("cursor_canvas"),m.cursor_ctx=m.cursor.getContext("2d"),m.mesh=null,m.cursor.addEventListener("mouseover",n,!1),m.cursor.addEventListener("mouseout",t,!1),m.cursor.addEventListener("mousemove",r,!1),m.cursor.addEventListener("click",i,!1),m.drawMesh=function(e){m.mesh=e;var n=e.meshArray;m.canvas.width=m.cursor.width=n[0].length,m.canvas.height=m.cursor.height=n.length;var t=Array.prototype.concat.apply([],n),r=d3.max(t,function(e){return Number(e)});r=r>10?r:10,m.max=r;for(var o=m.context.getImageData(0,0,m.canvas.width,m.canvas.height),i=o.width,u=o.height,c=o.data,d=0;d<u;++d)for(var s=0;s<i;++s){var l=4*(d*i+s),p=n[d][s],f=255*p/r,g=255-f;c[l+0]=g,c[l+1]=g,c[l+2]=g,c[l+3]=255}m.canvas.style.display="block",document.getElementById("drop_msg").style.display="none",m.context.putImageData(o,0,0),document.getElementById("file_name").innerHTML=e.name,a()},m.moveFixCursor=function(e,n){m.fix_x+=e,m.fix_y+=n,a(),m.params.clickHandlers.forEach(function(e){e({x:m.fix_x,y:m.fix_y})})}}e.exports=t},function(e,n,t){function r(e){function n(e){e.stopPropagation(),e.preventDefault(),e.dataTransfer.dropEffect="copy"}function t(n){n.stopPropagation(),n.preventDefault();for(var t,r=n.dataTransfer.files,o=[],i=0;t=r[i];i++)o.push(t);o.sort(function(e,n){return e.name>n.name?1:e.name<n.name?-1:0});for(var i=0;i<o.length;i++){var t=o[i],m=(escape(t.name),new FileReader);m.onload=function(n){return function(t){var r=new a(n.name,t.target.result);e.createMeshHandlers.forEach(function(e){e(r)})}}(t),m.readAsText(t)}}this.params=e;var r=document.getElementById(e.id);r.addEventListener("dragover",n,!1),r.addEventListener("drop",t,!1)}var a=t(9);e.exports=r},function(e,n){function t(e){function n(){document.getElementById(t.params.id).innerHTML=t.meshes.map(function(e){return e==t.active?'<li class="selected-csv">'+e.name+"</li>":"<li>"+e.name+"</li>"}).join("\n")}var t=this;t.params=e,t.meshes=null,t.active=null,t.updateList=function(e){t.meshes=e,n()},t.updateActive=function(e){t.active=e,n()}}e.exports=t},function(e,n){function t(e){var n=this;n.params=e;var t=new google.maps.LatLng(38.65,138.25),r={zoom:5,center:t,mapTypeId:google.maps.MapTypeId.ROADMAP};n.map=new google.maps.Map(document.getElementById(e.id),r),n.marker=new google.maps.Marker({position:t}),n.heatmap=null,n.setHeartMap=function(e){for(var t=e.meshArray,r=20,a=0,o=Array.prototype.concat.apply([],t),i=0;i<o.length;i++)r<o[i]?r=o[i]:a>o[i]&&(a=o[i]);for(var m=t[0].length,u=t.length,c=[],d=0;d<u;++d)for(var s=0;s<m;++s){var l=t[d][s],p=255*(l-a)/(r-a),f=n.params.mapInfo.getLatitude(d),g=n.params.mapInfo.getLongitude(s);0!=p&&c.push({location:new google.maps.LatLng(f,g),weight:p})}null!=n.heatmap&&(n.heatmap.setMap(null),n.heatmap.setData([])),n.heatmap=new google.maps.visualization.HeatmapLayer({data:c,radius:10,maxIntensity:255,opacity:.4}),n.heatmap.setMap(n.map)},n.setMarker=function(e){var t=n.params.mapInfo.getLatitude(e.y),r=n.params.mapInfo.getLongitude(e.x),a=new google.maps.LatLng(t,r);n.map.panTo(a),n.marker.setMap(n.map),n.marker.setPosition(a)}}e.exports=t},function(e,n){e.exports={startLatitude:47.6,startLongitude:120,widthLatitude:.0625,widthLongitude:.05,getLatitude:function(e){return Math.round(1e4*(this.startLatitude-e*this.widthLongitude),4)/1e4},getLongitude:function(e){return Math.round(1e4*(this.startLongitude+e*this.widthLatitude),4)/1e4}}},function(e,n){function t(e){function n(){r.params.changeActiveMeshHandlers.forEach(function(e){e(r.active)})}function t(){for(var e=0;e<r.meshes.length;e++)if(r.meshes[e]==r.active)return e;return 0}var r=this;r.params=e,r.meshes=[],r.active=null,r.add=function(e){r.meshes.push(e),r.meshes.sort(function(e,n){return e.name>n.name?1:e.name<n.name?-1:0}),r.params.changeCollectionHandlers.forEach(function(e){e(r.meshes)}),null==r.active&&(r.active=e,n())},r.pre=function(){var e=t();e-=1,e<0&&(e=r.meshes.length-1),r.active=r.meshes[e],n()},r.next=function(){var e=t();e+=1,e>=r.meshes.length&&(e=0),r.active=r.meshes[e],n()}}e.exports=t},function(e,n){function t(e){function n(){var e=o.x,n=o.y,t=o.params.mapInfo.getLatitude(n),i=o.params.mapInfo.getLongitude(e),m=o.mesh.meshArray;document.getElementById("pos").innerHTML="("+e+" , "+n+")",document.getElementById("lati").innerHTML="("+t+" , "+i+")",document.getElementById("60_lati").innerHTML=a(t)+" , "+a(i),document.getElementById("value").innerHTML=m[n][e]+" mm",document.getElementById("v_m2m2").innerHTML=r(n-2,e-2),document.getElementById("v_m1m2").innerHTML=r(n-2,e-1),document.getElementById("v_0m2").innerHTML=r(n-2,e),document.getElementById("v_p1m2").innerHTML=r(n-2,e+1),document.getElementById("v_p2m2").innerHTML=r(n-2,e+2),document.getElementById("v_m2m1").innerHTML=r(n-1,e-2),document.getElementById("v_m1m1").innerHTML=r(n-1,e-1),document.getElementById("v_0m1").innerHTML=r(n-1,e),document.getElementById("v_p1m1").innerHTML=r(n-1,e+1),document.getElementById("v_p2m1").innerHTML=r(n-1,e+2),document.getElementById("v_m20").innerHTML=r(n,e-2),document.getElementById("v_m10").innerHTML=r(n,e-1),document.getElementById("v_00").innerHTML=r(n,e),document.getElementById("v_p10").innerHTML=r(n,e+1),document.getElementById("v_p20").innerHTML=r(n,e+2),document.getElementById("v_m2p1").innerHTML=r(n+1,e-2),document.getElementById("v_m1p1").innerHTML=r(n+1,e-1),document.getElementById("v_0p1").innerHTML=r(n+1,e),document.getElementById("v_p1p1").innerHTML=r(n+1,e+1),document.getElementById("v_p2p1").innerHTML=r(n+1,e+2),document.getElementById("v_m2p2").innerHTML=r(n+2,e-2),document.getElementById("v_m1p2").innerHTML=r(n+2,e-1),document.getElementById("v_0p2").innerHTML=r(n+2,e),document.getElementById("v_p1p2").innerHTML=r(n+2,e+1),document.getElementById("v_p2p2").innerHTML=r(n+2,e+2)}function t(){var e=o.fix_x,n=o.fix_y,t=o.params.mapInfo.getLatitude(n),i=o.params.mapInfo.getLongitude(e),m=o.mesh.meshArray;document.getElementById("click_pos").innerHTML="("+e+" , "+n+")",document.getElementById("click_lati").innerHTML="("+t+" , "+i+")",document.getElementById("click_60_lati").innerHTML=a(t)+" , "+a(i),document.getElementById("click_value").innerHTML=m[n][e]+" mm",document.getElementById("f_m2m2").innerHTML=r(n-2,e-2),document.getElementById("f_m1m2").innerHTML=r(n-2,e-1),document.getElementById("f_0m2").innerHTML=r(n-2,e),document.getElementById("f_p1m2").innerHTML=r(n-2,e+1),document.getElementById("f_p2m2").innerHTML=r(n-2,e+2),document.getElementById("f_m2m1").innerHTML=r(n-1,e-2),document.getElementById("f_m1m1").innerHTML=r(n-1,e-1),document.getElementById("f_0m1").innerHTML=r(n-1,e),document.getElementById("f_p1m1").innerHTML=r(n-1,e+1),document.getElementById("f_p2m1").innerHTML=r(n-1,e+2),document.getElementById("f_m20").innerHTML=r(n,e-2),document.getElementById("f_m10").innerHTML=r(n,e-1),document.getElementById("f_00").innerHTML=r(n,e),document.getElementById("f_p10").innerHTML=r(n,e+1),document.getElementById("f_p20").innerHTML=r(n,e+2),document.getElementById("f_m2p1").innerHTML=r(n+1,e-2),document.getElementById("f_m1p1").innerHTML=r(n+1,e-1),document.getElementById("f_0p1").innerHTML=r(n+1,e),document.getElementById("f_p1p1").innerHTML=r(n+1,e+1),document.getElementById("f_p2p1").innerHTML=r(n+1,e+2),document.getElementById("f_m2p2").innerHTML=r(n+2,e-2),document.getElementById("f_m1p2").innerHTML=r(n+2,e-1),document.getElementById("f_0p2").innerHTML=r(n+2,e),document.getElementById("f_p1p2").innerHTML=r(n+2,e+1),document.getElementById("f_p2p2").innerHTML=r(n+2,e+2)}function r(e,n){var t=o.mesh.meshArray;return n<0||e<0||t[0].length<=n||t.length<=e?"-":t[e][n]}function a(e){var n=Math.floor(e),t=Math.floor(60*(e-n));return n+"度 "+t+"分 "+Math.floor(60*(60*(e-n)-t))+"秒"}var o=this;o.params=e,o.mesh=null,o.x=0,o.y=0,o.fix_x=0,o.fix_y=0,o.setMesh=function(e){o.mesh=e,n(),t()},o.updateCoordinate=function(e){o.x=e.x,o.y=e.y,n()},o.updateFixedCoordinate=function(e){o.fix_x=e.x,o.fix_y=e.y,t()}}e.exports=t},function(e,n){function t(){function e(){var e=n.x,t=n.y,r=n.mesh.meshArray,a=d3.scaleLinear().domain([0,n.max]).range([55,5]);d3.select("svg#latitude_line polyline").transition().duration(100).attr("points",r[t].map(function(e,n){return n+" "+a(Number(e))}).join(","));var o=d3.scaleLinear().domain([0,n.max]).range([58,8]),i=r.map(function(n){return n[e]});d3.select("svg#longitude_line polyline").transition().duration(100).attr("points",i.map(function(e,n){return o(Number(e))+" "+n}).join(","))}var n=this;n.mesh=null,n.x=0,n.y=0,n.setMesh=function(t){n.mesh=t;var r=t.meshArray,a=Array.prototype.concat.apply([],r),o=d3.max(a,function(e){return Number(e)});o=o>10?o:10,n.max=o,e()},n.updateCoordinate=function(t){n.x=t.x,n.y=t.y,e()}}e.exports=t},function(e,n){function t(){function e(){var e=n.x,t=n.y,r=d3.max(n.meshes,function(n){return Number(n.meshArray[t][e])}),a=481/n.meshes.length;a=a>20?20:a;var o=d3.scaleLinear().domain([0,r]).range([2,57]),i=d3.select("svg#timeline").selectAll("rect").data(n.meshes);i.enter().append("rect"),i.exit().remove(),i.transition().attr("x",function(e,n){return n*a}).attr("y",function(n){return 56-o(Number(n.meshArray[t][e]))}).attr("width",a-2).attr("height",function(n){return o(Number(n.meshArray[t][e]))}).attr("fill",function(e){return e==n.active?"#dccb18":"deepskyblue"})}var n=this;n.meshes=null,n.active=null,n.x=0,n.y=0,n.updateMeshes=function(t){n.meshes=t,e()},n.updateActive=function(t){n.active=t,e()},n.updateCoordinate=function(t){n.x=t.x,n.y=t.y,e()}}e.exports=t},function(e,n){function t(e,n){function t(e){return e.split("\n").filter(function(e){return""!=e}).map(function(e){return e.split(",").filter(function(e){return""!=e})})}var r=this;r.name=e,r.meshArray=t(n)}e.exports=t},function(e,n,t){var r=t(3),a=t(1),o=t(0),i=t(5),m=t(2),u=t(6),c=t(7),d=t(8),s=t(4),l=new r({id:"map_canvas",mapInfo:s}),p=new u({mapInfo:s}),f=new c,g=new d,y=new o({mapInfo:s,moveHandlers:[p.updateCoordinate,f.updateCoordinate],clickHandlers:[l.setMarker,p.updateFixedCoordinate,g.updateCoordinate]}),h=new m({id:"file_list"}),v=new i({changeCollectionHandlers:[h.updateList,g.updateMeshes],changeActiveMeshHandlers:[y.drawMesh,l.setHeartMap,h.updateActive,p.setMesh,f.setMesh,g.updateActive]});new a({id:"drop_zone",createMeshHandlers:[v.add]});window.onload=function(){document.getElementById("pre_mesh").onclick=function(){v.pre()},document.getElementById("next_mesh").onclick=function(){v.next()},document.onkeydown=function(e){switch(e.keyCode){case 72:y.moveFixCursor(-1,0);break;case 74:y.moveFixCursor(0,1);break;case 75:y.moveFixCursor(0,-1);break;case 76:y.moveFixCursor(1,0)}}}}]);