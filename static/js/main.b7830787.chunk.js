(this.webpackJsonpriot_search_app=this.webpackJsonpriot_search_app||[]).push([[0],{23:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n(18),s=n.n(a),r=(n(23),n(4)),i=n(0);var o=function(e){var t=e.setNickNamae_in_header,n=function(){var e=Object(c.useState)(""),n=Object(r.a)(e,2),a=n[0],s=n[1];return Object(i.jsxs)("div",{children:[Object(i.jsx)("input",{type:"text",name:"nickName",value:a,onChange:function(e){s(e.target.value)},spellCheck:!1}),Object(i.jsx)("button",{onClick:function(){t(a),s("")},children:" search "})]})};return Object(i.jsx)("div",{children:Object(i.jsx)(n,{})})},u=n(7),l=n(2),d=n.n(l),m=n(5),j=n(6),p=n.n(j);n(45);var h=function(e){var t=e.info,n=e.queueIdInfoJson,c=e.spellInfoJson;function a(e){if(e)return parseInt(e/6e4)+"\ubd84 "+parseInt(e%6e4/1e3)+"\ucd08"}function s(e){return t.participants[e].win?"\uc2b9 \ub9ac":"\ud328 \ubc30"}function r(e){return e>0?Object(i.jsx)("img",{className:"item",src:"http://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/".concat(e,".png"),alt:"item",title:"item"}):Object(i.jsx)("img",{className:"item",alt:"",title:"null item"})}function o(e){var t=Object.entries(c.data).map((function(e){return e[1]})),n=t.filter((function(t){return t.key==e.summoner1Id}))[0],a=t.filter((function(t){return t.key==e.summoner2Id}))[0];return Object(i.jsxs)("div",{className:"spell_image_container",children:[Object(i.jsx)("img",{className:"spell_image",src:"http://ddragon.leagueoflegends.com/cdn/11.19.1/img/spell/".concat(n.id,".png"),alt:"spell_1",title:n.id}),Object(i.jsx)("img",{className:"spell_image",src:"http://ddragon.leagueoflegends.com/cdn/11.19.1/img/spell/".concat(a.id,".png"),alt:"spell_2",title:a.id})]})}var u=function(e,n){return t.participants.map((function(e){return Object(i.jsx)("div",{children:Object(i.jsxs)("div",{className:"summoner_data",children:[Object(i.jsx)("img",{className:"champion_image",src:"http://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/".concat(e.championName,".png"),alt:e.championName,title:e.championName}),o(e),Object(i.jsx)("div",{className:"summoner_name",children:e.summonerName}),Object(i.jsxs)("div",{className:"summoner_kda",children:[e.kills,"/",e.deaths,"/",e.assists]}),Object(i.jsxs)("div",{className:"item_container",children:[r(e.item0),r(e.item1),r(e.item2),r(e.item3),r(e.item4),r(e.item5),r(e.item6)]})]})},e.summonerName)})).slice(e,n)};return Object(i.jsxs)("div",{children:[Object(i.jsxs)("div",{className:"gamemode",children:["match mode : ",t.gameMode]}),Object(i.jsxs)("div",{className:"gameduration",children:["\uac8c\uc784\uc2dc\uac04 : ",a(t.gameDuration)]}),Object(i.jsx)("div",{className:"time_dp",children:a((new Date).getTime()-t.gameStartTimestamp-t.gameDuration)+" \uc804\uc5d0 \uac8c\uc784\uc885\ub8cc"}),Object(i.jsxs)("div",{className:"queueType",children:[" \ud050 \ud0c0\uc785 : ",n.filter((function(e){return e.queueId===t.queueId}))[0].description]}),Object(i.jsxs)("div",{className:"team",children:[Object(i.jsxs)("div",{className:"teamA",children:[Object(i.jsx)("div",{className:"win_or_loss",children:s(0)}),u(0,5)]}),Object(i.jsxs)("div",{className:"teamB",children:[Object(i.jsx)("div",{className:"win_or_loss",children:s(5)}),u(5,10)]})]})]})};n(46);var b=function(e){var t=e.nickName,n="RGAPI-50b5616b-5017-4888-b2d7-629165125318",a=Object(c.useState)(!0),s=Object(r.a)(a,2),o=s[0],l=s[1],j=Object(c.useState)([]),b=Object(r.a)(j,2),f=b[0],O=b[1],g=Object(c.useState)([]),v=Object(r.a)(g,2),x=v[0],N=v[1],_=Object(c.useState)(),k=Object(r.a)(_,2),w=k[0],y=k[1],I=Object(c.useState)(),S=Object(r.a)(I,2),q=S[0],X=S[1],D=Object(c.useState)(),J=Object(r.a)(D,2),E=J[0],L=J[1],T=Object(c.useState)(!1),A=Object(r.a)(T,2),P=A[0],C=A[1],M=function(){var e=Object(m.a)(d.a.mark((function e(){var c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("getSummonerData() 1"),e.next=3,p.a.get("https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/".concat(t,"?api_key=").concat(n));case 3:return c=e.sent,console.log("getSummonerData() 2"),e.abrupt("return",c.data);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),R=function(){var e=Object(m.a)(d.a.mark((function e(t){var c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("getLeagueV4()"),e.next=3,p.a.get("https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/".concat(t,"?api_key=").concat(n));case 3:return c=e.sent,e.abrupt("return",c.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),B=function(){var e=Object(m.a)(d.a.mark((function e(t){var c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("getMatchId()"),e.next=3,p.a.get("https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/".concat(t,"/ids?start=0&count=").concat(3,"&api_key=").concat(n));case 3:return c=e.sent,e.abrupt("return",c.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),K=function(){var e=Object(m.a)(d.a.mark((function e(t){var c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("getMatchInfo()"),e.next=3,Promise.all(t.map(function(){var e=Object(m.a)(d.a.mark((function e(t){var c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("https://asia.api.riotgames.com/lol/match/v5/matches/".concat(t,"?api_key=").concat(n));case 2:return c=e.sent,e.abrupt("return",c.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 3:return c=e.sent,e.abrupt("return",c);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),G=function(){var e=Object(m.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("https://static.developer.riotgames.com/docs/lol/queues.json").then((function(e){X(e.data)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),U=function(){var e=Object(m.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("http://ddragon.leagueoflegends.com/cdn/11.19.1/data/en_US/summoner.json").then((function(e){L(e.data)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){t&&(G(),U(),M().then((function(e){return O(Object(u.a)({},e)),e})).then((function(e){R(e.id).then((function(e){"RANKED_SOLO_5x5"===e[0].queueType?N(Object(u.a)({},e[0])):"RANKED_SOLO_5x5"===e[1].queueType&&N(Object(u.a)({},e[1]))})).catch((function(){console.log("\ub7ad\ud06c \ub370\uc774\ud130\uc5c6\uc74c")})),B(e.puuid).then((function(e){K(e).then((function(e){y(e)})).then((function(){l(!1)}))}))})).catch((function(e){e.response?(console.log(e.response.data),console.log(e.response.status),console.log(e.response.headers)):e.request?console.log(e.request):console.log("Error",e.message),l(!1),C(!0),console.log(e.config)})))}),[t]),Object(i.jsx)("section",{children:t?Object(i.jsx)("div",{children:o?Object(i.jsx)("div",{className:"loader",children:" Loading... "}):Object(i.jsx)("div",{children:P?Object(i.jsx)("div",{children:"\ub370\uc774\ud130\ub97c \ubd88\ub7ec\uc624\uc9c0 \ubabb\ud558\uc600\uc2b5\ub2c8\ub2e4. \uad00\ub9ac\uc790\uc5d0\uac8c \ubb38\uc758\ud574\uc8fc\uc138\uc694."}):Object(i.jsxs)("div",{children:[Object(i.jsxs)("div",{className:"user_data",children:[Object(i.jsx)("img",{src:"http://ddragon.leagueoflegends.com/cdn/11.19.1/img/profileicon/".concat(f.profileIconId,".png"),alt:"\uc18c\ud658\uc0ac \uc544\uc774\ucf58",title:"\uc18c\ud658\uc0ac \uc544\uc774\ucf58"}),Object(i.jsxs)("div",{className:"user_data_info",children:[Object(i.jsxs)("div",{className:"user_data_info_name",children:["\uc774\ub984 : ",f.name]}),Object(i.jsxs)("div",{children:[" \ub808\ubca8 : ",f.summonerLevel," "]}),Object(i.jsxs)("div",{children:["\ud2f0\uc5b4 : ",x.tier," ",x.rank," ",x.leaguePoints,"\uc810"]}),Object(i.jsxs)("div",{className:"winorloss",children:[Object(i.jsxs)("div",{children:[" \uc2b9 : ",x.wins," "]}),Object(i.jsxs)("div",{children:[" \ud328 : ",x.losses," "]})]})]})]}),Object(i.jsx)("div",{children:Object(i.jsx)("div",{children:(null!==w&&void 0!==w?w:[]).map((function(e){return Object(i.jsx)(h,{info:e.info,queueIdInfoJson:q,spellInfoJson:E},e.info.gameId)}))})})]})})}):Object(i.jsx)("div",{className:"searcher",children:" \uac80\uc0c9\ud574\uc8fc\uc138\uc694 "})})},f=function(){return Object(i.jsx)("div",{children:" Producer : bosung "})},O=function(){return Object(i.jsx)("div",{children:" 010 - XXXX - XXXX "})};var g=function(){return Object(i.jsxs)("div",{children:[Object(i.jsx)(f,{}),Object(i.jsx)(O,{})]})};n(47);var v=function(){var e=Object(c.useState)(""),t=Object(r.a)(e,2),n=t[0],a=t[1];return Object(i.jsxs)("div",{className:"app",children:[Object(i.jsx)("div",{className:"header_container",children:Object(i.jsx)(o,{setNickNamae_in_header:function(e){a(e)}})}),Object(i.jsx)("div",{className:"main_container",children:Object(i.jsx)(b,{nickName:n})}),Object(i.jsx)("div",{className:"footer_container",children:Object(i.jsx)(g,{})})]})};s.a.render(Object(i.jsx)(v,{}),document.getElementById("root"))}},[[48,1,2]]]);
//# sourceMappingURL=main.b7830787.chunk.js.map