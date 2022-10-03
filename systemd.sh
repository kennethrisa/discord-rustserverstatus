#!/bin/bash

function fn_install() {

export NAME=testrustserverstatus
cat << EOF > /etc/systemd/system/${NAME}.service
[Unit]
Description=discord-rustserverstatus
After=network.target

[Service]
User=$(whoami)
WorkingDirectory=$(pwd)
Type=simple
ExecStartPre=$(which npm) install
ExecStart=$(which npm) start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

echo "# Enable and start service"
echo "systemctl enable --now ${NAME}.service"

}
fn_install
