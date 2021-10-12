import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import RotateLoader from "react-spinners/RotateLoader";
import { updateCoinBalanceAction } from "../redux/actions/auth";
require("dotenv").config();

class SlotMachine extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      countryName: "",
      countries: [],
      results: [],
      error: null,

      intervalIdSlot1: null,
      intervalIdSlot2: null,
      intervalIdSlot3: null,
      isSlotting: false, // is doing
      slot1ChangingIndex: 0,
      slot2ChangingIndex: 0,
      slot3ChangingIndex: 0,
      slotClass1: "cherry",
      slotClass2: "lemon",
      slotClass3: "banana",

      resultSlot1: "",
      resultSlot2: "",
      resultSlot3: "",

      responseMessage: "",
      responseCoin: "",
    };

    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.sentToServer = this.sentToServer.bind(this);
    this.doSlot = this.doSlot.bind(this);
    this.spin = this.spin.bind(this);
  }

  handleInputOnChange(e: any) {
    const keyword = e.target.value;
    this.setState({ countryName: e.target.value });
    if (keyword !== "") {
      const _results = this.state.countries.filter((country: any) => {
        return country.name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      this.setState({
        results: _results,
      });
    } else {
      // If the text field is empty, show all users
      this.setState({
        results: this.state.countries,
      });
    }
  }

  // here we will send results to server to check
  async sentToServer() {
    const win = new Audio("/sounds/win.mp3");
    const lose = new Audio("/sounds/lose.mp3");

    const accessToken = this.props.user.token;
    const baseURL = "/slot-machine/check";

    const options = {
      headers: { "x-access-token": accessToken },
    };

    const data = {
      reelOneResult: this.state.resultSlot1,
      reelTwoResult: this.state.resultSlot2,
      reelThreeResult: this.state.resultSlot3,
    };

    await axios
      .post(baseURL, data, options)
      .then((response: any) => {
        if (response.status === 200) {
          if (response.data.result === 0) {
            lose.play();
          } else {
            win.play();
          }
          this.setState({
            responseMessage: response.data.message,
            responseCoin: response.data.result.coin_result,
          });

          // here we must call dispatch to update coin balance
          this.props.updateCoinBalanceAction(response.data.result.total_coins);
          // TODO :: update user total coins
        } else {
          lose.play();
          this.setState({
            responseMessage: "undefined error",
            responseCoin: 0,
          });
        }
      })
      .catch((error) => {
        lose.play();
        this.setState({
          responseMessage: error || "undefined error",
          responseCoin: 0,
        });
      });

    this.setState({ isSlotting: false });
  }

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  doSlot() {
    // here check if fucntion already running to avoid dublacte click error
    if (this.state.isSlotting) {
      return null;
    }

    // here just simlautin to user, and will update with acual balance from the server

    this.props.updateCoinBalanceAction(this.props.user.coin_balance - 1);

    // eles reset defualts
    this.setState({
      isSlotting: true,
      slot1ChangingIndex: 0,
      slot2ChangingIndex: 0,
      slot3ChangingIndex: 0,
      slotClass1: "diamond",
      slotClass2: "lemon",
      slotClass3: "banana",
    });

    // this number to make the result appers in order from left to right

    let numChanges = this.randomInt(1, 4) * 7;
    let numeberSlot1 = numChanges + this.randomInt(1, 7);
    let numeberSlot2 = numChanges + 2 * 7 + this.randomInt(1, 7);
    let numeberSlot3 = numChanges + 4 * 7 + this.randomInt(1, 7);

    // let intervalId = setInterval(() => this.spin1(numeberSlot1), 50);
    let intervalIdSlot1 = setInterval(() => this.spin(1, numeberSlot1), 50);
    let intervalIdSlot2 = setInterval(() => this.spin(2, numeberSlot2), 50);
    let intervalIdSlot3 = setInterval(() => this.spin(3, numeberSlot3), 50);

    this.setState({
      intervalIdSlot1: intervalIdSlot1,
      intervalIdSlot2: intervalIdSlot2,
      intervalIdSlot3: intervalIdSlot3,
    });
  }

  spin(reelIndex: number, numeberRandomSlot: number) {
    // audios

    const spin = new Audio("/sounds/spin.mp3");
    const coin = new Audio("/sounds/coin.mp3");
    if (reelIndex === 3) {
      spin.play();
    }

    // this is defual values
    let resultSlotKey = "";
    let lotIndexKey = "slot1ChangingIndex";
    let slotKeyDomClass = "slotClass1";
    let intervalIdKey = "intervalIdSlot1";

    switch (reelIndex) {
      case 1:
        resultSlotKey = "resultSlot1";
        lotIndexKey = "slot1ChangingIndex";
        slotKeyDomClass = "slotClass1";
        intervalIdKey = "intervalIdSlot1";
        break;
      case 2:
        resultSlotKey = "resultSlot2";
        lotIndexKey = "slot2ChangingIndex";
        slotKeyDomClass = "slotClass2";
        intervalIdKey = "intervalIdSlot2";
        break;
      case 3:
        resultSlotKey = "resultSlot3";
        lotIndexKey = "slot3ChangingIndex";
        slotKeyDomClass = "slotClass3";
        intervalIdKey = "intervalIdSlot3";
        break;
    }

    const reels = [
      // reel1
      [
        "cherry",
        "lemon",
        "apple",
        "lemon",
        "banana",
        "banana",
        "lemon",
        "lemon",
      ],
      // reel 2
      [
        "lemon",
        "apple",
        "lemon",
        "lemon",
        "cherry",
        "apple",
        "banana",
        "lemon",
      ],

      // reel 3
      [
        "lemon",
        "apple",
        "lemon",
        "apple",
        "cherry",
        "lemon",
        "banana",
        "lemon",
      ],
    ];

    this.setState({
      [lotIndexKey]: this.state[lotIndexKey] + 1,
    });

    let index = this.state[lotIndexKey];

    if (index >= numeberRandomSlot) {
      coin.play();
      clearInterval(this.state[intervalIdKey]);

      // call server
      if (reelIndex === 3) {
        this.sentToServer();
      }
      return null;
    }

    let reelFrunitIndexSelected = this.randomInt(0, 7); // to select fruits from 0 to 7
    let selectedFruit = reels[reelIndex - 1][reelFrunitIndexSelected];

    this.setState({
      [resultSlotKey]: selectedFruit,
      [slotKeyDomClass]: selectedFruit,
    });
  }

  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.history.push("/");
    }
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

        <div className="card">
          <main>
            {this.state.responseCoin > 0 && (
              <div className="alert alert-success">
                {this.state.responseMessage}
              </div>
            )}
            {this.state.responseCoin === 0 && (
              <div className="alert alert-danger">
                {this.state.responseMessage}
              </div>
            )}
            <h2 className="slotUserName">Hi , {this.props.user.name || ""}!</h2>
            <h3 className="slotUserName">
              Your Coins is : {this.props.user.coin_balance || "0"}{" "}
              {this.state.responseCoin > 0 ? "⇑" : "⇓"}
            </h3>
            <br />
            <section id="slots">
              <div id="slot1" className={this.state.slotClass1}></div>
              <div id="slot2" className={this.state.slotClass2}></div>
              <div id="slot3" className={this.state.slotClass3}></div>
            </section>
            <button
              onClick={this.doSlot}
              id="btn-spin"
              className={this.state.isSlotting ? "btn btn-disabled" : "btn"}
              disabled={this.state.isSlotting}
            >
              {this.state.isSlotting ? "Spinnig.." : "SPIN!"}
            </button>
          </main>
        </div>

        <br />
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state.user,
  isLoggedIn: state.isLoggedIn,
  state: state,
});

const mapDispatchToProps = () => ({
  updateCoinBalanceAction,
});

export default connect(mapStateToProps, mapDispatchToProps())(SlotMachine);
