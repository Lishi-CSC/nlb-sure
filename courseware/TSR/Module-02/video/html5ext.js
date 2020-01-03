/**
 *	EasyHTML5Video JavaScript Extension API version 1.1
 *	Created by EasyHTML5Video.com
 *	Modified 16:02 12.09.2012
 *	This file content fullscreen api
 */
(function () {
    function j(s, r, i) {
        if (s.addEventListener) {
            s.addEventListener(r, i, false)
        } else {
            s.attachEvent("on" + r, i)
        }
    }
    function q(s, r, i) {
        if (s.removeEventListener) {
            s.removeEventListener(r, i)
        } else {
            s.detachEvent("on" + r, i)
        }
    }
    function m(t, s) {
        if (!t.length) {
            t = [t]
        }
        for (var u in s) {
            for (var r = 0; r < t.length; r++) {
                t[r].style[u] = s[u]
            }
        }
    }
    var h = 0,
        l = "";
    if (typeof document.cancelFullScreen != "undefined") {
        h = true
    } else {
        var e = "webkit moz o ms khtml".split(" ");
        for (var f = 0, n = e.length; f < n; f++) {
            l = e[f];
            if (typeof document[l + "CancelFullScreen"] != "undefined") {
                h = true;
                break
            }
        }
    }
    function g(i) {
        if (h) {
            switch (l) {
                case "":
                    return document.fullScreen;
                case "webkit":
                    return document.webkitIsFullScreen;
                default:
                    return document[l + "FullScreen"]
            }
        } else {
            return !!i.eh5v
        }
    }
    var k = 0;

    function c(i) {
        if (h) {
            return (l === "") ? i.requestFullScreen() : i[l + "RequestFullScreen"]()
        } else {
            if (!i) {
                return
            }
            if (k) {
                d(k)
            }
            var s = {
                position: "fixed",
                left: 0,
                top: 0,
                right: "auto",
                bottom: "auto",
                width: window.innerWidth + "px",
                height: window.innerHeight + "px",
                backgroundColor: "rgba(0,0,0,0.9)",
                border: "none",
                zIndex: 9999999
            };
            i.eh5v = {};
            for (var r in s) {
                i.eh5v[r] = i.style[r]
            }
            for (var r in s) {
                i.style[r] = s[r]
            }
            j(document.body, "keydown", o);
            k = i
        }
    }
    function d(i) {
        if (h) {
            return (l === "") ? document.cancelFullScreen() : document[l + "CancelFullScreen"]()
        } else {
            if (!i) {
                return
            }
            for (var r in i.eh5v) {
                i.style[r] = i.eh5v[r]
            }
            i.eh5v = 0;
            q(document.body, "keydown", o);
            k = 0
        }
    }
    function o(i) {
        if (i.keyCode == 27) {
            d(k)
        }
    }
    var p;

    function a(v) {
        if (v.eh5v) {
            return
        }
        v.eh5v = {
            fullScreen: function (i) {
                if (i) {
                    c(v)
                } else {
                    if (g(v)) {
                        d(v)
                    }
                }
                return g(v)
            }
        };
        if (!(/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) && !(navigator.mozVibrate)) {
            var x = /(.*\/)[^\/]+/.exec(v.poster)[1] + "fullscreen.png";
            if (!p) {
                p = new Image();
                p.src = x
            }
            var s = document.createElement("div");
            m(s, {
                position: "absolute",
                zIndex: 10,
                display: "none",
                right: "0px",
                top: "0px",
                width: "28px",
                height: "28px",
                background: 'rgba(0,0,0,0.50) url("' + x + '") 50% 50% no-repeat',
                border: "none"
            });
            v.parentNode.appendChild(s);

            function t() {
                s.style.display = "none"
            }
            j(v, "mouseover", function () {
                s.style.display = "block"
            });
            j(v, "mouseout", function () {
                t()
            });
            j(s, "mouseover", function () {
                s.style.display = "block"
            });
            j(s, "click", function () {
                c(v);
                t()
            });
            j(v, "dblclick", function () {
                if (g(v)) {
                    d(v)
                } else {
                    c(v)
                }
                setTimeout(function () {
                    t()
                }, 100)
            })
        }
        if (/Android/.test(navigator.userAgent)) {
            var w = v.getElementsByTagName("source"),
                r;
            for (var u = w.length - 1; u >= 0; u--) {
                if (!w[u].type) {
                    r = w[u].src
                } else {
                    if (r && /mp4/.test(w[u].type)) {
                        w[u].src = r;
                        v.load()
                    }
                }
            }
        }
    }
    var b = document.getElementsByTagName("video");
    for (var f = 0; f < b.length; f++) {
        a(b[f])
    }
})();

var message="You are not authorized!"; 
function clickIE4(){ 
	if (event.button==2){ 
		alert(message); return false; 
		} 
	}
	function clickNS4(e){ 
		if (document.layers||document.getElementById&&!document.all){ 
			if (e.which==2||e.which==3){ alert(message); return false; 
			} 
		}
	} if (document.layers){ 
		document.captureEvents(Event.MOUSEDOWN); 
		document.onmousedown=clickNS4; 
		} else if (document.all&&!document.getElementById){ 
		document.onmousedown=clickIE4; 
	} document.oncontextmenu=new Function("alert(message);return false") 