// const fs = require('fs');
// fs.writeFileSync('hello.txt', 'hello from node.js')//writes file to our hard drive it takes name of the file and content of the file as arguments
// console.log("Hello from Node.js");

// //Js is weakly typed language ie no explicit type assignment, data types can be switched dynamically
// //it is versatile ie it runs on a browser and directly on a server 

// let name = 'ishita';
// console.log(name);

// var age = 28;

// const summarizeUser =  (userName, userAge) => {
//     return 'Name is ' + userName + ', age is ' + userAge ;
// }

// //only one statement 
// const add =  (a, b) => a + b;
// // when only one agrument 
// const addOne = a => a+1;
// //when no agrument 
// const addRandom = () => 1 + 2;

// console.log(addOne(2));
// console.log(add(2,3));
// console.log(summarizeUser(name, age));

//object

// const person = {
//     name : 'Ishita',
//     age : 22,
//     greet(){
//         console.log('Hi I am ' + this.name);//this is used for surrounding object 
//     }
// };

//person.greet();

//console.log(person);

// Arrays
//const hobbies = ['Sports', 'Cooking'];
// for(let hobby of hobbies){
//     console.log(hobby);
// }
// console.log(hobbies.map(hobby => 'Hobby:' + hobby));//transform the array and help u give the new array
//console.log(hobbies);//map keeps the original array intact

//Rest and Spread
//when we want to have a copy of the original array and we want to add some new values to the existing array

// const copiedArray = hobbies.slice();//creates a new array 
// console.log(copiedArray);

// const copiedPerson = {...person};
// console.log(copiedPerson);

// const copiedArray1 = [hobbies];//it creates a new array where the first element is old array

// const copiedArray2 = [...hobbies];//Spread operator, these dots are created and it pulls the element of the original array
// console.log(copiedArray2);


//REST
//if we want to add or merge multiple arguments in an array we use rest operator

// const toArray = (...args) => {
//     return args;
// }

// console.log(toArray(1, 2, 3, 4));//hence we can add multiple arguments into the array

//Destructuring 
// const printName = ({name}) => {//here we destructured the object 
//     console.log(name);
// }
// printName(person);

// //array destructuring 
// const [hobby1, hobby2] = hobbies;
// console.log(hobby1,hobby2);

//ASYN CODE
// setTimeout(() => {//this is asynchronous becuz it gets executed after 2 sec, asynchronous becuz it doesnt get executed immediately ie it takes time
//     console.log('Timer is done !');
// }, 2000);
//callback function is a technique to handle async functions
//Promise is also used to handle async functions takes 2 agruments resolve and reject(throws error)




