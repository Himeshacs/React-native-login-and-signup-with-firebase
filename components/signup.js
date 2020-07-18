// components/signup.js

import React, { Component } from 'react';
import { StyleSheet, Picker, Text, View, TextInput, Button, ScrollView, Alert, ActivityIndicator, RefreshControlComponent } from 'react-native';
import firebase from '../database/firebase';



export default class Signup extends Component {

  constructor() {
    super();
    this.state = {
      userId:'',
      name: '',
      name_error: '',
      email: '',
      email_error: '',
      password: '',
      password_error: '',
      age: '',
      age_error: '',
      gender: '',
      gender_error: '',
      job: '',
      job_error: '',
      marital_status: '',
      marital_error: '',
      phone: '',
      phone_error: '',
      vehicle_no: '',
      vehicle_no_error: '',
      vehicle_type: '',
      vehicle_type_error: '',
      isLoading: false,
      indicator: true,
      success: false,
      success_display:'',

    }

  }


  componentDidMount() {
    firebase.database().ref('users').on('value', (data) => {
      console.log(data.toJSON());

    });
   
  }

  componentWillMount() {
    this.initialState = this.state;/*
     setTimeout(()=>{
       this.setState({
         indicator: false
       })   
     },5000);*/
     
  }
  /*
  reset_form() {
    this.setState(this.initialState);
  } */

  check_validity() {
    
    if (this.state.name != '' && this.state.age != '' && this.state.gender != '' && this.state.job != '' && this.state.marital_status != '' && this.state.phone != '' && this.vehicle_no != '' && this.vehicle_type != ''
        && (this.state.gender== 'male' || this.state.gender== 'MALE' || this.state.gender== 'Male' || this.state.gender== 'female' || this.state.gender== 'Female' || this.state.gender== 'FEMALE' ) 
        && (this.state.marital_status=='married' ||this.state.marital_status=='Married' || this.state.marital_status=='MARRIED' || this.state.marital_status=='unmarried' ||this.state.marital_status=='Unmarried' ||this.state.marital_status=='UNMARRIED')
        && this.state.phone.length < 12) {

     return true;
    }
    else {
      return false;
    }
  };

  validate = () => {
    // let isError = false;
    let phoneNumberLength = this.state.phone.length;

    if (this.state.password.length < 5) {
      this.setState({
        password_error: "Requires valid password",
      })
    }

    if (this.state.email.indexOf("@") === -1) {
      this.setState({
        email_error: "Requires valid email",
      })
    }
    if (this.state.name == '') {
      this.setState({
        name_error: "required",
      })
    }
    if(this.state.age==''){
      this.setState({
        age_error: "required ",
      })
    }
    if(this.state.gender==''){
      this.setState({
        gender_error: "required",
      })
    }
    if(this.state.job==''){
      this.setState({
        job_error:"required"
      })
    }
    if(this.state.marital_status==''){
      this.setState({
        marital_error:"required",
      })
    }
    if(this.state.phone==''){
      this.setState({
        phone_error: "required",
      })
    }
    if(this.state.vehicle_no==''){
      this.setState({
        vehicle_no_error:"required",
      })
    }
    if(this.state.vehicle_type==''){
      this.setState({
        vehicle_type_error:"required",
      })
    }
    
    if(this.state.gender!= 'male' || this.state.gender!= 'MALE' || this.state.gender!= 'Male' || this.state.gender!= 'female' || this.state.gender!= 'Female' || this.state.gender!= 'FEMALE'||this.state.gender!= '' )
    {
      this.setState({
        gender_error:"Only enter Male or Female",
      })
    }
    if(this.state.marital_status!='married' ||this.state.marital_status!='Married' || this.state.marital_status!='MARRIED' || this.state.marital_status!='unmarried' ||this.state.marital_status!='Unmarried' ||this.state.marital_status!='UNMARRIED'||this.state.marital_status!= '')
    {
      this.setState({
        marital_error:"Only enter Married or Unmarried",
      })
    }
    if(phoneNumberLength >= 12){
      this.setState({
        phone_error:"phone number should be less than 12 charactoers "
      })
    }
    
    
  };


  onPressSignIn() {
    this.setState({
      isLoading: true,
    });
  }
 
