import React, { Component } from "react";
import {
    Platform,
    Text,
    View,
    StyleSheet,
    ScrollView,
    ToolbarAndroid
} from 'react-native'

export default class ProfileScreen extends Component{
    static navigationOptions= {
        
    }
    render(){
        let {info} = this.props.navigation.state.params
        var keys = [];
        for(var k in info) keys.push(k);
        let i  = 0
        return(
           <View>
            <ToolbarAndroid
                title = {info.firstName + "'s profile."}
                titleColor = '#f5f5f5'
                style = {{height: '10%', backgroundColor: '#011a27'}}/>
            
            <ScrollView style = {{height: '90%'}} >
                {
                    keys.map((key) => (
                        <View style = {{
                            height: 180,
                            borderRadius: 6,
                            marginTop: 2 }} key = {i ++ }>
                            <View style = {styles.keyView}>
                                <Text style= {{color: '#f5f5f5'}} >{key.toUpperCase()}</Text>
                            </View>
                            <View style = {styles.valueView}>
                                <Text style = {{fontSize:30, color: '#041F2B', justifyContent: 'center'}}>
                                    { key == 'dob'? 'sf' : info[key] }
                                </Text>
                            </View>
                        </View>
                    ))
                }
                
            </ScrollView>
           </View>
        )
    }
}



const styles = StyleSheet.create({
    keyView: {
        flex: 1.5, 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#335252',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    valueView: {
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d4dde1',
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
    },
})