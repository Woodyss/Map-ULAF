var slideShowDelay = 6000;

function extend(b, a) {
    var c = function() {};
    c.prototype = a.prototype;
    b.prototype = new c();
    b.prototype.constructor = b;
    b.superclass = a.prototype
}
DATEPICKER_FORMAT = "yy-mm-dd";

function dateToStr(a) {
    return (a.getFullYear() * 10000 + (a.getMonth() + 1) * 100 + a.getDate()) + ""
}

function strToDate(a) {
    return new Date(parseInt(a.slice(0, 4), 10), parseInt(a.slice(4, 6), 10) - 1, parseInt(a.slice(6, 8), 10))
}

function getCookie(a) {
    var c = $.cookie(a);
    var b = {};
    $.each(decodeURIComponent(c).split("&"), function(d, e) {
        b[e.split("=")[0]] = e.split("=")[1]
    });
    return b
}

function setCookie(a, c) {
    values = [];
    for (var b in c) {
        values.push(b + "=" + c[b])
    }
    values = values.join("&");
    $.cookie(a, values, {
        path: "/"
    })
}
Date.prototype.getMonthes = function(a) {
    var b = {
        ru: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        uk: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"]
    };
    return b[a]
};
Date.prototype.getShortDays = function(a) {
    var b = {
        ru: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
        en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        uk: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"]
    };
    return b[a]
};
Date.prototype.getMonthName = function(a) {
    return this.getMonthes(a)[this.getMonth()]
};
Date.prototype.setZeroTime = function() {
    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);
    this.setMilliseconds(0);
    return this
};
PHONE_MASK = "+38 (999) 999-99-99";

function hideSelects(c, a) {
    var b = [".open-select-place", ".open-select-type", ".currency-open"];
    $.each(b, function() {
        if (this.toString() !== c) {
            $(this.toString()).hide()
        }
    });
    if (!a) {
        $(".cuselOpen").trigger("click")
    }
}

function setSiteCurrency(a) {
    $("html").removeClass("site-cur-uah").removeClass("site-cur-usd").removeClass("site-cur-eur").addClass("site-cur-" + a);
    $.cookie("selected_currency", a, {
        path: "/"
    });
    $(".header-menu .currency-in").text($(".header-menu .currency-open a[data-cur=" + a + "]").text())
}

