import React from 'react';
import { Footer, FooterTab, Badge, Button, Text, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

const isActive = (screenName) => {
    return Actions.currentScene === screenName;
};

const onAddButtonPress = () => {
    Actions.songCreate({type: 'reset'});
};

const onHomeButtonPress = () => {
    Actions.songList({type: 'reset'});
};

const MainFooter = () => {
    return (
        <Footer>
            <FooterTab>
                <Button active={isActive('songList')} onPress={onHomeButtonPress.bind(this)}>
                    <Icon name="home"/>
                </Button>
                <Button active={isActive('songSearch')}>
                    <Icon name="search"/>
                </Button>
                <Button active={isActive('songCreate')} onPress={onAddButtonPress.bind(this)}>
                    <Icon active name="add"/>
                </Button>
                <Button badge active={isActive('notificationList')}>
                    <Badge><Text>2</Text></Badge>
                    <Icon name="notifications"/>
                </Button>
                <Button active={isActive('profile')}>
                    <Icon name="contact"/>
                </Button>
            </FooterTab>
        </Footer>
    );
};

export { MainFooter };

