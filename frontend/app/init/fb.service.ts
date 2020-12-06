
export function FbInit() {
    return () => new Promise(resolve => {
        // wait for facebook sdk to initialize before starting the angular app
        window['fbAsyncInit'] = function () {
            FB.init({
                appId: '1049201602193734',
                cookie: true,
                xfbml: true,
                version: 'v8.0'
            });
          };

          resolve();
      
      // load facebook sdk script
      (function (d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) { return; }
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));    
      

  });
  }


