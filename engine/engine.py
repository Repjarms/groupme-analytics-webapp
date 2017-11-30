import os
import requests
import json
from dotenv import load_dotenv, find_dotenv

# Load environment variables
load_dotenv(find_dotenv())
GROUPME_API_TOKEN = os.environ.get('GROUPME_API_TOKEN')
GROUPME_GROUP = os.environ.get('GROUPME_GROUP')

# Construct groupme api url
payload = {'limit': 100, 'token': GROUPME_API_TOKEN}
GROUPME_REQUEST_URL = 'https://api.groupme.com/v3/groups/' + GROUPME_GROUP + '/messages'

r = requests.get(GROUPME_REQUEST_URL, params=payload)
groupme_payload = r.json()

messages = []

# pull 2000 groupme messages
for i in range(0, 20):
    for message in groupme_payload['response']['messages']:
        messages.append(message)

    subarr = [x['created_at'] for x in groupme_payload['response']['messages']]
    oldest_post = min(subarr)
    before_id = None

    for message in groupme_payload['response']['messages']:
        if message['created_at'] == oldest_post:
            before_id = message['id']

    payload = {'limit': 100, 'token': GROUPME_API_TOKEN, 'before_id':
            before_id}

    r = requests.get(GROUPME_REQUEST_URL, params=payload)
    groupme_payload = r.json()

with open('test.json', 'w+') as outfile:
    json.dump(messages, outfile, indent=2)
