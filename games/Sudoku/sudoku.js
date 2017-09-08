let sudoku = new Vue({
    el: '#sudokuField',
    data: {
        colors: [
            '#ffffff',  // Standard Farbe
            '#e2e2d9',  // derzeit angeklicktes Feld
        ],
        squareSize: 9,
        rows: [],
        lastClickedRow: undefined,
        lastClickedColumn: undefined,
    },
    methods: {
        initialize: function () {
            let tempRows = [];
            for (let i = 0; i < this.squareSize; i++) {
                let tempColumns = [];
                for (let j = 0; j < this.squareSize; j++) {
                    let field = {};
                    field.row = i;
                    field.column = j;
                    field.color = this.colors[0];
                    field.number = undefined;
                    tempColumns[j] = field;
                }
                tempRows[i] = {columns: tempColumns};
            }
            this.rows = tempRows;
        },

        onClick: function (field, event) {
            if(this.lastClickedRow !== undefined && this.lastClickedColumn !== undefined) {
                this.rows[this.lastClickedRow].columns[this.lastClickedColumn].color = this.colors[0];
            }
            this.lastClickedRow = field.row;
            this.lastClickedColumn = field.column;
            field.color = this.colors[1];

            this.setCursor(event.target, 1);
        },

        setCursor: function(node, pos){
            if(!node){
                return false;
            }else if(node.createTextRange){
                let textRange = node.createTextRange();
                textRange.collapse(true);
                textRange.moveEnd(pos);
                textRange.moveStart(pos);
                textRange.select();
                return true;
            }else if(node.setSelectionRange){ // fuer Chrome und Mozilla
                node.setSelectionRange(pos,pos);
                return true;
            }
            return false;
        },

        /* falls Eingabe nicht zwischen 0-9 oder im Feld eine Zahl steht wird Eingabe nicht in Feld geschrieben */
        isNumber: function (value, event) {
            event = (event) ? event : window.event;
            let charCode = (event.which) ? event.which : event.keyCode;
            console.log(charCode);

            if(charCode === 8){ // backspace at Mozilla
                return true;
            }
            else if ((isNaN(value) || value.toString().length === 0) && charCode >= 49 && charCode <= 57) { // Zahlen 1-9
                return true;
            }else{
                event.preventDefault();
            }
        }


    },

    created() {
        this.initialize();
    }
});

