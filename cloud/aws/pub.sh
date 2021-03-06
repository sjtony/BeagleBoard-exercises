#!/bin/bash
# Usage"  pub.sh "Message" [topic]
TOPIC=${2:-hello/world}

mosquitto_pub -d \
    --cafile CA.pem \
    --cert cert.pem \
    --key privateKey.pem \
    --tls-version tlsv1.2 \
    -h A3L43PS2R481G5.iot.us-east-1.amazonaws.com \
    -p 8883 \
    -t "$TOPIC" \
    -m "$1"
