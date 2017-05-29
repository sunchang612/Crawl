let request = require('request');
let iconv = require('iconv-lite');
let cheerio = require('cheerio');
let debug = require('debug')('crawl:read');
// 读取url地址中的内容 ，读到后调用回调函数
exports.read = function (url, callback) {
    request({url,encoding:null},function (err, response, body) {
        //把body 从buffer 转成字符串
        body = iconv.decode(body,'gbk');
        let $ = cheerio.load(body);
        let movies = [];
        $('.keyword .list-title').each(function (index, item) {
            let $this = $(item);
            let movie ={
                name:$this.text(),
                url:$this.attr('href')
            };
            debug(`读电影:${movie.name}`);
            movies.push(movie)
        });
        callback(err,movies);
    })
};
// exports.read('http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1',function (err,movies) {
//     console.log(movies);
// });