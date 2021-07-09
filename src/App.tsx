import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Tasks } from "./pages/Tasks";
import { Login } from './pages/Login';
import { AuthContextProvider } from './contexts/AuthContextProvider'
import { FirestoreContextProvider } from './contexts/FirestoreContextProvider'
import './App.css';

function App() {
  return (
    <div id="App">
      <BrowserRouter>
        <AuthContextProvider>
          <FirestoreContextProvider>

            <Switch>
              <Route exact path="/" component={Tasks} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </FirestoreContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
