const initialTravellers = [
];


function TravellerRow(props) {
  const traveller = props.traveller || [];
  return (
    <tr>
      <td>{traveller?.id}</td>
      <td>{traveller?.name}</td>
      <td>{traveller?.gender}</td>
      <td>{traveller?.phone}</td>
      <td>{traveller?.bookingTime.toString()}</td>
    </tr>
  );
}

function Display(props) {
  const travellerRows = props.travellers?.map(traveller => (<TravellerRow key={traveller?.id} traveller={traveller} />));
  return (
    <table className="display-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Phone</th>
          <th>Booking Time</th>
        </tr>
      </thead>
      <tbody>
        {travellerRows}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.addTraveller;
    const traveller = {
      name: form.travellername.value, 
      gender: form.travellergender.value,
      phone: form.travellerphone.value
    }
    this.props.bookTraveller(traveller);
    form.travellername.value = ""; 
    form.travellergender.value = "";
    form.travellerphone.value = "";
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
        <input type="text" name="travellername" placeholder="Name" />
        <input type="text" name="travellergender" placeholder="Gender" />
        <input type="text" name="travellerphone" placeholder="Phone" />
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
      records: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const travellers = this.props.travellers;
    let newList = []
    this.props.travellers.forEach((v, i) => {
      if (this.state.nameValue.toLowerCase() === v.name.toLowerCase()) {
        newList.push(v)
      }
    })
    this.setState({
      records: newList
    })
  }

  handleDelete(id) {
    this.props.deleteTraveller(id);
    let newList = this.state.records.filter((v) => v.id !== id);
    this.setState({
      records: newList
    })
  }

  render() {
    return (
      <div>
        <h3>Please enter the name of the traveller you wish to delete:</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="travellername" onChange={(e) => {
            this.setState({
              nameValue: e.target.value
            })
          }} placeholder="Name" value={this.state.nameValue} />
          <button>Search</button>
        </form>
        <div>
          <h3>Search Result</h3>
          {this.state.records.length > 0 ?
            <table className="display-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Booking Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.records.map((v) => (
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td>{v.name}</td>
                    <td>{v.gender}</td>
                    <td>{v.phone}</td>
                    <td>{v.bookingTime.toDateString()}</td>
                    <td>
                      <button onClick={() => this.handleDelete(v.id)}>DELETE</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            :
            <h4>No Record Found</h4>
          }
        </div>
      </div>
    );
  }
}


class Homepage extends React.Component {
	constructor() {
	super();
	}
  componentDidMount() {
    const containers = document.querySelectorAll(".seatEmpty");
    const travellers=this.props.travellers;
    const occupiedSeatNum=travellers.length
    const freeSeatNum=10-occupiedSeatNum
    for(var i=0;i<occupiedSeatNum;i++){
      containers[i].classList.toggle("seatOccupied");
    }
  }
	render(){
  const travellers=this.props.travellers;
  const occupiedSeat=travellers.length
  const freeSeat=10-occupiedSeat
	return (
	<div>
    <h3>The number of empty seats are {freeSeat}.</h3>
        <ul className="grid"> 
          <li>
            <div className="seatEmptysym"></div>
            <small>Empty Seat</small>
          </li>
          <li>
            <div className="seatOccupiedsym"></div>
            <small>Occupied Seat</small>
          </li>
        </ul>
        <div className="container">
          <div className="row">
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
          </div>
          <div className="row">
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
          </div>
        </div>
	</div>);
	}
}
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    const id_num = 0;
    this.id_num = id_num;
  }

  setSelector(value)
  {
    this.setState({ selector: value });
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
      if (this.state.travellers.length >= 10) {
        alert('All seats are full now. Please delete a traveller first.)')
        return
      }else{
        const traveller = passenger;
        this.id_num = this.id_num + 1;
        traveller.id = this.id_num;
        traveller.bookingTime = new Date();
        const newTravellerList = this.state.travellers.slice();
        newTravellerList.push(traveller);
        this.setState({ travellers: newTravellerList });
      }
      
  }

  deleteTraveller(passenger) {
      let newTravellerList = this.state.travellers.filter((v, i) => v.id !== passenger)
      this.setState({
      travellers: newTravellerList
    })
    
  }
  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
        <nav className="navigation-bar">
          <div>
              <button onClick={() => this.setSelector(1)}>Homepage</button>
              <button onClick={() => this.setSelector(2)}>Display</button>
              <button onClick={() => this.setSelector(3)}>Add</button>
              <button onClick={() => this.setSelector(4)}>Delete</button>
          </div>
        </nav>
        <div>
          {this.state.selector == 1 && <Homepage travellers={this.state.travellers} />}
          {this.state.selector == 2 && <Display travellers={this.state.travellers} />}
          {this.state.selector == 3 && <Add bookTraveller={this.bookTraveller} />}
          {this.state.selector == 4 && <Delete travellers={this.state.travellers} deleteTraveller={this.deleteTraveller} />}
        </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));