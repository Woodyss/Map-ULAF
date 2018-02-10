function cuSel(b) {
    jQuery(b.changedEl).each(function(h) {
        var k = jQuery(this),
            g = k.outerWidth(),
            p = k.prop("class"),
            y = k.prop("id"),
            w = k.prop("name"),
            t = k.val(),
            d = k.find("option[value='" + t + "']").eq(0),
            r = d.text(),
            q = k.prop("disabled"),
            v = b.scrollArrows,
            m = k.data("events"),
            j = (m && m.change) ? m.change[0].handler : null;
        chElTab = k.prop("tabindex"), chElMultiple = k.prop("multiple");
        if (!y || chElMultiple) {
            return false
        }
        if (!q) {
            classDisCuselText = "", classDisCusel = ""
        } else {
            classDisCuselText = "classDisCuselLabel";
            classDisCusel = "classDisCusel"
        }
        if (v) {
            classDisCusel += " cuselScrollArrows"
        }
        d.addClass("cuselActive");
        var o = k.html(),
            l = o.replace(/option/ig, "span").replace(/value=/ig, "val=");
        if ($.browser.msie && parseInt($.browser.version) < 9) {
            var u = /(val=)(.*?)(>)/g;
            l = l.replace(u, "$1'$2'$3")
        }
        var s = '<div class="cusel ' + p + " " + classDisCusel + '" id=cuselFrame-' + y + ' style="width:' + g + 'px" tabindex="' + chElTab + '"><div class="cuselFrameRight"></div><div class="cuselText">' + r + '</div><div class="cusel-scroll-wrap"><div class="cusel-scroll-pane" id="cusel-scroll-' + y + '">' + l + '</div></div><input type="hidden" id="' + y + '" name="' + w + '" value="' + t + '" /></div>';
        s = $(s);
        jQuery.each(["required", "autofocus", "form"], function() {
            var z = this.toString();
            if (k.attr(z)) {
                s.find("input").attr(z, k.attr(z))
            }
        });
        k.replaceWith(s);
        if (j) {
            jQuery("#" + y).bind("change", j)
        }
        var n = jQuery("#cuselFrame-" + y),
            c = n.find("span"),
            e;
        if (!c.eq(0).text()) {
            e = c.eq(1).innerHeight();
            c.eq(0).css("height", c.eq(1).height())
        } else {
            e = c.eq(0).innerHeight()
        }
        if (c.length > b.visRows) {
            n.find(".cusel-scroll-wrap").eq(0).css({
                height: e * b.visRows + "px",
                display: "none",
                visibility: "visible"
            }).children(".cusel-scroll-pane").css("height", e * b.visRows + "px")
        } else {
            n.find(".cusel-scroll-wrap").eq(0).css({
                display: "none",
                visibility: "visible"
            })
        }
        var x = jQuery("#cusel-scroll-" + y).find("span[addTags]"),
            f = x.length;
        for (i = 0; i < f; i++) {
            x.eq(i).append(x.eq(i).attr("addTags")).removeAttr("addTags")
        }
        a()
    });

    function a() {
        jQuery("html").unbind("click");
        jQuery("html").click(function(h) {
            var f = jQuery(h.target),
                k = f.attr("id"),
                j = f.prop("class");
            if ((j.indexOf("cuselText") != -1 || j.indexOf("cuselFrameRight") != -1) && f.parent().prop("class").indexOf("classDisCusel") == -1) {
                var g = f.parent().find(".cusel-scroll-wrap").eq(0);
                cuselShowList(g)
            } else {
                if (j.indexOf("cusel") != -1 && j.indexOf("classDisCusel") == -1 && f.is("div")) {
                    var g = f.find(".cusel-scroll-wrap").eq(0);
                    cuselShowList(g)
                } else {
                    if (f.is(".cusel-scroll-wrap span") && j.indexOf("cuselActive") == -1) {
                        var d;
                        (f.attr("val") == undefined) ? d = f.text(): d = f.attr("val");
                        f.parents(".cusel-scroll-wrap").find(".cuselActive").eq(0).removeClass("cuselActive").end().parents(".cusel-scroll-wrap").parent().find("input").val(d).end().find(".cuselText").text(f.text()).end().end().css("display", "none").parent(".cusel").removeClass("cuselOpen");
                        f.addClass("cuselActive");
                        f.parents(".cusel-scroll-wrap").find(".cuselOptHover").removeClass("cuselOptHover");
                        if (j.indexOf("cuselActive") == -1) {
                            f.parents(".cusel").find(".cusel-scroll-wrap").eq(0).next("input").change()
                        }
                    } else {
                        if (f.parents(".cusel-scroll-wrap").is("div")) {
                            return
                        } else {
                            jQuery(".cusel-scroll-wrap").css("display", "none").parent(".cusel").removeClass("cuselOpen")
                        }
                    }
                }
            }
        });
        jQuery(".cusel").unbind("keydown");
        jQuery(".cusel").keydown(function(f) {
            var l, n;
            if (window.event) {
                l = window.event.keyCode
            } else {
                if (f) {
                    l = f.which
                }
            }
            if (l == null || l == 0 || l == 9) {
                return true
            }
            if (jQuery(this).prop("class").indexOf("classDisCusel") != -1) {
                return false
            }
            if (l == 40) {
                var g = jQuery(this).find(".cuselOptHover").eq(0);
                if (!g.is("span")) {
                    var m = jQuery(this).find(".cuselActive").eq(0)
                } else {
                    var m = g
                }
                var j = m.next();
                if (j.is("span")) {
                    jQuery(this).find(".cuselText").eq(0).text(j.text());
                    m.removeClass("cuselOptHover");
                    j.addClass("cuselOptHover");
                    $(this).find("input").eq(0).val(j.attr("val"));
                    cuselScrollToCurent($(this).find(".cusel-scroll-wrap").eq(0));
                    return false
                } else {
                    return false
                }
            }
            if (l == 38) {
                var g = $(this).find(".cuselOptHover").eq(0);
                if (!g.is("span")) {
                    var m = $(this).find(".cuselActive").eq(0)
                } else {
                    var m = g
                }
                cuselActivePrev = m.prev();
                if (cuselActivePrev.is("span")) {
                    $(this).find(".cuselText").eq(0).text(cuselActivePrev.text());
                    m.removeClass("cuselOptHover");
                    cuselActivePrev.addClass("cuselOptHover");
                    $(this).find("input").eq(0).val(cuselActivePrev.attr("val"));
                    cuselScrollToCurent($(this).find(".cusel-scroll-wrap").eq(0));
                    return false
                } else {
                    return false
                }
            }
            if (l == 27) {
                var e = $(this).find(".cuselActive").eq(0).text();
                $(this).removeClass("cuselOpen").find(".cusel-scroll-wrap").eq(0).css("display", "none").end().find(".cuselOptHover").eq(0).removeClass("cuselOptHover");
                $(this).find(".cuselText").eq(0).text(e)
            }
            if (l == 13) {
                var d = $(this).find(".cuselOptHover").eq(0);
                if (d.is("span")) {
                    $(this).find(".cuselActive").removeClass("cuselActive");
                    d.addClass("cuselActive")
                } else {
                    var k = $(this).find(".cuselActive").attr("val")
                }
                $(this).removeClass("cuselOpen").find(".cusel-scroll-wrap").eq(0).css("display", "none").end().find(".cuselOptHover").eq(0).removeClass("cuselOptHover");
                $(this).find("input").eq(0).change()
            }
            if (l == 32 && $.browser.opera) {
                var h = $(this).find(".cusel-scroll-wrap").eq(0);
                cuselShowList(h)
            }
            if ($.browser.opera) {
                return false
            }
        });
        var c = [];
        jQuery(".cusel").keypress(function(g) {
            var d, f;
            if (window.event) {
                d = window.event.keyCode
            } else {
                if (g) {
                    d = g.which
                }
            }
            if (d == null || d == 0 || d == 9) {
                return true
            }
            if (jQuery(this).prop("class").indexOf("classDisCusel") != -1) {
                return false
            }
            var j = this;
            c.push(g);
            clearTimeout(jQuery.data(this, "timer"));
            var h = setTimeout(function() {
                e()
            }, 500);
            jQuery(this).data("timer", h);

            function e() {
                var k = [];
                for (var m in c) {
                    if (window.event) {
                        k[m] = c[m].keyCode
                    } else {
                        if (c[m]) {
                            k[m] = c[m].which
                        }
                    }
                    k[m] = String.fromCharCode(k[m]).toUpperCase()
                }
                var r = jQuery(j).find("span"),
                    p = r.length,
                    o, q;
                for (o = 0; o < p; o++) {
                    var n = true;
                    for (var l in c) {
                        q = r.eq(o).text().charAt(l).toUpperCase();
                        if (q != k[l]) {
                            n = false
                        }
                    }
                    if (n) {
                        jQuery(j).find(".cuselOptHover").removeClass("cuselOptHover").end().find("span").eq(o).addClass("cuselOptHover").end().end().find(".cuselText").eq(0).text(r.eq(o).text());
                        cuselScrollToCurent($(j).find(".cusel-scroll-wrap").eq(0));
                        c = c.splice;
                        c = [];
                        break;
                        return true
                    }
                }
                c = c.splice;
                c = []
            }
            if (jQuery.browser.opera && window.event.keyCode != 9) {
                return false
            }
        })
    }
    jQuery(".cusel").focus(function() {
        jQuery(this).addClass("cuselFocus")
    });
    jQuery(".cusel").blur(function() {
        jQuery(this).removeClass("cuselFocus")
    });
    jQuery(".cusel").hover(function() {
        jQuery(this).addClass("cuselFocus")
    }, function() {
        jQuery(this).removeClass("cuselFocus")
    })
}

