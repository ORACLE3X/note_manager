class Animal {
    name = null;
    color = "black";
    constructor(name) {
        this.name = name;  
    }
    setColor = (color) => {
        this.color= color;
    }      
}
module.export = Animal;