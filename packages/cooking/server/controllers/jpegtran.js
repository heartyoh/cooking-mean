'use strict';

var execFile = require('child_process').execFile;
var fs = require('fs');
var imageType = require('image-type');
var jpegtran = require('jpegtran-bin').path;
var tempfile = require('tempfile');
var rm = require('rimraf');
var ExifImage = require('exif').ExifImage;

/**
 * jpegtran image-min plugin ==> 이미지의 orientation에 맞춰서 변환해서 저장하는 로직을 추가함.
 *
 * @param {Object} opts
 * @api public
 */

module.exports = function (opts) {
    opts = opts || {};

    return function (file, imagemin, cb) {
        if (imageType(file.contents) !== 'jpg') {
            return cb();
        }

        try {
            new ExifImage({ image : file.contents }, function (error, exifData) {

                if (error) {
                    console.log('Error: '+error.message);
                } else {
                    // console.log('EXIF-DATA', exifData); // Do something with your data!
                    var orientation = exifData.image.Orientation;

                    console.log('Orientation', orientation);

                    var tran = null;
                    switch(orientation) {
                        case 2:
                            tran = ['-flip', 'horizontal'];
                            break;
                        case 3:
                            tran = ['-rotate', '180'];
                            break;
                        case 4:
                            tran = ['-flip', 'vertical'];
                            break;
                        case 5:
                            tran = ['-flip', 'vertical', '-rotate', '90'];
                            break;
                        case 6:
                            tran = ['-rotate', '90'];
                            break;
                        case 7:
                            tran = ['-flip', 'horizontal', '-rotate', '90'];
                            break;
                        case 8:
                            tran = ['-rotate', '270'];
                            break;
                        default:
                    }

                    var args = ['-copy', 'none', '-optimize'];
                    if(tran) {
                        args = args.concat(tran);
                    }

                    var src = tempfile('.jpg');
                    var dest = tempfile('.jpg');

                    if (opts.progressive) {
                        args.push('-progressive');
                    }

                    fs.writeFile(src, file.contents, function (err) {
                        if (err) {
                            return cb(err);
                        }

                        execFile(jpegtran, args.concat(['-outfile', dest, src]), function (err) {
                            if (err) {
                                return cb(err);
                            }

                            fs.readFile(dest, function (err, buf) {
                                rm(src, function (err) {
                                    if (err) {
                                        return cb(err);
                                    }

                                    rm(dest, function (err) {
                                        if (err) {
                                            return cb(err);
                                        }

                                        file.contents = buf;

                                        cb();
                                    });
                                });
                            });
                        });
                    });
                }
            });
        } catch (error) {
            console.log('Error: ' + error.message);
        }

    };
};
