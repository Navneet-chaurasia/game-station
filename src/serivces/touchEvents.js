//this file contains method for getting and detecting touch related events 

 function getTouches(evt) {
    return evt.touches ||             // browser API
           evt.originalEvent.touches; // jQuery
  } 



  //this will return x and y point of touch point
  export function handleTouchStart(evt) {
      
    const firstTouch = getTouches(evt)[0];                                      
  
   
    return firstTouch
}; 

