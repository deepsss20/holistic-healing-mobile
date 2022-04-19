import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import React, { useEffect } from "react"
import {View,Text, StyleSheet} from "react-native"
import { useDispatch } from "react-redux"
import { getUser } from "../../redux/actions/user.action"

const SplashScreen = ()=>{
    const navigation = useNavigation()
    const dispatch = useDispatch()
    useEffect(()=>{
        setTimeout(async()=>{
            const token = await AsyncStorage.getItem("access_token")
            if(token){
                dispatch(getUser())
                navigation.navigate("app")
            }
            else{
                navigation.navigate("login")
            }
        }, 1*1000)
    },[])
    return(
        <View style={styles.backgroundView}>
            <View>
            <Text style={styles.headerText}>Dr Lathashekhar's</Text>
            <Text style={styles.subHeaderText}>Holistic Healing</Text>
            </View>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    backgroundView:{
        display:"flex",
        flex:1,
        backgroundColor:"#eb9c4d",
        justifyContent:"center"
    },

    headerText:{
        textAlign:"center",
        display:"flex",
        fontSize:30,
        color:"black",
        fontWeight:"bold"
    },

    subHeaderText:{
        textAlign:"center",
        fontSize:25,
        color:"black",
        fontWeight:"bold"

    }
    
})