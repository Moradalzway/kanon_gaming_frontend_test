export const registerAction = (playload: any) => {
  return {
    type: "REGISTER", // type of action,
    playload: playload, // data with action
  };
};
export const LoginAction = (playload: any) => {
  return {
    type: "LOGIN", // type of action,
    playload: playload, // data with action
  };
};

export const updateCoinBalanceAction = (playload: any) => {
  return {
    type: "UPDATE_COIN_BALANCE", // type of action,
    playload: playload, // data with action
  };
};

export const logoutAction = () => {
  return {
    type: "LOGOUT", // type of action,
    // playload: playload, // data with action
  };
};

// export const register = (username: string, email: string, password: string) => (dispatch:any) => {
//   return AuthService.register(username, email, password).then(
//     (response:any) => {
//       dispatch({
//         type: REGISTER_SUCCESS,
//       });

//       dispatch({
//         type: SET_MESSAGE,
//         payload: response.data.message,
//       });

//       return Promise.resolve();
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       dispatch({
//         type: REGISTER_FAIL,
//       });

//       dispatch({
//         type: SET_MESSAGE,
//         payload: message,
//       });

//       return Promise.reject();
//     }
//   );
// };

// export const login = (username: string, password: string) => (dispatch:any) => {
//   return AuthService.login(username, password).then(
//     (data) => {
//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload: { user: data },
//       });

//       return Promise.resolve();
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       dispatch({
//         type: LOGIN_FAIL,
//       });

//       dispatch({
//         type: SET_MESSAGE,
//         payload: message,
//       });

//       return Promise.reject();
//     }
//   );
// };

// export const logout = () => (dispatch:any) => {
//   AuthService.logout();

//   dispatch({
//     type: LOGOUT,
//   });
// };
