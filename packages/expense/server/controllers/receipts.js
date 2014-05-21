'use strict';

var receipt_types = [{
  code: 'CASH',
  desc: '현금영수증'
}, {
  code: 'CRCD', // credit card
  desc: '개인신용카드'
}, {
  code: 'COCD', // coorporate card
  desc: '법인신용카드'
}, {
  code: 'CKCD', // check card
  desc: '체크카드'
}];

/**
 * Get receipt types
 */
exports.types = function(req, res) {
  return res.json(receipt_types);
};