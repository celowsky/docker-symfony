FROM node:boron

# Lets node handle kernel signals e.g. SIGTERM (CTRL-c)
ENV TINI_VERSION v0.14.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

# Copies files for installing and building frontend assets
COPY ./package.json /var/www/symfony/
COPY ./gulpfile.js /var/www/symfony/
COPY ./bower.json /var/www/symfony/

WORKDIR /var/www/symfony/
CMD ["npm", "run", "build", "--", "--env=dev"]
