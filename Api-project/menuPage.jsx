import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from './firebase2'
import Data from './data';
import News from './newsfeed';
import UserDetails from './userDetails';

const MenuPage = ({ }) => {
    const [name, setName] = useState()
    const [des, setDes] = useState()
    const [location, setLocation] = useState()
    const [users, setUser] = useState([])
    const [age, setAge] = useState()
    const db = firebase.firestore();
    const getName = (e) => {
        setName(e.target.value)
    }
    const getdes = (e) => {
        setDes(e.target.value)
    }
    const getlocation = (e) => {
        setLocation(e.target.value)
    }
    const getage = (e) => {
        setAge(e.target.value)
    }
    const createUsers = (e) => {
        e.preventDefault();
        db.collection('lists').add({
            name: name,
            age: age,
            des: des,
            location: location
        })
            .then((res) => { console.log('user added') })
            .catch((err) => { console.log(err) })

    }
    // get users
    useEffect(() => {
        const info = [];
        db.collection('lists').get()
            .then((res) => {
                res.forEach(action => {
                    info.push({ ...action.data(), id: action.id })
                })
                setUser(info)
            })
    }, [])
    // delete user
    const deleteuser = (e) => {
        let uid = e.target.id
        db.collection('lists').doc(uid).delete()
            .then(() => { console.log('user deleted') })
    }
    // update user
    const updateUser = (e) => {
        let uid = e.target.id
        db.collection('lists').doc(uid).update({
            name: name,
            age: age,
            location: location,
            des: des
        })
            .then(() => { console.log('Update Complete') })
            .catch((err) => { console.log(err) })
    }
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
                        <News />
                    </Route>
                    <Route path={'/data/:id'}>
                        <Data />
                    </Route>
                    <Route path = {'/userDetails/:id'}>
                        <UserDetails />
                    </Route>
                </Switch>
            </Router>
            <>
                <div className='container mt-4'>

                    <form onSubmit={createUsers}>
                        <fieldset>
                            <h1>Users</h1>
                            <div className="input-group">
                                <span className="input-group-text">FirstName And Age</span>
                                <input type="text" aria-label="First name" onChange={getName} className="form-control"></input>
                                <input type="text" aria-label="First name" onChange={getage} className="form-control"></input>
                            </div>
                            <div className="input-group mt-4">
                                <span className="input-group-text">Location and Description</span>
                                <input type="text" aria-label="location" onChange={getlocation} className="form-control"></input>
                                <input type="text" aria-label="description" onChange={getdes} className="form-control"></input>
                            </div>
                            <button type='submit' className="btn btn-primary btn-lg mt-4">Add User</button>
                        </fieldset>
                    </form>
                    {/* display */}

                    {users.map(action =>
                        <>
                            <div className="card mt-4" key={action.id}>
                                <div className="card-header">
                                    User Details
                                </div>
                                <div className="card-body">
                                    
                                    <a href='#userDetails' > <h5 className="card-title">{action.name}</h5></a>
                                    <p className="card-text">{'Age : '}{action.age}</p>
                                    <button id={action.id} className='btn btn-danger me-2' onClick={deleteuser}>Delete User</button>
                                    <button id={action.id} className='btn btn-warning' onClick={updateUser}>Update User</button>
                                </div>
                            </div>
                        </>
                    )}


                </div>
                        <div id={'userDetails'}>
                            <UserDetails param={users}/>
                        </div>
            </>
        
        </div>
    )
}
export default MenuPage