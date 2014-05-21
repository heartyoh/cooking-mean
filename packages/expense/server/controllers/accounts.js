'use strict';

var accounts = [{
  code: 'AA',
  desc: '숙박비'
}, {
  code: 'BA',
  desc: '식대(조,중,석식)'
}, {
  code: 'CA',
  desc: '원거리 교통비(항공, 기차, 고속버스)'
}, {
  code: 'CB',
  desc: '단거리 교통비(택시, 리무진버스 등)'
}, {
  code: 'CC',
  desc: '유류비'
}, {
  code: 'CD',
  desc: '고속도로 통행료, 주차'
}, {
  code: 'EA',
  desc: '전화 우편 등기요금 등 통신비용'
}, {
  code: 'FA',
  desc: '회의비 회식비'
}, {
  code: 'GA',
  desc: '접대비'
}, {
  code: 'ZA',
  desc: '기타 비용(숙소 관리비 및 공과금)'
}];

/**
 * Get account list
 */
exports.list = function(req, res) {
  return res.json(accounts);
};