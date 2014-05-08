#!/bin/sh
service=$(basename $(dirname $(pwd)))
logdir="/var/log/${service}"
mkdir -p ${logdir} 
exec 2>&1
exec /usr/bin/svlogd -tt ${logdir}
