import React from 'react';
import { StyleSheet } from 'react-native';








export const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      backgroundColor: '#fcfcfcff',
      
    },
   container2:{
    left:'5%',
    top:'5%',
    width:'90%'
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
      width:"120%",
      fontSize:20
    },
    inputicon:{
      right:"70%"
    }
  });