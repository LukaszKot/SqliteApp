import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button'

class Main extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ backgroundColor: "rgb(86,36,168)", flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={[styles.textColor, styles.big]}> Sqlite App </Text>
                <Text style={[styles.textColor, styles.small]}> manage sqlite </Text>
                <Text style={[styles.textColor, styles.small]}> use animation </Text>
                <Text style={[styles.textColor, styles.small]}> use ring </Text>
                <Button text={styles.textColor} title="START" onPress={() => this.props.navigation.navigate("data")} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textColor: {
        color: "white"
    },
    big: {
        fontSize: 50
    },
    small: {
        fontSize: 15
    }
})

export default Main;
