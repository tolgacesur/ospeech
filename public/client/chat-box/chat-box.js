!function(e){var t={};function n(o){if(t[o])return t[o].exports;var s=t[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(o,s,function(t){return e[t]}.bind(null,s));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){var o="http://ospeech.org";(function e(){if(!(this instanceof e))return new e;this.username=localStorage.getItem("ospeech-username");this.messages=[];this.init=function(){this.options=this.getOptions(),this.socket=this.createSocket(),this.addChatBoxListeners(),this.setFormVisibiliy(),this.updateNoMessageAlert()};this.createSocket=function(){var e=io(o,{reconnectionDelay:250,reconnectionAttempts:3});return e.on("connect",this.joinRoom.bind(this)),e.on("message-received",this.messageReceived.bind(this)),e.on("reconnect_failed",(function(){console.log("error occured")})),e};this.joinRoom=function(){this.socket.emit("join-room",this.options.appKey)};this.messageReceived=function(e){this.messages.push(e),this.updateNoMessageAlert();var t=document.createElement("div");if(t.innerHTML=`<div class="message-container">\n\t\t\t<div class="d-flex">\n\t\t\t\t<strong class="flex-grow-1">${e.username}</strong>\n\t\t\t\t<small>${this.formatDate(new Date)}</small>\n\t\t\t</div>\n\t\t\t<p class="mb-1">${e.message}</p>\n\t\t</div>`,this.username===e.username?t.className+="right":t.className+="left",document.querySelector("#messages").appendChild(t),e.username===this.username){var n=document.getElementById("messages");n.scrollTop=n.scrollHeight}};this.sendMessage=function(e){this.socket.emit("send-message",{username:this.username,message:e,roomId:this.options.appKey})};this.addChatBoxListeners=function(){var e=document.querySelector("#send-button"),t=document.querySelector("#message-input"),n=this;e.onclick=function(){t.value.length&&(n.sendMessage(t.value),t.value="",t.focus())},t.addEventListener("keyup",(function(e){t.value.length?13===e.keyCode&&(n.sendMessage(t.value),t.value="",t.focus()):t.style.height=0})),t.addEventListener("input",(function(){var e=t.scrollHeight;t.style.height=e+"px"}));var s=document.querySelector("#save-name-button"),i=document.querySelector("#name-input");s.onclick=function(){i.value.length&&(n.username=i.value,localStorage.setItem("ospeech-username",n.username),i.value="",n.setFormVisibiliy())},i.addEventListener("keyup",(function(e){i.value.length&&13===e.keyCode&&(n.username=i.value,localStorage.setItem("ospeech-username",n.username),i.value="",n.setFormVisibiliy())}));var a=document.getElementById("feedback-success-alert"),r=document.getElementById("feedback-danger-alert");a.style.display="none",r.style.display="none",$("#feedback-popover").on("shown.bs.popover",(function(){var e=document.querySelector(".popover-body #feedback-email-input"),t=document.querySelector(".popover-body #send-feedback-button"),s=document.querySelector(".popover-body #feedback-message-input");t.onclick=function(){var t=e.value,i=s.value;i&&$.ajax(o+"/feedbacks/send",{data:JSON.stringify({email:t,message:i,room:n.options.appKey}),type:"POST",contentType:"application/json"}).done((function(){e.value="",s.value="";var t=document.querySelector(".popover-body #feedback-success-alert");t.style.display="block",setTimeout((function(){t.style.display="none"}),3e3)})).fail((function(){var e=document.querySelector(".popover-body #feedback-danger-alert");e.style.display="block",setTimeout((function(){e.style.display="none"}),3e3)}))},s.addEventListener("keyup",(function(){s.value.length||(s.style.height=0)})),s.addEventListener("input",(function(){var e=s.scrollHeight;s.style.height=e+"px"}))})),$("#user-popover").on("shown.bs.popover",(function(){var e=document.querySelector(".popover-body #user-name-input");e.value=n.username,e.placeholder="Username",document.querySelector(".popover-body #save-name-button").onclick=function(){var t=e.value;n.username=t,localStorage.setItem("ospeech-username",n.username)}}))};this.setFormVisibiliy=function(){var e=document.getElementById("name-container"),t=document.getElementById("message-input-container");this.username?(e.style.display="none",t.style.display="block",t.focus()):(e.style.display="block",t.style.display="none",e.focus())};this.updateNoMessageAlert=function(){var e=document.getElementById("no-message");this.messages.length&&(e.style.display="none")};this.getOptions=function(){var e=location.href.split("?")[1]?location.href.split("?")[1].split("&"):null,t={};if(!e)return t;for(var n in e){var o=e[n].split("=")[1];o="undefined"===(o="null"===o?null:o)?void 0:o,t[e[n].split("=")[0]]=decodeURIComponent(o)}return t};this.formatDate=function(e){return moment(e).isSame(moment(),"day")?moment(e).format("HH:mm"):moment(e).format("MMMM DD, HH:mm")}})().init(),n(1),$(document).ready((function(){$('[data-toggle="popover"]').popover({container:"body",trigger:"click",placement:"bottom",html:!0,sanitize:!1,content:function(){var e=$(this).attr("popover-content");return $(e).html()}}),$("body").on("click",(function(e){$("[data-toggle=popover]").each((function(){$(this).is(e.target)||0!==$(this).has(e.target).length||0!==$(".popover").has(e.target).length||$(this).popover("hide")}))}))}))},function(e,t,n){}]);