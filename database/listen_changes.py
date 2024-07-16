#!/usr/bin/env python3

import psycopg2
import subprocess

# Connection details for your PostgreSQL database
connection_config = {
    "host": "postgresql",
    "port": "5432",
    "database": "postgres",
    "user": "postgres",
    "password": "mynewpassword"
}

# Establish a connection to the database
conn = psycopg2.connect(**connection_config)
conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)

# Open a new cursor
cur = conn.cursor()

# Listen for notifications
cur.execute("LISTEN changes;")

while True:
    # Wait for notifications
    conn.poll()
    while conn.notifies:
        # Get the notification
        notify = conn.notifies.pop(0)

        # Execute the process_changes.py script
        subprocess.run(["python3", "/tmp/temp/sync.py"])

# Close the cursor and connection
cur.close()
conn.close()

