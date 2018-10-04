'use strict';
class Point extends React.Component {

    constructor(properties) {
        super(properties);
        this.state = {id: properties.id, event: properties.event, x: properties.x, y: properties.y, date: properties.date};
    }

    render() {
        return (<tr key={this.state.id}>
            <td>{this.state.event}</td>
            <td>{this.state.x}</td>
            <td>{this.state.y}</td>
            <td>{this.state.date}</td>
        </tr>);
    }
}
class ListPoint extends React.Component {
    constructor(properties) {
        super(properties);
        this.state = {site_id: properties.site_id, list: []};
        this.createSwapUpdate()
        this.startInterval();
        console.log('construct');
    }
    startInterval() {
        var th = this;

        this.state.interval = setInterval(function () {
            th.updateData()
        }, 5000)
    }
    componentWillUnmount()
    {
        clearInterval(this.state.interval)
        this.state.swap.eventLoadEnd.listAction=[];
    }
    createSwapUpdate()
    {

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

        })
        this.state.swap = swap;
        return swap
    }
    updateData() {
        console.log('updateData');




        this.state.swap.sendGetFromObject();
    }

    render() {
        return (<table>
            <thead>
                <tr>
                    <th>
                        События
                    </th>
                    <th>
                        x
                    </th>
                    <th>
                        y
                    </th>
                    <th>
                        date
                    </th>
                </tr>
            </thead>
            <tbody>
        
                {this.state.list.map(function (item, key) {

                                return <Point key={item.id}  event={item.event_key} x={item.x} y={item.y} date={item.created_at} />;
            })}
        </tbody>
        </table>
                    );


    }
}

class SelectSite extends React.Component {
    constructor(properties) {
        super(properties);
        this.state = {list: [], value: false}
        this.updateData();
        this.selectSite = this.selectSite.bind(this);
    }

    updateData() {
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
        })
        swap.sendGetFromObject();
    }
    selectSite(event)
    {
//        console.log(this);

        this.state.value = event.target.value;

        this.setState(this.state);
    }
    render() {
        if (this.state.value) {
            var listPoint = <ListPoint key={this.state.value} site_id={this.state.value} />
        } else {
            var listPoint = '';
        }

        return (
                <div>
                    <div>
                        <select onChange={this.selectSite}>
                            {this.state.list.map(function (item, key) {
                                            return(<option key={item.id} value={item.id}> {item.domain_name} </option>);
                            })}
                        </select>
                    </div>
                    <div>
                        {listPoint}</div>
                                               
                </div>

                            );
            }
        }
        ReactDOM.render(<SelectSite key="select_site"/>, document.querySelector('.site_contain'));


