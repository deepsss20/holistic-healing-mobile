import { useNavigation } from "@react-navigation/native"
import dayjs from "dayjs"
import React, { useEffect } from "react"
import { Text, BackHandler, View, StyleSheet, Image, TouchableWithoutFeedback, FlatList} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { get } from "wd/lib/commands"
import { PageLoader } from "../../components"
import { getServices } from "../../redux/actions/home.action"
import { priceFormat } from "../../utils"
import { ServiceCard } from "./helper"

const HomeScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const {service,serviceLoading} = useSelector((rState)=>rState.homeReducer)
    const onFocus = () => {
        dispatch(getServices())
        BackHandler.addEventListener('hardwareBackPress', onBack)
    }

    const onBlur = () => {
        BackHandler.removeEventListener('hardwareBackPress', onBack)
    }

    const onBack = () => {
        BackHandler.exitApp()
        return true
    }

    useEffect(() => {
        const focusListener = navigation.addListener('focus', onFocus)
        const blurListener = navigation.addListener('blur', onBlur)
        return () => {
            focusListener()
            blurListener()
        }
    }, [])

    const onEventPress = (item)=>{
        navigation.navigate('event', {item})
    }

        
    return (
        <View style={styles.viewScreen}>
            <View>
                <Text style={styles.upcomingText}>Upcoming Events</Text>
            </View>
            {serviceLoading?
            <PageLoader/>
            : 
            <FlatList
            data={service}
            renderItem={(props)=><ServiceCard item={props.item} onPress={onEventPress} />}
            keyExtractor={item=>item._id}
            />
           
}

        </View>
    )
}

const styles = StyleSheet.create({
    viewScreen: {
        display: "flex",
        flex: 1,
        backgroundColor: "white"
    },
    upcomingText:{
        display:"flex",
        textAlign:"center",
        fontSize:20,
        fontWeight:"bold",
        color:"black",
        paddingTop:10,
        textDecorationLine:"underline"
        
    }

})
export default HomeScreen