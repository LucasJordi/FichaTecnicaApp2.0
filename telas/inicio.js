import * as React from 'react';
import {styles} from '../estilos/global'

import { ScrollView,View,Alert,Animated,StyleSheet,Modal,Dimensions,FlatList,Text,Image} from 'react-native';


import {Barra} from '../globais/barra'
import { TouchableOpacity } from 'react-native-gesture-handler';


export function Inicial({ navigation }) {
    const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
    const scale = React.useRef(new Animated.Value(1)).current
    const [scrollX,setscrollX]=React.useState(0)
    const scaleon=()=>{
        Animated.sequence([
            Animated.timing(scale,{
                toValue: 0.7,
                duration: 200,
                useNativeDriver:true
            }),
            Animated.timing(scale,{
                toValue: 1,
                duration: 200,
                useNativeDriver:true
            })
        ]).start()
    }
    
    const [screens,setscreens]=React.useState([
        {color:'#00ccffff',image:require('../imagens/slider1.png'),key:"1"},
        {color:'#fdb800ff',image:require('../imagens/slider2.png'),key:"2"},
        {color:'#de0302ff',image:require('../imagens/slider3.png'),key:"3"}
    ])
    return (
      
      <>
        
            
        <FlatList 
            horizontal
            scrollEventThrottle={32}
            onScroll={(event)=>{
                const div=event.nativeEvent.contentOffset.x/event.nativeEvent.layoutMeasurement.width
                const roundIndex = Math.round(div)
                
                setscrollX(roundIndex)
                
            
            
            }
                
                

            }
           
            pagingEnabled
            data={screens}
            onScrollBeginDrag={()=>scaleon()}
            keyExtractor={(item)=>item.key}
            renderItem={({item})=>(
                <View  style={{width:windowWidth,height:windowHeight,justifyContent:'flex-start',backgroundColor:item.color,alignItems:"center"}} >
                    
                    <Animated.Image style={{resizeMode:"contain",transform:[{scale}],width:windowWidth*0.7,height:windowHeight*0.7}} source={item.image}/>
                    
                </View>
                
            )}
            
        
        />
            <View style={{position:'absolute',bottom:50,justifyContent:'center',flexDirection:'row',width:"100%"}}>
                {screens.map((_,i)=>{
                    return (<View 
                        
                        key={`indicator- ${i}`}
                        style={[
                            scrollX===i
                            ? styles3.pagin
                            : styles3.pagout,
                        
                        ]}
                    
                    /> )
                }
                
                )}
            </View>
          
            <View style={{position:'absolute',justifyContent:'center',alignItems:'center',width:'100%',bottom:'5%'}} >
               
                <TouchableOpacity onPress={()=>navigation.navigate('Cadastro')} style={{justifyContent:"center",width:150,height:50, borderWidth:1,borderColor:'white'}}>
                                <Text style={{textAlign:"center",color:'white'}}>CRIAR CONTA</Text>

                </TouchableOpacity>
                <TouchableOpacity style={{marginVertical:"10%"}} onPress={()=>{navigation.navigate('Login')}
                    }>
                    <Text style={{textAlign:"center",color:'white',fontSize:12}}>FAZER LOGIN</Text>

                </TouchableOpacity>
            </View>
            
            
        
     </>

        

        
    );
}


export const styles3 = StyleSheet.create({
    pagin:{
        height:10,
        width:10,
        borderRadius:5,
        borderColor:'white',
        marginHorizontal:'5%',
        borderWidth:1,
        backgroundColor:'white'
        
        
    },
    pagout:{
        height:10,
        width:10,
        borderRadius:5,
        borderColor:'white',
        marginHorizontal:'5%',
        borderWidth:1,
        
    }
})


export default Inicial