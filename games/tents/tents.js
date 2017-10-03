new Vue({
    el: '#tents',
    data: {
        rows:[],
        numOfRows: 8,
        numOfCols: 8,
        numOfTrees: 12,
        images: {
            tent: "tent.svg",
            tree: "tree.svg",
            gras: "gras.svg",
            empty: "empty.svg",
        },
        tents:[],
        trees:[],
    },
    methods:{
        initialize: function () {
            this.spawnTents();
            this.initializeFields();
        },

        getRandomInt: function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        },

        //todo: erst Zelte verteilen (dürfen nicht nebeneinander, oder diagonal nebeneinander stehen) und erst dann die Bäume
        spawnTents: function () {
            for (let i = 0; i < this.numOfTrees; i++) {
                let fieldFound = false;
                while (!fieldFound) {
                    let k = Math.floor(Math.random() * (this.numOfRows * this.numOfCols));
                    if (!this.tents.includes(k) && !this.findNeighbors(k)) {
                        this.tents.push(k);
                        fieldFound = true;
                    }
                }
            }
        },
        findNeighbors: function (fieldNum) {
            let neighborFound = false;
            let neighbors = [];
            //Eckennummern
            let leftUpperCorner = 0;
            let rightUpperCorner = this.numOfRows - 1;
            let leftLowerCorner = this.numOfCols*(this.numOfRows - 1);
            let rightLowerCorner = this.numOfCols*this.numOfRows - 1;
            //linker Rand
            let lcol = [];
            for(let i = 1; i < this.numOfRows-1; i++){
                lcol.push(i*this.numOfRows);
            }
            //rechter Rand
            let rcol = [];
            for(let i = 2; i < this.numOfRows; i++){
                rcol.push(i*this.numOfRows - 1);
            }
            //oberer Rand
            let upperRow = [];
            for(let i = 1; i < this.numOfRows; i++){
                upperRow.push(i);
            }
            //unterer Rand
            let lowerRow = [];
            for(let i = leftLowerCorner + 1; i < rightLowerCorner; i++){
                lowerRow.push(i);
            }

            //testen, ob der zu prüfende Index am Rand ist, um die richtigen Nachbarn zu bestimmen
            if(fieldNum === leftUpperCorner){
                neighbors = [
                    fieldNum + 1,
                    fieldNum + this.numOfRows,
                    fieldNum + this.numOfRows +1
                ];
            }else if(fieldNum === leftLowerCorner){
                neighbors = [
                    fieldNum - this.numOfRows,
                    fieldNum - this.numOfRows + 1,
                    fieldNum + 1
                ];
            }else if(fieldNum === (rightUpperCorner)){
                neighbors = [
                    fieldNum + this.numOfRows,
                    fieldNum + this.numOfRows - 1,
                    fieldNum - 1
                ];
            }else if(fieldNum === rightLowerCorner){
                neighbors = [
                    fieldNum - this.numOfRows,
                    fieldNum - this.numOfRows - 1,
                    fieldNum - 1
                ];
            }else if(upperRow.includes(fieldNum)){
                neighbors = [
                    fieldNum -1,
                    fieldNum + 1,
                    fieldNum + this.numOfRows -1,
                    fieldNum + this.numOfRows,
                    fieldNum + this.numOfRows +1
                ];
            }else if(lcol.includes(fieldNum)){
                neighbors = [
                    fieldNum - this.numOfRows,
                    fieldNum - this.numOfRows + 1,
                    fieldNum + 1,
                    fieldNum + this.numOfRows,
                    fieldNum + this.numOfRows +1
                ];
            }else if(rcol.includes(fieldNum)){
                neighbors = [
                    fieldNum - this.numOfRows -1,
                    fieldNum - this.numOfRows,
                    fieldNum -1,
                    fieldNum + this.numOfRows -1,
                    fieldNum + this.numOfRows,
                ];
            }else if(lowerRow.includes(fieldNum)){
                neighbors = [
                    fieldNum - this.numOfRows -1,
                    fieldNum - this.numOfRows,
                    fieldNum - this.numOfRows + 1,
                    fieldNum -1,
                    fieldNum + 1,
                ];
            }else{
                neighbors = [
                    fieldNum - this.numOfRows -1,
                    fieldNum - this.numOfRows,
                    fieldNum - this.numOfRows + 1,
                    fieldNum -1,
                    fieldNum + 1,
                    fieldNum + this.numOfRows -1,
                    fieldNum + this.numOfRows,
                    fieldNum + this.numOfRows +1
                ];
            }
            for(let i=0; i<neighbors.length; i++){
                if(this.tents.includes(neighbors[i])){
                    neighborFound = true;
                    break;
                }
            }
            return neighborFound;
        },

        spawnTrees: function () {
            for (let i = 0; i < this.numOfTrees; i++) {
                let fieldFound = false;
                while (!fieldFound) {
                    let k = Math.floor(Math.random() * (this.numOfRows * this.numOfCols));
                    if (!this.trees.includes(k)) {
                        this.trees.push(k);
                        fieldFound = true;
                    }
                }
            }
        },

        initializeFields: function () {
            let tempRows = [];
            for (let i = 0; i < this.numOfRows; i++) {
                let tempColumns = [];
                for (let j = 0; j < this.numOfCols; j++) {
                    let fieldIndex = i * this.numOfRows + j;
                    let field = {};
                    field.isTent = this.tents.includes(fieldIndex);
                    field.disabled = false;
                    field.clicked = false;
                    field.row = i;
                    field.column = j;
                    if(field.isTent){
                        field.image = this.images.tent;
                    }else{
                        field.image = this.images.empty;
                    }
                    tempColumns[j] = field;
                }
                tempRows[i] = {columns: tempColumns};
            }
            this.rows = tempRows;
        },

        /*initializeFields: function () {
            let tempRows = [];
            for (let i = 0; i < this.numOfRows; i++) {
                let tempColumns = [];
                for (let j = 0; j < this.numOfCols; j++) {
                    let fieldIndex = i * this.numOfRows + j;
                    let field = {};
                    field.isTree = this.trees.includes(fieldIndex);
                    field.disabled = false;
                    field.clicked = false;
                    field.row = i;
                    field.column = j;
                    if(field.isTree){
                        field.image = this.images.tree;
                    }else{
                        field.image = this.images.empty;
                    };
                    tempColumns[j] = field;
                }
                tempRows[i] = {columns: tempColumns};
            }
            this.rows = tempRows;
        },*/

        setTent: function (field) {
            if(field.image === this.images.tree){

            }else if(field.image === this.images.tent){
                field.image = this.images.gras;
            }else if(field.image === this.images.gras){
                field.image = this.images.empty;
            }else{
                field.image = this.images.tent;
            }
        },

        setGras: function (field) {
            if(field.image === this.images.tree){

            }else if(field.image === this.images.gras){
                field.image = this.images.empty;
            }else{
                field.image = this.images.gras;
            }
        }
    },
    created() {
        this.initialize();
    },
});