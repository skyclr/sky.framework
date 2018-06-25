 #!/bin/bash

 PIDS=`ps aux | grep $1 | grep -v grep`
 if [ -z "$PIDS" ]; then
     echo "Starting  $1 ..."
     php $1
 else
     echo "$1 already running."
 fi