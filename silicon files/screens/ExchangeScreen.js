import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput,KeyboardAvoidingView,TouchableOpacity,Alert, ToastAndroid } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader'
import {SendSMS} from 'react-native-sms'

export default class ExchangeScreen extends React.Component{

  constructor(){
    super()
    this.state = {
      userName : firebase.auth().currentUser.email,
      Name : "",
      description : ""
    }
  }

  addItem=(itemName, description)=>{
    var userName = this.state.userName
    db.collection("exchange_requests").add({
      "username"    : userName,
      "item_name"   : itemName,
      "description" : description
     })
    

  }

   
 someFunction=()=> {
  SendSMS.send({
      //Message body
      body: 'Please follow https://aboutreact.com',
      //Recipients Number
      recipients: ['8800587266'],
      //An array of types that would trigger a "completed" response when using android
      successTypes: ['sent', 'queued']
  }, (completed, cancelled, error) => {
      if(completed){
        console.log('SMS Sent Completed');
      }else if(cancelled){
        console.log('SMS Sent Cancelled');
      }else if(error){
        console.log('Some error occured');
      }
  });
}
  

  render(){
    return(
      <View style={{flex:1}}>
      <MyHeader title="Add Item"/>
      <KeyboardAvoidingView style={{flex:1,justifyContent:'center', alignItems:'center'}}>
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Name"}
          maxLength ={80}
          onChangeText={(text)=>{
            this.setState({
              itemName: text
            })
          }}
          value={this.state.itemName}
        />
        <TextInput
          multiline
          numberOfLines={4}
          style={[styles.formTextInput,{height:100}]}
          maxLength={100000}
          placeholder ={"What happend with you?"}
          onChangeText={(text)=>{
            this.setState({
              description: text
            })
          }}
          value={this.state.description}

        />
        <TouchableOpacity
          style={[styles.button,{marginTop:10}]}
          onPress = {()=>{this.addItem(this.state.itemName, this.state.description)}}
          >
          <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>Add Item</Text>
        </TouchableOpacity>
        <View>
        <TouchableOpacity
          style={[styles.button,{marginTop:10}]}
          onPress = {()=>{this.someFunction.bind(this)}}
          >
          <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>End SMS</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  formTextInput:{
    width:"75%",
    height:35,
    borderWidth:1,
    marginTop:20,
  },
  button:{
    width:"75%",
    height:50,
    backgroundColor: "green"
 
  },

})
