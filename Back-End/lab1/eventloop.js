console.log("this is the starting point of my code");
process.nextTick(() => {
    console.log("This is process.nextTick operation"); 
})
setTimeout(() => {
    console.log("This is first Timeout operation");
},0);

setTimeout(() => {
    console.log("This is second Timeout operation");
},0);
console.log("this is the end point of my code");
setImmediate(() => {
    console.log("This is setImmediate operation");
});
new Promise((resolve, reject) => {
    let success = false;
    if(success) resolve("data loaded successfully");
    else reject("Failed to load data");
})
.then((message) => {
    console.log(message);
})
.catch((message) => {
    console.log(message);
})