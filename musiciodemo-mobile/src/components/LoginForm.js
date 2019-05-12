import React, { Component } from 'react';
import { Form, Label, Item, Input, Text, Button, Icon, Content, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { login, loginSocialSuccess, loginInfoChanged } from "../actions";
import { Linking, Platform, View } from "react-native";
import { Actions } from 'react-native-router-flux';
import SafariView from "react-native-safari-view";
import * as api from '../api/http/api';

class LoginForm extends Component {
    componentDidMount() {
        // Add event listener to handle OAuthLogin:// URLs
        Linking.addEventListener('url', this.handleOpenURL);
        // Launched from an external URL
        Linking.getInitialURL().then((url) => {
            if (url) {
                this.handleOpenURL({url});
            }
        });
    };

    componentWillUnMount() {
        // Remove event listener
        Linking.removeEventListener('url', this.handleOpenURL);
    };

    handleOpenURL = ({url}) => {
        const [, user_string] = url.match(/user=([^#]+)/);
        this.props.loginSocialSuccess(JSON.parse(decodeURI(user_string)));
        if (Platform.OS === 'ios') {
            SafariView.dismiss();
        }
        alert('Hi')
    };
    // Handle Login with Facebook button tap
    loginWithFacebook = () => this.openURL('https://backend.musicio.com/api/auth/facebook');

    // Handle Login with Google button tap
    loginWithGoogle = () => this.openURL('https://backend.musicio.com/api/auth/google');

    // Open URL in a browser
    openURL = (url) => {
        // Use SafariView on iOS
        if (Platform.OS === 'ios') {
            SafariView.show({
                url: url,
                fromBottom: true,
            });
        }
        // Or Linking.openURL on Android
        else {
            Linking.openURL(url);
        }
    };

    onLoginButtonPress = () => {
        const {email, password} = this.props;
        this.props.login({email, password});
    };

    //TODO: Delete it later!
    //FOR TESTING ONLY

    getUserName = () => {
        api.getUsername()
            .then((res) => {
                console.log(res.data);
                if (!res.data.error)
                    alert('Hi ' + res.data.email);
                else
                    alert('Error: ' + res.data.message);
            })
            .catch((err) => {
                console.log('Error: ', err);
            });
    };

    //END

    renderButton = () => {
        if (this.props.loading) {
            return <Spinner color='blue'/>
        }
        return (
            <View style={styles.buttons}>
                <Button style={{marginTop: 20}} block title="Sign In" onPress={this.onLoginButtonPress.bind(this)} info>
                    <Text>Sign In</Text>
                </Button>

                <Text style={styles.socialLoginText}> or </Text>

                <View style={styles.socialLoginButton}>
                  <Button style={{marginTop: 10}} block iconLeft onPress={this.loginWithFacebook} primary>
                      <Icon name='logo-facebook'/>
                      <Text>Facebook Login</Text>
                  </Button>

                  <Button style={{marginTop: 10}} block iconLeft onPress={this.loginWithGoogle} danger>
                      <Icon name='logo-google'/>
                      <Text>Google Login</Text>
                  </Button>
                </View>

                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Button style={{marginTop: 20}} block onPress={this.getUserName} warning>
                        <Text>Get Username</Text>
                    </Button>
                </View>
            </View>
        );
    };


    render() {
        return (
            <Content>
                <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            value={this.props.email}
                            onChangeText={value => this.props.loginInfoChanged({prop: 'email', value})}
                        />
                    </Item>

                    <Item floatingLabel last>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry
                            value={this.props.password}
                            onChangeText={value => this.props.loginInfoChanged({prop: 'password', value})}
                        />
                    </Item>
                </Form>

                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>

                {this.renderButton()}

                <Text style={styles.resetPasswordText} onPress={() => Actions.resetpwd()}>
                    Reset Password
                </Text>

                <View style={styles.buttons}>
                    <Text style={styles.signUpText}> Do not have an account?</Text>
                    <Button style={{marginTop: 20}} block title="Sign Up" onPress={() => Actions.register()} success>
                        <Text>Sign Up</Text>
                    </Button>
                </View>
            </Content>
        );
    }
}

const mapStateToProps = ({auth}) => {
    const {email, password, error, loading, user} = auth;
    return {email, password, error, loading};
};

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    buttons: {
        justifyContent: 'space-around',
        flexDirection: 'column',
        margin: 20,
        flex: 0,
    },
    socialLoginButton: {
      justifyContent: 'space-around',
      flexDirection: 'row',
      flex: 1,
    },
    socialLoginText: {
        marginTop: 10,
        alignSelf: 'center',
        fontSize: 16
    },
    resetPasswordText: {
      fontSize: 16,
      alignSelf: 'center',
      color: 'blue'
    },
    signUpText: {
      marginTop: 40,
      alignSelf: 'center',
      fontSize: 16
    },
};

export default connect(mapStateToProps, {login, loginSocialSuccess, loginInfoChanged})(LoginForm);
