import json
import copy
import os
import sys

from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

from gevent.pywsgi import WSGIServer

from watsonx_integration_service import retrieve_data_from_db

app = Flask(__name__)
CORS(app)


resp_data = {
  	'type': 'agent',
  	'sections': [
    		{
      			'type': 'text',
      			'data': 'I have found the following transactions based on your request.'
    		},
    		{
      			'type': 'table',
      			'data': [
      			]
    		}
  	]
    }

# GET routines
@app.route('/data', methods=['GET'])
def fetchResponse():
    resp_data_local = copy.deepcopy(resp_data);
    query = request.args.get('query')
    data = retrieve_data_from_db(query)
    for row in data:
        resp_data_local["sections"][1]["data"].append(row);
    return jsonify(resp_data_local)

# GET routines
@app.route('/updatetoken', methods=['GET'])
def updateToken():
    os.system("""echo "WATSONX_ACCESS_TOKEN=`bash generatetoken.sh | cut -d',' -f1 | cut -d'"' -f4`" > .env""")

    import sys
    print("argv was",sys.argv)
    print("sys.executable was", sys.executable)
    print("restart now")

    os.execv(sys.executable, ['python3.11'] + sys.argv)

if __name__ == '__main__':
   os.system("""echo "WATSONX_ACCESS_TOKEN=`bash generatetoken.sh | cut -d',' -f1 | cut -d'"' -f4`" > .env""")
   print(f'Starting API server on port 5001')
   http_server = WSGIServer(('0.0.0.0', 5001), app)
   http_server.serve_forever() 
