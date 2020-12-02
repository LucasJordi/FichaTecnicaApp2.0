import React, { useContext, useEffect,useMemo, useReducer, useState ,} from 'react';
import * as InAppPurchases from 'expo-in-app-purchases';
import { createDrawerNavigator, } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './telas/home'
import {CustomDrawerContent} from './telas/drawer'
import Estoque from './telas/estoque'
import {Adiconarestoque} from './telas/adiconarestoque'
import {Minhaconta} from './telas/minhaconta'
import {Ficha} from './telas/fichatecnica'
import {Adicionarficha} from './telas/adicionarficha'
import {Descartaveis} from './telas/descartaveis'
import {Adicionardescart} from './telas/adicionardesc'
import {Inicial} from './telas/inicio'
import {Login} from './telas/login'
import {Cadastro} from './telas/cadastro'
import {ArmazenamentoProvider} from "./contexto/context"
import Armazenamento from "./contexto/context"
import {Verestoque} from './telas/verestoque';
import {Verdesc} from './telas/verdesc';
import {Verficha} from './telas/verficha'
import {Sair} from './telas/sair'
import {Caixa} from './telas/caixa'
import {Produtos} from './telas/produtos'
import {Adicionarproduto} from './telas/adicionarproduto'
import {Verproduto} from './telas/verproduto'

const Drawer = createDrawerNavigator();
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default  function App(){
  
  
  return(
    
      <ArmazenamentoProvider>
        <Iniciar />
      </ArmazenamentoProvider>
        
        
        
        
        
      
    
  )
}

export const AuthContext = React.createContext();


export   function Iniciar() {
  
  const {logado,user3,pegar,plano,assinatura}=useContext(Armazenamento)
  

  useEffect(()=>{
    const auth = async ()=>{
      
      try{
        const usuario = await AsyncStorage.getItem('@usuario')
         if(usuario){
           assinatura()
           plano()
           
          
        }

      }catch(e){
        console.log('Erro assing')
      }
      
    }

    auth()
    
  },[])

  
  return (
    <NavigationContainer>

      

      
        <Drawer.Navigator  initialRouteName="Home" drawerStyle={{backgroundColor: '#f7f7f7ff'}} drawerContent={props => <CustomDrawerContent {...props} />} >
          
          {logado ?(
            <>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Minha conta" component={Minhaconta} />
            <Drawer.Screen name="Estoque" component={Estoque} />
            <Drawer.Screen name="Adicionar estoque" component={Adiconarestoque} />
            <Drawer.Screen name="Ficha técnica" component={Ficha} />
            <Drawer.Screen name="Adicionar ficha" component={Adicionarficha} />
            <Drawer.Screen name="Descartavel" component={Descartaveis} />
            <Drawer.Screen name="Adicionar descartavel" component={Adicionardescart} />
            <Drawer.Screen name="Ver estoque" component={Verestoque} />
            <Drawer.Screen name="Ver descartavel" component={Verdesc} />
            <Drawer.Screen name="Ver ficha" component={Verficha} />
            <Drawer.Screen name="Sair" component={Sair} />
            <Drawer.Screen name="Caixa" component={Caixa} />
            <Drawer.Screen name="Produtos" component={Produtos} />
            <Drawer.Screen name="Adicionar produto" component={Adicionarproduto} />
            <Drawer.Screen name="Ver produto" component={Verproduto} />
            
          </>
          ):(
            <>
                <Drawer.Screen options={{gestureEnabled:false}} name="Inicial"  component={Inicial} />
                      
                <Drawer.Screen options={{gestureEnabled:false}} name="Login" component={Login} />
                <Drawer.Screen options={{gestureEnabled:false}} name="Cadastro" component={Cadastro} />
              
              
              
            </>
          )}
          
         
          
          
          
        </Drawer.Navigator>
      
    </NavigationContainer>
    
  );
}








