'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 6/23/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Collection = function (_EventEmitter) {
    _inherits(Collection, _EventEmitter);

    function Collection(array, config) {
        _classCallCheck(this, Collection);

        var _this = _possibleConstructorReturn(this, (Collection.__proto__ || Object.getPrototypeOf(Collection)).apply(this, arguments));

        config = config || {};
        _this._array = array || [];
        _this._currentIndex = 0;
        _this._circular = config.circular || false;
        _this._current = null;
        return _this;
    }

    _createClass(Collection, [{
        key: '_bump',
        value: function _bump(diff) {
            if (this._validateDiff(diff)) {
                this._currentIndex = this._normalizeCircularIndex(this._currentIndex + diff);
                this.triggerChange();
            } else {
                console.log('element not available');
            }
        }
    }, {
        key: '_normalizeCircularIndex',
        value: function _normalizeCircularIndex(index) {
            var arrayLength = this._array.length;
            return (index + arrayLength) % arrayLength;
        }
    }, {
        key: '_validateDiff',
        value: function _validateDiff(diff) {
            var newIndex = this._currentIndex + diff;
            if (this._circular) {
                newIndex = this._normalizeCircularIndex(newIndex);
            }
            return this._array[newIndex] !== undefined;
        }
    }, {
        key: 'next',
        value: function next() {
            this._bump(1);
        }
    }, {
        key: 'prev',
        value: function prev() {
            this._bump(-1);
        }
    }, {
        key: 'hasNext',
        value: function hasNext() {
            return this._validateDiff(1);
        }
    }, {
        key: 'hasPrev',
        value: function hasPrev() {
            return this._validateDiff(-1);
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return this._array.length === 0;
        }
    }, {
        key: 'getActiveIndex',
        value: function getActiveIndex() {
            return this._currentIndex;
        }
    }, {
        key: 'getActiveElement',
        value: function getActiveElement() {
            return this._array[this._currentIndex];
        }
    }, {
        key: 'getArray',
        value: function getArray() {
            return this._array;
        }
    }, {
        key: 'reset',
        value: function reset(array) {
            this._array = array;
            this._currentIndex = 0;
            this._current = null;
            this.triggerChange();
        }
    }, {
        key: 'on',
        value: function on(event, callback) {
            var _this2 = this;

            _get(Collection.prototype.__proto__ || Object.getPrototypeOf(Collection.prototype), 'on', this).call(this, event, callback);
            var unsubscribe = function unsubscribe() {
                _get(Collection.prototype.__proto__ || Object.getPrototypeOf(Collection.prototype), 'removeListener', _this2).call(_this2, event, callback);
            };
            return unsubscribe;
        }
    }, {
        key: 'trigger',
        value: function trigger() {
            this.emit.apply(this, arguments);
        }
    }, {
        key: 'triggerChange',
        value: function triggerChange() {
            var prevElement = this._current;
            var currElement = this.getActiveElement();
            this.trigger('change', currElement, prevElement);
            this._current = currElement;
        }
    }]);

    return Collection;
}(_events2.default);

exports.default = Collection;