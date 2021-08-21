import React,{ useEffect,useState } from "react";
import firebase from "firebase";

const UserDetails = ({param}) =>{
    const [data,setData] = useState(param)
    const db = firebase.firestore()
    useEffect(()=>{
        fetch(db.collection('lists'))
        .then((res)=>{return res})
        .then((_data)=>{setData(_data)})

    },[])
    
 return(
     <>
     {param.name}
     {data.map(action=> <li>{action.name}</li>)}
     Estimated Reading Time: 1 min
            EXPLORE FURTHER
            How to redirect to a particular section of a page in html ...	stackoverflow.com
            How to Add an Anchor Link to Jump to a Specific Part of a Page	www.w3docs.com
            How to create links to sections on the same page in HTML	www.computerhope.com
            How to Make HTML Redirect to Another Page: A Complete Guide	www.bitdegree.org
            How to Create Links to Within the Same Page in HTML	www.learningaboutelectronics.com
            Recommended to you based on what's popular • Feedback
            Using the Link and NavLink Components to Navigate to a ...
            https://www.codementor.io/@packt/using-the-link...
            2019/01/24 · To navigate to a route, specify t
     </>
 )
}
export default UserDetails