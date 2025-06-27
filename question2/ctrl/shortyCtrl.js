const   fsx = require('fs');

const   pth = require('path');

const   { nanoid } = require('nanoid');

const   mylogg = require('../mid/myLogger');


const   dbfile = pth.join(__dirname, '../store/dataStore.json');

function   getDb() {
  if (!fsx.existsSync(dbfile)) return {};
  return JSON.parse(fsx.readFileSync(dbfile, 'utf-8'));
}


function   putDb(d) {
  fsx.writeFileSync(dbfile, JSON.stringify(d, null, 2));
}


exports.makeShort = (req, res) => {
  const { url, validity = 30, shortcode } = req.body;
  if (!url || typeof url !== 'string') {
    mylogg('backend', 'error', 'handler', 'bad url');
    return res.status(400).json({ error: 'bad url' });
  }
  let db = getDb();
  let code = shortcode || nanoid(6);
  if (db[code]) {
    mylogg('backend', 'error', 'handler', 'code exists');
    return res.status(409).json({ error: 'code  is exists' });
  }



  const now = Date.now();
  const exp = new Date(now + validity * 60000).toISOString();
  db[code] = {
    url,
    created: new Date(now).toISOString(),
    expiry: exp,
    clicks: 0,
    clickDetails: []
  };
  putDb(db);
  mylogg('backend', 'info', 'handler', 'short made');
  res.status(201).json({ shortLink: `/` + code, expiry: exp });
}; 