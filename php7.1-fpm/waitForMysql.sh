#!/bin/bash
# Defines when MySql is ready to accept commands from the main app

# Kills shell if any command fails to execute
set -e

until mysql -h db -u "web" -ppassword  -e ";" ; do
    >&2 echo "Mysql unavailable - sleeping"
    sleep 1
done
