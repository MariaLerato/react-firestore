import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
const News = () =>{
    const [data, setData] = useState([])

    useEffect(()=>{
        fetch('')
        .then((res) =>{return res.json()})
        .then((_data) =>{setData(_data)})
        .catch((err)=>{console.log(err)})
        .finally(() =>{console.log('!complete')})
    },[])
    return(
        <>
        <div className="container-fluid mt-4">
                <div className = "card">
                <div className="list-group">
                    {data.map((action)=><Link to={'/data/' + action.id} className='list-group-item list-group-item-action' key = {action.id}> {action.title}</Link>)}
                </div>
        </div>
        </div>
        </>
    )
}
export default News