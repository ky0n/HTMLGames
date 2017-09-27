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
    },

    move: function () {
        if (up) {
            for (let i = 1; i < 4; i++) {
                for (let j = 0; j < 4; j++) {

                    let current = rows[i].columns[j].value;
                    if (current !== 0) {

                        let k = 0;
                        while ()

                        for (let k = 0; k < i; k++) {
                            let last = rows[k].columns[j].value;
                            if (last === 0) {
                                last = current;

                            }
                        }
                    }

                }
            }
        } else if (right) {
            for (let i = 0; i < 4; i++) {
                for (let j = 1; j < 4; j++) {
                    let current = rows[i].columns[j].value;
                    let next = rows[i].columns[j + 1].value;
                    while (next === 0){

                    }
                }
            }
        }
    },
    created(){
        this.initialize();
    },
});