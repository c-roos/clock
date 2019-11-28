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

var Foo = function (_React$Component) {
    _inherits(Foo, _React$Component);

    function Foo() {
        _classCallCheck(this, Foo);

        return _possibleConstructorReturn(this, (Foo.__proto__ || Object.getPrototypeOf(Foo)).apply(this, arguments));
    }

    _createClass(Foo, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                { onClick: function onClick() {
                        return _this2.props.removeEntry(_this2.props.id);
                    } },
                this.props.message
            );
        }
    }]);

    return Foo;
}(React.Component);

var Test = function (_React$Component2) {
    _inherits(Test, _React$Component2);

    function Test(props) {
        _classCallCheck(this, Test);

        var _this3 = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this, props));

        _this3.state = {
            entries: [{ id: 1, message: "Hi" }, { id: 2, message: "Bye" }]
        };
        return _this3;
    }

    _createClass(Test, [{
        key: 'removeEntry',
        value: function removeEntry(id) {
            var index = this.state.entries.findIndex(function (e) {
                return e.id === id;
            });
            var tempArray = this.state.entries;
            tempArray.splice(index, 1);
            this.setState({ entries: tempArray });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            return React.createElement(
                'div',
                null,
                this.state.entries.map(function (e) {
                    return React.createElement(Foo, { key: e.id, id: e.id, message: e.message, removeEntry: _this4.removeEntry.bind(_this4) });
                })
            );
        }
    }]);

    return Test;
}(React.Component);

var click = 2;

var r = ReactDOM.render(React.createElement(Test, null), document.getElementById('container'));

function addThing() {
    click += 1;
    var tempArray = r.state.entries;
    tempArray.push({ id: click, message: "testMessage" });
    r.setState({ entries: tempArray });
}