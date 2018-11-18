
const T = require('./twitter');

module.exports = {

	tweet: (tweet) => {
    return new Promise((res, rej)=> {
      T.post('statuses/update', {
        status: tweet
      }, (error, response) => {
        error ? rej(error) : res(response)
      });
    });
  },

	retweet: (tweet) => {
    return new Promise((res, rej)=> {
      T.post('statuses/retweet/:id', { 
        id: tweet.id_str
      }, (error, response) => {
        error ? rej(error) : res(response)
      });
    });
  }, 

	reply: (tweet, reply) => {
    return new Promise((res, rej)=> {
      T.post('statuses/update', {
        status: `@${tweet.user.screen_name} ${reply}`,
        in_reply_to_status_id: tweet.id_str
      }, (error, response) => {
        error ? rej(error) : res(response)
      });
    });
  },

  like: (tweet) => {
    return new Promise((res, rej)=> {
      T.post('favorites/create', { 
        id: tweet.id_str
      }, (error, response) => {
        error ? rej(error) : res(response)
      });
    });
  },

  stream: (path, payload) => {
  	return T.stream(path, payload)
  },

  reply: (payload) => {
    return new Promise((res, rej)=> {
      T.post('statuses/update', {
        status: `@${payload.screen_name} ${payload.message}`,
        in_reply_to_status_id: payload.id_str
      }, (error, response) => {
        error ? rej(error) : res([response, payload])
      });
    });
  }
}