#!/bin/bash

git pull
npm install

if [ ! -f /config/config.js ]; then
    cp -R -u -p ./config_dist.js /config/config.js
fi

if [ -f /config/config.js ]; then
    cp /config/config.js ./config.js
fi

if [ ! -f ./config.js ]; then
    cp -R -u -p ./config_dist.js ./config.js
fi

forever start -l -a /wrapper/logs/forever.log ./app.js
forever list

tail -f /wrapper/logs/forever.log
