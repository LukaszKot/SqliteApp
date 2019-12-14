import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import ListItems from './ListItems';
import CircleButton from './CircleButton';
import Database from './Database';

class Data extends Component {
    static navigationOptions = {
        title: 'lista budzików',
        headerStyle: {
            backgroundColor: "rgb(86,36,168)",
        },
        headerTitleStyle: {
            color: "#ffffff"
        },
        headerTintColor: "#ffffff"
    }

    async componentDidMount() {
        Database.createTables();
        var data = await Database.getAll();
        this.setState({
            data: data
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: "rgb(86,36,168)" }}>
                <ListItems data={this.state.data} callbackEnabledDayChanged={this.changedAvailableDay}
                    callbackDelete={this.delete}
                    callbackIsEnabled={this.switchValueChanged} />
                <View style={{ alignItems: "center" }}><CircleButton onPress={this.add} iconName="plus" radius={50} /></View>
            </ScrollView>
        )
    }

    add = async () => {
        var data = JSON.parse(JSON.stringify(this.state.data));
        var newData = {
            time: Date.now(),
            isEnabled: false,
            days: [
                {
                    day: "PN",
                    longName: "Pon.",
                    value: false
                },
                {
                    day: "WT",
                    longName: "Wto.",
                    value: false
                },
                {
                    day: "ŚR",
                    longName: "Śro.",
                    value: false
                },
                {
                    day: "CZ",
                    longName: "Czw.",
                    value: false
                },
                {
                    day: "PT",
                    longName: "Pią.",
                    value: false
                },
                {
                    day: "SB",
                    longName: "Sob.",
                    value: false
                },
                {
                    day: "ND",
                    longName: "Nie.",
                    value: false
                }
            ]
        }
        var id = await Database.add(newData);
        newData.id = id
        data.push(newData);
        this.setState({
            data: data
        })
    }

    switchValueChanged = (id, value) => {
        var data = JSON.parse(JSON.stringify(this.state.data));
        var alarm = data[data.findIndex(x => x.id == id)]
        alarm.isEnabled = value;
        Database.update(alarm)
        console.log(alarm)
        this.setState({
            data: data
        })
    }

    delete = (id) => {
        var data = JSON.parse(JSON.stringify(this.state.data));
        data.splice(data.findIndex(x => x.id == id), 1);
        Database.remove(id);
        this.setState({
            data: data
        })
    }

    changedAvailableDay = (id, day) => {
        var data = JSON.parse(JSON.stringify(this.state.data));
        var alarm = data.filter(x => x.id == id)[0];
        var day = alarm.days.filter(x => x.day == day)[0];
        day.value = !day.value;
        Database.update(alarm);
        this.setState({
            data: data
        })
    }
}

export default Data;
