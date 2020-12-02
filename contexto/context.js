import React,{useState} from 'react';
import {LogBox} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Armazenamento=React.createContext()
import {firebase} from '../firebase/config'
import * as InAppPurchases from 'expo-in-app-purchases';


export function ArmazenamentoProvider({ children }) {
  const [logado,setlogado]=useState()
  const [user,setuser]=useState('lucasjordi24@gmailcom')
  const [password,setpass]=useState('')
  const [testaruser,settestaruser]=useState('')
  const [testarpass,settestarpass]=useState('')
  const [isloged,setloged]=useState()
  const [user3,setuser3]=useState()
  const [plan,setplan]=useState()
  const [fire,setfire]=useState()
  const [fichas,setfichas]=useState()
  const [todos,settodos]=useState();
  
  const pegar= async ()=>{

    try {
        await firebase.database().ref('Users/').on('value', (snapshot) => {
            const highscore = snapshot.val();
            const usuarios =Object.keys(highscore)
            settodos(usuarios)
            console.log(todos)
            
           
        })
        
          

          
          
          
          LogBox.ignoreLogs(['Setting a timer']);

    }catch(e){
        console.log('Sem usuários')

    }

   
}
  const assinatura=async ()=>{
    
    try  {
      setlogado(true)
      setuser3(await AsyncStorage.getItem('@usuario'))
      plano()
      pegar()
      
    }catch(e){console.log('ll')}
  }
  const logout=()=>{
    setlogado(false)
  }

 
    


  const plano= async ()=>{
     try {const usuario=(await AsyncStorage.getItem('@usuario'))
                
              await firebase.database().ref('Users/'+usuario).on('value',(snapshot)=>{
                setplan(snapshot.val().conta)
                
              })
              console.log(plan)
               
               
              LogBox.ignoreLogs(['Setting a timer']);
              
            }catch(e){
              console.log('er')
            }
            
  }


  
    
  return(  
    <Armazenamento.Provider value={{ logado,fire,todos,pegar,logout,plano,plan,assinatura,user,user3,password,setuser,isloged }}>
      {children}
    </Armazenamento.Provider>
  )  

};


export default Armazenamento