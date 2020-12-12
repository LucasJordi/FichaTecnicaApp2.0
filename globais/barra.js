import * as React from 'react';
import {styles} from '../estilos/global'
import { View,Text,Image,TouchableOpacity} from 'react-native';



export function Barra({ navigation,name }) {
    return (
      
        <View style={{backgroundColor:'#ffffffff',alignItems:"flex-start",height:80 ,elevation:5,justifyContent:'center'}}>
            <TouchableOpacity onPress={name} style={{left:'20%',top:10, flexDirection:'row'}}>
                <Image  source={require('../imagens/hamb.png')} />
                <Text style={{fontSize:20,marginHorizontal:'5%'}}>Gerencie sua cozinha</Text>
            </TouchableOpacity>
            
        </View>
      
    );
}
