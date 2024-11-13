const Animal = require("./Animal")
class Dog extends Animal{
    constructor(name){
        super(name);
    }
bark = () =>{
    return `${this.name} woof `;
}

}
// Dog("kanide").bark
const animal = new Animal("bat");
dog1.name= "German shepherd";


console.log(dog1);
console.log(animal);