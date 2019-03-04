var bars = $('#skills canvas');
var resize = function () {
    bars.each(function () {
        var width = $(this).parent().innerWidth() * .8;
        $(this).prop("height", width).prop("width", width)
    })
}()


var Bar = function (prgress, color, thickness, fullcolor, rad, cnavas, state) {
    this.context = cnavas.getContext('2d') //getting context for canvas drow
    this.height = cnavas.height;              // getting canvas dim and minipulate them for tge max radius and the center of the curvest
    this.width = cnavas.width;
    this.maxrad = .9 * this.width;
    this.lineWidth = thickness;
    this.prgress = prgress / 100 * Math.PI * 2;
    this.curentProg = 0;
    this.color = color;
    this.fullcolor = fullcolor;
    this.rad = rad;
    this.state = state;
    this.sppedFactor = Math.abs(Math.abs(Math.random() - .5) - 3.5) / 100;
}
Bar.prototype.draw = function () {
    this.context.beginPath();
    this.context.lineWidth = this.lineWidth;
    if (this.state === "active") {
        this.context.strokeStyle = this.color;
    } else {
        this.context.strokeStyle = this.fullcolor;
    }
    this.context.arc(this.width / 2, this.height / 2, this.rad, 0, this.curentProg);
    this.context.stroke();
    this.context.beginPath();
    this.context.stroke()
    this.context.font = "40px Helvetica";
    this.context.fillStyle = "#ECF0F1";
    this.context.textAlign = "center";
    if (this.state === "active") {
        this.context.fillText(Math.round((this.curentProg * 100 / Math.PI / 2) * 10) / 10 + "%", this.width / 2, this.height / 2 + 15)
    }
};
Bar.prototype.clear = function () {
    this.context.clearRect(0, 0, this.width, this.height);
}
Bar.prototype.update = function () {
    if (this.curentProg < this.prgress) {

        this.curentProg += this.sppedFactor;
        this.draw();
    } else {
        this.curentProg = this.prgress;
        this.draw()
    }
};
var progrees = [
    [95.6, "hsl(260,50%,60%)", 15, "hsla(220,35%,50%,.2)", 250 / 2, $('#web')[0], "active"],
    [95, "hsl(220,50%,60%)", 15, "hsla(220,35%,50%,.2)", 200 / 2, $('#web')[0]],
    [85, "hsl(180,50%,60%)", 15, "hsla(220,35%,50%,.2)", 150 / 2, $('#web')[0]],

    [95, "hsl(260,50%,60%)", 15, "hsla(220,35%,50%,.2)", 250 / 2, $('#grapgics')[0]],
    [60, "hsl(220,50%,60%)", 15, "hsla(220,35%,50%,.2)", 200 / 2, $('#grapgics')[0], "active"],
    [99, "hsl(180,50%,60%)", 15, "hsla(220,35%,50%,.2)", 150 / 2, $('#grapgics')[0]],

    [40, "hsl(260,50%,60%)", 15, "hsla(220,35%,50%,.2)", 250 / 2, $('#optimiztion')[0]],
    [40, "hsl(220,50%,60%)", 15, "hsla(220,35%,50%,.2)", 200 / 2, $('#optimiztion')[0]],
    [85, "hsl(180,50%,60%)", 15, "hsla(220,35%,50%,.2)", 150 / 2, $('#optimiztion')[0], "active"]
];
var progNumber = progrees.length;
var objects = [];

function toobject() {
    var keys = []
    for (var i = 0; i < progNumber; i++) {
        for (var j = 0; j < 7; j++) {
            keys[j] = progrees[i][j]
        }
        objects.push(new Bar(keys[0], keys[1], keys[2], keys[3], keys[4], keys[5], keys[6]));
        keys = [];
    }
}

toobject();
var stop;
var c;

function plot() {  //plotting the canvas
    for (c = 0; c < objects.length; c++) {
        if (c % 3 === 0) {
            objects[c].clear();
        }
        objects[c].update();
        if (objects[0].curentProg === objects[0].prgress) { //set it to the maximum percentage
            var clearing = setTimeout(
                function () {
                    cancelAnimationFrame(stop);
                    window.clearTimeout(clearing);
                }
                , 1500)
        }
    }
}

function liveing() { //animating canvas
    stop = requestAnimationFrame(liveing);
    plot()

}


/*vars*/
var navbar = $(".navbar"),
    navbarlinks = $(".navbar .navbar-nav a"),
    input = $(".form-control"),
    home = $("#home  .jumbotron"),
    canvasControls = $("#skills .btn"),
    canvasParentOfsect = $("#skills").offset().top,
    curent ,
    scrollToTop =$(".scrollToTop"),
     windowScroll ;
/*vars*/
/*show case resizeing*/
/*controls*/
$(canvasControls).each(function () { //adding event listner for all button to conrtol the canvas
        var index;
        $(this).on("click", function () {
            if (!$(this).hasClass("active")) {
                $(this).addClass("active").siblings().removeClass("active");
                index = $(this).attr("data-change");
                if (index < 3) {
                    for (var i = 0; i < 3; i++) {
                        objects[i].state = ""
                    }
                } else if (index < 6) {
                    for (var i = 3; i < 6; i++) {
                        objects[i].state = ""
                    }
                } else if (index < 9) {
                    for (var i = 6; i < 9; i++) {
                        objects[i].state = " "
                    }

                }
                objects[index].state = "active";

                plot();

            }
        })
    }
)

/*controls*/
/*canvas*/
$(window).scroll(function (e) {
     windowScroll =$(window).scrollTop();
    if (windowScroll> 400) {
        navbar.addClass("fixed-top").removeClass("AKstick")
    } else {
        navbar.addClass("AKstick").removeClass("fixed-top")

    }
    if (windowScroll <= canvasParentOfsect) { //changing footer postion
       console.log("yes");
        $("#footer").css({position: "relative"});
        scrollToTop.css("right","-75px");

    }else{
        $("#footer").css({position: "fixed"});
          scrollToTop.css("right","20px");
    }
    if (windowScroll >= canvasParentOfsect) {
       liveing();
    }
    /*sync nav links*/
    curent = navbarlinks.map(function () {
        if(windowScroll  >= $($(this).attr("href")).offset().top -navbar.innerHeight() -1){
           return this;
       }

    })
    curent =curent[curent.length -1];
    $(curent).parent().addClass("active").siblings().removeClass("active");
 

});
/*changing the color of the navgation bar on scroll*/
var homeResize = function () {
    home.height($(window).innerHeight() - navbar.outerHeight(true));
    return function () {
        home.height($(window).innerHeight() - navbar.outerHeight(true))
    }
}();
/* call it inside window reszing event*
/*form*/
input.each(function () {
    $(this).on("focus", function () {
        $(this).next().css({
            bottom: 0,
            opacity: 1
        }).end().on("blur", function () {
            $(this).next().css({
                bottom: -15,
                opacity: 0
            })

        })
    })
});

/*navbar*/
$(".navbar .nav-link").each(function () {
    $(this).on("click", function (e) {  //scrolling to section on click
        e.preventDefault();
        $(this).addClass("active").parent().siblings().removeClass("active");
        $("html ,body").animate({
            scrollTop: $($(this).attr("href")).offset().top - navbar.innerHeight()
        }, 1000)
    })
})
/*navbar*/
/*scroll to top*/
scrollToTop.click(function () {
    $(navbarlinks[0]).trigger("click");
})
/*scroll to top*/
