// SOURCE: https://stackoverflow.com/questions/3432656/scroll-to-a-div-using-jquery

$(document).ready(function () {
    $("#sidebar > ul > li > a").click(function(e) { 
        // Prevent a page reload when a link is pressed
      e.preventDefault(); 
        // Call the scroll function
      goToByScroll($(this).attr("id"));           
    });
});

function goToByScroll(id){
    // Reove "link" from the ID
  id = id.replace("link", "");
    // Scroll
  $('html,body').animate({
      scrollTop: $("#"+id).offset().top},
      'slow');
}
