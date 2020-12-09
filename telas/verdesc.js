import  React,{useState,useEffect} from 'react';
import {styles} from '../estilos/global'
import * as ImagePicker from 'expo-image-picker';
import { View,SafeAreaView,Button,Alert,ScrollView,ImageBackground,TextInput,StyleSheet,Text,Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {firebase} from '../firebase/config';
import {Barra} from '../globais/barra'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';

export function Verdesc({ navigation,route }) {
    const { item } = route.params;
    const[select,setselect]=useState('');
    const [imagem,setimagem]=useState('/');
    const [nome,setnome]=useState('');
    const [quantidade,setquantidade]=useState('');
    const [valor,setvalor]=useState('');
    const [user,setuser]=useState();
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            
          setimagem(result.uri);
          
        }
      };
    const deletar= async()=>{
        try{
            const usuario= await AsyncStorage.getItem('@usuario')
           firebase.database().ref('Users/'+usuario+'/descartaveis/'+item.id).remove()
           navigation.goBack()
        }catch(e){
            console.log('Erro')
        }
    }

    async function atualizar(userId) {
        
        try {
           await firebase
          .database()
          .ref('Users/'+userId+'/descartaveis/'+item.id)
          .set({
            
            nome: nome,
           
            quantidade: quantidade,
            unidade: select,
           
            custounidade:valor.replace(',','.'),
            imagem:imagem
            

            

          });
       
           
            
        Alert.alert('Item alterado!')
        navigation.goBack()
     }catch(e){
            console.log("Erro")
        }

    }
    
    useEffect(()=>{
        (async () => {
            if (Platform.OS !== 'web') {
              const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
              if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
              }
            }
          })();
        const pegarasync= async()=>{
            try{
                const usuario = await AsyncStorage.getItem('@usuario')
                await setuser(usuario)
                
            }catch(e){
                console.log('Erro')
            }
        }
        pegarasync()
        setnome(item.nome)
        setquantidade(item.quantidade)
        setselect(item.unidade)
        setvalor(item.valor)
        setimagem(item.imagem)

    },[item])
    return (
      <View style={[styles.container,{height:"50%"}]}>
        <Barra name={()=>navigation.openDrawer()}/>


        <View style={styles1.scroll}>
            <ScrollView>
              
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>pickImage()} style={[styles1.view]}>
                       <ImageBackground style={{width:345,height:157}}  source={require('../imagens/unknow3.png')}>
                            <Image style={{width:345,height:157}} source={{uri:imagem}} />    
                       </ImageBackground>
                        
                    
                    </TouchableOpacity>

                    
                    

                </View>
                <Button 
                        color="#00ccffff" 
                        title="Apagar"
                        onPress={()=>Alert.alert('Remover dados','Deseja remover item?',[{text:'Sim',onPress:()=>deletar()},{text:'Cancelar'}])}
                        
                    />
                
                <View style={styles1.view}>
                    <Text >Nome do descartável</Text>
                    <TextInput value={nome} onChangeText={(value)=>setnome(value)} placeholder='Ex.: Forma, fita...' style={styles1.view2}/>
                
                </View>
                
                <View style={{flexDirection:"row"}}>
                    <View style={[styles1.view,{width:'30%'}]}>
                        <Text >Quantidade por embalagem</Text>
                        <TextInput value={quantidade} onChangeText={(value)=>setquantidade(value)} placeholder='Ex.:10' style={styles1.view2}/>
                    
                    </View>
                    <View style={[styles1.view,{width:'40%',marginHorizontal:'10%'}]}>
                        <Text >Unidade</Text>
                        
                        <Picker selectedValue={select}  style={{backgoundColor:'gray'}} onValueChange={(itemValue, itemIndex)=>setselect(itemValue)} style={{ height: 50, width: 150 }}>
                            <Picker.Item label="unidade" value="unidade" />
                            <Picker.Item label="m" value="m" />
                            <Picker.Item label="cm" value="cm" />
                            <Picker.Item label="mm" value="mm" />
                            
                                
                        </Picker>
                    
                    </View>
                </View>
                    
                

                <View style={styles1.view}>
                    <Text >Informe o valor total de cada embalagem</Text>
                    <TextInput value={valor} onChangeText={(value)=>setvalor(value)} placeholder='R$ ...' style={[styles1.view2,{width:'90%'}]}/>
                
                </View>

                
                
                

                <View style={{alignItems:"center"}}>
                    <TouchableOpacity onPress={()=>Alert.alert('Deseja salvar as alterações?','',[{text:'Sim',onPress:()=>atualizar(user)},{text:'Cancelar'}])} style={{alignItems:'center',justifyContent:'center',backgroundColor:'#00ccffff',width:100,height:30}}>
                        <Text>Salvar</Text>
                    </TouchableOpacity>
                   
                </View>
                <View style={[{marginTop:"7%"},styles.ads]}>
                  <AdMobBanner
                  bannerSize="fullBanner"
                  adUnitID="ca-app-pub-3107661564294379/9507690326" // Test ID, Replace with your-admob-unit-id
                  />
                </View>
            
            </ScrollView>    
        </View>


        
    </View>
    );
}

 const styles1 = StyleSheet.create({
    
    view: {
      marginVertical:'5%',
      
      
    },
    view2:{
        height: 30,
        fontSize: 20,
        marginTop:'2%',
        borderColor:'#00ccffff',
        borderBottomWidth:0.5
    },
    scroll:{
        left:'5%',
        top:'5%',
        width:'90%',
        height:'80%'
    }
   
  });  



export default Verdesc