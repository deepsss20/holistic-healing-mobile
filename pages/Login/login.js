import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableWithoutFeedback, BackHandler} from "react-native"
import { ActionButton, InputField } from "../../components"
import validator from 'validator'
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../redux/actions/user.action"
const initialState = {
    phoneNumber: "",
    password: "",
    errors: []
}

const LoginScreen = () => {
    const [{ phoneNumber, password, errors }, setState] = useState(initialState)
    const {userLoading} = useSelector((rState)=>rState.userReducer)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    
    const onChangeVal = (number, name) => {
        const newError = [...errors].filter(ele => ele !== name)
        setState((prev) => {
            return {
                ...prev,
                [name]: number,
                errors: newError
            }
        })
    }
    const onError = (name) => {
        setState((prev) => {
            return {
                ...prev,
                errors: [...prev.errors, name]
            }

        })

    }

    const onLogin = () => {
        dispatch(loginUser({ phoneNumber, password, navigation }))
    }

    const enableLogin = phoneNumber && password && errors.length===0

    const onFocus = ()=>{
        BackHandler.addEventListener("hardwareBackPress", onBack)
    }

    const onBlur = ()=>{
        BackHandler.removeEventListener("hardwareBackPress",onBack)
    }

    const onBack = ()=>{
        BackHandler.exitApp()
    }
    useEffect(()=>{
       const focusListener = navigation.addListener("focus", onFocus)
       const blurListener = navigation.addListener("blur",onBlur)
       return()=>{
           focusListener()
           blurListener()
        }
    },[])

    return (
        <View style={styles.pageView}>
            <View style={styles.formView}>
                <InputField
                    name="phoneNumber"
                    onChange={(e, name) => onChangeVal(e, name)}
                    title="Phone Number"
                    placeholder="Enter your Phone Number"
                    validator={(e) => validator.isMobilePhone(e, "en-IN")}
                    onError={phone => onError(phone)}
                    isError={errors.includes("phoneNumber")}
                    errorMessage="Invalid Phone Number"
                    value={phoneNumber}
                />
                <InputField value={password} name="password" onChange={(e, name) => onChangeVal(e, name)} secureTextEntry title="Password" placeholder="Enter your Password" />
                <ActionButton loading={userLoading} disabled={!enableLogin} title="LOGIN" onPress={onLogin} />
                <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate("register")
                }}>
                    <Text style={styles.accountText}>Don't have an Account? Register</Text>
                </TouchableWithoutFeedback>

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
        flex: 1
    },

    accountText: {
        paddingTop: 30,
        color: "blue",
        textAlign: "center"
    }

})

export default LoginScreen
