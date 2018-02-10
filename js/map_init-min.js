function onMapLoaded()
{
	var j={
		indent:20,
		delayBeforeShow:300,
		delayBeforeHide:200,
		fadeInDelay:"fast",
		fadeOutDelay:"fast",
		popupPositions: {
			Lugansk: {
				top:165,
				left:600
			},
			Donetsk: {
				top:230,
				left:550
			},
			Crimea: {
				top:220,
				left:631
			},
			Simferopol: {
				top:220,
				left:631
			}}};
	
	var b={
		Cherkassy:"region1",
		Chernigov:"region2",
		Simferopol:"region4",
		Crimea:"region4",
		Dnepr:"region5",
		Donetsk:"region6",
		Harkov:"region8",
		Kherson:"region9",
		Khmelnitskiy:"region10",
		Kiev:"region11",
		Kirovograd:"region12",
		Lugansk:"region13",
		Lutsk:"region14",
		Lvov:"region15",
		Nikolaev:"region16",
		Odessa:"region17",
		Poltava:"region18",
		Rovno:"region19",
		Sumy:"region20",
		Uzhgorod:"region22",
		Vinnitsa:"region23",
		Zaporozhye:"region24",
		Zhitomir:"region25",
		"Ivano-Frankovsk":"region7",
		Ternopol:"region21",
		Chernovtsy:"region3"
	};

	if ($.browser.msie) {
    var h = function(k) {
        $("." + b[k]).show()
    };
    var c = function(k) {
        $("." + b[k]).hide()
    }
} else {
    var h = function(k) {
        $("." + b[k]).stop(true, true).fadeIn("fast")
    };
    var c = function(k) {
        $("." + b[k]).stop(true, true).fadeOut(100)
    }
}
var g = null;
var d;
$("area[rel], a[rel]").hover(function(l) {
    var k = $(this).attr("rel");
    if (g !== k) {
        window.clearTimeout(d);
        c(g);
        g = k
    } else {
        window.clearTimeout(d)
    }
    h(k)
}, function(l) {
    var k = $(this).attr("rel");
    d = window.setTimeout(function() {
        c(k)
    }, 1)
});
var e;
var i, f;
$(".popup-cities").hover(function() {
    window.clearTimeout(f);
    window.clearTimeout(i)
}, function() {
    f = window.setTimeout(function() {
        $(".popup-cities").fadeOut(j.fadeOutDelay)
    }, j.delayBeforeHide)
});
var a = $(".map-ukraine").attr("data-href");
$("area[rel], a.rl").hover(function() {
    var k = $(this).attr("rel");
    if ((e === k) && (parseInt($(".popup-cities").css("opacity")) === 1) && ($(".popup-cities").css("display") !== "none")) {
        window.clearTimeout(f);
        window.clearTimeout(i)
    } else {
        i = window.setTimeout(function() {
            var o = $(".popup-cities-mid > ul");
            o.find("li").remove();
            if (mapData[k]) {
                $.each(mapData[k], function() {
                    if (this.id !== k) {
                        o.append('<li>' + this.title + "</a></li>")
                    }
                })
            }
            if (o.find("li").length > 0) {
                var l = $("#" + k);
                var n, m;
                if (j.popupPositions[k]) {
                    n = j.popupPositions[k].left;
                    m = j.popupPositions[k].top
                } else {
                    n = j.indent + l.position().left + l.width();
                    m = l.position().top - $(".popup-cities").outerHeight() / 2
                }
                $(".popup-cities").css("left", n);
                $(".popup-cities").css("top", m);
                $(".popup-cities").stop(true, true).fadeIn(j.fadeInDelay);
                e = k
            }
        }, j.delayBeforeShow)
    }
}, function() {
    window.clearTimeout(i);
    window.clearTimeout(f);
    f = window.setTimeout(function() {
        $(".popup-cities").stop(true, true).fadeOut(j.fadeOutDelay)
    }, j.delayBeforeHide)
})
};