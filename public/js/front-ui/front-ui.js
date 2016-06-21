(function() {
  var i, j, len, link, links, results, thisLocationUrl, urlPattern;
  console.log('module "front-ui" is required!');
  urlPattern = /\/[a-z]+$/g;
  thisLocationUrl = location.href.match(urlPattern);
  links = $('nav a');
  if (thisLocationUrl === null) {
    thisLocationUrl = '/';
  }
  results = [];
  for (i = j = 0, len = links.length; j < len; i = ++j) {
    link = links[i];
    if (links.eq(i).attr('href') === thisLocationUrl[0]) {
      links.eq(i).parent().addClass('active');
      results.push(links.eq(i).on('mouseenter', function() {
        return $(this).css({
          cursor: 'default'
        });
      }).on('click', function(e) {
        return e.preventDefault();
      }));
    } else {
      results.push(void 0);
    }
  }
  return results;
}).call(this);
