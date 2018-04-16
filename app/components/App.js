var React = require('react');
var PropTypes = require('prop-types');
var Popular = require("./Popular");
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route= ReactRouter.Route;
import Results from '../components/Results';
import { Switch } from "react-router-dom"; // switch provides us to 404 pages..
var Nav = require("../components/Nav")
import Home from '../components/Home';
import Battle from '../components/Battle';
class App extends React.Component {
    render() {
        return (
            <Router>

            <div className="container">
                <Nav />
                <Switch >
                    <Route exact path="/" component={Home} />
                    <Route exact path="/battle" component={Battle} />
                    <Route path="/battle/results" component={Results} />
                    <Route path="/popular" component={Popular} />
                    {/* if you dont write exact, it will load this components even there is params after them. */}
                    <Route exact path="/popular" component={Popular} />
                    <Route render={function(){
                        return <h2>Not Found </h2>
                    }

                    }  />

                </Switch>
               
            </div> 
            </Router>
        );
    }
}

module.exports = App;
