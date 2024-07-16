#!/usr/bin/env python3


def process_changes():
    # Your logic to process the changes goes here
    print("Processing changes...")

import logging

#logging.basicConfig(filename='/home/log/logfile.log', level=logging.DEBUG)
#logging.debug('Script execution started')
# Add additional logging statements as needed

import psycopg2
from cassandra.cluster import Cluster

# PostgreSQL configuration
pg_host = 'postgresql'
pg_port = 5432
pg_database = 'postgres'
pg_user = 'postgres'
pg_password = 'mynewpassword'

# Cassandra configuration
cassandra_host = 'cassandra'
cassandra_port = 9042
cassandra_keyspace = 'bankingref'

# Establish PostgreSQL connection
pg_connection = psycopg2.connect(
    host=pg_host,
    port=pg_port,
    database=pg_database,
    user=pg_user,
    password=pg_password
)

# Establish Cassandra connection
cassandra_cluster = Cluster([cassandra_host])
cassandra_session = cassandra_cluster.connect(cassandra_keyspace)

# Get list of tables in PostgreSQL
pg_cursor = pg_connection.cursor()
pg_cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
tables = pg_cursor.fetchall()
import datetime

current_datetime = datetime.datetime.now()
print(f"Current date and time: {current_datetime}")

# Iterate over tables
for table in tables:
    table_name = table[0]
    print(f"Syncing table: {table_name}")

    # Get primary key column for the table
    pg_cursor.execute(f"SELECT column_name FROM information_schema.key_column_usage WHERE table_schema = 'public' AND table_name = '{table_name}' AND constraint_name LIKE '%_pkey'")
    primary_key = pg_cursor.fetchone()
    if primary_key:
        primary_key_column = primary_key[0]
    else:
        print(f"No primary key found for table: {table_name}")
        continue

    # Get list of columns in the table
    pg_cursor.execute(f"SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '{table_name}'")
    columns = pg_cursor.fetchall()

    # Prepare column names as a comma-separated string
    column_names = ', '.join([column[0] for column in columns])

    # Prepare placeholders for values in the insert statement
    value_placeholders = ', '.join(['%s'] * len(columns))

    # Read data from PostgreSQL
    pg_cursor.execute(f"SELECT * FROM {table_name}")
    rows = pg_cursor.fetchall()

    # Transform and load data into Cassandra
    for row in rows:
        # Prepare the insert statement dynamically
        insert_statement = f"INSERT INTO {table_name} ({column_names}) VALUES ({value_placeholders})"

        # Execute the insert statement with row values
        cassandra_session.execute(insert_statement, row)

    # Delete records from Cassandra that are not present in PostgreSQL
    cassandra_rows = cassandra_session.execute(f"SELECT {primary_key_column} FROM {table_name}")
    cassandra_primary_keys = {row[0] for row in cassandra_rows}

    postgres_primary_keys = set([row[columns.index((primary_key_column,))] for row in rows])

    records_to_delete = cassandra_primary_keys - postgres_primary_keys
    for primary_key_value in records_to_delete:
        delete_statement = f"DELETE FROM {table_name} WHERE {primary_key_column} = %s"
        cassandra_session.execute(delete_statement, (primary_key_value,))

# Close connections
pg_cursor.close()
pg_connection.close()
cassandra_cluster.shutdown()

if __name__ == "__main__":
    process_changes()
