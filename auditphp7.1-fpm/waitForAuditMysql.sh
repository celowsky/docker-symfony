#!/bin/bash
# Defines when MySql is ready to accept commands from the audit log app

# Kills shell if any command fails to execute
set -e

until mysql -h auditdb -u "web" -ppassword  -e ";" ; do
    >&2 echo "Audit Log Mysql unavailable - sleeping"
    sleep 1
done
