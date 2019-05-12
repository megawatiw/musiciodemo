import React, { Component } from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Left, Body, Text, Icon, Right, Button, Thumbnail } from 'native-base';
import { WebView } from 'react-native';

class ListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {title, genre, file} = this.props.song;

        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../../assets/img/monkey2.jpg')}/>
                        <Body>
                        <Text>{title}</Text>
                        <Text note>{genre}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>

                    <WebView
                        source={{uri: 'https://player.vimeo.com/video/61590051'}}
                        style={{height: 200, width: null, flex: 1}}
                    />

                </CardItem>
            </Card>
        );
    }
}

export default ListItem;
