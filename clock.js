var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var key = 'AIzaSyDfg1yJ2wwN2kucPfECfwECosbpp9rHG6w';
var geocoder;

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

            var d = new Date(this.props.timestamp + 1000 * this.props.offset);
            var utcHours = d.getUTCHours();
            var ampm = utcHours < 12 ? 'AM' : 'PM';
            var hours = utcHours % 12 || 12;
            var timeString = hours + ":" + ("0" + d.getUTCMinutes()).substr(-2) + " " + ampm;
            return React.createElement(
                'div',
                { className: 'card clock border-info mb-3 ml-1 mr-1' },
                React.createElement(
                    'div',
                    { className: 'card-header' },
                    React.createElement(
                        'span',
                        { className: 'close', onClick: function onClick() {
                                return _this2.props.removeEntry(_this2.props.id);
                            } },
                        'X'
                    ),
                    React.createElement(
                        'small',
                        null,
                        this.props.address
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'card-body' },
                    React.createElement(
                        'h5',
                        { className: 'card-title' },
                        timeString
                    ),
                    React.createElement('h6', { className: 'card-subtitle mb-2 text-muted' })
                )
            );
        }
    }]);

    return Clock;
}(React.Component);

var ClockContainer = function (_React$Component2) {
    _inherits(ClockContainer, _React$Component2);

    function ClockContainer(props) {
        _classCallCheck(this, ClockContainer);

        var _this3 = _possibleConstructorReturn(this, (ClockContainer.__proto__ || Object.getPrototypeOf(ClockContainer)).call(this, props));

        _this3.state = { clocks: [], timestamp: Date.now() };
        return _this3;
    }

    _createClass(ClockContainer, [{
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
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this4 = this;

            this.timerID = setInterval(function () {
                return _this4.tick();
            }, 1000);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearInterval(this.timerID);
        }
    }, {
        key: 'tick',
        value: function tick() {
            this.setState({
                clocks: this.state.clocks,
                timestamp: Date.now()
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            return React.createElement(
                'div',
                null,
                this.state.clocks.map(function (e) {
                    return React.createElement(Clock, { key: e.id, id: e.id, offset: e.offset, address: e.address, timestamp: _this5.state.timestamp, removeEntry: _this5.removeEntry.bind(_this5) });
                })
            );
        }
    }]);

    return ClockContainer;
}(React.Component);

var idCounter = 0;
var r = ReactDOM.render(React.createElement(ClockContainer, null), document.getElementById('reactContainer'));

function buildClock(results, status) {
    if (status == 'OK') {
        var loc = results[0].geometry.location.toUrlValue();
        var timestamp = Math.round(new Date().getTime() / 1000);
        var tzcall = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + loc + '&timestamp=' + timestamp + '&key=' + key;

        var xhr = new XMLHttpRequest();
        xhr.open('GET', tzcall);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var tzdata = JSON.parse(xhr.responseText);
                if (tzdata.status == 'OK') {
                    var newClocks = r.state.clocks;
                    newClocks.push({
                        id: idCounter,
                        offset: tzdata.dstOffset + tzdata.rawOffset,
                        address: results[0].formatted_address
                    });
                    r.setState({ clocks: newClocks, timestamp: Date.now() });
                    idCounter += 1;
                }
            }
        };
        xhr.send();
    }
}

function codeAddress(address) {
    geocoder.geocode({ 'address': address }, buildClock);
}

function formHandler() {
    codeAddress(document.getElementById('addressField').value);
    return false;
}

function initClocks() {
    geocoder = new google.maps.Geocoder();
    codeAddress('Chugwater Wyoming');
    codeAddress('Concepcion, Chile');
    codeAddress('Sydney Australia');
    codeAddress('Asmara Eritrea');
}