const   ax   = require('axios');

const   tok = process.env.AFFORDMED_TOKEN   ||   "";

function   mylogg(   st ,   lvl ,   pk ,   msg )   {
  ax.post(
    'http://20.244.56.144/evaluation-service/logs',
    {
       stack: st ,
          level: lvl  ,
          package: pk   ,
             message: msg
    },
    {
      headers: {
        Authorization: `Bearer ${tok}`
      }
    }
  ).catch(() => {});
}

module.exports = mylogg; 