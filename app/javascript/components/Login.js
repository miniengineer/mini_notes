import React from "react";
import { GoogleLogin } from "react-google-login";

export default function Login(props) {
  //TODO style and add Pusheen to login page
    return (
      <div>
        <h1>Please login first</h1>
        <GoogleLogin
         clientId="810788223244-mqftav4uf39vl1qd33sp7hls0k60gbn5.apps.googleusercontent.com"
         buttonText="Login"
         onSuccess={props.onSuccessResponce}
         onFailure={props.onFailureResponce}
         cookiePolicy={'single_host_origin'}
        />
      </div>
    );
}

