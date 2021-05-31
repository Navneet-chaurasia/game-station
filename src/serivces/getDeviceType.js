//this is top level method return the users current device

export const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "mobile";
    }
    return "desktop";
  };

  export const setDeviceOrientation = (pref) => {
    if(getDeviceType() === "desktop"){
           
    }else{

        if(document.querySelector("body").requestFullscreen)
        document.querySelector("body").requestFullscreen().catch((e) => {console.log(e)});
    else if(document.querySelector("body").webkitRequestFullScreen)
        document.querySelector("body").webkitRequestFullScreen().catch((e) => {console.log(e)});

        window.screen.orientation.lock("landscape").catch((e)=>{console.log(e)})
      
    }
  }