FROM node:boron

ENV TINI_VERSION v0.14.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

WORKDIR /var/www/symfony/
CMD ["npm", "run", "build", "--", "--env=dev"]
