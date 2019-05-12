import React, { Component } from 'react';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';
import { Scene, Router, ActionConst } from 'react-native-router-flux';

import LoginForm from "./components/LoginForm";
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";
import SignUpForm from "./components/SignupForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import UserVerification from "./components/UserVerification";
import Home from "./components/Home";
import MyCamera from "./components/MyCamera";
import UserProfile from "./components/UserProfile";

class RouterComponent extends Component {
    state = {
      hasToken: false,
      isLoaded: false
    }

    componentDidMount = () => {
      AsyncStorage.getItem('auth-token')
      .then((token) => {
        console.log(token);
        this.setState({ hasToken: token !== null, isLoaded: true })
      })
    }

    render() {
        if (!this.state.isLoaded) {
          return (
            <ActivityIndicator />
          )
        }
        else {
          return(
            <Router>
                <Scene key="root">

                    <Scene
                      key="login"
                      component={LoginForm}
                      title="Please Login"
                      type={ActionConst.RESET}
                      initial={!this.state.hasToken}
                    />
                    <Scene key="register" component={SignUpForm} title="New User Sign Up"/>
                    <Scene key="resetpwd" component={ResetPasswordForm} title="Reset Password"/>


                    <Scene
                      key="home"
                      component={Home}
                      title="Home"
                      type={ActionConst.RESET}
                      initial={this.state.hasToken}
                    />
                    <Scene key="userProfile" component={UserProfile} title="Profile" renderBackButton={() => (<View/>)}/>
                    <Scene key="songList" component={SongList} title="Songs" renderBackButton={() => (<View/>)}/>
                    <Scene key="songCreate" component={SongCreate} title="Create Song"/>

                    <Scene key="camera" component={MyCamera} title="Camera"/>

                </Scene>
            </Router>
          )
        }
    };
};

export default RouterComponent;
