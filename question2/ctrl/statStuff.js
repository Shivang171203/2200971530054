const   fsx = require('fs');


const   pth = require('path');

const   mylogg = require('../mid/myLogger');


const   dbfile = pth.join(__dirname, '../store/dataStore.json');

function   getDb() {
       if (!fsx.existsSync(dbfile)) return {};
  return JSON.parse(fsx.readFileSync(dbfile, 'utf-8'));
}



exports.getStats = (req, res) => {
  const code = req.params.id;
    const db = getDb();
    const entry = db[code];
  if (!entry) {
    mylogg('backend', 'error', 'handler', 'not found');
      return res.status(404).json({ error: 'not found' });
  }


  mylogg('backend', 'info', 'handler', 'got stats');
  res.json({
       totalClicks: entry.clicks,
    originalURL: entry.url,
     createdAt: entry.created,
    expiry: entry.expiry,
      clickDetails: entry.clickDetails
  });
}; 