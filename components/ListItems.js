import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ListItem from './ListItem';

class ListItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ marginBottom: 20 }}>
                {this.renderItems()}
            </View>
        )
    }

    renderItems() {
        return this.props.data.map((x, i) => {
            return (
                <ListItem data={x} key={i} callbackEnabledDayChanged={this.props.callbackEnabledDayChanged}
                    callbackDelete={this.props.callbackDelete}
                    callbackIsEnabled={this.props.callbackIsEnabled} />
            )
        })
    }
}

export default ListItems;
