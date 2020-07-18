// components/login.js

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';


export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      email_error: '',
      password: '',
      password_error: '',
      isLoading: false,
      indicator: false,
      next_loader: false,
      login_error:'',
      login:false,
    }
  }

  componentWillMount() {
    this.initialState = this.state;
    /*setTimeout(()=>{
         this.setState({
           indicator: false
         })
       },5000)*/
  }
  reset_form() {
    this.setState(this.initialState);
  }

  onPressSignIn() {
    this.setState({
      isLoading: true,
    });
  }
 

  validate = () => {
    // let isError = false;

    if (this.state.password =='' ) {
      this.setState({
        password_error: "Enter the password",
      })
    }

    if (this.state.email.indexOf("@") === -1) {
      this.setState({
        email_error: "Requires valid email",
      })
    }
    if(this.state.email==''){
      this.setState({
        email_error:"Enter the email",
      })
    }
   
  };

  userLogin = (email, password) => {
    if (this.state.email.indexOf("@") === -1) {
      console.log("valid email")
    //  this.setState({
      //  email_error: true,

      //});

      return
    } else if (this.state.password == ''/* && password.trim()  && password.length > 6 */) {
      console.log("enter the password")
      //this.setState({
        //password_error: true,
      ///})
      return
    }
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res.user.email);
          console.log('User logged-in successfully!');

          this.props.navigation.navigate('Dashboard');
        });
    } catch (error) {
      
      console.log('not working');
      console.log(error.toString(error));

    }this.setState({
      login_error:"Incorrect email or password",
    })
  };

  render() {
    <Text
      style={styles.error_text}>
      {this.state.password == '' && this.state.isLoading ? 'Enter the email' : ''}
    </Text>
    if (this.state.isLoading && this.state.indicator) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          //error_text={this.state.email_error}
          value={this.state.email}
          required
        />
        
          <Text style={styles.error_text}>
            {this.state.email_error}</Text>
        
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          error_text={this.state.password_error}
          value={this.state.password}
          maxLength={15}
          secureTextEntry={true}
          required
        />
       
          <Text style={styles.error_text}>
            {this.state.password_error}</Text>

            <Text style={styles.error_text}>
            {this.state.login_error}</Text>
        
        <Button
          style={styles.submit}
          color="#070708"
          title="Login"
          

          onPress={() => { this.onPressSignIn(); this.userLogin(this.state.email, this.state.password); this.reset_form(); this.validate() }}
        />
       
        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Signup')}>
          Don't have account? Click here to signup
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#070708',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  error_text: {
    color: '#fc0000',
    textAlign: 'center',
   // fontWeight: 'bold',
    //fontSize: '13px'

  },
  submit:{
    backgroundColor: '#68a0cf',
   overflow: 'hidden'
  },
  submitText:{
      color:'#fff',
      textAlign:'center',
  }


}); 