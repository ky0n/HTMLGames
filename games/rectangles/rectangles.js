/**
 * Created by Hendrik
 */
let gamefield = new Vue({
    el: '#gamefield',
    data: {
        rows: [
            // wird in Initialisierungs - Methode belegt
        ],
        numOfRowsAndColumns: 7,
        mouse: {
            x: 0,
            y: 0,
            startX: 0,
            startY: 0,
        },
        isMouseDown: false,
        isMouseDragged: false,
        rectangle: null,
        idRectangle: 'rectangle',
        cursor: 'default',
    },
    methods: {
        initialize: function () {
            this.initializeFields();
            this.initializeNumbers();
        },
        initializeFields: function () {
            let tempRows = [];
            for (let i = 0; i < this.numOfRowsAndColumns; i++) {
                let tempColumn = [];
                for (let j = 0; j < this.numOfRowsAndColumns; j++) {
                    let field = {};
                    field.row = i;
                    field.column = j;
                    field.number = "";
                    tempColumn[j] = field;
                }
                tempRows[i] = {columns: tempColumn};
            }
            this.rows = tempRows;
        },

        initializeNumbers: function () {
            const numOfFields = Math.pow(this.numOfRowsAndColumns, 2);
            const maximalSizeRectangle = 8;
            let allFieldsFilled = false;
            while (!allFieldsFilled) {
                let rectangleSize = Math.floor(Math.random() * (maximalSizeRectangle)) + 1;
                this.rows[0].columns[0].number = rectangleSize;
                allFieldsFilled = true;
            }
        },

        onMouseDown: function (event) {
            this.isMouseDragged = false;
            this.isMouseDown = true;

            if(this.rectangle !== null){
                this.rectangle = null;
            }else {
                this.mouse.startX = this.mouse.x;
                this.mouse.startY = this.mouse.y;
                this.rectangle = document.createElement('div');
                this.rectangle.id = this.idRectangle;
                this.rectangle.className = 'drawableRectangle';
                this.rectangle.style.left = this.mouse.x + 'px';
                this.rectangle.style.top = this.mouse.y + 'px';
                console.log(event.target.parentNode.parentNode.parentNode.parentNode);
                event.target.parentNode.parentNode.parentNode.parentNode.appendChild(this.rectangle);
                console.log(this.rectangle.parentNode);
            }
        },

        onMouseMove: function (event) {
            this.setMousePosition(event);
            if (this.isMouseDown) {
                this.isMouseDragged = true;
                if (this.rectangle !== null) {
                    this.rectangle.style.width = Math.abs(this.mouse.x - this.mouse.startX) + 'px';
                    this.rectangle.style.height = Math.abs(this.mouse.y - this.mouse.startY) + 'px';
                    this.rectangle.style.left = (this.mouse.x - this.mouse.startX < 0) ? this.mouse.x + 'px' : this.mouse.startX + 'px';
                    this.rectangle.style.top = (this.mouse.y - this.mouse.startY < 0) ? this.mouse.y + 'px' : this.mouse.startY + 'px';
                }
            }
        },

        onMouseUp: function (event) {
            if (this.isMouseDragged = true) {
                document.getElementById(this.idRectangle).remove();
                this.rectangle = null;
            }
        },

        setMousePosition: function (e) {
            const event = e || window.event;            // moz || IE
            if (event.pageX) {                          // moz
                this.mouse.x = event.pageX + window.pageXOffset;
                this.mouse.y = event.pageY + window.pageYOffset;
            } else if (event.clientX) {                 // IE
                this.mouse.x = event.clientX + document.body.scrollLeft;
                this.mouse.y = event.clientY + document.body.scrollTop;
            }
            console.log(this.mouse.x + " " + this.mouse.y);
        }
    },

    created() {
        this.initialize();
    }
});

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
};