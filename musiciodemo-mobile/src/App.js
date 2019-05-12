import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers';
import { Container, StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import Platform from '../native-base-theme/variables/platform';
import ReduxThunk from 'redux-thunk';
import Router from './Router';
import { persistStore, REHYDRATE, PURGE, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//import '../ReactotronConfig';

console.disableYellowBox = true;

class App extends Component<Props> {
    render() {
        const config = {
          key: 'primary',
          storage
        }

        let reducer = persistCombineReducers(config, reducers)

        const store = createStore(
          reducers,
          {},
          compose(
            applyMiddleware(ReduxThunk)
          )
        );

        return (
            <Provider store={store}>
                <StyleProvider style={getTheme(Platform)}>
                    <Container>
                        <Router/>
                    </Container>
                </StyleProvider>
            </Provider>
        );
    }
}

export default App;
