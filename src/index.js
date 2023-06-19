import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

require('bootstrap/dist/css/bootstrap.css')

const Actions = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  SET_USERNAME: 'SET_USERNAME'
}

const initialState = {
  isLoggedIn: false,
  userName: '',
}

const Reducer = (state = initialState, action) => {

  switch(action.type){
    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true
      };

      case Actions.SET_USERNAME: {
        return {
          ...state,
          userName: action.payload
        }
      };

      default: 
      return state;
  }
}

const Store = createStore(Reducer);

const mapStateToProps = (state) => ({

  isLoggedIn: state.isLoggedIn,
  userName: state.userName

});

const mapDispatchToProps = (dispatch) => ( {

  loginSuccess: () => dispatch({
    type: Actions.LOGIN_SUCCESS 
  }),

  setUserName: (name) => dispatch({
    type: Actions.SET_USERNAME, payload: name
  })
});


const Form = ({ isLoggedIn, loginSuccess, setUserName }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {

    e.preventDefault();

    if (password.length > 6) {

      setUserName(name);
      loginSuccess();
      navigate('/profile');
    }else{
      alert("Your password is lesser than 6")
    }

  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-6 p-4">
        <h2 className="card-title mb-4 pt-4">Our very own Redux Routing System!</h2>
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title mb-4">Log In</h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                </div>
                <button type="submit" className="btn btn-primary">
                  Submit and Route to Profile!
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileComponent = ({ userName }) => {

  return (
    <div
      style={{
        backgroundColor: '#F18F01',
        color: '#FFF',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}

    >
      <div className="card p-4" style={{ width: '400px', borderRadius: '10px' }}>
        <h2 className="card-title mb-4">Welcome, {userName}!</h2>
        <p className="card-text">This is your profile page.</p>
        <p className="card-text">Enjoy your stay!</p>
      </div>
    </div>

  );
};

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(Form);
const ConnectedProfileComponent = connect(mapStateToProps)(ProfileComponent);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <Provider store={Store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConnectedForm />} />

        <Route path="/profile" element={<ConnectedProfileComponent />} />
      </Routes>
    </BrowserRouter>

  </Provider>
);
