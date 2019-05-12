import _ from 'lodash';
import React, { Component } from 'react';
import { Content, Container, Text } from 'native-base';
import { MainFooter } from "./MainFooter";
import { connect } from 'react-redux';
import { songsFetch } from "../actions";
import { ListView } from 'react-native';
import ListItem from './ListItem';


class ArtistList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.songsFetch();

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props that this component
        // will be rendered with this.props is still the old set of props

        this.createDataSource(nextProps);
    }

    createDataSource({songs}) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(songs);

    }

    renderRow = (song) => {
        return <ListItem song={song}/>;
    };

    render() {
        return (
            <Container>
                <Content>
                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />
                </Content>

                <MainFooter/>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    const songs = _.map(state.songs, (val, uid) => {
        return {...val, uid};
    });
    return {songs};
}

export default connect(mapStateToProps, {songsFetch})(ArtistList);
