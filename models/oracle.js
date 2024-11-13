class Oracle{
    name = "";
    skinColor = "fair";
    hair = "dark";
    
    constructor(name){
        this.name = name
    }
    setSpecificProperties(skinColor, hair){
        this.skinColor = skinColor;
        this.hair = hair;
    }
    //creating a method/function
    oracleAttributes(){`His name is ${this.name} and he is ${this.skinColor}`}   
}
const oracle1 = new Oracle("stan")
console.log(oracle1)
oracle1.oracleAttributes()

class Sam extends Oracle{ 
    height= "6'";
    constructor(name){
        super(name);
    }
     
     setHeight = (height) =>{
        this.height = height;
     }
}
const sam1 = new Sam("ada");
sam1.setSpecificProperties("light", "red")
sam1.setHeight("8'")
sam1.oracleAttributes();
console.log(sam1)