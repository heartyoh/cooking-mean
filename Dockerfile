# Cooking Server
#
# VERSION   0.0.1
#
# [ Installation - inspired by Dockerfile from https://github.com/mingfang/docker-mean ] 
# Use with Docker http://www.docker.io
# 
# To build an image with docker is pretty simple:
# 
#     docker build -t cooking github.com/heartyoh/cooking-mean
# 
# Then to run that image and attach to it at the same time:
# 
#     docker run -d -p 3000:80 --name cooking cooking
#
# To run that image on the shell
#
#     docker run -p 3000:80 --rm -i -t cooking /bin/bash
#     
# To test cooking server, try to open following URL on the internet browser:
#   
#     http://{yourserver}


FROM ubuntu:14.04
MAINTAINER Hearty, Oh. "heartyoh@gmail.com"
 
# make sure the package repository is up to date
RUN echo 'deb http://archive.ubuntu.com/ubuntu precise main universe' > /etc/apt/sources.list && \
    echo 'deb http://archive.ubuntu.com/ubuntu precise-updates main universe' >> /etc/apt/sources.list && \
    apt-get update

# Runit
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y runit 
CMD /usr/sbin/runsvdir-start

# SSHD
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y openssh-server &&	mkdir -p /var/run/sshd && \
   echo 'root:root' |chpasswd

# Utilities
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y less net-tools inetutils-ping curl git telnet nmap socat dnsutils netcat tree htop unzip sudo

# Node
RUN curl http://nodejs.org/dist/v0.10.26/node-v0.10.26-linux-x64.tar.gz | tar xz
RUN mv node* node && \
    ln -s /node/bin/node /usr/local/bin/node && \
    ln -s /node/bin/npm /usr/local/bin/npm

# Express
RUN npm install express -g

# MongoDB
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 && \
    echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' > /etc/apt/sources.list.d/mongodb.list && \
    apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y mongodb-org
RUN mkdir -p /data/db

# Add cooking
ADD . /cooking

RUN cd /cooking && npm install
RUN npm install -g grunt-cli
RUN echo 'eval "$(grunt --completion=bash)"' >> ~/.bashrc
RUN npm install -g bower
RUN cd /cooking && bower --allow-root install

# Runit Automatically setup all services in the sv directory
RUN chmod +x /cooking/deploy/start
RUN for dir in /cooking/deploy/service/*; do echo $dir; chmod +x $dir/run $dir/log/run; ln -s $dir /etc/service/; done

ENV HOME /root
WORKDIR /root
EXPOSE 22 7946 3000