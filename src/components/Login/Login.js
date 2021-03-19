import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router-dom';




const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };


    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }

    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email} 
            setLoggedInUser(signedInUser);
            storeAuthToken();//to get jwt token,we have made this function
            history.replace(from);
          }).catch(function(error) {
            const errorMessage = error.message;
            console.log(errorMessage);
          });
    }
    
    //to get jwt token for loggedInUser
    //https://firebase.google.com/docs/auth/admin/verify-id-tokens#web

    const storeAuthToken=()=>{
        firebase.auth().currentUser.getIdToken(true)
        .then(function(idToken) {
            // console.log(idToken);//we have just seen the idToken which is in encoded form
            //https://jwt.io/ decodes the jwt token

            //we normally keep this token to sessionStorage
            sessionStorage.setItem('token',idToken);//token is the given name where idToken is set
        })
        .catch(function(error) {
            // Handle error
        });
    }


    return (
        <div>
        <h1>This is Login</h1>
        <button onClick={handleGoogleSignIn}>Google Sign in</button>
        </div>
    );
};

export default Login;