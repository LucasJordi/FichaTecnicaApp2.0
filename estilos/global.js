import React from 'react';
import { StyleSheet,Dimensions } from 'react-native';








export const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      backgroundColor: '#fcfcfcff',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
      
    },
   container2:{
    left:'5%',
    top:'5%',
    width:Dimensions.get('window').width,
    height:"100%"
   },
   container3:{
    left:'1%',
    top:'5%',
    width:Dimensions.get('window').width,
   },
   imagemenu:{
     transform:[{scale:1}],
     width:70,
     height:50,
     resizeMode: 'contain' 
   },
    textgeneral:{
     marginHorizontal:'6%'
   },
   view2:{
    height: 30,
    fontSize: 12,
    marginTop:'2%',
    borderColor:'#00ccffff',
    borderBottomWidth:0.5
    },
    login:{
      fontSize:30
    },
    input:{
      borderBottomWidth:1,
      borderColor:"#fdb800ff",
      width:"100%",
      fontSize:20
    },
    inputicon:{
      right:"70%"
    },
    ads:{
      width:Dimensions.get('window').width*0.6,
      left:"-4%"
    },
    ads2:{
      width:Dimensions.get('window').width*0.6,
    }
  });