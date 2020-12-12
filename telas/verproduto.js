import  React,{useState,useContext,useEffect} from 'react';
import {styles} from '../estilos/global';
import Constants from 'expo-constants';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';
import { View,FlatList,Alert,Modal,Button,TouchableHighlight,ScrollView,TextInput,StyleSheet,LogBox,Text,Image} from 'react-native';
import {firebase} from '../firebase/config'

import {Barra} from '../globais/barra'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Armazenamento} from '../contexto/context'
import AsyncStorage from '@react-native-async-storage/async-storage';




export function Verproduto({ navigation,route }) {
    const { item } = route.params;
    const[select,setselect]=useState()
    const[openmodal,setmodalopen]=useState(false)
    const [quantidadereceita,setquantidadereceita]=useState()
    const [pesopreparacao,setpreparacao]=useState()
    const [pesoporc,setporc]=useState()
    const [nomereceita,setnomereceita]=useState()
    const [quantidadeestoque,setquantidadeestoque]=useState()
    const [hh,sethh]=useState()
    const [hora,sethora]=useState()
    
    const [estoquemat,setestoquemat]=useState();
    const [ficha,setficha]=useState([]);
    var li=[]
    var valortotal=[]
    const [user,setuser]=useState()
    const deletando= async()=>{
        try{
            const usuario= await AsyncStorage.getItem('@usuario')
           await firebase.database().ref('Users/'+usuario+'/produtos/'+item.id).remove()
           navigation.goBack()
        }catch(e){
            console.log('Erro')
        }
    }
    const total=()=>{
        var tot=0
        
        try{if(ficha.length==0){
            return ''
        }else{
            ficha.forEach((child)=>{
                tot=child.valor+tot

            }
               

            )
            return parseFloat(tot).toFixed(2)
        }}catch(e){
            console.log('erro')
        }
    }
    
    const custoporc=()=>{
        var b=total()/quantidadeestoque
        if(b){
            return b.toFixed(1)

        }else{
            return ''
        }
        
    }
    const valorsugerido=()=>{
        var sugerido=(parseFloat(total())+(hh*hora))/quantidadeestoque
        return sugerido.toFixed(2)
    }
    const deletar=(key)=>{
        setficha((ficha)=>{
            return ficha.filter(todo=>todo.id != key)
        })
    }
    
    useEffect(()=>{
        
         const base=async()=>{
            const usuario = await AsyncStorage.getItem('@usuario')
            setuser(usuario)
             await firebase.database().ref('Users/'+usuario+'/ficha').on('value', (snapshot) =>{
            
            li.length=0
            snapshot.forEach((child)=>{
                li.push({
                    id:child.key,
                    nomedareceita: child.val().nomedareceita ,
                    custodareceita: child.val().custodareceita,
                    pesoprepara: child.val().pesoprepara,
                    pesodaporc: child.val().pesodaporc,
                    porcoes: child.val().porcoes,
                    custoporporc: child.val().custoporporc,
                    custoporkg: child.val().custoporkg,
                    
                        
                })
            })
            setestoquemat(li)
            LogBox.ignoreLogs(['Setting a timer']);
            

        })}
        base()
        
    
       
        setnomereceita(item.nomedareceita)
        setquantidadeestoque(item.quantidade)
        sethh(item.valorhh)
        sethora(item.tempodepreparo)
        setficha(item.ingredientes)
        console.log(quantidadeestoque)
    },[item])
    function atualizar(userId) {
        
        firebase
          .database()
          .ref('Users/'+userId+'/produtos/'+item.id)
          .set({
            
            nomedareceita: nomereceita,
            custototal: total(),
            
            quantidade: quantidadeestoque,
            valorhh:hh,
            valorsuge:valorsugerido(),
            tempodepreparo:hora,
            
            
            
            ingredientes:ficha



            

          });
        
        Alert.alert('Item cadastrado')
        navigation.goBack()

    }
    return (
      <View style={[styles.container,{height:"50%"}]}>
        <Barra name={()=>navigation.openDrawer()}/>
        
        <Modal  
            visible={openmodal}
            transparent={true}
            animationType="slide"

            
            
        >
            <View style={{top:180,alignItems:'center',backgroundColor:'#ececec',width:"100%",height:"100%",borderTopLeftRadius:20,borderTopRightRadius: 20,}}>
                <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" onPress={()=>{setmodalopen(!openmodal)}}>
                    <Text style={{fontSize:30}}>X</Text>
                </TouchableHighlight>
                <View style={{top:20,width:'100%',height:"50%"}}>
                    
                    <FlatList 
                        ListFooterComponent={
                            <>
                              <View style={[styles.ads,{marginTop:"7%"}]}>
                                <AdMobBanner
                                bannerSize="fullBanner"
                                adUnitID="ca-app-pub-3107661564294379/9507690326" // Test ID, Replace with your-admob-unit-id
                                 />
                              </View>
                             
              
                              
                              
                            </>
                          }
                        data={estoquemat}
                        keyExtractor={item=>item.id}
                        renderItem={({item})=>(
                            <View style={{width:'100%',height:130,backgroundColor:'#ccccccff',borderRadius:20,marginVertical:"1%"}}>
                            

                                <TouchableHighlight activeOpacity={0.6}  underlayColor="#ececec" >
                                    <Text style={{marginLeft:"10%",fontSize:20}}>{item.nomedareceita}</Text>
                                    
                                </TouchableHighlight>
                                <View style={{alignItems:'center'}}>
                                    <TextInput keyboardType="numeric" placeholder='Quantidade em gramas' onChangeText={(value)=>setquantidadereceita(value.replace(',','.'))}  style={{borderBottomWidth:1,height:50,width:80 ,fontSize:15,marginBottom:'2%'}} />         
                                    <View style={{justifyContent:"center",width:'50%'}}>
                                        <Button  title="Adicionar"
                                            onPress={()=>{
                                                Alert.alert('Adicionado!')
                                                setficha([...ficha,{id:item.id,nome:item.nomedareceita,quantidade:quantidadereceita,valor:item.custoporkg*quantidadereceita/1000}])}} style={{justifyContent:"center",marginVertical:'3%',backgroundColor:'#ccccccff',borderRadius:10,width:'100%',height:50}}
                                        
                                        />
                                    </View>
                                    
                                </View>

                                
                                
                            </View> 
                        )}
                    
                    />

                </View>
                
            </View>

        </Modal>


        <View style={styles1.scroll}>
            <FlatList  
                ListFooterComponent={
                    <>
                      <View style={[styles.ads,{marginTop:"7%"}]}>
                        <AdMobBanner
                        bannerSize="fullBanner"
                        adUnitID="ca-app-pub-3107661564294379/9507690326" // Test ID, Replace with your-admob-unit-id
                         />
                      </View>
                     
      
                      
                      
                    </>
                  }    
                ListHeaderComponent=
                {
                <>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                        <View style={[styles1.view]}>
                        
                            <Image  source={require('../imagens/unknow3.png')} />
                        
                        </View>

                        
                        

                    </View>
                    <Button 
                        color="#00ccffff" 
                        title="Apagar"
                        onPress={()=>Alert.alert('Remover dados','Deseja remover item?',[{text:'Sim',onPress:()=>deletando()},{text:'Cancelar'}])}
                        
                    />
                    
                    <View style={styles1.view}>
                        <Text >Nome da receita:</Text>
                        <TextInput value={nomereceita} onChangeText={(value)=>{setnomereceita(value)}} placeholder='Ex.: Massa de bolo, recheio, brigadeiro' style={styles1.view2}/>
                    
                    </View>
                    <View style={styles1.view}>
                        <Text >Quantidade em estoque (Porções):</Text>
                        <TextInput value={quantidadeestoque} keyboardType='numeric'  onChangeText={(value)=>setquantidadeestoque(value)} placeholder='...' style={styles1.view2}/>
                    
                    </View>

                    
                        <View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#fdb800ff',}}>
                            <Text style={[styles.textgeneral]}>Item da receita</Text>
                            <Text style={styles.textgeneral}>Quantidade</Text>
                            <Text style={styles.textgeneral}>Valor(R$)</Text>
                        </View>
                        </>
                        }
                     
                        data={ficha}
                        keyExtractor={item=>item.id}
                        renderItem={({item})=>(

                            <View style={{flexDirection:'row',width:'100%',borderBottomWidth:1,borderColor:'#fdb800ff'}}>
                                 
                                 <TouchableOpacity onPress={()=>{Alert.alert('','Deseja remover '+item.nome+'?',[{text:"Sim",onPress:()=>deletar(item.id)},{text:"Cancelar"}])}}><Text style={[styles.textgeneral,{width:100}]}>{item.nome}</Text></TouchableOpacity>
                                 <TouchableOpacity><Text style={[styles.textgeneral,{width:60}]}>{item.quantidade+' '+'g'}</Text></TouchableOpacity>
                                 <TouchableOpacity><Text style={styles.textgeneral}>{item.valor.toFixed(2).replace('.',',')}</Text></TouchableOpacity>
                            </View>
                            
                        )}
                    
                    
                
                ListFooterComponent=
                
                {
                <>
                <View style={{alignItems:'flex-end',marginVertical:20}}>
                    <TouchableOpacity onPress={()=>setmodalopen(true)} style={{alignItems:'center',justifyContent:'center',backgroundColor:'#00ccffff',width:100,height:30}}>
                        <Text>Adicionar</Text>
                    </TouchableOpacity>
                </View>
                


                <View style={{marginTop:20,flexDirection:"column"}}>

                    
                    
                    <View style={{marginTop:"5%",alignItems:'center',justifyContent:'center',backgroundColor:"#90e8ffff",width:"100%",height:60}}>
                        
                        <View style={{flexDirection:"row"}}>
                            
                            <View style={{flexDirection:"column"}}>
                                <Text style={styles1.text}>Custo por porção:</Text>
                                <Text style={styles1.text1}>{'R$ '+custoporc().replace('.',',')}</Text>
                            </View>
                            <View style={{flexDirection:"column"}}>
                                <Text style={styles1.text}>Valor total :</Text>
                                <Text style={styles1.text1}>{'R$ '+total().replace('.',',')}</Text>
                            </View>
                            
                            

                        </View>

                       
                        
                        
                    </View>
                    <View >
                        <View style={{width:'100%'}}>
                            <Text>Valor da sua hora de trabalho</Text>
                            <View style={{flexDirection:'row'}}>
                                <TextInput value={hh} keyboardType='numeric'  onChangeText={(value)=>{sethh(value.replace(',','.'))}} style={styles.view2} placeholder="Ex.: 10"/>
                               
                            </View>
                            
                        </View>

                        <View style={{width:'100%'}}>
                            <Text>Tempo em horas para confecção do produto</Text>
                            <View style={{flexDirection:'row'}}>
                                <TextInput value={hora} keyboardType='numeric'  onChangeText={(value)=>{sethora(value.replace(',','.'))}} style={styles.view2} placeholder="Ex.: 10"/>
                                
                            </View>
                            
                        </View>

                       
                    </View>
                    <View style={{marginTop:"5%",alignItems:'center',justifyContent:'center',backgroundColor:"#fdb800ff",width:"100%",height:60}}>
                        
                        <View style={{flexDirection:"row"}}>
                            <View style={{flexDirection:"column"}}>
                                <Text style={[styles1.text,{width:'90%',textAlign:'center'}]}>Preço sugerido por porção</Text>
                                <Text style={[styles1.text1,{width:'90%',textAlign:'center'}]}>{'R$ '+valorsugerido().replace('.',',')}</Text>
                            </View>
                            
                            
                            
                            

                        </View>

                       
                        
                        
                    </View>
                    <View style={{alignItems:'center',marginTop:20}}>
                            <TouchableOpacity onPress={()=> Alert.alert('Deseja salvar as alterações?','',[{text:'Sim',onPress:()=>atualizar(user)},{text:'Cancelar'}])} style={{alignItems:'center',justifyContent:'center',backgroundColor:'#00ccffff',width:100,height:30}}>
                                <Text>Salvar</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            </>    
            }
                

            />   
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
    },
    text:{
        fontSize:12,
        color:"gray",
        marginHorizontal:'2%'
    },
    text1:{
        fontSize:20,
        color:"black",
        marginHorizontal:'2%'
    }
   
  });  



export default Verproduto