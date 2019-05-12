import React, { Component } from 'react';
import { MainFooter } from './MainFooter';
import {
    Content,
    Form,
    Item,
    Label,
    Input,
    Button,
    Text,
    Container
} from 'native-base';
import { connect } from 'react-redux';
import { songUpdate, songCreate } from '../actions';
import { Picker } from 'react-native';

class ArtistCreate extends Component {
    constructor(props) {
        super(props);
    }

    onButtonPress = () => {
        const {title, file, genre} = this.props;
        this.props.songCreate({title, file, genre: genre || 'jazz'});
    };


    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>Title</Label>
                            <Input
                                placeholder="My beautiful dog"
                                value={this.props.title}
                                onChangeText={value => this.props.songUpdate({prop: 'title', value})}
                            />
                        </Item>

                        <Item stackedLabel>
                            <Label>File</Label>
                            <Input
                                placeholder="https://youtube.com/123.mp4"
                                value={this.props.file}
                                onChangeText={value => this.props.songUpdate({prop: 'file', value})}
                            />
                        </Item>

                        <Item style={{height: 180}}>
                            <Label>Genre</Label>
                            <Picker
                                style={{flex: 1}}
                                selectedValue={this.props.genre}
                                onValueChange={value => this.props.songUpdate({prop: 'genre', value})}
                            >
                                <Picker.Item label="jazz" value="jazz"/>
                                <Picker.Item label="pop" value="pop"/>
                                <Picker.Item label="rock" value="rock"/>
                                <Picker.Item label="country" value="country"/>
                                <Picker.Item label="metal" value="metal"/>
                            </Picker>
                        </Item>
                    </Form>

                    <Button
                        full
                        title="Save"
                        style={{marginTop: 15, marginHorizontal: 10}}
                        onPress={this.onButtonPress.bind(this)}
                    >
                        <Text>Upload</Text>
                    </Button>

                </Content>

                <MainFooter/>
            </Container>

        );
    }
}

const mapStateToProps = ({songForm}) => {
    const {title, file, genre} = songForm;
    return {title, file, genre};
};

export default connect(mapStateToProps, {
    songUpdate, songCreate
})(ArtistCreate);
