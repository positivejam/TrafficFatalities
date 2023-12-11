import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    Text,
    View,
} from 'react-native';
import ArticleList from './ArticleList';

function App(): React.JSX.Element {
    const backgroundStyle = {
        backgroundColor: '#444',
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <View style={{ display: 'flex', alignSelf: 'center', }}>
                <Text style={{ fontSize: 32, color: 'white', margin: 20 }}>Traffic Fatalities</Text>
            </View>
            <ArticleList feedUrl="https://www.google.com/alerts/feeds/03348413018923574652/10944298154031775850" />
        </SafeAreaView>
    );
}

export default App;
