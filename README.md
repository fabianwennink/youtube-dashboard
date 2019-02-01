# YouTube subscriptions dashboard - ALPHA

A custom YouTube subscriptions dashboard allowing you to view the latest videos of your favorite channels.
The project is far from done and mainly created for personal use, however it will become fully customizable 
when it's first proper release is ready.

You can check out a demo (and also the version I use) on my website: https://www.fabianwennink.nl/projects/youtube/

__Note: My custom channels are still present in the code, will be removed during its release. A code clean-up still needs to be performed as well.__

## Running it yourself
First generate your API key over at https://console.developers.google.com (select YouTube Data API v3).  

After having generated a key, create a `key.js` file in the `assets/js/` folder, containing only the following line:  
`const YOUTUBE_KEY = 'YOUR_API_KEY';`  

Next, run `gulp build` to build the project, or use `gulp serve` to build the project and launch a local server.