function cuSelRefresh(g) {
    var d = g.refreshEl.split(","),
        b = d.length,
        e;
    for (e = 0; e < b; e++) {
        var c = jQuery(d[e]).parents(".cusel").find(".cusel-scroll-wrap").eq(0);
        c.find(".cusel-scroll-pane").jScrollPaneRemoveCusel();
        c.css({
            visibility: "hidden",
            display: "block"
        });
        var a = c.find("span"),
            f = a.eq(0).outerHeight();
        if (a.length > g.visRows) {
            c.css({
                height: f * g.visRows + "px",
                display: "none",
                visibility: "visible"
            }).children(".cusel-scroll-pane").css("height", f * g.visRows + "px")
        } else {
            c.css({
                display: "none",
                visibility: "visible"
            })
        }
    }
}

function cuselShowList(b) {
    var a = b.parent(".cusel");
    if (b.css("display") == "none") {
        $(".cusel-scroll-wrap").css("display", "none");
        a.addClass("cuselOpen");
        b.css("display", "block");
        var c = false;
        if (a.prop("class").indexOf("cuselScrollArrows") != -1) {
            c = true
        }
        if (!b.find(".jScrollPaneContainer").eq(0).is("div")) {
            b.find("div").eq(0).jScrollPaneCusel({
                showArrows: c
            })
        }
        cuselScrollToCurent(b)
    } else {
        b.css("display", "none");
        a.removeClass("cuselOpen")
    }
}

