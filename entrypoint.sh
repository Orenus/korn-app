#!/bin/bash

set | grep KORN
set | grep MQ

if [[ "$KORN_FUNCTION" = "send" ]] ;then
    npm run start -- send
elif [[ "$KORN_FUNCTION" = "recv" ]] ;then
    npm run start -- recv
else
    echo "dont know what to do please provide env var KORN_FUNCTION set to 'send' or 'recv'..."
    exit 1
fi