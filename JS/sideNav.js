"use strict";
/// <reference types="../@types/jquery" />
// Nav Animation
$(document).ready(()=> {
  $(".fa-x").hide();

  $(".fa-align-justify").on("click", () => {
    $(".side-nav-menu").addClass("left");
    $(".fa-align-justify").hide();
    $(".fa-x").show();

    // Delay in milliseconds between each link animation
    const delayBetweenAnimations = 100;

    $(".links ul li").each(function (index) {
      $(this)
        .delay(index * delayBetweenAnimations)
        .animate(
          {
            top: 0,
            opacity: 1,
          },
          500
        );
    });
  });

  $(".fa-x").on("click", () => {
    $(".side-nav-menu").removeClass("left");
    $(".fa-align-justify").show();
    $(".fa-x").hide();

    // Delay in milliseconds between each link animation
    const delayBetweenAnimations = 100;

    $(".links ul li").each(function (index) {
      $(this)
        .delay(index * delayBetweenAnimations)
        .animate(
          {
            top: 300,
            opacity: 0,
          },
          200
        );
    });
  });
});
// ***********************************************************************
$(".links ul li").on('click',function(e){
  console.log($(this).html());
})