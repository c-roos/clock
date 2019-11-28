var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var key = 'AIzaSyDfg1yJ2wwN2kucPfECfwECosbpp9rHG6w';
var geocoder;

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
                    tztime = Date.now() + (tzdata.dstOffset + tzdata.rawOffset) * 1000;
                    console.log(new Date(tztime).toString());
                }
            }
        };
        xhr.send();
    }
}

function codeAddress(address) {
    geocoder.geocode({ 'address': address }, buildClock);
}

function initClocks() {
    console.log('initClocks');
    //geocoder = new google.maps.Geocoder();
    //codeAddress('Mountain View, CA');
    //ReactDOM.render(<Clock />, document.getElementById('container'));
}

var Clock = function (_React$Component) {
    _inherits(Clock, _React$Component);

    function Clock() {
        _classCallCheck(this, Clock);

        return _possibleConstructorReturn(this, (Clock.__proto__ || Object.getPrototypeOf(Clock)).apply(this, arguments));
    }

    _createClass(Clock, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                { className: 'clock', onClick: function onClick() {
                        return _this2.props.removeEntry(_this2.props.id);
                    } },
                React.createElement(
                    'div',
                    { className: 'close' },
                    'X'
                ),
                React.createElement(
                    'div',
                    { className: 'location' },
                    'Mountain View, CA'
                ),
                React.createElement(
                    'div',
                    { className: 'timer' },
                    new Date().toLocaleTimeString()
                )
            );
        }
    }]);

    return Clock;
}(React.Component);

var Foo = function (_React$Component2) {
    _inherits(Foo, _React$Component2);

    function Foo() {
        _classCallCheck(this, Foo);

        return _possibleConstructorReturn(this, (Foo.__proto__ || Object.getPrototypeOf(Foo)).apply(this, arguments));
    }

    _createClass(Foo, [{
        key: 'render',
        value: function render() {
            var _this4 = this;

            return React.createElement(
                'div',
                { onClick: function onClick() {
                        return _this4.props.removeEntry(_this4.props.id);
                    } },
                this.props.message
            );
        }
    }]);

    return Foo;
}(React.Component);

var Test = function (_React$Component3) {
    _inherits(Test, _React$Component3);

    function Test(props) {
        _classCallCheck(this, Test);

        var _this5 = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this, props));

        _this5.state = { clocks: [] };
        return _this5;
    }

    _createClass(Test, [{
        key: 'removeEntry',
        value: function removeEntry(id) {
            var newState = this.state.clocks;
            var index = newState.findIndex(function (e) {
                return e.id === id;
            });
            newState.splice(index, 1);
            this.setState({ clocks: newState });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            return React.createElement(
                'div',
                null,
                this.state.clocks.map(function (e) {
                    return React.createElement(Clock, { key: e.id, id: e.id, removeEntry: _this6.removeEntry.bind(_this6) });
                })
            );
        }
    }]);

    return Test;
}(React.Component);

var idCounter = 0;

var r = ReactDOM.render(React.createElement(Test, null), document.getElementById('container'));

function addThing() {
    var newState = r.state.clocks;
    newState.push({ id: idCounter });
    r.setState({ clocks: newState });
    idCounter += 1;
}