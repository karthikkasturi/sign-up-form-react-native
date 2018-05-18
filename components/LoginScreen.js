
import React, { Component } from 'react';

import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  TextInput ,
  Dimensions,
  DatePickerAndroid,
  DatePickerIOS,
  ToastAndroid,
} from 'react-native';

function validateEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(pass) {
  let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
  return re.test(String(pass));
}

String.prototype.isEmpty = function() {
  return (this.length === 0 || !this.trim());
};


let validateState = (st) => {
  if(st.firstName.isEmpty()){
    ToastAndroid.show("First name can't be empty", ToastAndroid.SHORT);
    return false
  }
  if(st.lastName.isEmpty()){
    ToastAndroid.show("Last name can't be empty", ToastAndroid.SHORT);
    return false
  }
  if(!validateEmail(st.email)){
    ToastAndroid.show("Please enter a valid email.", ToastAndroid.SHORT);
    return false
  }
  if(!validatePassword(st.password)){
    ToastAndroid.show("Please enter a valid password.", ToastAndroid.SHORT);
    return false
  }
  if(st.password !== st.confirmPass){
    ToastAndroid.show("Passwords do not match.", ToastAndroid.SHORT);
    return false
  }
  if(!st.dob.day){
    ToastAndroid.show("Please select DOB.", ToastAndroid.SHORT);
    return false
  }
  return true
}

export default class LoginScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPass: '',
      dob: {}
    }
    this.signUpClick = () => {
      let st = this.state
      if(!validateState(st)){
        return
      }
      this.props.navigation.navigate('Profile', {info: {
        firstName: st.firstName,
        lastName: st.lastName,
        email: st.email,
        password: st.email,
        dob: st.dob
      }} )
    }
    this.passwordChange = (text) => {
      this.setState({password: text})
    }
    this.firstNameChange = (text) => {
      this.setState({firstName: text})
    }
    this.lastNameChange = (text) => {
      this.setState({lastName: text})
    }
    this.emailChange = (text) => {
      this.setState({email: text})
    }
    this.confirmPasswordChange = (text) => {
      this.setState({confirmPass: text})
    }
    this.DatePicker = async() => {
      if(Platform.OS === 'android') {
        try {
          let d = new Date()
          let {action, year, month, day} = await DatePickerAndroid.open({
            maxDate: new Date().setFullYear(d.getFullYear() - 18)
          });
          if (action !== DatePickerAndroid.dismissedAction) {
            this.setState({dob: {day: day, month: month, year: year} })
          }
        } catch ({code, message}) {
          console.warn('Cannot open date picker', message);
        }
      }
    }
  }
  render(){
    const {navigate} = this.props.navigation
    const {day, month, year} = this.state.dob
    return(
      <KeyboardAvoidingView style = {styles.container}>
        <ScrollView 
        keyboardShouldPersistTaps = 'handled'
        contentContainerStyle = {styles.scrollContainer}>
          <View>
            <Image
            style = {{margin: 40}}
            source = {require('../assets/icons/icon.png')}/>
          </View>

          <View>
            <TextInput 
              returnKeyType = 'next'
              onChangeText = {this.firstNameChange}
              style = {styles.formInput}
              alignSelf = 'flex-start'
              placeholder = 'First Name'>
              {this.state.firstName}
            </TextInput>

            <TextInput 
              returnKeyType = 'next'
              onChangeText = {this.lastNameChange}
              style = {styles.formInput}
              alignSelf = 'flex-start'
              placeholder = 'Last Name'>
              {this.state.lastName}
            </TextInput>

            <TextInput 
              returnKeyType = 'next'
              onChangeText = {this.emailChange}
              style = {styles.formInput}
              alignSelf = 'flex-start'
              placeholder = 'Email (username@mail.com)'>
              {this.state.email}
            </TextInput>

            <TextInput 
              returnKeyType = 'next'
              secureTextEntry = {true}
              style = {styles.formInput}
              alignSelf = 'flex-start'
              onChangeText = {this.passwordChange}
              placeholder = 'Password'>
              {this.state.password}
            </TextInput>
            <TextInput 
              returnKeyType = 'next'
              secureTextEntry = {true}
              style = {styles.formInput}
              alignSelf = 'flex-start'
              onChangeText = {this.confirmPasswordChange}
              placeholder = 'Confirm Password'>
              {this.state.confirmPass}
            </TextInput>

            <TouchableWithoutFeedback onPress = { this.DatePicker }>
              <View >
                <Text
                  style = {[
                    styles.formInput,
                    { padding: 5,
                      paddingTop: 8,
                      paddingBottom: 2,
                      borderColor: '#F5FCFF',
                      borderBottomColor: '#777777',
                      borderWidth: 5,
                      borderBottomWidth: 1.5
                    }]}
                  alignSelf = 'flex-start'
                >
                D.O.B: { 
                  day? 
                  day + '-' + (month + 1) + '-' + year:
                  '(Select Date)'
                }
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          
          <TouchableOpacity 
            style = {{borderRadius:10, paddingTop: 10}}
            onPress = {this.signUpClick}
            activeOpacity = {0.6}>
            <Text textAlign = 'center' style = {styles.submitText} fontFamily = 'Slabo27px-Regular'> 
              SIGN UP
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style = {{borderRadius:10, paddingTop: 10}}
            onPress = {() => this.props.navigation.navigate('Profile', {info: {
              firstName: 'John',
              lastName: 'Doe',
              email: 'johndoe@mail.com',
              password: 'Jd@3825633',
              dob: {
                day: 1,
                month: 0,
                year: 1970
              }
            }})}
            activeOpacity = {0.6}>
            <Text textAlign = 'center' style = {styles.submitText} fontFamily = 'Slabo27px-Regular'> 
              &lt;dev&gt;SIGN UP
            </Text>
          </TouchableOpacity>
        
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}



const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  submitContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '300',
    borderRadius:10,
    height: '200',
    backgroundColor: 'red'
  },
  submitText:{
    backgroundColor: '#1995ad',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 2,
    paddingBottom: 3,
    margin: 2,
    borderRadius:10,
    color: 'white',
    fontSize: 19,
    fontFamily: 'Roboto'
  },
  formInput: {
    width: width * 0.80,
    fontSize: 17,
  },
});