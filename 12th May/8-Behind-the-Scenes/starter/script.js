'use strict';
/*

// Practice 1
// Scoping 

// function scope
function calcAge(birthYear){
    // function variable
    const age = 2021 - birthYear;
    
    console.log(firstName);

    function printAge(){
        const output = `You are ${age}, born in ${birthYear}`;
        console.log(output);
    }

    // block scope
    if(birthYear >= 2000 && birthYear <= 3000){
        var millenial = true;

        // const firstName = 'Aj';
        const str = `2K kids, ${firstName}`;
        console.log(str); 

        // Reassigning outer scope's
        output  = 'New OutPut!';
        function addd(a, b)
        {
            return a + b;
        }
        
    }
    console.log(addd(2, 3));
    console.log(millenial);
    console.log(output);
    
    // call sec function
    printAge();
    return age;
}
// gobal  scope
// gobal variable
const firstName = 'Ajmal';
calcAge(2000);

// child so Error
// console.log(age);
// printAge();
// console.log(addd(2, 3));


//_______________________________________________________________________________________________*/


/*

// Practice 2
// Hoisting and TDZ


// console.log(me);
// console.log(job);
// console.log(year);

// undefined
var me = 'Aj';

// Cannot access 'job' before initialization
let job = 'Programmer';

// Cannot access 'year' before initialization
const year = 1991;

// Function
console.log(addDecl(2, 3));
// console.log(addExpr(2, 3));
// console.log(addArrow(2, 3));

function addDecl(a, b){
    return a + b;
}
// Cannot access 'addExpr' before initialization
const addExpr = function (a, b){
    return a + b;
}
// Cannot access 'addArrow' before initialization
const addArrow = (a, b) => a + b;



// Example

console.log(numProducts);
if(!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart(){
    console.log(`All Products deleted!`);
}



var x = 5;
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);

//_______________________________________________________________________________________________*/


// Practice 3
// This keyword

console.log(this);
// Function
function Myfunction(birthYear){
    console.log(2021 - birthYear);
    console.log(this);
}
Myfunction(2000);

//  Function 
const calcAge = function(birthYear){
    console.log(2021 - birthYear);
    console.log(this);
};
calcAge(2000);

// Arrow Function
const calcAgee = birthYear =>{
    console.log(2021 - birthYear);
    console.log(this);
};
calcAgee(2000);

console.log('//////////////.........OBJECTS.....//////////////////')
// object Method
const Aj = {
    year: 2000,
    calcAge: function(){
        console.log(this);
        console.log(2021 - this.year)
    },
};
Aj.calcAge();

const Ajmal = {
    // firstName: Aj,
    year: 2005,
};
Ajmal.calcAge = Aj.calcAge;
Ajmal.calcAge();

//_______________________________________________________________________________________________*/



// Regular Function & Arrow Functions

const Ajmal = {
    firstName: 'Ajmal',
    year: 2000,
    calcAge: function(){
        console.log(this);
        console.log(2021 - this.year);
        
        // solution 1
        const self = this;
        const Aj = function(){
            console.log(self);
        };
        // Solution 2
        const Aj1 = () => {
            console.log(self);
        };

        Aj();
        console.log(`______Arrow Function______`)
        Aj1();
    },
    // In Arrow Function (this) will not work give undefined only 
    greet : () => console.log(`Hey ${this.firstName}`),
};

Ajmal.greet();
Ajmal.calcAge();

const addExpr = function(a, b){
    console.log(arguments);
    return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 12);

var addArrow = (a, b) => {
    // console.log(arguments);
    return a + b;

};
addArrow(2, 5);

// console.log(arguments);
//_______________________________________________________________________________________________*/
/*

// Primitives vs. Objects (Primitive vs. Reference Types)

// primitives
let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

// Reference
const me = {
    name: 'Ajmal',
    age: 21
}

const friend = me;
friend.age = 27;

console.log('Friend:', friend);

console.log('Me:', me);

console.log('Me age', me.age);


// Practice 4
// primitive Type
let lastName = 'Aj';
let oldLastName = lastName;
lastName = 'Ajmal';

console.log(lastName, oldLastName);

// Reference Types
const before = {
    firstName: 'Mohamed',
    lastName: 'Musamil',
    age: 21,
};

const after = before;
after.lastName = 'Ajmal';

console.log('Before BE:', before);
console.log('After BE:', after);


//_______________________________________________________________________________________________*/ 