// vatiables
let red = "#8b0000";
let black = "#000000";
let rectWidth = 0;

//activate listener 
$("p").each(function( index ) {
    $(this).on("click", clickable);
  });

  //blocks text and fills gauge
  function clickable(){
    $(this).css("color", red);
    $(this).css("background-color", red);
    let $rand = Math.floor(Math.random() * (5000 - 2500 + 1)) + 2500;;
    $(this).off();
    setTimeout(() => {
        $(this).on("click", clickable);
        $(this).css("color", black);
        $(this).css("background-color", "");
        rectWidth -= 30;
        $(".top-rect").css("width", rectWidth + "px");

    }, $rand);

    rectWidth += 30;
    $(".top-rect").css("width", rectWidth + "px");

    if(rectWidth >= 300){
        $("p").fadeOut();
        $(".rect").fadeOut();
        $( "section" ).append( "<h3> BIBLE NULLIFIED </h3>" );
    }

  }