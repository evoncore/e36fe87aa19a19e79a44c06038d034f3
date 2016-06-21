(->  


  console.log 'module "front-ui" is required!'

  urlPattern = /\/[a-z]+$/g
  thisLocationUrl = location.href.match(urlPattern)
  links = $('nav a')

  if (thisLocationUrl == null)
    thisLocationUrl = '/'

  for link, i in links
    if (links.eq(i).attr('href') == thisLocationUrl[0])
      links.eq(i).parent().addClass('active')
      links.eq(i).on('mouseenter', ->
        $(this).css({cursor: 'default'})
      ).on 'click', (e) ->
        e.preventDefault()

).call this