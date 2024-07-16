#!/bin/sh
#
# listen_changes_service
#
# chkconfig: 2345 99 01
# description: AIX service for listening to PostgreSQL notifications and executing process_changes.py

# Change these values according to your setup
LISTEN_SCRIPT="/home/listen_changes.py"
LOG_FILE="/home/log/listen_changes.log"
PID_FILE="/var/run/listen_changes.pid"

start() {
    echo "Starting listen_changes_service"
    nohup /usr/bin/python3 $LISTEN_SCRIPT >> $LOG_FILE 2>&1 &
    echo $! > $PID_FILE
}

stop() {
    echo "Stopping listen_changes_service"
    if [ -f $PID_FILE ]; then
        PID=$(cat $PID_FILE)
        kill $PID
        rm $PID_FILE
    else
        echo "listen_changes_service is not running"
    fi
}

status() {
    if [ -f $PID_FILE ]; then
        PID=$(cat $PID_FILE)
        ps -p $PID > /dev/null 2>&1
        if [ $? -eq 0 ]; then
            echo "listen_changes_service is running with PID: $PID"
        else
            echo "listen_changes_service is not running"
            rm $PID_FILE
        fi
    else
        echo "listen_changes_service is not running"
    fi
}

case "$1" in
start)
    start
    ;;
stop)
    stop
    ;;
restart)
    stop
    sleep 2
    start
    ;;
status)
    status
    ;;
*)
    echo "Usage: $0 {start|stop|restart|status}"
    exit 1
    ;;
esac

exit 0
