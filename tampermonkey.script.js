// ==UserScript==
// @name         Feat. Ghost System
// @version      0.0.4
// @author       Calculus
// @match        *://www.freeriderhd.com/*
// @grant        unsafeWindow
// @grant        GM_setClipboard
// @run-at       start
// ==/UserScript==
(function(){
    function getFeaturedGhosts(callback = () => {}){
        fetch(`https://raw.githubusercontent.com/Calculus0972/Official_Featured_Ghosts/master/ghosts.json`).then((response) => response.json()).then(json => {
            callback(json);
        });
    }
    function getFeaturedAlias(callback = () => {}){
        fetch(`https://raw.githubusercontent.com/Calculus0972/Official_Featured_Ghosts/master/alias.json`).then((response) => response.json()).then(json => {
            callback(json);
        });
    }
    var alias = {};
    getFeaturedAlias(aliases => {
        for(const a in aliases){
            alias[a] = {};
            aliases[a].forEach((b, i = 0) => {
                alias[a][b] = i++;
            })
        }
    });
    getFeaturedGhosts(ghosts => {
        var Arr = {};
        for(const a in ghosts){
            Arr[a] = [];
            var arr = [ghosts[a].fast || [], ghosts[a].trick || [], ghosts[a].auto || [], ghosts[a].vehicle || []];
            arr.forEach((e)=>{
                e.forEach((e1)=>{
                    Arr[a].push(e1);
                });
            });
            for(const c in Arr[a])
                if(parseInt(location.pathname.split("/t/")[1]) == parseInt(Arr[a][c].substring(10))) {
                    var name = a;
                    Object.keys(alias[a]).forEach(e => {
                        if(Arr[a][c].slice(-e.length) == e){
                            name = e
                        }
                    });
                    if(name.length > 15){
                        name = name.substring(0, 12) + "..."
                    }
                    for(const d in document.getElementsByClassName('track-leaderboard-race')){
                        if(document.getElementsByClassName('track-leaderboard-race')[d].innerText) {
                            if(document.getElementsByClassName('track-leaderboard-race')[d].innerText.toLowerCase() == name){
                                document.querySelectorAll('.track-leaderboard-race')[d].style.color = "#e8a923"
                            }
                        }
                    }
                }
        }
    })
})();
