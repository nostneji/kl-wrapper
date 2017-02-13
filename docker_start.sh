#!/bin/bash

cd /wrapper
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

if [ -f /wrapper/logs/forever.log ]; then
    mv /wrapper/logs/forever.log /wrapper/logs/forever.log.prev
fi

forever start -l /wrapper/logs/forever.log ./app.js
forever list

tail -f /wrapper/logs/forever.log
