import React from "react"
import {Text,StyleSheet,View,ActivityIndicator} from "react-native"

const PageLoader = ()=>{
    return(
        <View style={styles.viewText}>
            <View style={styles.loaderView}>
            <ActivityIndicator color="white"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewText:{
        display:"flex",
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    loaderView:{
        height:30,
        width:30,
        backgroundColor:"black",
        borderRadius:30,
        paddingTop:5
    }
})

export default PageLoader