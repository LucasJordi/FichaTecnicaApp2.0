import * as React from 'react';
import {styles} from '../estilos/global'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View,Modal,TextInput,StyleSheet,Dimensions,Text,Image,LogBox} from 'react-native';
import {firebase} from '../firebase/config'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
import {Barra} from '../globais/barra'



export function Minhaconta({ navigation }) {
  const [nome,setnome]=React.useState()
  const [nomenegocio,setnomenegocio]=React.useState()
  const [email,setemail]=React.useState()
  const [todos,settodos]=React.useState()
  
  

  React.useEffect(
      ()=>{
        const pegando= async ()=>{
          
          try {const usuario=(await AsyncStorage.getItem('@usuario'))
                
              firebase.database().ref('Users/'+usuario).on('value',(snapshot)=>{
                setnome(snapshot.val().nome+" "+snapshot.val().sobrenome)
                setnomenegocio(snapshot.val().negocio)
                setemail(snapshot.val().email)
                settodos(snapshot.val().conta)
              })
              LogBox.ignoreLogs(['Setting a timer']);
            }catch(e){
              console.log(usuario)
            }
    }
    pegando()
    },[]
  )



    return (
      <View style={styles.container}>
        <Barra name={()=>navigation.openDrawer()}/>
        

        <View style={styles.container2}>
            <Image style={[styles.imagemenu,{marginBottom:'2%'}]} source={require('../imagens/minhaconta.png')}/>

            <View style={styles1.view}>
                <Text >Nome </Text>
                <TextInput  value={nome} style={{height: 40,width:Dimensions.get('window').width*0.7,fontSize: 20,marginTop:'2%',borderColor:'gray',borderBottomWidth:1}}/>
               
            </View>
            <View style={styles1.view}>
                <Text >Data de nascimento</Text>
                <TextInput style={{height: 40,fontSize: 20,width:'40%',marginTop:'2%',borderColor:'gray',borderBottomWidth:1}}/>
               
            </View>
            <View style={styles1.view}>
                <Text >Email</Text>
                <TextInput value={email} style={{height: 40,width:Dimensions.get('window').width*0.7,fontSize: 20,marginTop:'2%',borderColor:'gray',borderBottomWidth:1}}/>
               
            </View>
            <View style={styles1.view}>
                <Text >Nome do negócio</Text>
                <TextInput value={nomenegocio} style={{height: 40,width:Dimensions.get('window').width*0.7,fontSize: 20,marginTop:'2%',borderColor:'gray',borderBottomWidth:1}}/>
               
            </View>
            <View style={styles1.view}>
                <Text >Plano</Text>
                <TextInput value={todos} style={{height: 40,width:'30%',fontSize: 20,marginTop:'2%',borderColor:'gray',borderBottomWidth:1}}/>
               
            </View>
            <View style={[styles.ads,{marginTop:"2%"}]}>
              <AdMobBanner
              bannerSize="fullBanner"
              adUnitID="ca-app-pub-3107661564294379/9507690326" // Test ID, Replace with your-admob-unit-id
                />
            </View>

        </View>
        
          
        
              
                              
                              
                          
      </View>
      
    );
}

 const styles1 = StyleSheet.create({
    
    view: {
      marginVertical:'2%',
      
      
    },
   
  });  



export default Minhaconta