import axios from "axios";
import { Component } from "react";
import RotateLoader from "react-spinners/RotateLoader";

class CheckCountry extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      countryName: "",
      countryData: null,
      error: null,
      isLoading: false,
    };

    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  handleInputOnChange(e: any) {
    this.setState({ countryName: e.target.value, countryData: null });
  }

  async getData() {
    this.setState({ isLoading: true });

    const baseURL = "/countries/search";

    const data = {
      countryName: this.state.countryName,
    };

    await axios
      .post(baseURL, data)
      .then((response: any) => {
        if (response.status === 200) {
          this.setState({
            countryData: response.data.result,
          });
        } else {
          this.setState({
            error: response.data.message,
          });
        }
      })
      .catch(() => {
        this.setState({
          error: "Sorry there is no data about ",
        });
      });

    this.setState({ isLoading: false });
  }

  render() {
    return (
      <>
        <div className="card">
          <div className="form-inline">
            <input
              type="text"
              value={this.state.countryName}
              className="input"
              onChange={this.handleInputOnChange}
              placeholder="Please enter the country name"
            />
            <button className="btn btn-primary" onClick={this.getData}>
              Search
            </button>
          </div>
        </div>
        <br />
        {this.state.error != null && (
          <div className="card text-center">{this.state.error}</div>
        )}
        {this.state.isLoading && (
          <div className="card text-center">
            <RotateLoader
              loading={this.state.isLoading}
              color="#E94560"
              size={15}
              margin={2}
            />
          </div>
        )}
        {this.state.countryData != null && (
          <div className="card">
            <h2>Result of {this.state.countryName}</h2>
            <br />
            <table className="table">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{this.state.countryData.name || ""}</td>
                </tr>
                <tr>
                  <td>Top Level Domain</td>
                  <td>{this.state.countryData.topLevelDomain}</td>
                </tr>
                <tr>
                  <td>Alpha2 Code</td>
                  <td>{this.state.countryData.alpha2Code}</td>
                </tr>
                <tr>
                  <td>Alpha3 Code</td>
                  <td>{this.state.countryData.alpha3Code}</td>
                </tr>
                <tr>
                  <td>Calling Codes</td>
                  <td>{this.state.countryData.callingCodes[0]}</td>
                </tr>
                <tr>
                  <td>Capital</td>
                  <td>{this.state.countryData.capital}</td>
                </tr>
                <tr>
                  <td>Alt Spellings</td>
                  <td>{this.state.countryData.altSpellings[1]}</td>
                </tr>
                <tr>
                  <td>Region</td>
                  <td>{this.state.countryData.region}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </>
    );
  }
}

export default CheckCountry;
