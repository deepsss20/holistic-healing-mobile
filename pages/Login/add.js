import React, { useState } from "react"
import {Text, View, StyleSheet, TextInput} from "react-native"
import validator from 'validator'
import { ActionButton, InputField } from "../../components"
const initialState = {
    textOne:"",
    textTwo:"",
    errors: [],
    add:""
}

const AddScreen = ()=>{
    const [{textOne, textTwo, errors,add}, setState] = useState(initialState)
    const onChangeVal = (number, name)=>{

        const newError = [...errors].filter(ele=>ele!==name)
        setState((prev)=>{
            return{
                ...prev,
                [name]: number,
                errors:newError
            }
        })
        
    }

    const onError = (name)=>{
        setState((prev)=>{
            return{
                ...prev,
                errors:[...prev.errors, name]
            }
        })
    }

    const addNumbers = ()=>{
        setState((prev)=>{
            return{

                ...prev,
                add: parseInt(textOne)+ parseInt(textTwo)
                
            }
        })
    }
    return(
        <View>
            <View>
                <InputField 
                name="textOne"
                value={textOne}
                title="Text field 1"
                placeholder="Enter your first Number"
                validator={(e)=>validator.isNumeric(e)}
                onChange = {(e, name)=>onChangeVal(e, name)}
                onError={(textOne)=>onError(textOne)}
                isError={errors.includes("textOne")}
                errorMessage="Invalid number"

                />
                <InputField 
                name="textTwo"
                value={textTwo}
                title="Text field 2"
                placeholder="Enter your second Number"
                validator={(e)=>validator.isNumeric(e)}
                onChange = {(e, name)=>onChangeVal(e,name)}
                onError={(textTwo)=>onError(textTwo)}
                isError={errors.includes("textTwo")}
                errorMessage="Invalid number"
                />
                <ActionButton title="Add" onPress={addNumbers}/>
                <Text>Addition:{add}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageView: {
        display: "flex",
        flex: 1,
        backgroundColor: "white"
    },

    formView: {
        alignContent: "center",
        justifyContent: 'center',
        flex: 1,
    },

    boxView:{
        margin:10,
        borderBottomWidth:1,
        borderTopWidth:1,
        borderLeftWidth:1,
        borderRightWidth:1,
    },
    
})
export default AddScreen