import React from 'react';
import { StyleSheet, Text, View, FlatList, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
const axios = require('axios');
const moment = require('moment');


export default class Story extends React.Component {

  constructor(props) {
    super(props)
    this.state = {messages: []};
    setTimeout(this.answer, 1500);
  }

  onSubmit = async (text) => {
    const newMess = {key: ""+this.state.messages.length,text,time: moment().format("h:mm a"), mine: true};
    this.setState({messages: [...this.state.messages, newMess]})
    //TODO: await axios.post('URL', {text});
    setTimeout(this.answer, 1500);
  }

  addChatbotMessage = (text) => {
    if (!!text) {
      const newMess = {key: ""+this.state.messages.length,text,time: moment().format("h:mm a"), mine: false};
      this.setState({messages: [...this.state.messages, newMess]})
    } else {
      const newMess = {key: ""+this.state.messages.length,time: moment().format("h:mm a"), mine: false};
      this.setState({messages: [...this.state.messages, newMess]})
    }
    
  }

  answer = () => {
    switch (this.state.messages.length) {
      case 0:
        //TODO: Add timeouts
        this.addChatbotMessage("Hej")
        this.addChatbotMessage("I’m here to help you find the perfect city for your future.");
        this.addChatbotMessage("What's your name?")
        break;
      case 4:
      this.addChatbotMessage("Great!")
      this.addChatbotMessage("What’s your email?");
      this.addChatbotMessage("You will need it to save the results.")
        break;
      case 8:
      this.addChatbotMessage("Tack! You are ready to start:")
      this.addChatbotMessage();
        break
    }
  }

  navigate = () => {
    const { navigate } = this.props.navigation;
    navigate('Start');
  }

  renderItem = ({item}) => {
    if (!item.text) {
      return (<View style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10}}>
        <View style={{flex: item.mine ? 1 : 0}}/>
        <TouchableOpacity style={styles.bubble} onPress={this.navigate}>
          <Text style={{fontSize: 16, maxWidth: 230}}>⏭ Start</Text>
        </TouchableOpacity>
        <View style={{flex: item.mine ? 0 : 1}}/>
      </View>)
    }
    return (
      <View style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10}}>
      <View style={{flex: item.mine ? 1 : 0}}/>
      <View style={styles.bubble}>
        <Text style={{fontSize: 16, maxWidth: 230}}>{item.text}</Text>
        <Text style={{fontSize: 10, marginLeft: 10}}>{item.time}</Text>
      </View>
      <View style={{flex: item.mine ? 0 : 1}}/>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'rgba(0,81,139,0.06)'}}>
        <ChatHeader />
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
        <FlatList style={{padding: 20}} data={this.state.messages} renderItem={this.renderItem}/>
        <ChatFooter onSubmit={this.onSubmit}/>
        </KeyboardAvoidingView>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bubble: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'baseline',
    shadowColor: 'black',
    shadowOffset: {
      width: 0, height: 5
    },
    shadowRadius: 4,
    shadowOpacity: 0.17,
    maxWidth: 300
  }
});
