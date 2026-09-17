import eventEmitter from "node:events"
function createDomElements(){
    const myEmitter = new eventEmitter();
    return {
       addEventListener(eventType,listener){
        myEmitter.on(eventType,listener);
       },
       removeEventListener(eventType,listener){
        myEmitter.off(eventType,listener);
       },
       dispatchEvent(event){
        event.target=this;
        event.currentTarget= this;
        myEmitter.emit(event.eventType,event);
       }
    }

}
const button = createDomElements();
button.addEventListener("save",(event)=>{
    console.log("save event triggered");
})
button.dispatchEvent({
    eventType: "save"
});


