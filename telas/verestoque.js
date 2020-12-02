import  React,{useState,Component,useEffect,useContext} from 'react';
import {styles} from '../estilos/global'

import { View,Alert,Button,ScrollView,TextInput,StyleSheet,Text,Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import {Barra} from '../globais/barra'

import {Armazenamento} from '../contexto/context';
import {firebase} from '../firebase/config'

import AsyncStorage from '@react-native-async-storage/async-storage';


export function Verestoque({ navigation,route }) {
    const { item } = route.params;
    
    
    const [user,setuser] = useState();
    const[selectunidade,setselect]=useState();
    const[selectunidade2,setselect2]=useState();
    const[selectunidade3,setselect3]=useState();
    const[nome,setnome]=useState();
    const[marca,setmarca]=useState();
    const[quantidade,setquantidade]=useState();
    const[pesounidade,setpesounidade]=useState();
    const[custo,setcusto]=useState();
    const[estoqueminimo,setestoqueminimo]=useState();
    const[num,setnumero]=useState();
    
    
    const deletar= async()=>{
        try{
            const usuario= await AsyncStorage.getItem('@usuario')
           await firebase.database().ref('Users/'+usuario+'/estoquemat/'+item.id).remove()
           navigation.goBack()
        }catch(e){
            console.log('Erro')
        }
    }
    
    const vernome=()=>{
        Alert.alert(nome)
    }
    useEffect(()=>{
        const base=async()=>{
            const usuario = await AsyncStorage.getItem('@usuario')
            setuser(usuario)
        }
        base()
        setnome(item.nome)
        setselect(item.unidade);
        setselect2(item.unidadereceita);
        setselect3(item.unidaeminima);
        
        setmarca(item.marca);
        setquantidade(item.quantidade);
        setpesounidade(item.pesounidade);
        setcusto(item.custounidade);
        setestoqueminimo(item.estoqueminimo);
    
        
    },[item])

    function atualizar(userId) {
        
        firebase
          .database()
          .ref('Users/'+userId+'/estoquemat/'+item.id)
          .set({
            
            nome: nome,
            marca: marca,
            quantidade: quantidade,
            unidade: selectunidade,
            unidadereceita:selectunidade2,
            unidaeminima:'unidade',
            pesounidade:pesounidade,
            custounidade:custo,
            estoqueminimo:estoqueminimo,
            imagem:'../imagens/unknow3.png'

            

          });
        
        Alert.alert('Item alterado')
        navigation.goBack()

    }

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
                    <View style={[styles1.view]}>
                       
                        <Image  source={require('../imagens/unknow3.png')} />
                    
                    </View>

                    
                    

                </View>
                <View>
                    <Button 
                        color="#00ccffff" 
                        title="Apagar"
                        onPress={()=>Alert.alert('Remover dados','Deseja remover item?',[{text:'Sim',onPress:()=>deletar()},{text:'Cancelar'}])}
                        
                    />

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
                        
                        <Picker selectedValue={selectunidade}   onValueChange={(itemValue, itemIndex)=>{setselect(itemValue)}} style={{ height: 50, width: 150,backgoundColor:'gray' }}>
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
                    <Text >Peso do pacote por unidade (De acordo com a unidade utilizada em receita informada acima.)</Text>
                    <TextInput value={pesounidade} keyboardType='numeric' onChangeText={(value)=> setpesounidade(value)} placeholder='Ex.:Um pacote de farinha tem 5kg' style={[styles1.view2,{width:'90%'}]}/>
                
                </View>

                <View style={styles1.view}>
                    <Text >Custo por unidade(Ex.: Comprei 10 unidades, cada uma custou R$1,00)</Text>
                    <TextInput value={custo} keyboardType='numeric' onChangeText={(value)=> setcusto(value)} placeholder='R$' style={[styles1.view2,{width:'50%'}]}/>
                
                </View>

                <View style={{flexDirection:"row"}}>
                    <View style={[styles1.view,{width:'30%'}]}>
                        <Text >Estoque mínimo</Text>
                        <TextInput  value={estoqueminimo} keyboardType='numeric' onChangeText={(value)=> setestoqueminimo(value)} placeholder='Ex.:10' style={styles1.view2}/>
                    
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
                        onPress={()=>Alert.alert('Deseja salvar as alterações?','',[{text:'Sim',onPress:()=>atualizar(user)},{text:'Cancelar'}])}
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



