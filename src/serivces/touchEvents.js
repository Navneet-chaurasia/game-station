//this file contains method for getting and detecting touch related events 

 function getTouches(evt) {
    return evt.touches ||             // browser API
           evt.originalEvent.touches; // jQuery
  } 

/** 

 this will return x and y point of touch point
 after "touchStart" event
 */
  export function handleTouchStart(evt) {
      
    const firstTouch = getTouches(evt)[0];                                      
     return firstTouch
}; 
/** 
 this will calculate the nature of gesture and will return an integer
1. for left swipe
2. for right swipe
3. for top swipe
4. for bottom swipe
anyone who wants to listen to these gestures should call this function
@param{evt} => "touchMove" Event
@param{touchCordinates} => starting cordinates from "touchStart" event

*/
export function globalGestureHandler(evt,touchCordinates ) {

     
  if ( ! touchCordinates.clientX || ! touchCordinates.clientY ) {
      return;
  }

  var xUp = evt.touches[0].clientX;                                    
  var yUp = evt.touches[0].clientY;

  var xDiff = touchCordinates.clientX - xUp;
  var yDiff = touchCordinates.clientY - yUp;

  if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
      if ( xDiff > 0 ) {
          /* left swipe */ 
          return 1;
      } else {
          /* right swipe */
        return 2;
      }                       
  } else {
      if ( yDiff > 0 ) {
          /* down swipe */ 
         return 4;
      } else { 
          /* up swipe */
        return 3;
      }                                                                 
  }
                                         
};