function cuselScrollToCurent(b) {
    var d = null;
    if (b.find(".cuselOptHover").eq(0).is("span")) {
        d = b.find(".cuselOptHover").eq(0)
    } else {
        if (b.find(".cuselActive").eq(0).is("span")) {
            d = b.find(".cuselActive").eq(0)
        }
    }
    if (b.find(".jScrollPaneTrack").eq(0).is("div") && d) {
        var a = d.position(),
            c = b.find(".cusel-scroll-pane").eq(0).attr("id");
        jQuery("#" + c)[0].scrollTo(a.top)
    }
}(function(a) {
    a.jScrollPaneCusel = {
        active: []
    };
    a.fn.jScrollPaneCusel = function(c) {
        c = a.extend({}, a.fn.jScrollPaneCusel.defaults, c);
        var b = function() {
            return false
        };
        return this.each(function() {
            var r = a(this);
            var M = this.parentNode.offsetWidth;
            r.css("overflow", "hidden");
            var A = this;
            if (a(this).parent().is(".jScrollPaneContainer")) {
                var af = c.maintainPosition ? r.position().top : 0;
                var n = a(this).parent();
                var G = M;
                var ag = n.outerHeight();
                var o = ag;
                a(">.jScrollPaneTrack, >.jScrollArrowUp, >.jScrollArrowDown", n).remove();
                r.css({
                    top: 0
                })
            } else {
                var af = 0;
                this.originalPadding = r.css("paddingTop") + " " + r.css("paddingRight") + " " + r.css("paddingBottom") + " " + r.css("paddingLeft");
                this.originalSidePaddingTotal = (parseInt(r.css("paddingLeft")) || 0) + (parseInt(r.css("paddingRight")) || 0);
                var G = M;
                var ag = r.innerHeight();
                var o = ag;
                r.wrap("<div class='jScrollPaneContainer'></div>").parent().css({
                    height: ag + "px",
                    width: G + "px"
                });
                if (!window.navigator.userProfile) {
                    var g = parseInt(a(this).parent().css("border-left-width")) + parseInt(a(this).parent().css("border-right-width"));
                    G -= g;
                    a(this).css("width", G + "px").parent().css("width", G + "px")
                }
                a(document).bind("emchange", function(ah, ai, p) {
                    r.jScrollPaneCusel(c)
                })
            }
            if (c.reinitialiseOnImageLoad) {
                var q = a.data(A, "jScrollPaneImagesToLoad") || a("img", r);
                var h = [];
                if (q.length) {
                    q.each(function(p, ah) {
                        a(this).bind("load", function() {
                            if (a.inArray(p, h) == -1) {
                                h.push(ah);
                                q = a.grep(q, function(aj, ai) {
                                    return aj != ah
                                });
                                a.data(A, "jScrollPaneImagesToLoad", q);
                                c.reinitialiseOnImageLoad = false;
                                r.jScrollPaneCusel(c)
                            }
                        }).each(function(ai, aj) {
                            if (this.complete || this.complete === undefined) {
                                this.src = this.src
                            }
                        })
                    })
                }
            }
            var S = this.originalSidePaddingTotal;
            var P = {
                height: "auto",
                width: G - c.scrollbarWidth - c.scrollbarMargin - S + "px"
            };
            if (c.scrollbarOnLeft) {
                P.paddingLeft = c.scrollbarMargin + c.scrollbarWidth + "px"
            } else {
                P.paddingRight = c.scrollbarMargin + "px"
            }
            r.css(P);
            var Q = r.outerHeight();
            var L = ag / Q;
            if (L < 0.99) {
                var j = r.parent();
                j.append(a('<div class="jScrollPaneTrack"></div>').css({
                    width: c.scrollbarWidth + "px"
                }).append(a('<div class="jScrollPaneDrag"></div>').css({
                    width: c.scrollbarWidth + "px"
                }).append(a('<div class="jScrollPaneDragTop"></div>').css({
                    width: c.scrollbarWidth + "px"
                }), a('<div class="jScrollPaneDragBottom"></div>').css({
                    width: c.scrollbarWidth + "px"
                }))));
                var ac = a(">.jScrollPaneTrack", j);
                var s = a(">.jScrollPaneTrack .jScrollPaneDrag", j);
                if (c.showArrows) {
                    var J;
                    var ae;
                    var v;
                    var U;
                    var N = function() {
                        if (U > 4 || U % 4 == 0) {
                            ab(Y + ae * E)
                        }
                        U++
                    };
                    var m = function(p) {
                        a("html").unbind("mouseup", m);
                        J.removeClass("jScrollActiveArrowButton");
                        clearInterval(v)
                    };
                    var C = function() {
                        a("html").bind("mouseup", m);
                        J.addClass("jScrollActiveArrowButton");
                        U = 0;
                        N();
                        v = setInterval(N, 100)
                    };
                    j.append(a("<div></div>").attr({
                        "class": "jScrollArrowUp"
                    }).css({
                        width: c.scrollbarWidth + "px"
                    }).bind("mousedown", function() {
                        J = a(this);
                        ae = -1;
                        C();
                        this.blur();
                        return false
                    }).bind("click", b), a("<div></div>").attr({
                        "class": "jScrollArrowDown"
                    }).css({
                        width: c.scrollbarWidth + "px"
                    }).bind("mousedown", function() {
                        J = a(this);
                        ae = 1;
                        C();
                        this.blur();
                        return false
                    }).bind("click", b));
                    var t = a(">.jScrollArrowUp", j);
                    var l = a(">.jScrollArrowDown", j);
                    if (c.arrowSize) {
                        o = ag - c.arrowSize - c.arrowSize;
                        ac.css({
                            height: o + "px",
                            top: c.arrowSize + "px"
                        })
                    } else {
                        var V = t.height();
                        c.arrowSize = V;
                        o = ag - V - l.height();
                        ac.css({
                            height: o + "px",
                            top: V + "px"
                        })
                    }
                }
                var Z = a(this).css({
                    position: "absolute",
                    overflow: "visible"
                });
                var d;
                var B;
                var E;
                var Y = 0;
                var y = L * ag / 2;
                var D = function(ah, aj) {
                    var ai = aj == "X" ? "Left" : "Top";
                    return ah["page" + aj] || (ah["client" + aj] + (document.documentElement["scroll" + ai] || document.body["scroll" + ai])) || 0
                };
                var I = function() {
                    return false
                };
                var X = function() {
                    R();
                    d = s.offset(false);
                    d.top -= Y;
                    B = o - s[0].offsetHeight;
                    E = 2 * c.wheelSpeed * B / Q
                };
                var e = function(p) {
                    X();
                    y = D(p, "Y") - Y - d.top;
                    a("html").bind("mouseup", w).bind("mousemove", K);
                    if (a.browser.msie) {
                        a("html").bind("dragstart", I).bind("selectstart", I)
                    }
                    return false
                };
                var w = function() {
                    a("html").unbind("mouseup", w).unbind("mousemove", K);
                    y = L * ag / 2;
                    if (a.browser.msie) {
                        a("html").unbind("dragstart", I).unbind("selectstart", I)
                    }
                };
                var ab = function(ah) {
                    ah = ah < 0 ? 0 : (ah > B ? B : ah);
                    Y = ah;
                    s.css({
                        top: ah + "px"
                    });
                    var ai = ah / B;
                    Z.css({
                        top: ((ag - Q) * ai) + "px"
                    });
                    r.trigger("scroll");
                    if (c.showArrows) {
                        t[ah == 0 ? "addClass" : "removeClass"]("disabled");
                        l[ah == B ? "addClass" : "removeClass"]("disabled")
                    }
                };
                var K = function(p) {
                    ab(D(p, "Y") - d.top - y)
                };
                var T = Math.max(Math.min(L * (ag - c.arrowSize * 2), c.dragMaxHeight), c.dragMinHeight);
                s.css({
                    height: T + "px"
                }).bind("mousedown", e);
                var O;
                var u;
                var k;
                var W = function() {
                    if (u > 8 || u % 4 == 0) {
                        ab((Y - ((Y - k) / 2)))
                    }
                    u++
                };
                var ad = function() {
                    clearInterval(O);
                    a("html").unbind("mouseup", ad).unbind("mousemove", H)
                };
                var H = function(p) {
                    k = D(p, "Y") - d.top - y
                };
                var x = function(p) {
                    X();
                    H(p);
                    u = 0;
                    a("html").bind("mouseup", ad).bind("mousemove", H);
                    O = setInterval(W, 100);
                    W()
                };
                ac.bind("mousedown", x);
                j.bind("mousewheel", function(ah, aj) {
                    X();
                    R();
                    var ai = Y;
                    ab(Y - aj * E);
                    var p = ai != Y;
                    return false
                });
                var f;
                var z;

                function F() {
                    var p = (f - Y) / c.animateStep;
                    if (p > 1 || p < -1) {
                        ab(Y + p)
                    } else {
                        ab(f);
                        R()
                    }
                }
                var R = function() {
                    if (z) {
                        clearInterval(z);
                        delete f
                    }
                };
                var aa = function(ai, p) {
                    if (typeof ai == "string") {
                        $e = a(ai, r);
                        if (!$e.length) {
                            return
                        }
                        ai = $e.offset().top - r.offset().top
                    }
                    j.scrollTop(0);
                    R();
                    var ah = -ai / (ag - Q) * B;
                    if (p || !c.animateTo) {
                        ab(ah)
                    } else {
                        f = ah;
                        z = setInterval(F, c.animateInterval)
                    }
                };
                r[0].scrollTo = aa;
                r[0].scrollBy = function(ah) {
                    var p = -parseInt(Z.css("top")) || 0;
                    aa(p + ah)
                };
                X();
                aa(-af, true);
                a("*", this).bind("focus", function(ak) {
                    var aj = a(this);
                    var am = 0;
                    while (aj[0] != r[0]) {
                        am += aj.position().top;
                        aj = aj.offsetParent()
                    }
                    var p = -parseInt(Z.css("top")) || 0;
                    var al = p + ag;
                    var ai = am > p && am < al;
                    if (!ai) {
                        var ah = am - c.scrollbarMargin;
                        if (am > p) {
                            ah += a(this).height() + 15 + c.scrollbarMargin - ag
                        }
                        aa(ah)
                    }
                });
                if (location.hash) {
                    aa(location.hash)
                }
                a(document).bind("click", function(ah) {
                    $target = a(ah.target);
                    if ($target.is("a")) {
                        var p = $target.attr("href");
                        if (p.substr(0, 1) == "#") {
                            aa(p)
                        }
                    }
                });
                a.jScrollPaneCusel.active.push(r[0])
            } else {
                r.css({
                    height: ag + "px",
                    width: G - this.originalSidePaddingTotal + "px",
                    padding: this.originalPadding
                });
                r.parent().unbind("mousewheel")
            }
        })
    };
    a.fn.jScrollPaneRemoveCusel = function() {
        a(this).each(function() {
            $this = a(this);
            var b = $this.parent();
            if (b.is(".jScrollPaneContainer")) {
                $this.css({
                    top: "",
                    height: "",
                    width: "",
                    padding: "",
                    overflow: "",
                    position: ""
                });
                $this.attr("style", $this.data("originalStyleTag"));
                b.after($this).remove()
            }
        })
    };
    a.fn.jScrollPaneCusel.defaults = {
        scrollbarWidth: 10,
        scrollbarMargin: 5,
        wheelSpeed: 18,
        showArrows: true,
        arrowSize: 0,
        animateTo: false,
        dragMinHeight: 1,
        dragMaxHeight: 99999,
        animateInterval: 100,
        animateStep: 3,
        maintainPosition: true,
        scrollbarOnLeft: false,
        reinitialiseOnImageLoad: false
    };
    a(window).bind("unload", function() {
        var c = a.jScrollPaneCusel.active;
        for (var b = 0; b < c.length; b++) {
            c[b].scrollTo = c[b].scrollBy = null
        }
    })
})(jQuery);