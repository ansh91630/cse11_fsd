import EventEmitter from "node:events";

const myEmitter = new EventEmitter();

myEmitter.on("greet", (teacher) => {
    console.log(`Class started by ${teacher}`);
});

myEmitter.on("exit", (teacher) => {
    console.log(`Class finished by ${teacher}`);
});

myEmitter.emit("greet", "ansh");
myEmitter.emit("exit", "ansh");