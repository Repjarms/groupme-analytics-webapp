#!/bin/bash
# Dreamhost deploy script

HOST="ps565646.dreamhostps.com"
USER=$FTP_USER
PASS=$FTP_PASSWORD
FTPURL="ftp://$USER:$PASS@$HOST"
LCD=$TRAVIS_BUILD_DIR
RCD=/groupme-analytics-bot
DELETE="--delete"
lftp -c "set ftp:list-options -a;
open '$FTPURL';
lcd $LCD;
cd $RCD;
mirror --reverse \
  $DELETE \
  --verbose \
  --exclude node_modules.* \
  --exclude .git.* \
  --exclude src.* \
  --exclude coverage.* \
  --exclude test.* \
  --exclude-glob *.swp \
  --exclude-glob *.swo \
  --exclude-glob .env"

