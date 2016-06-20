$(document).ready(function() {

(function() {}, (function() {
  return console.log('ui');
}).call(this)).call(this);

(function() {}, (function() {
  console.log('player');
  return console.log('game');
}).call(this)).call(this);


});