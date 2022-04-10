import React from "react"
import {Text,View,StyleSheet,TextInput} from "react-native"

const InputField = ({
    title, 
    placeholder, 
    name, 
    onChange,
    validator,
    value,
    onError,
    isError, 
    errorMessage,
     ...rest
    })=>{
    const onFieldChange=(e)=>{
        onChange(e, name)
    }

    const onBlur=()=>{
        if(validator && !validator(value)){
            onError(name)
        }
    }
  
    return(
        <View style={styles.loginView}>
            <Text style={styles.phoneText}>{title}</Text>
                <TextInput style={styles.loginText}
                    placeholder={placeholder}
                    onChangeText={(e)=> onFieldChange(e)}
                    onBlur={onBlur}
                    {...rest}
            />
            {isError && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>
    )

}

const styles = StyleSheet.create({

    loginView: {
        marginLeft: 20,
        display: "flex",
        justifyContent: "center",
        margin: 10,
        paddingRight:10,
    },
    loginText: {
        borderWidth: 1,
        borderColor: "black",
        marginTop:10,
        paddingLeft:10, 
        color:"black",
        fontSize:16,
        borderRadius:10
    },
    phoneText:{
        color:"black",
        fontSize:16,
        fontWeight:"bold"
    },
    errorText:{
        color:"red"
    }
})

export default InputField