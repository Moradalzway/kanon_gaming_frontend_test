// REDUCER
let state = localStorage.getItem("state") || null;

const initialState = state
  ? JSON.parse(state)
  : { isLoggedIn: false, user: null };

export default function (state = initialState, action: any) {
  switch (action.type) {
    case "REGISTER":
      return {
        user: action.playload,
        isLoggedIn: true,
      };
    case "LOGIN":
      return {
        user: action.playload,
        isLoggedIn: true,
      };

    case "LOGOUT":
      return {
        user: null,
        isLoggedIn: false,
      };
    case "UPDATE_COIN_BALANCE":
      state.user.coin_balance = action.playload;
      return state;
    default:
      return state;
  }
}
