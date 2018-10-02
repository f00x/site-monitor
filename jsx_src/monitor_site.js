'use strict';

class Point extends React.Component {
  constructor(properties) {
   
    this.state = { event: properties.event, x:properties.x , y:properties.y, date:properties.created_at };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return (
            <tr><td>{this.state.event}</td><td>{this.state.x}</td><td>{this.state.y}</td><td>{this.state.date}</td></tr>
    );
  }
}
class ListPoint extends React.Component {
  constructor(properties) {
   
    this.state = { list: []};
  }

  render() {
    if (!this.state.list instanceof Array||this.state.list.length==0 ) {
      return (<div>пусто</div>);
    }

    return (
            <tr><td>{this.state.event}</td><td>{this.state.x}</td><td>{this.state.y}</td><td>{this.state.date}</td></tr>
    );
  }
}
let domContainer = document.querySelector('div');
ReactDOM.render(<ListPoint />, domContainer);


