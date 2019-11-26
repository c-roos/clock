var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var testVar = 'Hello';
var key = 'AIzaSyDfg1yJ2wwN2kucPfECfwECosbpp9rHG6w';
var geocoder;

var MyClass = function (_React$Component) {
    _inherits(MyClass, _React$Component);

    function MyClass() {
        _classCallCheck(this, MyClass);

        return _possibleConstructorReturn(this, (MyClass.__proto__ || Object.getPrototypeOf(MyClass)).apply(this, arguments));
    }

    _createClass(MyClass, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    'Test Component'
                )
            );
        }
    }]);

    return MyClass;
}(React.Component);

var testElement = React.createElement(
    'div',
    { id: 'test' },
    React.createElement(
        'p',
        null,
        'Hello'
    )
);

function buildClock(results, status) {
    if (status == 'OK') {
        var loc = results[0].geometry.location.toUrlValue();
        console.log(loc);
        var timestamp = Math.round(new Date().getTime() / 1000);
        var tzcall = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + loc + '&timestamp=' + timestamp + '&key=' + key;

        var xhr = new XMLHttpRequest();
        xhr.open('GET', tzcall);
        xhr.onload = function () {
            console.log(xhr.status);
            if (xhr.status === 200) {
                var tzdata = JSON.parse(xhr.responseText);
                console.log(tzdata);
                if (tzdata.status == 'OK') {
                    console.log(new Date().toLocaleString());
                    tztime = new Date().getTime() + (tzdata.dstOffset + tzdata.rawOffset) * 1000;
                    console.log(new Date(tztime).toLocaleString());
                }
            }
        };
        xhr.send();
    }
}

function codeAddress(address) {
    geocoder.geocode({ 'address': address }, buildClock);
}

var Clock = function (_React$Component2) {
    _inherits(Clock, _React$Component2);

    function Clock() {
        _classCallCheck(this, Clock);

        return _possibleConstructorReturn(this, (Clock.__proto__ || Object.getPrototypeOf(Clock)).apply(this, arguments));
    }

    _createClass(Clock, [{
        key: 'render',
        value: function render() {
            return React.createElement('div', null);
        }
    }]);

    return Clock;
}(React.Component);

function initClocks() {
    geocoder = new google.maps.Geocoder();
    codeAddress('Mountain View, CA');
    //ReactDOM.render(<Clock />, document.getElementById('container'));
}