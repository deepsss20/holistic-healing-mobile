import React from "react"
import {Text, View, StyleSheet,TouchableWithoutFeedback,ActivityIndicator} from "react-native"

const ActionButton = ({title,onPress,disabled,loading})=>{
    return(
        <TouchableWithoutFeedback disabled={disabled||loading} onPress={()=>{
            onPress()
        }}>
            <View style={disabled||loading ? {...styles.LoginButtonText, ...styles.disabledBorderText}:styles.LoginButtonText}>
                <Text style={disabled||loading ? styles.disabledText: styles.text}>{title}</Text>
                {loading && <ActivityIndicator/>}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    text: {
        fontWeight:"bold",
        color:"black"
    },
    
    disabledText:{
        fontWeight:"bold",
        color:"grey"
    },

    disabledBorderText:{
        borderColor:"grey"
    },
    LoginButtonText:{
        display:"flex",
        justifyContent:"center",
        color:"black",
        borderWidth:1,
        border:10,
        width:355,
        height:50,
        marginLeft:20,
        alignItems:"center",
        marginTop:100,
        borderRadius:10,
        flexDirection:"row"
    }
})

export default ActionButton