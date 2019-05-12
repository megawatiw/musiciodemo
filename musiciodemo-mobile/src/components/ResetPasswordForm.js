import React, { Component } from 'react';
import {
    Form,
    Item,
    Button,
    Input,
    Label,
    Spinner,
    Content,
    Text,
} from 'native-base';
import { View, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { userInfoChanged } from '../actions';
import { connect } from 'react-redux';

import { resetPassword } from '../api/http/auth'

class ResetPasswordForm extends Component{
  state = {email:''}

  onResetPress = () => {
    resetPassword(this.state.email)
    .then(res => this.resetSuccess(res))
    .catch(err => console.log(err))
  }

  resetSuccess = (res) => {
    if(res.data === "success") {
      Alert.alert(
        'Success',
        'A link to input new password has been sent to your email',
        [
          {text: 'OK', onPress: () => Actions.login()},
        ],
        { cancelable: false },
      )
    }
    else{
      Alert.alert(
        'Failed',
        'Email is invalid',
        [
          {text: 'OK', onPress: () => console.log("failed")},
        ],
        { cancelable: false },
      )
    }
  }

  render() {
    const { headText, buttons } = styles;
    return (
        <Content>
            <Text style={headText}>Enter your email address</Text>

            <Form>
                <Item>
                    <Input
                        onChangeText={value => this.setState({email:value})}
                        value={this.state.email}
                    />
                </Item>
            </Form>

            <View style={buttons}>
                <Button block onPress={this.onResetPress.bind(this)}>
                    <Text>Send New Password</Text>
                </Button>
            </View>
        </Content>
    )
  }
}

const styles = {
    errorText: {
        fontSize: 18,
        alignSelf: 'center',
        color: 'red'
    },
    buttons: {
        justifyContent: 'space-around',
        flexDirection: 'column',
        margin: 20,
        flex: 0,
    },
    headText: {
      marginTop: 20,
      marginLeft: 20,
      fontSize: 18
    }
};

export default ResetPasswordForm;
