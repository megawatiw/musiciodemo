import React, { Component } from 'react';
import { View, AsyncStorage, Alert } from 'react-native';
import { Button, Text } from 'native-base';
import { homeEnter, userLogout, checkUserSession } from '../actions';
import { connect } from 'react-redux';
import { Actions } from "react-native-router-flux";

class Home extends Component{
  componentWillMount = () => {
    this.props.checkUserSession();
  }

  componentDidMount = () => {
    if(!this.props.isLoggedIn) {
      this.props.userLogout();
    }
    else {
      this.props.homeEnter();
    }
  }

  onLogoutPress = () => {
    this.props.userLogout();
  }

  onCameraPress = () => {
    Actions.camera();
  }

  render(){
    return(
      <View>
        <Text> {this.props.message} </Text>
        <View>
          <Button style={styles.logoutButtonStyle} block title="Camera" onPress={this.onCameraPress.bind(this)}>
            <Text> Camera </Text>
          </Button>
          <Button style={styles.logoutButtonStyle} block title="Logout" onPress={this.onLogoutPress.bind(this)}>
            <Text> Logout </Text>
          </Button>
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({home}) => {
    const {message, isLoggedIn} = home;
    return {message, isLoggedIn};
}

const styles = {
  logoutButtonStyle: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    margin: 20,
    flex: 0,
  }
}

export default connect(mapStateToProps, {homeEnter, userLogout, checkUserSession})(Home);
