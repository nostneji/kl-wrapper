#!/bin/bash

git pull
npm install

if [ -f /config/config.js ]; then
    cp /config/config.js ./config.js
fi

forever restartall
