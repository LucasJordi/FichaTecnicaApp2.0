import  React,{useState,useContext,useEffect} from 'react';
import {styles} from '../estilos/global'
import * as ImagePicker from 'expo-image-picker';
import { View,FlatList,Alert,Modal,Button,TouchableHighlight,ImageBackground,ScrollView,TextInput,StyleSheet,LogBox,Text,Image} from 'react-native';
import {firebase} from '../firebase/config'
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';
import {Barra} from '../globais/barra'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Armazenamento} from '../contexto/context'
import AsyncStorage from '@react-native-async-storage/async-storage';




export function Adicionarficha({ navigation }) {
    const[select,setselect]=useState('');
    const[openmodal,setmodalopen]=useState(false);
    const [quantidadereceita,setquantidadereceita]=useState(0);
    const [pesopreparacao,setpreparacao]=useState('');
    const [pesoporc,setporc]=useState('');
    const {plan,fire,user3}=useContext(Armazenamento);
    const [nomereceita,setnomereceita]=useState('');
    const[imagem,setimagem]=useState('/');
    
    const [estoquemat,setestoquemat]=useState('');
    const [ficha,setficha]=useState([]);
    var li=[]
    var valortotal=[]
    const [user,setuser]=useState('')
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
    const total=()=>{
        var tot=0
        
        try{if(ficha.length==0){
            return ''
        }else{
            ficha.forEach((child)=>{
                tot=child.todosvalores+tot

            }
               

            )
            return tot.toFixed(2)
        }}catch(e){
            return ''
        }
    }
    const numeroporc=()=>{
        var a =pesopreparacao/pesoporc
        if(a){
            return a.toFixed(0)

        }else{
            return ''
        }
        
    }
    const custoporc=()=>{
        var b=total()/numeroporc()
        if(b){
            return b.toFixed(2)

        }else{
            return ''
        }
        
    }
    const custokg=()=>{
        var c=pesopreparacao/1000
        var m=total()/c
        if(m){
            return m.toFixed(2)
        }else{
            return ''
        }
        
    }
    const deletar=(key)=>{
        setficha((ficha)=>{
            return ficha.filter(todo=>todo.id != key)
        })
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
        
         const base=async()=>{
            
            setuser(user3)
              firebase.database().ref('Users/'+user3+'/estoquemat').on('value', (snapshot) =>{
            
            li.length=0
            snapshot.forEach((child)=>{
                li.push({
                    id:child.key,
                    nome: child.val().nome,
                    marca: child.val().marca,
                    quantidade: child.val().quantidade,
                    unidade: child.val().unidade,
                    unidadereceita:child.val().unidadereceita,
                    unidaeminima:child.val().unidademinima,

                    pesounidade:child.val().pesounidade,
                    custounidade:child.val().custounidade,
                    estoqueminimo:child.val().estoqueminimo,
                    imagem:child.val().imagem
                })
            })
            setestoquemat(li)
            LogBox.ignoreLogs(['Setting a timer']);
            

        })}
        base()
    },[])
    function cadastrarficha(userId) {
        
        firebase
          .database()
          .ref('Users/'+userId+'/ficha')
          .push({
            
            nomedareceita: nomereceita,
            custodareceita: total(),
            pesoprepara: pesopreparacao,
            pesodaporc: pesoporc,
            porcoes: numeroporc(),
            custoporporc: custoporc(),
            custoporkg: custokg(),
            ingredientes:ficha,
            imagem:imagem



            

          });
          setquantidadereceita(0)
          setpreparacao('')
          setporc('')
          setnomereceita('')
          setficha('')
          setimagem('/')
          
          
          
          Alert.alert('Item cadastrado')
          navigation.navigate('Ficha técnica')

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
                                    <Text style={{marginLeft:"10%",fontSize:20}}>{item.nome+" "+item.pesounidade+item.unidadereceita}</Text>
                                    
                                </TouchableHighlight>
                                <View style={{alignItems:'center'}}>
                                    <TextInput keyboardType="numeric"  onChangeText={(value)=>setquantidadereceita(value.replace(',','.'))} placeholder={'Quantidade '+item.unidadereceita} style={{borderBottomWidth:1,height:50 ,fontSize:15,marginBottom:'1%'}} />         
                                    <View style={{justifyContent:"center",width:'50%'}}>
                                        <Button  title="Adicionar"
                                            onPress={()=>{
                                                
                                                Alert.alert('Adicionado!')
                                                setficha([...ficha,{id:item.id+ficha.length,nome:item.nome+' '+item.unidadereceita,quantidade:item.pesounidade,custo:item.custounidade.replace(',','.'),quantidadereceita:quantidadereceita,todosvalores:(parseFloat(item.custounidade)*parseFloat(quantidadereceita))/parseFloat(item.pesounidade)}])}} style={{justifyContent:"center",marginVertical:'3%',backgroundColor:'#ccccccff',borderRadius:10,width:'100%',height:50}}
                                        
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
                        <TouchableOpacity onPress={()=>pickImage()} style={[styles1.view]}>
                            <ImageBackground  style={{width:345,height:157}} source={require('../imagens/unknow3.png')}>
                                <Image style={{width:345,height:157}} source={{uri:imagem}} />
                            </ImageBackground>
                        
                            
                        
                        </TouchableOpacity>

                        
                        

                    </View>
                    
                    <View style={styles1.view}>
                        <Text >Nome da receita</Text>
                        <TextInput value={nomereceita} onChangeText={(value)=>{setnomereceita(value)}} placeholder='Ex.: Massa de bolo, recheio, brigadeiro' style={styles1.view2}/>
                    
                    </View>
                    

                    
                        <View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#fdb800ff',}}>
                            <Text style={[styles.textgeneral]}>Ingrediente</Text>
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
                                 <TouchableOpacity><Text style={[styles.textgeneral,{width:60}]}>{item.quantidadereceita}</Text></TouchableOpacity>
                                 <TouchableOpacity><Text style={styles.textgeneral}>{item.todosvalores.toFixed(2).replace('.',',')}</Text></TouchableOpacity>
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
                <View style={{alignItems:'center',justifyContent:'center',backgroundColor:"#fdb800ff",width:"100%",height:60}}>
                    <Text style={{color:'gray'}}>Custo Total da receita</Text>
                    <Text style={{color:'white'}}>{'R$ '+total().replace('.',',')}</Text>
                </View>


                <View style={{marginTop:20,flexDirection:"column"}}>

                    <View >
                        <View style={{width:'100%'}}>
                            <Text>Peso total da preparação(g)</Text>
                            <View style={{flexDirection:'row'}}>
                                <TextInput keyboardType='numeric' value={pesopreparacao} onChangeText={(value)=>{setpreparacao(value)}} style={styles.view2} placeholder="Ex.: 10"/>
                                <TextInput style={[styles.view2,{left:'600%'}]} placeholder="g"/>
                            </View>
                            
                        </View>

                        <View style={{width:'100%'}}>
                            <Text>Peso total da porção(g)</Text>
                            <View style={{flexDirection:'row'}}>
                                <TextInput keyboardType='numeric' value={pesoporc} onChangeText={(value)=>{setporc(value)}} style={styles.view2} placeholder="Ex.: 10"/>
                                <TextInput style={[styles.view2,{left:'600%'}]} placeholder="g"/>
                            </View>
                            
                        </View>

                       
                    </View>
                    
                    <View style={{marginTop:"5%",alignItems:'center',justifyContent:'center',backgroundColor:"#90e8ffff",width:"100%",height:60}}>
                        
                        <View style={{flexDirection:"row"}}>
                            <View style={{flexDirection:"column"}}>
                                <Text style={styles1.text}>Número de porções</Text>
                                <Text style={styles1.text1}>{numeroporc()}</Text>
                            </View>
                            <View style={{flexDirection:"column"}}>
                                <Text style={styles1.text}>Custo por porção</Text>
                                <Text style={styles1.text1}>{'R$ '+custoporc().replace('.',',')}</Text>
                            </View>
                            <View style={{flexDirection:"column"}}>
                                <Text style={styles1.text}>Custo por kg</Text>
                                <Text style={styles1.text1}>{'R$ '+custokg().replace('.',',')}</Text>
                            </View>
                            
                            

                        </View>

                       
                        
                        
                    </View>
                    <View style={{alignItems:'center',marginTop:20}}>
                            <TouchableOpacity onPress={()=>cadastrarficha(user)} style={{alignItems:'center',justifyContent:'center',backgroundColor:'#00ccffff',width:100,height:30}}>
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



export default Adicionarficha