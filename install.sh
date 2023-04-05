#!/bin/sh


if [ "$(id -u)" != "0" ]; then
    echo "Veuillez ouvrir le install.sh en root!"
    exit 1
fi

apt update

apt install -y curl dirmngr apt-transport-https lsb-release ca-certificates

curl -sL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | sudo apt-key add -

echo "deb https://deb.nodesource.com/node_18.x $(lsb_release -c -s) main" | sudo tee /etc/apt/sources.list.d/nodesource.list

apt update

apt install -y nodejs npm

npm install -g npm

npm install ms

npm install math 

npm install discord.js








