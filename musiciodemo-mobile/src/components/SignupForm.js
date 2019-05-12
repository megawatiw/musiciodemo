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
import { View } from 'react-native';
import { signupInfoChanged, signupUser } from '../actions';
import { connect } from 'react-redux';

class SignupForm extends Component {

    onSignUpPress() {
        const {username, email, password} = this.props;
        this.props.signupUser({username, email, password});
    };

    renderButton = () => {
        if (this.props.loading) {
            return <Spinner color='blue'/>
        }
        return (
            <View style={styles.buttons}>
                <Button block onPress={this.onSignUpPress.bind(this)}>
                    <Text>Sign up</Text>
                </Button>
            </View>
        );
    };

    render() {
        return (
            <Content>
                <Form>
                    <Item floatingLabel>
                        <Label>Username</Label>
                        <Input
                            onChangeText={value => this.props.signupInfoChanged({prop: 'username', value})}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            onChangeText={value => this.props.signupInfoChanged({prop: 'email', value})}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                            onChangeText={value => this.props.signupInfoChanged({prop: 'password', value})}
                            secureTextEntry
                        />
                    </Item>
                </Form>
                <Text style={styles.errorText}>
                    {this.props.error}
                </Text>
                {this.renderButton()}
            </Content>
        );
    };
}

const mapStateToProps = ({signup}) => {
    const {email, password, username, error, loading} = signup;
    return {email, password, username, error, loading};
};

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
};

export default connect(mapStateToProps, {signupInfoChanged, signupUser})(SignupForm);
