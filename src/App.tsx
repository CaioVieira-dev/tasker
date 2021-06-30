import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Tasks } from "./pages/Tasks";
import { Login } from './pages/Login'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Tasks} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
