'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Point = function (_React$Component) {
    _inherits(Point, _React$Component);

    function Point(properties) {
        _classCallCheck(this, Point);

        var _this = _possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this, properties));

        _this.state = { id: properties.id, event: properties.event, x: properties.x, y: properties.y, date: properties.date };
        return _this;
    }

    _createClass(Point, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'tr',
                { key: this.state.id },
                React.createElement(
                    'td',
                    null,
                    this.state.event
                ),
                React.createElement(
                    'td',
                    null,
                    this.state.x
                ),
                React.createElement(
                    'td',
                    null,
                    this.state.y
                ),
                React.createElement(
                    'td',
                    null,
                    this.state.date
                )
            );
        }
    }]);

    return Point;
}(React.Component);

var ListPoint = function (_React$Component2) {
    _inherits(ListPoint, _React$Component2);

    function ListPoint(properties) {
        _classCallCheck(this, ListPoint);

        var _this2 = _possibleConstructorReturn(this, (ListPoint.__proto__ || Object.getPrototypeOf(ListPoint)).call(this, properties));

        _this2.state = { site_id: properties.site_id, list: [] };
        _this2.createSwapUpdate();
        _this2.startInterval();
        console.log('construct');
        return _this2;
    }

    _createClass(ListPoint, [{
        key: 'startInterval',
        value: function startInterval() {
            var th = this;

            this.state.interval = setInterval(function () {
                th.updateData();
            }, 5000);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearInterval(this.state.interval);
            this.state.swap.eventLoadEnd.listAction = [];
        }
    }, {
        key: 'createSwapUpdate',
        value: function createSwapUpdate() {

            var state = this.state;
            var th = this;
            var swap = new f00x.swap();

            swap.url = '/api/site/event-list/' + this.state.site_id;

            swap.eventLoadEnd.addAction(function () {
                if (this.status == 200) {
                    console.log(this);

                    state.list = JSON.parse(this.response);
                    th.setState(state);
                } else {
                    state.list = [];
                }
            });
            this.state.swap = swap;
            return swap;
        }
    }, {
        key: 'updateData',
        value: function updateData() {
            console.log('updateData');

            this.state.swap.sendGetFromObject();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'table',
                null,
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            null,
                            '\u0421\u043E\u0431\u044B\u0442\u0438\u044F'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'x'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'y'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'date'
                        )
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    this.state.list.map(function (item, key) {

                        return React.createElement(Point, { key: item.id, event: item.event_key, x: item.x, y: item.y, date: item.created_at });
                    })
                )
            );
        }
    }]);

    return ListPoint;
}(React.Component);

var SelectSite = function (_React$Component3) {
    _inherits(SelectSite, _React$Component3);

    function SelectSite(properties) {
        _classCallCheck(this, SelectSite);

        var _this3 = _possibleConstructorReturn(this, (SelectSite.__proto__ || Object.getPrototypeOf(SelectSite)).call(this, properties));

        _this3.state = { list: [], value: false };
        _this3.updateData();
        _this3.selectSite = _this3.selectSite.bind(_this3);
        return _this3;
    }

    _createClass(SelectSite, [{
        key: 'updateData',
        value: function updateData() {
            var state = this.state;
            var swap = new f00x.swap();
            var th = this;
            swap.url = '/api/site/list';
            swap.eventLoadEnd.addAction(function () {
                if (this.status == 200) {
                    console.log(this);
                    state.list = JSON.parse(this.response);
                    if (state.list.length > 0 && !state.value) {
                        state.value = state.list[0].id;
                    }
                } else {
                    state.list = [];
                }
                th.setState(state);
            });
            swap.sendGetFromObject();
        }
    }, {
        key: 'selectSite',
        value: function selectSite(event) {
            //        console.log(this);

            this.state.value = event.target.value;

            this.setState(this.state);
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.value) {
                var listPoint = React.createElement(ListPoint, { key: this.state.value, site_id: this.state.value });
            } else {
                var listPoint = '';
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'select',
                        { onChange: this.selectSite },
                        this.state.list.map(function (item, key) {
                            return React.createElement(
                                'option',
                                { key: item.id, value: item.id },
                                ' ',
                                item.domain_name,
                                ' '
                            );
                        })
                    )
                ),
                React.createElement(
                    'div',
                    null,
                    listPoint
                )
            );
        }
    }]);

    return SelectSite;
}(React.Component);

ReactDOM.render(React.createElement(SelectSite, { key: 'select_site' }), document.querySelector('.site_contain'));