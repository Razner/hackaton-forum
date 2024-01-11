import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import RegisterPage from './app/register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// (
//   <Router>
//     <Switch>
//       <Route path="/app/register" component={RegisterPage} />
//       <Route path="/" component={App} />
//     </Switch>
//   </Router>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
