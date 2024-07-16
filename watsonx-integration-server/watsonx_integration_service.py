import psycopg2
import json
import requests

from dotenv import load_dotenv
import os

url = "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29"

def retrieve_data_from_db(user_query):
    print(f'User query: \n {user_query}')
    
    # Load environment variables from the .env file
    load_dotenv()

    AUTHENTICATION_TOKEN = os.getenv("WATSONX_ACCESS_TOKEN")

    body = {
        "input": f"""You are a developer writing SQL queries given natural language questions. The database contains a set of 3 tables. The schema of each table with description of the attributes is given. Write the SQL query given a natural language statement with names being not case sensitive
Here are the 3 tables :

(1) Database Table Name: USERS
Table Schema:
Column Name # Meaning
user_id # unique identifier of the user
user_type_id # user is '\''employee'\'', '\''customer'\''
gender_id # user'\''s gender is 1 for female, 2 for male and 3 for other
dob #  date of birth of the user
address # adress of the user
state # state of the user
country # country of residence of the user
pincode # postalcode of the user residence
email # email address of the user
first_name # first name of the user
last_name # last name of the user

(2) Database Table Name: ACCOUNTS
Table Schema:
Column Name # Meaning
acc_id # account number or account id of the user
user_id # user id of the user
balance # available balance in the account

(3) Database Table Name: TRANSACTIONS
Table Schema:
Column Name # Meaning
transaction_id # unique id for the transaction
tran_type_id # transaction type is 1 for debit and 2 for credit
transaction_amount # amount tranferred from from_acc_id to to_acc_id
tran_date # date and time of the transaction
status_type_id # status of the transaction is 1 for Sucess and 2 for Failed
from_acc_id # account number from which the transaction is initiated
to_acc_id # account number to which the transaction is targetted
fraud_score # score to indicate if the transaction is fraudulent or not, 1 is fraud and 0 is not fraud
fraud_category # fraud category is 1 for location, 2 for amount 

Input: List fraudulent transactions in last two days
Output: select * from transactions, accounts, users where transactions.from_acc_id=accounts.acc_id and accounts.user_id=users.user_id and transactions.fraud_score=1 and transactions.tran_date>=date(now())-interval '2 day';

Input: {user_query} 
Output:""",
        "parameters": {
                "decoding_method": "greedy",
                "max_new_tokens": 100,
                "repetition_penalty": 1
        },
        "model_id": "mistralai/mixtral-8x7b-instruct-v01",
        "project_id": "6e5b0dad-9c12-41f6-92f6-8f42c9bf711e",
        "moderations": {
                "hap": {
                        "input": {
                                "enabled": True,
                                "threshold": 0.5,
                                "mask": {
                                        "remove_entity_value": True
                                }
                        },
                        "output": {
                                "enabled": True,
                                "threshold": 0.5,
                                "mask": {
                                        "remove_entity_value": True
                                }
                        }
                }
        }
    }

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {AUTHENTICATION_TOKEN}"
    }

    response = requests.post(
           url,
           headers=headers,
           json=body
    )

    if response.status_code != 200:
        raise Exception("Non-200 response: " + str(response.text))
    
    data = response.json()

    #print(f'Response from WatsonX::\n {data}')
    sql_resp = data['results']


    SQL_QUERY = sql_resp[0]['generated_text'].split(';')[0]
  
    print(f"\nWatsonX generated SQL:: {SQL_QUERY}")

    JSON_SQL_QUERY = "select row_to_json(row) from(" + SQL_QUERY + ") row;"

    print(f'Updated SQL : {JSON_SQL_QUERY}')

    print(f"\nQuerying datbase...")

    db_conn = psycopg2.connect(
        dbname="digitalbank",
        user="postgres",
        password="mynewpassword",
        host="postgresql",
        port="5432"
    )

    db_cursor = db_conn.cursor()

    db_cursor.execute(JSON_SQL_QUERY)

    rows = db_cursor.fetchall()

    #print("\nResponse from database:: ")
    for row in rows:
        print(row)

    db_cursor.close()
    db_conn.close()
    return rows 
