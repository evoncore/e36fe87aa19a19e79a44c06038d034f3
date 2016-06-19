(function() {
  console.log('player test');
  return console.log('game test');
}).call(this);

(function() {
  return console.log('ui');
}).call(this);
