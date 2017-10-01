/**
 * Created by Norman und Daniel
 */
new Vue({
    el: '#twentyfourtyeight',

    data: {
        colors: [ //TODO find good colors
            {color: '#c6101d', selected: true},
            {color: '#ee7f00', selected: true},
            {color: '#ffc830', selected: true},
            {color: '#cddc39', selected: true},
            {color: '#8bc34a', selected: true},
            {color: '#00bcd4', selected: true},
            {color: '#3f51b5', selected: true},
            //{color: '#be1b81', selected: true},
            {color: '#9c27b0', selected: true}
        ],
        rows: [
            // wird bei Initialisierung belegt
        ],
    },

    methods: {
        initialize: function () {
            let rows = [];
            for (let i = 0; i < 4; i++) {
                let column = [];
                for (let j = 0; j < 4; j++) {
                    column[j] = {color: "blue", value: 0};
                }
                rows[i] = {columns: column};
            }
            let x1 = Math.floor((Math.random() * 3));
            let y1 = Math.floor((Math.random() * 3));
            rows[y1].columns[x1].value = 2;

            let x2, y2;
            do {
                x2 = Math.floor((Math.random() * 3));
                y2 = Math.floor((Math.random() * 3));
            } while (x1 === x2 && y1 === y2);
            rows[y2].columns[x2].value = 2;

            this.rows = rows;
        },

        move: function () {
          //left
          if (true) {

                for (let z = 0; z < 4; z++) {
                    for (let s = 0; s < 4; s++) {

                        let current = this.rows[z].columns[s].value;
                        if (current === 0) {

                          if (s < 3){
                            let n = s + 1;
                            while (n < 2 && this.rows[z].columns[n].value === 0) {
                              n++;
                            }
                            this.rows[z].columns[s].value = this.rows[z].columns[n].value;
                            this.rows[z].columns[n].value = 0;
                          }
                        }
                    }
                }
            }

        },
    },
    created(){
        this.initialize();
    },
});
