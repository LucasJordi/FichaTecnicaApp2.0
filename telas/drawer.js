import React,{useState,useRef, useContext} from 'react';
import { createDrawerNavigator,DrawerItem,DrawerContentScrollView,
DrawerItemList,
} from '@react-navigation/drawer';
import {Armazenamento} from '../contexto/context'
import {ArmazenamentoProvider} from '../contexto/context'

import { View,StyleSheet,NativeModules,Animated,Text,Image,TouchableOpacity} from 'react-native';
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';
import {styles} from '../estilos/global'
import AsyncStorage from '@react-native-async-storage/async-storage';
export function CustomDrawerContent({props,navigation}) {
    const [index,setindex]=useState(0)
    const [opacity,setopacity]=useState(0)
    const [index1,setindex1]=useState(0)
    const [opacity1,setopacity1]=useState(0)
    const fadeAnim = useRef(new Animated.Value(0)).current
    const {logout}=useContext(Armazenamento)
   
    const acord=(h,o,value,index)=>{
      if(index==0){
        h(value)
        o(1)
      }else{
        h(0)
        o(0)
      }
    }
    return (
      <DrawerContentScrollView {...props}>
        <View style={{alignItems:'flex-start'}}>

          <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles1.menu}>
              <Image style={styles.imagemenu} source={require('../imagens/paginici.png')}/>
              <Text>Página inicial</Text>
          </TouchableOpacity >
          <TouchableOpacity onPress={()=>navigation.navigate('Minha conta')} style={styles1.menu}>
              <Image style={styles.imagemenu} source={require('../imagens/minhaconta.png')}/>
              <Text>Minha conta</Text>
          </TouchableOpacity >
          <View >
            <TouchableOpacity onPress={()=>acord(setindex,setopacity,100,index)} style={styles1.menu}>
                <Image style={styles.imagemenu} source={require('../imagens/estoque.png')}/>
                <Text>Estoque</Text>
            </TouchableOpacity >
            <View style={{left:"10%",height:index}}>
              <TouchableOpacity onPress={()=>navigation.navigate('Estoque')} style={styles1.menu}><Text style={{opacity:opacity}}>Matérias primas</Text></TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate('Descartavel')} style={styles1.menu}><Text style={{opacity:opacity}}>Descartáveis</Text></TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate('Produtos')} style={styles1.menu}><Text style={{opacity:opacity}}>Produtos finais</Text></TouchableOpacity>

            </View>
            
          </View>
          
          <TouchableOpacity onPress={()=> navigation.navigate('Ficha técnica')} style={styles1.menu}>
              <Image style={styles.imagemenu} source={require('../imagens/ficha.png')}/>
              <Text>Ficha técnica</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate('Caixa')} style={styles1.menu}>
              <Image style={styles.imagemenu} source={require('../imagens/caixa.png')}/>
              <Text>Caixa</Text>
          </TouchableOpacity >
          <TouchableOpacity style={styles1.menu}>
              <Image style={styles.imagemenu} source={require('../imagens/calculadora.png')}/>
              <Text>Calculadora</Text>
          </TouchableOpacity >
          <View>
            <TouchableOpacity onPress={()=>acord(setindex1,setopacity1,30,index1)} style={styles1.menu}>
                <Image style={styles.imagemenu}source={require('../imagens/indic.png')}/>
                <Text>Indicação</Text>
            </TouchableOpacity>
            <View style={{left:"10%",height:index1}}>
              <TouchableOpacity><Text style={{opacity:opacity1}}>Cursos, apostilas, eBooks...</Text></TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles1.menu}>
              <Image style={styles.imagemenu} source={require('../imagens/inform.png')}/>
              <Text>Informações</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=>{ 
              AsyncStorage.removeItem('@usuario')
              navigation.navigate('Sair')
              }} 
              style={styles1.menu}>
                <Image style={[styles.imagemenu,{height:25,width:25}]} source={require('../imagens/sair.png')}/>
              
              <Text style={{marginLeft:'5%'}}>Sair da conta</Text>
          </TouchableOpacity>
          
          

          
          
        </View>
      </DrawerContentScrollView>
    );
  }

export function NewDrawer(){
  return(
  <ArmazenamentoProvider>
    <CustomDrawerContent />
  </ArmazenamentoProvider>)
}


  export const styles1 = StyleSheet.create({
    
    menu: {
      marginVertical:'5%',
      marginHorizontal:'2%',
      flexDirection:'row',
      alignItems:'center'
      
      
      
      
      
    },
   
  });  