function getSiteCurrency() {
    if (!$.cookie("selected_currency")) {
        if (settings.lang == "en") {
            setSiteCurrency("usd")
        } else {
            setSiteCurrency("uah")
        }
    }
    if ($("html").hasClass("site-cur-eur")) {
        return "eur"
    }
    if ($("html").hasClass("site-cur-usd")) {
        return "usd"
    }
    if ($("html").hasClass("site-cur-uah")) {
        return "uah"
    }
}
$(function() {
    getSiteCurrency();
    $("body").click(function(b) {
        hideSelects("", true)
    });
    $("#cities").change(function() {
        var b = $(".cities-block form").data("url").format({
            city: $(this).val()
        });
        window.location.href = b
    });
    $(".block-cities-bot .more-btn, .block-cities-bot .less-btn").click(function(b) {
        b.preventDefault();
        $(".other_cities_more").slideToggle("slow");
        $(".block-cities-bot .more-btn, .block-cities-bot .less-btn").toggle()
    });
    $(".qt-bot .more-btn, .qt-bot .less-btn, .fast-links-more .more-btn, .fast-links-more .less-btn").click(function(b) {
        b.preventDefault();
        $(".areas-more, .types-more").slideToggle("slow");
        $(this).parent().find(".more-btn, .less-btn").toggle()
    });
    $(".am-bot .more-btn, .am-bot .less-btn").click(function(b) {
        b.preventDefault();
        $(".about-mini-more").slideToggle("slow");
        $(".am-bot .more-btn, .am-bot .less-btn").toggle()
    });
    $(".header-menu .currency-in").click(function(b) {
        b.stopPropagation();
        $(".currency-open").toggle();
        hideSelects(".currency-open")
    });
    $(".header-menu .currency-open a").click(function(d) {
        d.preventDefault();
        var b = $(this).attr("data-cur");
        var c = $(this).text();
        if ($(".currency *[data-currency=" + b + "]").length) {
            $(".currency *[data-currency=" + b + "]").trigger("click")
        } else {
            $(".header-menu .currency-in").text(c);
            setSiteCurrency(b)
        }
    });
    $.each($("#options-form .checkbox input:checked, .checkbox-container .checkbox input:checked"), function() {
        $(this).parent().trigger("click")
    });
    $(".checkbox").on("click", function(b) {
        if (b.target == this) {
            var c = $(this).find("input");
            c.attr("checked") ? c.removeAttr("checked") : c.attr("checked", true);
            c.change();
            b.preventDefault()
        }
    });
    $(".checkbox input").on("change", function(b) {
        updateCheckbox(this)
    });
    $("body").on("click", "label", function(d) {
        var b = $(this).attr("for"),
            c = document.getElementById(b);
        if (c) {
            d.preventDefault();
            $(c).click().change()
        }
    }).on("change", "input[type=checkbox]", function() {
        if ($(this).is(":checked")) {
            $(this).addClass("checked")
        } else {
            $(this).removeClass("checked")
        }
    });
    $(".checkbox input").each(function(b, c) {
        updateCheckbox(c)
    });
    $("body").on("click", ".captcha-refresh", function() {
        var b = this;
        $.getJSON("/recaptcha", function(f) {
            var d = $(b).parents(".captcha-root");
            var c = d.find("input[name='captcha_id']").attr("id");
            d.find("input[name='captcha_id']").attr({
                id: f.id,
                value: f.id
            });
            var e = d.find("img").attr("src");
            d.find("img").attr("src", e.replace(c, f.id))
        });
        return false
    });
    if ($("#city_selector").size() > 0) {
        var a = $("#city_selector").data("url-struct");
        $("#city_selector").city_select({
            select: function(c, d) {
                var b = a.format(d.item.id);
                window.location = b
            },
        })
    }
});
(function(e) {
    var d = new $.Deferred(),
        b = window.location.href.split("#")[0] + "/get_cities.json";

    function a(h) {
        d.done(h);
        if (!d.isResolved()) {
            $.getJSON(b, function(k) {
                var i = k.cities;
                var j = function(m, l) {
                    if (m.oblast > l.oblast) {
                        return 1
                    }
                    if (m.oblast < l.oblast) {
                        return -1
                    }
                    if (m.oblast == l.oblast) {
                        return 0
                    }
                };
                i.sort(j);
                d.resolve(i)
            })
        }
    }

    function f(j, h, i, k) {
        a(function(m) {
            console.log("before", m);
            var l = settings.flats_skin == "doba" ? "main_catalog" : "online_catalog";
            if (i) {
                m = $.map(m, function(n) {
                    if (n[l]) {
                        return n
                    }
                })
            }
            console.log("after", m, l);
            g(m, j, h, k)
        })
    }

    function g(i, n, h, o) {
        var l = ["en", "ru", "uk"],
            k = settings.lang;
        l.sort(function(q, p) {
            if (q == k) {
                return -1
            }
            if (p == k) {
                return 1
            }
            return 0
        });
        var m;
        if (h) {
            m = new RegExp("^" + $.ui.autocomplete.escapeRegex(n) + "$", "i")
        } else {
            m = new RegExp($.ui.autocomplete.escapeRegex(n), "i")
        }
        var j = $.map(i, function(q) {
            var p;
            $.each(l, function() {
                if (m.test(q[this])) {
                    p = q[this];
                    return false
                }
            });
            if (p) {
                return {
                    label: p,
                    value: p,
                    start: p.toString().indexOf(n) === 0,
                    category: !n && q.oblast,
                    id: q.id
                }
            }
        });
        j.sort(function(q, p) {
            if (q.start === p.start) {
                return 0
            }
            if (q.start) {
                return -1
            }
            if (p.start) {
                return 1
            }
        });
        o(j)
    }
    $.widget("flats.city_select", $.ui.autocomplete, {
        options: {
            delay: 0,
            minLength: 1,
            position: {
                my: "left top-5",
                at: "left bottom",
                offset: "0 -5"
            },
            source: function(i, h) {
                f(i.term, false, true, function(j) {
                    if (j && i.term) {
                        $.each(j, function() {
                            this.label = this.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(i.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>")
                        })
                    }
                    h(j)
                })
            },
            change: function(h, i) {},
            ulCSSClass: "filter-complete"
        },
        _renderMenu: function(j, i) {
            var k = this,
                h = "";
            if (this.options.ulCSSClass) {
                $(j).addClass(this.options.ulCSSClass)
            }
            $.each(i, function(l, m) {
                if (m.category != h && m.category) {
                    j.append("<li class='ui-autocomplete-category'>" + m.category + "</li>");
                    h = m.category
                }
                k._renderItemData(j, m)
            })
        },
        _renderItem: function(h, i) {
            return $("<li>").append("<a>" + i.label + "</a>").appendTo(h)
        },
        _create: function() {
            this._super()
        }
    });
    $.widget("flats.city_suggest", $.ui.autocomplete, {
        _renderMenu: function(j, i) {
            var k = this,
                h = "";
            if (this.options.ulCSSClass) {
                $(j).addClass(this.options.ulCSSClass)
            }
            $.each(i, function(l, m) {
                if (m.category != h && m.category) {
                    j.append("<li class='ui-autocomplete-category'>" + m.category + "</li>");
                    h = m.category
                }
                k._renderItemData(j, m)
            })
        },
        _renderItem: function(h, i) {
            return $("<li>").append("<a>" + i.label + "</a>").appendTo(h)
        }
    });
    $.widget("flats.flatdaterange", {
        options: {
            arrivalId: "booking-from",
            departureId: "booking-to",
            css: {
                booked: "ui-state-booked",
                outside: "ui-state-outside",
                minDaysTillRes: "ui-state-min-days-till-res",
                notAvailable: "ui-state-not-available",
                arrival: "ui-state-arrival-day",
                selected: "ui-selected-period"
            },
            transDays: null,
            translation: {
                available: "",
                booked: "",
                notAvailable: "",
                minOnlineDays: "",
                bookedInTheMiddle: ""
            },
            bookingDecision: null,
            onSelect: function() {}
        },
        _create: function() {
            this.$arrivalInput = $("#" + this.options.arrivalId);
            this.$departureInput = $("#" + this.options.departureId);
            var m = (new Date()).getShortDays(settings.lang);
            m.unshift(m.pop());
            var i = {
                    monthNames: new Date().getMonthes(settings.lang),
                    dayNamesMin: m,
                    dateFormat: "yy-mm-dd",
                    minDate: 0,
                    duration: "normal",
                    firstDay: 1
                },
                h = this;
            this.$arrivalInput.datepicker($.extend({}, i, {
                onSelect: function(n, o) {
                    h.onArrivalSelect(n, o)
                },
                beforeShowDay: function(n) {
                    return h.arrivalShowDay(n)
                },
            })).datepicker("widget").addClass("flatsrange-picker");
            this.$departureInput.datepicker($.extend({}, i, {
                onSelect: function(n, o) {
                    h.onDepartureSelect(n, o)
                },
                beforeShow: function(n) {
                    if (!h.$arrivalInput.val()) {
                        return false
                    }
                },
                beforeShowDay: function(n) {
                    return h.departureShowDay(n)
                },
            })).datepicker("widget").addClass("flatsrange-picker").on("mouseenter", "td", function() {
                var q = h.$arrivalInput.datepicker("getDate"),
                    p = null;
                $.each($(this).attr("class").split(/\ +/g), function() {
                    var s = (/^ui-date-(.*)$/g).test(this);
                    if (s) {
                        p = this;
                        return false
                    }
                    return true
                });
                if (!p) {
                    return
                }
                var o = $.datepicker.parseDate("yy-mm-dd", p.replace("ui-date-", ""));
                if (q && o) {
                    if (!h.options.bookingDecision.checkRange(q, o)) {
                        return
                    }
                    if (q <= o) {
                        var n = q,
                            r = [];
                        while (n <= o) {
                            r.push(".ui-date-" + $.datepicker.formatDate("yy-mm-dd", n));
                            n.setDate(n.getDate() + 1)
                        }
                        h.$departureInput.datepicker("widget").find("td").removeClass("ui-selected-period").end().find(r.join(", ")).addClass("ui-selected-period")
                    }
                }
            }).on("mouseleave", "td", function() {
                if (!h.$departureInput.datepicker("getDate")) {
                    h.$departureInput.datepicker("widget").find("td").removeClass("ui-selected-period")
                }
            }).on("mouseleave", ".ui-datepicker-calendar", function() {
                var p = h.$arrivalInput.datepicker("getDate");
                var n = h.$departureInput.datepicker("getDate");
                if (p && n) {
                    var o = [];
                    while (p < n) {
                        o.push(".ui-date-" + $.datepicker.formatDate("yy-mm-dd", p));
                        p.setDate(p.getDate() + 1)
                    }
                    h.$departureInput.datepicker("widget").find("td").removeClass("ui-selected-period").end().find(o.join(", ")).addClass("ui-selected-period")
                }
            });
            this.$departureInput.focus(function(n) {
                if (!h.$arrivalInput.val()) {
                    h.$arrivalInput.datepicker("show")
                }
            });
            var l = this.options.bookingDecision.getDates();
            if (l.arrival && l.departure) {
                var k = l.arrival;
                var j = l.departure;
                this.$arrivalInput.datepicker("setDate", k);
                this.$departureInput.datepicker("setDate", j)
            }
        },
        onArrivalSelect: function() {
            $.datepicker._clearDate(this.$departureInput);
            this.$departureInput.datepicker("option", "minDate", new Date(this.$arrivalInput.datepicker("getDate")));
            var h = this;
            window.setTimeout(function() {
                h.$departureInput.datepicker("show")
            }, 100);
            this.updateDates()
        },
        onDepartureSelect: function() {
            this.updateDates()
        },
        updateDates: function() {
            var i = this.$arrivalInput.datepicker("getDate");
            var h = this.$departureInput.datepicker("getDate");
            this.options.bookingDecision.setDates(i, h);
            this.options.onSelect(i, h)
        },
        arrivalShowDay: function(h) {
            var k = this.options.bookingDecision.arrivalDayState(h);
            var j = this.options.bookingDecision.minOnlineDays;
            var i = "{0} {1}".format(j, this.options.transDays.get(j));
            if (!k.active && k.reason == "Outside") {
                return [k.active, this.options.css.outside, this.options.translation.notAvailable]
            }
            if (!k.active && k.reason == "Booked") {
                return [k.active, this.options.css.booked, this.options.translation.booked]
            }
            if (!k.active && k.reason == "MinDaysTillRes") {
                return [k.active, this.options.css.minDaysTillRes, this.options.translation.notAvailable]
            }
            if (!k.active && k.reason == "MinOnlineDays") {
                return [k.active, this.options.css.notAvailable, this.options.translation.minOnlineDays.format(i)]
            }
            if (k.active) {
                return [true, "", this.options.translation.available]
            }
            return [false, "", this.options.translation.available]
        },
        departureShowDay: function(i) {
            var n = this.$arrivalInput.datepicker("getDate");
            var h = this.$departureInput.datepicker("getDate");
            var l = this.options.bookingDecision.departureDayState(n, i);
            var m = "ui-date-" + $.datepicker.formatDate("yy-mm-dd", i);
            var k = this.options.bookingDecision.minOnlineDays;
            var j = "{0} {1}".format(k, this.options.transDays.get(k));
            if (!l.active && l.reason == "Outside") {
                return [l.active, this.options.css.outside + " " + m, this.options.translation.notAvailable]
            }
            if (!l.active && l.reason == "BookedInTheMiddle") {
                return [l.active, m, this.options.translation.bookedInTheMiddle]
            }
            if (!l.active && l.reason == "Booked") {
                return [l.active, this.options.css.booked + " " + m, this.options.translation.booked]
            }
            if (!l.active && l.reason == "MinOnlineDays") {
                return [l.active, this.options.css.notAvailable + " " + m + " " + this.options.css.selected, this.options.translation.minOnlineDays.format(j)]
            }
            if (!l.active && l.reason == "ArrivalDay") {
                return [l.active, this.options.css.arrival + " " + m]
            }
            if (n && h) {
                if (n <= i && h > i) {
                    return [l.active, this.options.css.selected + " " + m]
                }
            }
            if (l.active) {
                return [true, m, this.options.translation.available]
            }
            return [false, m, this.options.translation.notAvailable]
        },
    });
    $.widget("flats.bookdaterange", $.flats.flatdaterange, {
        _create: function() {
            this.$arrivalInput = $("#" + this.options.arrivalId);
            this.$departureInput = $("#" + this.options.departureId);
            var m = (new Date()).getShortDays(settings.lang);
            m.unshift(m.pop());
            var i = {
                    monthNames: new Date().getMonthes(settings.lang),
                    dayNamesMin: m,
                    dateFormat: "yy-mm-dd",
                    minDate: 0,
                    duration: "normal",
                    firstDay: 1
                },
                h = this;
            this.$arrivalInput.datepicker($.extend({}, i, {
                onSelect: function(n, o) {
                    h.onArrivalSelect(n, o)
                },
                beforeShowDay: function(n) {
                    return h.arrivalShowDay(n)
                },
            })).addClass("flatsrange-picker");
            this.$departureInput.datepicker($.extend({}, i, {
                onSelect: function(n, o) {
                    h.onDepartureSelect(n, o)
                },
                beforeShowDay: function(n) {
                    return h.departureShowDay(n)
                },
            })).addClass("flatsrange-picker").on("mouseenter", "td", function() {
                var q = h.$arrivalInput.datepicker("getDate"),
                    p = null;
                $.each($(this).attr("class").split(/\ +/g), function() {
                    var s = (/^ui-date-(.*)$/g).test(this);
                    if (s) {
                        p = this;
                        return false
                    }
                    return true
                });
                if (!p) {
                    return
                }
                var o = $.datepicker.parseDate("yy-mm-dd", p.replace("ui-date-", ""));
                if (q && o) {
                    if (!h.options.bookingDecision.checkRange(q, o)) {
                        return
                    }
                    if (q <= o) {
                        var n = q,
                            r = [];
                        while (n <= o) {
                            r.push(".ui-date-" + $.datepicker.formatDate("yy-mm-dd", n));
                            n.setDate(n.getDate() + 1)
                        }
                        h.$departureInput.find("td").removeClass("ui-selected-period").end().find(r.join(", ")).addClass("ui-selected-period")
                    }
                }
            }).on("mouseleave", "td", function() {
                if (!h.$departureInput.datepicker("getDate")) {
                    h.$departureInput.find("td").removeClass("ui-selected-period")
                }
            }).on("mouseleave", ".ui-datepicker-calendar", function() {
                var p = h.$arrivalInput.datepicker("getDate");
                var n = h.$departureInput.datepicker("getDate");
                if (p && n) {
                    var o = [];
                    while (p < n) {
                        o.push(".ui-date-" + $.datepicker.formatDate("yy-mm-dd", p));
                        p.setDate(p.getDate() + 1)
                    }
                    h.$departureInput.find("td").removeClass("ui-selected-period").end().find(o.join(", ")).addClass("ui-selected-period")
                }
            });
            var l = this.options.bookingDecision.getDates();
            if (l.arrival && l.departure) {
                var k = l.arrival;
                var j = l.departure;
                this.$arrivalInput.datepicker("setDate", k);
                this.$departureInput.datepicker("setDate", j)
            }
        },
        onArrivalSelect: function() {
            $.datepicker._clearDate(this.$departureInput);
            this.$departureInput.datepicker("option", "minDate", new Date(this.$arrivalInput.datepicker("getDate")));
            this.updateDates()
        },
    });

    function c(h, i) {
        i = i || {};
        $.getJSON("get_cities.json", function(n) {
            var o = n.cities;
            var q = function(u, t) {
                if (u.oblast > t.oblast) {
                    return 1
                }
                if (u.oblast < t.oblast) {
                    return -1
                }
                if (u.oblast == t.oblast) {
                    return 0
                }
            };
            o.sort(q);
            var m = ["en", "ru", "uk"],
                j = settings.lang;
            var r = function(u, t) {
                if (u == j) {
                    return -1
                }
                if (t == j) {
                    return 1
                }
                return 0
            };
            m.sort(r);
            var s = $(h),
                k = s.attr("name") + "_autocomplete",
                p = $('<input name="' + k + '" id="' + k + '" class="' + s.attr("class") + '"/>');
            var l = function(w, t) {
                var v;
                if (t) {
                    v = new RegExp("^" + $.ui.autocomplete.escapeRegex(w) + "$", "i")
                } else {
                    v = new RegExp($.ui.autocomplete.escapeRegex(w), "i")
                }
                var u = $.map(o, function(y) {
                    var x;
                    $.each(m, function() {
                        if (v.test(y[this])) {
                            x = y[this];
                            return false
                        }
                    });
                    if (x) {
                        return {
                            label: x,
                            value: x,
                            category: !w && y.oblast,
                            id: y.id
                        }
                    }
                });
                return u
            };
            p.insertAfter(s);
            p.city_suggest($.extend({}, {
                delay: 0,
                minLength: 0,
                position: {
                    my: "left top-5",
                    at: "left bottom",
                    offset: "0 -5"
                },
                source: function(u, t) {
                    var v = l(u.term);
                    if (u.term) {
                        $.each(v, function() {
                            this.label = this.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(u.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>")
                        })
                    }
                    t(v)
                },
                select: function(t, u) {
                    s.val(u.item.id).change().blur()
                },
                change: function(t, w) {
                    var v = p.val();
                    var u = l(v, true);
                    if (u.length > 0) {
                        s.val(u[0]["id"]).change().blur()
                    } else {
                        s.val(v).change().blur()
                    }
                },
                ulCSSClass: "city-opts"
            }, i))
        })
    }
    e.initCitiesAutocomplete = c
})(window);

function updateCheckbox(a) {
    $(a).is(":checked") ? $(a).parent().addClass("checkbox-checked") : $(a).parent().removeClass("checkbox-checked")
}(function(a) {
    if (!a.console || (a.console && !a.console.log)) {
        a.console = {
            log: (a.opera && a.opera.postError) ? a.opera.postError : function() {}
        }
    }
})(this);
(function(a) {
    var b = {
        coverID: "body_cover",
        coverCSSClass: "body_cover",
        overlayID: "body_overlay",
        overlayCSSClass: "body_overlay",
        element: "body",
        transition: "fade",
        transitionSpeed: "fast",
        closeOnClick: true
    };
    b.show = function(d) {
        var c = a(d.cover).add(d.overlay);
        d.beforeShow ? d.beforeShow(d) : null;
        if (d.transition === "fade" && !a.browser.msie) {
            c.fadeIn(d.transitionSpeed).promise().done(function() {
                d.afterShow ? d.afterShow(d) : null
            })
        } else {
            c.show();
            d.afterShow ? d.afterShow(d) : null
        }
    };
    b.hide = function(d) {
        var c = a(d.cover).add(d.overlay);
        d.beforeHide ? d.beforeHide(d) : null;
        if (d.transition === "fade" && !a.browser.msie) {
            c.fadeOut(d.transitionSpeed).promise().done(function() {
                d.afterHide ? d.afterHide(d) : null
            })
        } else {
            c.show();
            d.afterHide ? d.afterHide(d) : null
        }
    };
    a.fn.body_cover = function(e) {
        e = a.extend({}, b, e);
        var d = a(e.element).find("#" + e.coverID);
        if (d.size() == 0) {
            d = a('<div id="' + e.coverID + '" class="' + e.coverCSSClass + '"style="display:none;"></div>');
            a(e.element).append(d)
        }
        var c = a(e.element).find("#" + e.overlayID);
        if (c.size() == 0) {
            c = a('<div id="' + e.overlayID + '" class="' + e.overlayCSSClass + '"style="display:none;"></div>');
            a(e.element).append(c)
        }
        d.on("click", function() {
            if (e.closeOnClick) {
                e.hide(e)
            }
        });
        e.overlay = c;
        e.cover = d;
        e.overlay.insertAfter(".wrap");
        e.cover.insertAfter(e.overlay);
        e.show(e);
        return e
    }
})(jQuery);
$.fn.eachInterval = function(e, b) {
    var c = this.length;
    var d = 0;
    var a = window.setInterval(function() {
        if (d >= c) {
            window.clearInterval(a);
            return
        }
        try {
            var f = e(d, this[d]);
            if (f) {
                window.clearInterval(a)
            }
        } catch (g) {
            window.clearInterval(a);
            throw (g)
        }
        d++
    }, b);
    return a
};
$.eachInterval = function(c, b, a) {
    $(c).eachInterval(b, a)
};
(function(d) {
    function b() {}
    b.prototype.get = function(e) {};

    function a(f, e) {
        this.singular = f;
        this.plural = e
    }
    extend(a, b);
    a.prototype.get = function(e) {
        if (e <= 1) {
            return this.singular
        }
        return this.plural
    };

    function c(e, g, f) {
        this.singular = e;
        this.plural1 = g;
        this.plural2 = f
    }
    extend(c, b);
    c.prototype.get = function(f) {
        var e = f % 100;
        if (e >= 11 && e <= 19) {
            return this.plural2
        }
        var g = f % 10;
        if (g == 1) {
            return this.singular
        }
        if (g >= 2 && g <= 4) {
            return this.plural1
        }
        return this.plural2
    };
    d.CyrillicPluralFormatter = c;
    d.PluralFormatter = a
})(window);