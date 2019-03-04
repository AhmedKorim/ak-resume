/*structure*/
var rad =  $(".galleryWraper").innerWidth(),  //gallery raduis
    perspective = 2*rad,
    numberOFItmes = $(".galleryWraper").children().length,
    gutter =  5,
    ItemWidth =(rad/numberOFItmes)-5,
    angleOFRotation= 360/numberOFItmes,
    galleryItems = [],
    galleryOrigin =(rad-ItemWidth)/2;

/*structure*/

$(".gallery-item").each(function () {
    galleryItems.push($(this))
    $(this).css({
        width : ItemWidth
    })
});
galleryItems[0].css({
    transform : " translate3d( " + galleryOrigin +"px,0,0) ",
})
galleryItems[1].css({
    transform : " translate3d( " + ( galleryOrigin + gutter + ItemWidth ) +"px,0,0) ",
})