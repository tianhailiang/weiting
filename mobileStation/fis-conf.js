

/*这个dev参数就是用来开发环境中使用的匹配*/

fis.media('dev').match('*.{js,css}',{
  useHash: false
}).match('*.less', {
	parser:fis.plugin('less-2.x'),
	rExt: '.css'
}).match('::package', {

  spriter:fis.plugin('csssprites')

}).match('*.css', {

  // 给匹配到的文件分配属性 `useSprite`
  useSprite: true

}).hook('relative').match('**', { 
  //让所有文件，都使用相对路径。
  relative: true 

});




fis.config.set('settings.spriter.csssprites', {
    scale: 0.5
});



/*这个pro参数就是用来生产环境中使用的匹配*/
fis.media('pro').match('*.{js,css}',{
  useHash: true
}).match('*.js', {
  //fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js')
}).match('*.png', {
  optimizer: fis.plugin('png-compressor')
}).match('*.less', {
	parser:fis.plugin('less-2.x'),
	rExt: '.css'
}).match('*.{css,less,scss}', {
  preprocessor: fis.plugin('autoprefixer', {
    "browsers": ["Android >= 2.1", "iOS >= 4", "ie >= 8", "firefox >= 15"],
    "cascade": true
  })
  
});





//fis.media("pro").match('/test/server.conf', {
//release: '/config/server.conf'
//});
//
