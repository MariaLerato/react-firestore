import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import News from './newsfeed';
import Data from './data';
import UserDetails from './userDetails';
import New from './new';


const MenuPage = ({ }) => {

    return (
        <div className='group-container'>
            <Router>
                <div className='nav'>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/newsfeed'>News Feed</Link></li>
                    </ul>
                </div>
                <Switch>
                    <Route path={'/newsfeed'}>
                        <News/>
                    </Route>
                    <Route path={'/data/:id'}>
                        <Data />
                    </Route>
                    <Route path = {'/userDetails/:id'}>
                        <UserDetails  />
                    </Route>
                    <Route path = {'/'}>
                        <New />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}
export default MenuPage