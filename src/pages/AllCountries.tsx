import axios from "axios";
import React, { Component } from "react";
import RotateLoader from "react-spinners/RotateLoader";

class AllCountries extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      countryName: "",
      countries: [],
      results: [],
      error: null,
      isLoading: true,
    };

    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  handleInputOnChange(e: any) {
    const keyword = e.target.value;
    this.setState({ countryName: e.target.value});
    if (keyword !== '') {
      const _results = this.state.countries.filter((country : any) => {
        return country.name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      this.setState({
        results: _results
      })
    } else {
      // If the text field is empty, show all users
      this.setState({
        results:  this.state.countries,
      })
    }

  }

  // here we will get all countries
  async getData() {
    this.setState({ isLoading: true });
    const accessToken = "16848296cf3f1c738e6b405e84c69fb4";
    const baseURL = "http://api.countrylayer.com/v2/all";

    await axios
      .get(baseURL + "?access_key=" + accessToken)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            countries: response.data,
            results: response.data,
          });
        } else {
          this.setState({
            error: "Sorry there is no data about ",
          });
        }
      })
      .catch((error) => {
        this.setState({
          error: "Sorry there is no data about ",
        });
      });

    this.setState({ isLoading: false });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <>
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
        {!this.state.isLoading && (
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
              </div>
              <br/>
              {this.state.results.length !== 0 && (
                <table className="table">
                  {this.state.results.map((_element: any, index: number) => (
                    <tr key={index}>
                      <td>{_element.name}</td>
                    </tr>
                  ))}
                </table>
              )}
            </div>
          </>
        )}

        <br />
      </>
    );
  }
}

export default AllCountries;
