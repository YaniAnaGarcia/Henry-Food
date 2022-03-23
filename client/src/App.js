import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import Detail from './components/Detail/Detail.jsx';
import Recipe from './components/Recipe/Recipe';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'} component={LandingPage}/>
        <Route exact path={'/recipes'} component={Home}/>
        <Route exact path={'/recipes/:id'} component={Detail} />
        <Route exact path={'/create'} component={Recipe} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
