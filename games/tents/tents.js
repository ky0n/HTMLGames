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
        trees:[],
    },
    methods:{
        initialize: function () {
            this.spawnTrees();
            this.initializeFields();
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