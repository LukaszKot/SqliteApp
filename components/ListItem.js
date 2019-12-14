import React, { Component } from 'react';
import { View, Text, Image, TouchableNativeFeedback, Animated } from 'react-native';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';
import trash from '../assets/img/trash.png';
import arrow from '../assets/img/arrow.png';
import arrow2 from '../assets/img/arrow2.png';
class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            height: new Animated.Value(150)
        };
        this.toValue = 0
    }

    render() {
        return (
            <Animated.View style={{ height: this.state.height, borderBottomColor: "white", borderBottomWidth: 1, marginTop: 60, marginHorizontal: 30, marginBottom: 0, }}>
                <View style={{ height: 75, flexDirection: "row", justifyContent: "center" }}>
                    <View style={{ flex: 1 }}><Text style={{ fontSize: 50, color: "white" }}> {this.getHour()} </Text></View>
                    <View style={{ flex: 1 }}><Switch value={this.props.data.isEnabled} thumbColor={"white"} trackColor={{ true: "green", false: "red" }} onValueChange={this.switchValueChanged} /></View>
                </View>
                <View style={{ height: 38, flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity onPress={this.deleteClick} style={{ width: 38, height: 38 }}>
                        <Image source={trash} />
                    </TouchableOpacity>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                        onPress={this.toggle}
                        style={{
                            width: 38,
                            height: 38
                        }}
                    >
                        <View style={{ width: 38, height: 38 }}>
                            <Image source={this.state.isVisible ? arrow2 : arrow} />
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={{ height: 38, }}>
                    <Text style={{ color: "white" }}>{this.state.isVisible ? "" : this.props.data.days.filter(x => x.value).map(x => x.longName).join(", ")}</Text>
                </View>
                <View style={{ height: 50, flexDirection: "row", justifyContent: "space-between", display: this.state.isVisible ? "flex" : "none" }}>
                    {this.renderDays(this.props.data.days)}
                </View>
            </Animated.View>
        );
    }

    switchValueChanged = (value) => {
        this.props.callbackIsEnabled(this.props.data.id, value)
    }

    toggle = () => {

        if (!this.state.isVisible) this.toValue = 200
        else this.toValue = 150

        Animated.spring(this.state.height, {
            toValue: this.toValue,
        }).start();

        this.setState({
            isVisible: !this.state.isVisible
        })

    }

    deleteClick = () => {
        this.props.callbackDelete(this.props.data.id)
    }

    getHour() {
        var date = new Date(this.props.data.time);
        var hour = date.getHours();
        if (hour < 10) {
            hour = "0" + hour.toString()
        }
        var minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes.toString()
        }
        return hour + ":" + minutes;
    }

    renderDays = (days) => {
        return days.map((x, i) => {
            return (
                <TouchableOpacity key={i} onPress={() => this.enabledDayChanged(x.day)} style={{ backgroundColor: x.value ? "white" : null, width: 30, height: 30, borderRadius: 15, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: x.value ? "black" : "white" }}>{x.day}</Text>
                </TouchableOpacity>
            )
        })
    }

    enabledDayChanged = (day) => {
        this.props.callbackEnabledDayChanged(this.props.data.id, day)
    }
}

export default ListItem;
