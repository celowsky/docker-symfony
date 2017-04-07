FROM mysql:5.7

COPY ./grantPrivileges.sql /docker-entrypoint-initdb.d
COPY ./localdb-run.sh ./

RUN chmod +x localdb-run.sh

ENTRYPOINT ["/bin/sh", "-c", "./localdb-run.sh"]
