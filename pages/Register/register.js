import React, { useState } from "react"
import { Text, View, StyleSheet } from "react-native"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { ActionButton, InputField } from "../../components"
import { registerUser } from "../../redux/actions/user.action"
import validator from 'validator'
import { useNavigation } from "@react-navigation/native"
const initialState = {
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    errors: []
}
const RegisterScreen = () => {
    const [{ name, phoneNumber, email, password, errors }, setState] = useState(initialState)
    const {userLoading} = useSelector((rState)=>rState.userReducer)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const onChangeVal = (val, field) => {
        const newError = [...errors].filter(ele => ele !== field)
        setState((prev) => {
            return {
                ...prev,
                [field]: val,
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

    const onRegister = () => {
        dispatch(registerUser({ name, phoneNumber, email, password, navigation }))
    }

    const enableRegister = name && phoneNumber && email && password && errors.length===0
    return (
        <View style={styles.registerPageView}>
            <View>
                <Text style={styles.registerTextView}>Register</Text>
                <InputField
                    name="name"
                    value={name}
                    onChange={(val, field) => onChangeVal(val, field)}
                    title="Name"
                    placeholder="Enter your Name"
                    validator={(e)=> validator.isAlpha(e, "en-IN")}
                    onError={name=> onError(name)}
                    isError={errors.includes("name")}
                    errorMessage="User name must only contain alphabets"
                     />
                <InputField
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(val, field) => onChangeVal(val, field)}
                    title="Phone Number" placeholder="Enter your Phone number"
                    validator={(e) => validator.isMobilePhone(e, "en-IN")}
                    onError={phone => onError(phone)}
                    isError={errors.includes("phoneNumber")}
                    errorMessage="Invalid Phone Number"
                />
                <InputField 
                name="email" 
                value={email} 
                onChange={(val, field) => onChangeVal(val, field)} 
                title="Email" 
                placeholder="Enter your Email"
                validator={(e)=>validator.isEmail(e)}
                onError={email=> onError(email)}
                isError={errors.includes("email")}
                errorMessage="Invalid mail Id"
                />
                <InputField name="password" value={password} onChange={(val, field) => onChangeVal(val, field)} secureTextEntry title="Password" placeholder="Enter your Password" />
                <ActionButton loading={userLoading} disabled={!enableRegister} title="REGISTER" onPress={onRegister} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    registerPageView: {
        display: "flex",
        flex: 1,
        backgroundColor: "white"
    },

    registerTextView: {
        marginTop: 20,
        marginBottom: 30,
        marginLeft: 20,
        fontSize: 16,
        color: "black",
        fontWeight: "bold"

    }

})

export default RegisterScreen