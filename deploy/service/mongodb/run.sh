#!/bin/sh
exec 2>&1
exec /usr/bin/mongod -f /etc/mongod.conf