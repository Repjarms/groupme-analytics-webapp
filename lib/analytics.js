require('dotenv').config({ silent: true });
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const groupmeToken = process.env.GROUPME_API_TOKEN;
const groupmeGroup = process.env.GROUPME_GROUP;
const groupmeUrl = 'https://api.groupme.com/v3';
const requestUrl = `${groupmeUrl}/groups/${groupmeGroup}/messages?limit=100&token=${groupmeToken}`;

const getMessages = () => (
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', requestUrl);
    xhr.onload = () => resolve(JSON.parse(xhr.responseText));
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  })
);

const reduceMessagesToCount = (messageArray) => {
  const userObj = {};

  messageArray.forEach((message) => {
    if (message.user_id in userObj) {
      userObj[message.user_id].messages += 1;
      userObj[message.user_id].likes += message.favorited_by.length;
      userObj[message.user_id].likesPerMessage = userObj[message.user_id].likes / userObj[message.user_id].messages;
    } else {
      userObj[message.user_id] = {
        messages: 0,
        likes: 0,
        likesPerMessage: 0,
        name: message.name,
      };
    }
  });
  return userObj;
};

const dataHandler = () => (
  new Promise((resolve, reject) => {
    getMessages()
      .then(data => resolve(reduceMessagesToCount(data.response.messages))
        .catch(err => reject(err)));
  })
);

module.exports = {
  test: dataHandler,
};
