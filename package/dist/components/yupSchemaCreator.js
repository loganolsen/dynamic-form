'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yup = require('yup');

var yup = _interopRequireWildcard(_yup);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createYupSchema(schema, config) {
  var id = config.id,
      validationType = config.validationType,
      _config$validations = config.validations,
      validations = _config$validations === undefined ? [] : _config$validations;

  if (!yup[validationType]) {
    return schema;
  }
  var validator = yup[validationType]();
  validations.forEach(function (validation) {
    var _validator;

    var params = validation.params,
        type = validation.type;

    if (!validator[type]) {
      return;
    }
    validator = (_validator = validator)[type].apply(_validator, _toConsumableArray(params));
  });
  schema[id] = validator;
  return schema;
}

exports.default = createYupSchema;