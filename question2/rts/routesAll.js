const   exp = require('express');

const   rtr = exp.Router();

const   shortyCtrl = require('../ctrl/shortyCtrl');

const   statStuff = require('../ctrl/statStuff');

const   fsx = require('fs');
const   pth = require('path');

const   mylogg = require('../mid/myLogger');


const   dbfile = pth.join(__dirname, '../store/dataStore.json');
function   getDb() {
  if (!fsx.existsSync(dbfile)) return {};
       return JSON.parse(fsx.readFileSync(dbfile, 'utf-8'));
}
function   putDb(d) {
  fsx.writeFileSync(dbfile, JSON.stringify(d, null, 2));
}

rtr.post('/shorten', shortyCtrl.makeShort);

rtr.get('/shorturl/:id/stat', statStuff.getStats);

rtr.get('/:id', (req, res) => {
  const code = req.params.id;
        const db = getDb();
  const entry = db[code];
  if (!entry) {
       mylogg('backend', 'error', 'handler', 'not found');
    return res.status(404).json({ error: 'not found' });
  }

  if (new Date() > new Date(entry.expiry)) {
    mylogg('backend', 'warn', 'handler', 'expired');
    return res.status(410).json({ error: 'expired' });
  }
  entry.clicks++;
      entry.clickDetails.push({
    time: new Date().toISOString(),
    ref: req.get('referer') || '',
    geo: req.ip
  });
  putDb(db);

  
  mylogg('backend', 'info', 'handler', 'redir');
  res.redirect(entry.url);
});

module.exports = rtr; 