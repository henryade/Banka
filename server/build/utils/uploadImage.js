"use strict";

var _cloudinary = require("cloudinary");

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _dbController = require("../controllers/dbController");

var _dbController2 = _interopRequireDefault(_dbController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var cloudinary = _cloudinary2.default.v2;

var downloadImage = function downloadImage(req, res) {
  try {
    if (!req.files) {
      res.status(400).json({
        status: 400,
        message: "No file uploaded"
      });
    } else {
      var Image = req.files.Image;

      Image.mv("./uploads/" + Image.name);

      return "./uploads/" + Image.name;
    }
  } catch (err) {
    res.status(500).send(err);
  }
  return null;
};

exports.uploadImage = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var imageURL;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return downloadImage(req, res);

          case 3:
            imageURL = _context2.sent;

            if (imageURL.match(/\.(jpg|jpeg|png|gif)$/i)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({ message: "Only image files are allowed!" }));

          case 6:

            cloudinary.config({
              cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
              api_key: process.env.CLOUDINARY_API_KEY,
              api_secret: process.env.CLOUDINARY_API_SECRET
            });
            cloudinary.url("" + req.body.email, { width: 300, height: 300, crop: "fill" });
            cloudinary.uploader.upload(imageURL, function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, result) {
                var image, user;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!err) {
                          _context.next = 2;
                          break;
                        }

                        return _context.abrupt("return", res.status(400).json({
                          status: 400,
                          error: "Error Occured"
                        }));

                      case 2:
                        _context.next = 4;
                        return result.secure_url;

                      case 4:
                        image = _context.sent;

                        _fs2.default.unlinkSync(imageURL);
                        user = void 0;

                        if (!image) {
                          _context.next = 12;
                          break;
                        }

                        _context.next = 10;
                        return _dbController2.default.findUserByEmail(image, req.userData.email);

                      case 10:
                        user = _context.sent;
                        return _context.abrupt("return", res.status(200).json({
                          status: 200,
                          data: user
                        }));

                      case 12:
                        return _context.abrupt("return", null);

                      case 13:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
              };
            }());
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);

            res.status(500).send(_context2.t0);

          case 14:
            return _context2.abrupt("return", null);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 11]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();