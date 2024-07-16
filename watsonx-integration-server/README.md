# watsonx-integration-with-bank-data
Banking with natural language queries from user

Start application

   python3.11 flask-server.py 

NLP Query API

   http://127.0.0.1:5001/data?query="List all iusers with account balance morethan 1000"

Update token API

   http://127.0.0.1:5001/updatetoken
  
   Updatetoken API doesnt respond any data, it updates the token and restarts the application
