import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { userFetch } from "../actions/UserAction";

class UserProfile extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentWillUpdate(nextProps, nextState) {

    }

    render() {

        console.log('asu');
        console.log(this.props.kentut);
        return (
            <View>
                <Text>Hi User!</Text>
            </View>
        );
    }
}

const mapStateToProps = state => {

    return {kentut};
};

export default connect(mapStateToProps, {userFetch})(UserProfile);
