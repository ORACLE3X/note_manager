//modelling of car
class Car{
    make= " Toyota";
    model= "Corolla"
    year =2020;
    
    //Method to describe the car 
    getDetails(){
        return `This car is a ${this.year} ${this.make} ${this.models}.`;
    }

    // Method to set new car details
    setDetails(make, model, year){
        this.make = make;
        this.model = model;
        this.year = year;
    }
}
const car1 = new Car();
car1.make = "keke";
car1.make = 2025;
//Access the default properties and call methods
console.log(car1);//output:This car is a 2020 Toyota Corrola
const car2 = new Car();
car2.make = "camry"
console.log(car2);

//create a model of animal with three properties and two methods 
class Animal{
    
    
    lion = "strong";
    lion = "movemnt, physibility";
    tiger =`strong, agile, can move about ,`;
    };
    // constructor(lion){
    //     this.lion = lion;
    //     // this.goat = goat;
    //     // this.fish = fish;
    //     // this.dog = dog;
    // }
// }
const ti = new Animal()
console.log(Animal1.lion)
