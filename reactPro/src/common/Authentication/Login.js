import React, {useState} from 'react'
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import { submitLogin } from "store/auth/action";

const Login = props => {

    const dispatch = useDispatch();
    const history = useHistory()
    // const {a} =useSelector(state=>state.dashboard) 
    const [user,setUser] = useState({email:'',password:''})

    const handleSubmit = () =>{
        dispatch(submitLogin(user,history));
    }
    const setField =(e)=>{
        const currentUser = Object.assign({},user);
        currentUser[e.target.name] =e.target.value;
        setUser(currentUser);
    }

    return (
        <div>
           <label htmlFor="email">
                Email:
                <input type="text" name="email"  
                onChange={e=>setField(e)}
                value={user.email} />
            </label>
            <label htmlFor="password">
                Password:
                <input type="text" name="password" 
                 onChange={e=>setField(e)}
                value={user.password} />
            </label>
            <input type="submit" value="Submit"
                onClick={handleSubmit}
            />
        </div>
    )
}

Login.propTypes = {

}

export default Login
