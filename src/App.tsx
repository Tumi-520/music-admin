import './App.css';
import {Switch,Route,BrowserRouter} from 'react-router-dom'
import Home from './pages/home';
import "antd/dist/antd.css";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Home}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
