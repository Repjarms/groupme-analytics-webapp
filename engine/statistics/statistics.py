# Statistics package for Groupme Analytics

import os
import json

messages = []
with open('../test.json', 'r') as infile:
    messages = json.load(infile)

user_dict = {}

# Calculate likes and posts
for message in messages:
    user_id = message['user_id']
    like_count = len(message['favorited_by'])

    if user_id not in user_dict:
        user_dict[user_id] = {'messages': 1, 'likes': like_count, 'name': message['name']}
    else:
        user_dict[user_id]['messages'] += 1
        user_dict[user_id]['likes'] += like_count

# Calculate likes per post
for user in user_dict:
    user_dict[user]['lpp'] = user_dict[user]['likes'] / user_dict[user]['messages']

with open('user_test.json', 'w') as outfile:
    json.dump(user_dict, outfile, indent=2)
