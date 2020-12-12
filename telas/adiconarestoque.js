import  React,{useState,useEffect,useContext} from 'react';
import {styles} from '../estilos/global';
import * as ImagePicker from 'expo-image-picker';
import { View,SafeAreaView,Alert,Button,Dimensions,ImageBackground,ScrollView,Platform,TextInput,StyleSheet,Text,Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Constants from 'expo-constants';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';
import {Barra} from '../globais/barra';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Armazenamento} from '../contexto/context';
import {firebase} from '../firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';




export function Adiconarestoque({ navigation }) {
    const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
    const[selectunidade,setselect]=useState('unidade');
    const[selectunidade2,setselect2]=useState('unidade');
    const[selectunidade3,setselect3]=useState('unidade');
    const[nome,setnome]=useState('');
    const[imagem,setimagem]=useState('//');
    const[tem,settem]=useState(false)
    const[marca,setmarca]=useState('');
    const[quantidade,setquantidade]=useState('');
    const[pesounidade,setpesounidade]=useState('');
    const[custo,setcusto]=useState('');
    const[estoqueminimo,setestoqueminimo]=useState('');
    const[num,setnumero]=useState();
    const [user,setuser] =useState();
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        
    
        if (!result.cancelled) {
            
          setimagem(result.uri);
          settem(true)
        }
      };
    function cadastrarestoque(userId) {
        
        firebase
          .database()
          .ref('Users/'+userId+'/estoquemat/')
          .push({
            
            nome: nome,
            marca: marca,
            quantidade: quantidade.replace(',','.'),
            unidade: selectunidade,
            unidadereceita:selectunidade2,
            unidaeminima:selectunidade3,

            pesounidade:pesounidade,
            custounidade:custo.replace(',','.'),
            estoqueminimo:estoqueminimo.replace(',','.'),
            imagem:imagem
            

            

          });
            setselect('unidade');
            setselect2('unidade');
            setselect3('unidade');
            setnome('');
                
            setmarca('');
            setquantidade('');
            setpesounidade('');
            setcusto('');
            setestoqueminimo('');
            setnumero();
            setuser();
            setimagem('');
            
            settem(false)
            
          Alert.alert('Item cadastrado')
          navigation.goBack()

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
                setuser(usuario)
                
            }catch(e){
                console.log('Erro')
            }
        }
        pegarasync()

    })

    function numero(userId) {
        firebase.database().ref('Users/'+userId+'/estoquemat/').on('value', (snapshot) => {
          const highscore = snapshot.val();
          const ee =Object.keys(highscore).length;
          setnumero(Number(ee)+1)
           console.log(num);
        });
      }
    return (
      <View style={[styles.container,{height:"50%"}]}>
        <Barra name={()=>navigation.openDrawer()}/>


        <View style={styles1.scroll}>
            <ScrollView>
              
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>pickImage()} style={[styles1.view]}>
                       
                        <ImageBackground style={{width:345,height:157}}  source={require('../imagens/unknow3.png')} >
                            <Image style={{width:345,height:157}} source={{uri:imagem}}/>
                        </ImageBackground>
                    
                    </TouchableOpacity>

                    
                    

                </View>
                
                <View style={styles1.view}>
                    <Text >Nome do produto</Text>
                    <TextInput value={nome} onChangeText={(value)=> setnome(value)} placeholder='Ex.: Leite condensado,farinha de trigo...' style={styles1.view2}/>
                
                </View>
                <View style={styles1.view}>
                    <Text >Marca</Text>
                    <TextInput value={marca} onChangeText={(value)=> setmarca(value)} placeholder='Ex.: A granel, Maizena...' style={styles1.view2}/>
                
                </View>
                <View style={{flexDirection:"row"}}>
                    <View style={[styles1.view,{width:'30%'}]}>
                        <Text >Quantidade</Text>
                        <TextInput value={quantidade} keyboardType='numeric' onChangeText={(value)=> setquantidade(value)} placeholder='Ex.:10' style={styles1.view2}/>
                    
                    </View>
                    <View style={[styles1.view,{width:'40%',marginHorizontal:'10%'}]}>
                        <Text >Unidade</Text>
                        
                        <Picker 
                            selectedValue={selectunidade}  
                            style={{backgoundColor:'gray'}} 
                            onValueChange={(itemValue, itemIndex)=>setselect(itemValue)}
                            style={{ height: 50, width: 150 }}
                        >
                            
                            <Picker.Item label="unidade" value="unidade" />
                            <Picker.Item label="g" value="g" />
                            <Picker.Item label="kg" value="kg" />
                            <Picker.Item label="l" value="l" />
                            <Picker.Item label="ml" value="ml" />
                                
                        </Picker>
                    
                    </View>
                </View>
                    
                <View style={styles1.view}>
                    <Text >Informe a unidade de medida do produto que geralmente é usada para fazer receitas(1kg=1000g)</Text>
                    <Picker selectedValue={selectunidade2} onValueChange={(itemValue, itemIndex)=>setselect2(itemValue)} style={{ height: 50, width: 150 }}>
                            <Picker.Item label="unidade" value="unidade" />
                            <Picker.Item label="g" value="g" />
                            <Picker.Item label="kg" value="kg" />
                            <Picker.Item label="l" value="l" />
                            <Picker.Item label="ml" value="ml" />
                                
                    </Picker>
                
                </View>

                <View style={styles1.view}>
                    <Text >De acordo com a unidade utilizada em receita informada acima, infome a quantidade por unidade informada. Exemplo:1 caixa de ovo tem 30 unidades, um pacote de farinha 1000g e etc...</Text>
                    <TextInput value={pesounidade} keyboardType='numeric' onChangeText={(value)=> setpesounidade(value)} placeholder='Ex.:Um pacote de farinha tem 5kg' style={[styles1.view2,{width:'90%'}]}/>
                
                </View>

                <View style={styles1.view}>
                    <Text >Custo por unidade(Ex.: Comprei 10 unidades, cada uma custou R$1,00)</Text>
                    <TextInput value={custo} keyboardType='numeric' onChangeText={(value)=> setcusto(value)} placeholder='R$' style={[styles1.view2,{width:'50%'}]}/>
                
                </View>

                <View style={{flexDirection:"row"}}>
                    <View style={[styles1.view,{width:'30%'}]}>
                        <Text >Estoque mínimo</Text>
                        <TextInput value={estoqueminimo} keyboardType='numeric' onChangeText={(value)=> setestoqueminimo(value)} placeholder='Ex.:10' style={styles1.view2}/>
                    
                    </View>
                    <View style={[styles1.view,{width:'40%',marginHorizontal:'10%'}]}>
                        <Text >Unidade</Text>
                        <Picker selectedValue={selectunidade3} onValueChange={(itemValue, itemIndex)=>setselect3(itemValue)} style={{ height: 50, width: 150 }}>
                            <Picker.Item label="unidade" value="unidade" />
                            <Picker.Item label="g" value="g" />
                            <Picker.Item label="kg" value="kg" />
                            <Picker.Item label="l" value="l" />
                            <Picker.Item label="ml" value="ml" />
                                
                        </Picker>
                    
                    </View>
                </View>
                

                <View >
                    <Button 
                        color="#00ccffff" 
                        title="Salvar"
                        onPress={()=>cadastrarestoque(user)}
                    />
                </View>
                
                <View style={[styles.ads,{marginTop:"7%"}]}>
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



export default Adiconarestoque