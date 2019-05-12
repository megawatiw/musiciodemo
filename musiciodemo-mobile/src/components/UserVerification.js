import React, { Component } from 'react';
import { View, Text } from 'react-native';

class UserVerification extends Component{
  render(){
    return(
      <View>
        <Text>Your account has not been verified. </Text>
        <Text> Please verify yourself by clicking on the link that we sent you via email.</Text>
      </View>
    )
  }
}

export default UserVerification;
