import  React,{useState,useEffect} from 'react';
import {styles} from '../estilos/global'

import { View,SafeAreaView,Button,Alert,ScrollView,TextInput,StyleSheet,Text,Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {firebase} from '../firebase/config';
import {Barra} from '../globais/barra'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Verdesc({ navigation,route }) {
    const { item } = route.params;
    const[select,setselect]=useState('');
    const [nome,setnome]=useState('');
    const [quantidade,setquantidade]=useState('');
    const [valor,setvalor]=useState('');
    const [user,setuser]=useState();
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
            imagem:'../imagens/unknow3.png'
            

            

          });
       
           
            
        Alert.alert('Item alterado!')
        navigation.goBack()
     }catch(e){
            console.log("Erro")
        }

    }
    
    useEffect(()=>{
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

    },[item])
    return (
      <View style={[styles.container,{height:"50%"}]}>
        <Barra name={()=>navigation.openDrawer()}/>


        <View style={styles1.scroll}>
            <ScrollView>
              
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={[styles1.view]}>
                       
                        <Image  source={require('../imagens/unknow3.png')} />
                    
                    </View>

                    
                    

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