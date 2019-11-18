"use strict";

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _fs = _interopRequireDefault(require("fs"));

var _dbController = _interopRequireDefault(require("../controllers/dbController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cloudinary = _cloudinary["default"].v2;

var downloadImage = function downloadImage(req, res) {
  try {
    if (!req.files) {
      res.status(400).json({
        status: 400,
        message: "No file uploaded"
      });
    } else {
      var Image = req.files.Image;
      Image.mv("./uploads/".concat(Image.name));
      return "./uploads/".concat(Image.name);
    }
  } catch (err) {
    res.status(500).send(err);
  }

  return null;
};

exports.uploadImage = function _callee2(req, res) {
  var imageURL;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(downloadImage(req, res));

        case 3:
          imageURL = _context2.sent;

          if (imageURL.match(/\.(jpg|jpeg|png|gif)$/i)) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "Only image files are allowed!"
          }));

        case 6:
          cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
          });
          cloudinary.url("".concat(req.body.email), {
            width: 300,
            height: 300,
            crop: "fill"
          });
          cloudinary.uploader.upload(imageURL, function _callee(err, result) {
            var image, user;
            return regeneratorRuntime.async(function _callee$(_context) {
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
                    return regeneratorRuntime.awrap(result.secure_url);

                  case 4:
                    image = _context.sent;

                    _fs["default"].unlinkSync(imageURL);

                    if (!image) {
                      _context.next = 11;
                      break;
                    }

                    _context.next = 9;
                    return regeneratorRuntime.awrap(_dbController["default"].findUserByEmail(image, req.userData.email));

                  case 9:
                    user = _context.sent;
                    return _context.abrupt("return", res.status(200).json({
                      status: 200,
                      data: user
                    }));

                  case 11:
                    return _context.abrupt("return", null);

                  case 12:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });
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
  }, null, null, [[0, 11]]);
};