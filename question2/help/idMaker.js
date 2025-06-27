function   makeId(len = 6) {
  const abc = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let out = '';
  for (let i = 0; i < len; i++) {
    out += abc[Math.floor(Math.random() * abc.length)];
  }
  return out;
}
module.exports = makeId; 