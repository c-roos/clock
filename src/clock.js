const key = 'AIzaSyDfg1yJ2wwN2kucPfECfwECosbpp9rHG6w';
var geocoder;


class Clock extends React.Component {
	render(){
        const d = new Date(this.props.timestamp + 1000*this.props.offset);
        const utcHours = d.getUTCHours();
        const ampm = utcHours < 12 ? 'AM' : 'PM';
        const hours = utcHours % 12 || 12;
        const timeString = hours + ":" + ("0" + d.getUTCMinutes()).substr(-2) + " " + ampm;
        return (
            <div className="card clock border-info mb-3 ml-1 mr-1">
                <div className="card-header">
                    <span className="close" onClick={() => this.props.removeEntry(this.props.id)} >X</span>
                    <small>{this.props.address}</small> 
                </div>
                <div className="card-body">
                    <h5 className="card-title">{timeString}</h5>
                    <h6 className="card-subtitle mb-2 text-muted"></h6>
                </div>
            </div>
        );
    }
}


class ClockContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {clocks: [], timestamp: Date.now()};
    }
  
    removeEntry(id) {
        var newState = this.state.clocks;
        const index = newState.findIndex(e => e.id === id);
        newState.splice(index, 1);
        this.setState({clocks: newState});
    }
    
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    
    tick() {
        this.setState({
            clocks: this.state.clocks,
            timestamp: Date.now()
        });
    }

    render() {
        return (
            <div>
                {this.state.clocks.map(e => <Clock key={e.id} id={e.id} offset={e.offset} address={e.address} timestamp={this.state.timestamp} removeEntry={this.removeEntry.bind(this)} />)}
            </div>
        );
    }
}


var idCounter = 0;
var r = ReactDOM.render(<ClockContainer />, document.getElementById('reactContainer'));


function buildClock(results, status) {
    if (status == 'OK') {
        var loc = results[0].geometry.location.toUrlValue();
        var timestamp = Math.round((new Date()).getTime()/1000);
        var tzcall = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + loc + '&timestamp=' + timestamp + '&key=' + key;
        
        var xhr = new XMLHttpRequest();
        xhr.open('GET', tzcall);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var tzdata = JSON.parse(xhr.responseText);
                if (tzdata.status == 'OK') {
                    var newClocks = r.state.clocks;
                    newClocks.push({
                        id: idCounter,
                        offset: (tzdata.dstOffset + tzdata.rawOffset),
                        address: results[0].formatted_address
                    });
                    r.setState({clocks: newClocks, timestamp: Date.now()});
                    idCounter += 1;
                }
            }
        }
        xhr.send();
    }
}


function codeAddress(address) {
    geocoder.geocode({'address': address}, buildClock);
}


function formHandler() {
    codeAddress(document.getElementById('addressField').value);
    return false;
}


function initClocks() {
    geocoder = new google.maps.Geocoder();
    codeAddress('New York, NY');
    codeAddress('Tokyo Japan');
    codeAddress('Sydney Australia');
    codeAddress('London England');
}
