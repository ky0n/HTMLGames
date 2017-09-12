/**
 * Created by romy on 12.09.2017.
 */
new Vue({
    el: '#scrolling',

    data: {

    },

    method: {

    },

    created() {

    },

    mounted() {
        var carousel;
        carousel = $("ul");
        carousel.itemslide({
            duration: 500
        });

        carousel.on('clickSlide', function(event) {
            // event.slide: new Item
            // carousel.getActviceIndex(): old Item
            if(event.slide === carousel.getActiveIndex()) {
                window.location.href = nav.$data.gameItems[event.slide].url;
            }
        });
    },
});