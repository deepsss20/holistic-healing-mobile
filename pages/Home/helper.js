import React from "react"
import {View, Text, TouchableWithoutFeedback,Image, StyleSheet} from "react-native"
import dayjs from "dayjs"
import { priceFormat } from "../../utils"
import pic from "../../assets/01.jpeg"

export const ServiceCard = ({item,onPress})=>{
    const {name,details,appointment,locationLink,price} = item
    const isDaily = appointment?.isDaily
    const date = appointment?.date
    const dateText = isDaily?"Everyday": dayjs(date, "yyyy-MM-dd").format("ddd, MMM DD YYYY")
    return(
        <TouchableWithoutFeedback onPress={()=>onPress({...item, isDaily, date, dateText})}>
        <View style={styles.cardBox}>
                <View style={{display:"flex",flex:7}}>
                    <Text style={styles.dateAndTimeText}>{dateText}</Text>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.headerText}>{name}</Text>
                    <Text style={styles.descText}>{details}</Text>
                    <Text style={styles.priceText}>Price: {priceFormat(price)} only</Text>
                    <TouchableWithoutFeedback onPress={()=>console.log(locationLink)}>
                        <Text>Location</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{display:"flex",flex:3}}>
                    <Image source={pic} style={{ height: 100, width: 100 }} />
                </View>
            </View>
            </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    viewScreen: {
        display: "flex",
        flex: 1,
        backgroundColor: "white"
    },
    cardBox: {
        margin: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius:10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    dateAndTimeText: {
        color: "#52504a",
        fontWeight: "bold"
    },
    headerText: {
        fontSize: 20,
        paddingTop: 5,
        color: "black",
        fontWeight: "bold",
        width:'80%',
    },
    descText: {
        paddingTop: 5,
        color: "#52504a"
    },
    priceText:{
        fontWeight:"bold",
        color:"black",
        paddingTop:5
    }

})