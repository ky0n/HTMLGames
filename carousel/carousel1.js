/**
 * Created by romy on 07.09.2017.
 */
$('#item0').addClass("active");

$('#myCarousel').carousel({
    interval: 1000000
});

 $('.fdi-Carousel .item').each(function () {
 var next = $(this).next();
 if (!next.length) {
 next = $(this).siblings(':first');
 }
 next.children(':first-child').clone().appendTo($(this));

 if (next.next().length > 0) {
 next.next().children(':first-child').clone().appendTo($(this));
 }
 else {
 $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
 }
 });