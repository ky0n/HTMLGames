new Vue({
    el: '#tents',
    data: {
        rows:[],
        numOfRows: 8,
        numOfCol: 8,
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
            this.spawnTrees();
            this.initializeFields();
        },

        // todo: erst Zelte verteilen (dürfen nicht nebeneinander, oder diagonal nebeneinander stehen) und erst dann die Bäume
        spawnTents: function () {
            for (let i = 0; i < this.numOfTrees; i++) {
                let fieldFound = false;
                while (!fieldFound) {
                    let k = Math.floor(Math.random() * (this.numOfRows * this.numOfCol));
                    if (!this.tents.includes(k)) {
                        this.tents.push(k);
                        fieldFound = true;
                    }
                }
            }
        },
        isNextToTent: function (fieldNum) {
            //muss >=0 und <= numOfRows*numOfCol
            let tempBool = false;
            let neighbors = [
                fieldNum - this.numOfRows -1,
                fieldNum - this.numOfRows,
                fieldNum - this.numOfRows + 1,
                fieldNum -1,
                fieldNum + 1,
                fieldNum + this.numOfRows -1,
                fieldNum + this.numOfRows,
                fieldNum + this.numOfRows +1
            ];
            for(let i=0; i<neighbors.length; i++){
                //?????
                if(neighbors[i] >= 0 && (neighbors[i] <= this.numOfRows*this.numOfCol) && this.tents.includes(neighbors[i])){
                    tempBool = true;
                }
            }
            return tempBool;
        },

        spawnTrees: function () {
            for (let i = 0; i < this.numOfTrees; i++) {
                let fieldFound = false;
                while (!fieldFound) {
                    let k = Math.floor(Math.random() * (this.numOfRows * this.numOfCol));
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
                for (let j = 0; j < this.numOfCol; j++) {
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
        },

        setTent: function (field) {
            if(field.image === this.images.tree){
                return;
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
                return;
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