  SignUp = (email, password, name, age, gender, job, phone, marital_status, vehicle_no, vehicle_type ) => {

    if (this.state.email == '' ||this.state.email.indexOf("@") === -1) {
      console.log("enter the  email")
      
      
      return
    } if (this.state.password == ''/* && password.trim()  && password.length > 6 */) {
      console.log("enter the password")
      
      return
    }
  
    
    
   if (this.state.name != '' && this.state.age != '' && this.state.gender != '' && this.state.job != '' && this.state.marital_status != '' && this.state.phone != '' && this.vehicle_no != '' && this.vehicle_type != ''
   && (this.state.gender== 'male' || this.state.gender== 'MALE' || this.state.gender== 'Male' || this.state.gender== 'female' || this.state.gender== 'Female' || this.state.gender== 'FEMALE' ) 
   && (this.state.marital_status=='married' ||this.state.marital_status=='Married' || this.state.marital_status=='MARRIED' || this.state.marital_status=='unmarried' ||this.state.marital_status=='Unmarried' ||this.state.marital_status=='UNMARRIED')
   && this.state.phone.length < 12)
{

    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res => {
          //this.state.userId = res.user.uid
          console.log("athentication"); 
          firebase.database().ref('users/' + res.user.uid).set(
            {
              name: name,
              age: age,
              gender: gender,
              job: job,
              phone: phone,
              marital_status: marital_status,
              vehicle_no: vehicle_no,
              vehicle_type: vehicle_type, 
            }
            
          )
          console.log("inserted");
          
          this.setState(this.initialState);
          this.props.navigation.navigate('Login');
        }));


    } catch (error) {
      console.log(error.toString(error));
    }
  }
  };

  render() {
    /*
    if(this.state.isLoading && this.state.indicator ){
      return(
        <View style={styles.preloader}>
          
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }  
  */
    return (

      <View style={styles.container}>
        <ScrollView>


        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
        
          <Text style={styles.error_text}>
            {this.state.name_error}</Text>
        
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        
          <Text style={styles.error_text}>
            {this.state.email_error}</Text>
        
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          maxLength={15}
          secureTextEntry={true}
        />
        
          <Text style={styles.error_text}>
            {this.state.password_error}</Text>
       

        <TextInput
          style={styles.inputStyle}
          placeholder="Age"
          keyboardType="numeric"
          onChangeText={age => this.setState({ age })}
          value={this.state.age}
        />
        
          <Text style={styles.error_text}>
            {this.state.age_error}</Text>
        

        <TextInput
          style={styles.inputStyle}
          placeholder="Gender"
          onChangeText={gender => this.setState({ gender })}
          value={this.state.gender}
        />
       
          <Text style={styles.error_text}>
            {this.state.gender_error}</Text>
       
        <TextInput
          style={styles.inputStyle}
          placeholder="Job"
          onChangeText={job => this.setState({ job })}
          value={this.state.job}
        />
        
          <Text style={styles.error_text}>
            {this.state.job_error}</Text>
     
        <TextInput
          style={styles.inputStyle}
          placeholder="Marital status"
          onChangeText={marital_status => this.setState({ marital_status })}
          value={this.state.marital_status}
        />
        
          <Text style={styles.error_text}>
            {this.state.marital_error}</Text>
        
        <TextInput
          style={styles.inputStyle}
          placeholder="Phone"
          keyboardType="numeric"
          onChangeText={phone => this.setState({ phone })}
          value={this.state.phone}
        />
        
        <Text style={styles.error_text}>
          {this.state.phone_error}</Text>
        
        <TextInput
          style={styles.inputStyle}
          placeholder="Vehicle no"
          onChangeText={vehicle_no => this.setState({ vehicle_no })}
          value={this.state.vehicle_no}
        />
       
        <Text style={styles.error_text}>
          {this.state.vehicle_no_error}</Text>
        
        <TextInput
          style={styles.inputStyle}
          placeholder="Vehicle type"
          onChangeText={vehicle_type => this.setState({ vehicle_type })}
          value={this.state.vehicle_type}
        />
        
        <Text style={styles.error_text}>
          {this.state.vehicle_type_error}</Text>
        
        
        <Text style={styles.success_text}>
          {this.state.success_display}</Text>
          

        <Button
          color="#070708"
          title="Signup"
          /*onPress={() => this.registerUser()} */
          onPress={() => { this.onPressSignIn(); 
            this.SignUp(this.state.email, this.state.password, this.state.name, this.state.age, this.state.gender, this.state.job, this.state.phone, this.state.marital_status, this.state.vehicle_no, this.state.vehicle_type);
             this.validate()  }}
        />
        
        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Already Registered? Click here to login
        </Text>

        </ScrollView>
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
    width: '80%',
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
  success_text:{
    color:'#60d91a',
    fontWeight:'bold',
    textAlign:'center',
    fontSize:18,

   // fontSize: '16px',
    
  },
  error_text: {
    color: '#fc0000',
    textAlign: 'center',
    //fontWeight: 'bold',
    fontSize: 13,
    //justifyContent: 'center'

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

});