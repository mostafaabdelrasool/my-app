import React, { Component } from "react";
import axios from "axios";

export class City extends Component {
  state = {
    cities: [],
    search: ""
  };
  handleSearch = () => {
    console.log("test");
    axios
      .get(
        `https://samples.openweathermap.org/data/2.5/weather?q=${
          this.state.search
        }&appid=b6907d289e10d714a6e88b30761fae22`
      )
      .then(res => {
        const cities = res.data;
        console.log(cities);
        this.setState({ cities: [{ ...cities }] });
      });
  };
  handleRemove = city => {
    let cities = [...this.state.cities];
    const index = cities.findIndex(x => x.id === city.id);
    if (index !== -1) {
      cities.splice(index, 1);
      this.setState({ cities: cities });
    }
  };
  render() {
    return (
      <React.Fragment>
        <div>
          <input
            value={this.state.search}
            onChange={e => this.setState({ search: e.target.value })}
          />
          <button onClick={() => this.handleSearch()}>Search</button>
        </div>
        <div className="city-container">
          {this.state.cities.map(x => (
            <div key={x.id} className="city-item">
              <button
                onClick={() => {
                  this.handleRemove(x);
                }}
              >
                remove
              </button>
              <p>{x.name}</p>
              <small>{x.main.temp}</small>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}
