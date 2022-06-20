console.log("Hello World");

let myObj = {
    name: "Stephon",
    age: 31,
    city: "Newark",
    height: "6'5"
}

let newObj = JSON.stringify(myObj)

localStorage.setItem("myObj", newObj)
let finalObj = JSON.parse(localStorage.getItem("myObj"));
console.log(finalObj);

