'use strict';

var http = require('http');
var url = require('url');

function error(res, status, message) {
  res.writeHead(status, { 'Content-Type':'text/plain' });
  res.end(message, 'ascii');
}

/**
 * Get currency rate
 */
exports.rate = function(req, res) {
  
  // Currency rate API
  //
  // to get latest rate HTTP-GET 'http://currencies.apps.grandtrunk.net/getlatest/<fromcode>/<tocode>'
  // to get history rate HTTP-GET 'http://currencies.apps.grandtrunk.net/getrate/<date>/<fromcode>[/<tocode>]'
  //
  // Refer to http://currencies.apps.grandtrunk.net/
  var url_latest_rate = 'http://currencies.apps.grandtrunk.net/getlatest/';
  var url_history_rate = 'http://currencies.apps.grandtrunk.net/getrate/';

  var args = url.parse(req.url, true).query;

  // validation
  if(!args.from) {
    return error(res, 400, 'Form currency code should be specified.\n');
  }
  if(!args.to) {
    return error(res, 400, 'To currency code should be specified.\n');
  }

  var date;

  if(args.date) {
    var ms = Date.parse(args.date);
    if(isNaN(ms)) {
      return error(res, 400, 'Invalid date format. YYYY-MM-DD format recommended.\n');
    }
    date = new Date(ms);
  }

  var api_url;
  if(date) {
    api_url = url_history_rate + date.toISOString().substr(0,10) + '/' + args.from + '/' + args.to;
  } else {
    api_url = url_latest_rate + args.from + '/' + args.to;
  }

  http.get(api_url, function(apires) {
    var body = '';

    apires.on('data', function(chunk) {
      body += chunk;
    });

    apires.on('end', function() {
      args.rate = body;
      return res.json(args);
    });
  }).on('error', function(e) {
    return error(res, 500, e);
  });
};

var currency_types = {
  KRW: '한국 원화',
  USD: '미국 달러',
  CNY: '중국 위안화',
  JPY: '일본 엔화',
  EUR: '유로화'
};

exports.types = function(req, res) {
  return res.json(currency_types);
};