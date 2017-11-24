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
    // declare messages and likes outside of conditional scope
    // if the user_id already exists in userObj
    if (message.user_id in userObj) {
      userObj[message.user_id].messages += 1;
      userObj[message.user_id].likes += message.favorited_by.length;

      const messages = userObj[message.user_id].messages;
      const likes = userObj[message.user_id].likes;

      userObj[message.user_id].likesPerMessage = likes / messages;

    // if the user_id does not exist
    } else {
      const messages = 1;
      const likes = message.favorited_by.length;

      userObj[message.user_id] = {
        messages: 1,
        likes: message.favorited_by.length,
        name: message.name,
        likesPerMessage: likes / messages,
      };
    }
  });
  return userObj;
};

const constructAnalyticsPayload = (data) => {
  const messageStats = reduceMessagesToCount(data.response.messages);
  return { messageStats, count: data.response.count };
};

const dataHandler = () => (
  new Promise((resolve, reject) => {
    getMessages()
      .then(data => resolve(constructAnalyticsPayload(data)))
      .catch(err => reject(err));
  })
);

module.exports = {
  test: dataHandler,
};
