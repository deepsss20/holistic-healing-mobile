import { useRoute } from "@react-navigation/native"
import React, { useState } from "react"
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Linking, TextInput } from "react-native"
import pic from "../../assets/01.jpeg"
import { get } from "lodash"
import dayjs from "dayjs"
import { timeConverter } from "./helper"
import DateTimePicker from '@react-native-community/datetimepicker';
import { ActionButton, InputField, Picker } from "../../components"
import { useDispatch, useSelector } from "react-redux"
import { bookSlot } from "../../redux/actions/event.actions"
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const initialState = {
    showTimeSlots: false,
    showDatePicker: false,
    bookingDate: "",
    bookingUnformatted:'',
    slot:""
}

const EventScreen = () => {
    const [{ showTimeSlots, showDatePicker, bookingDate, bookingUnformatted, slot}, setState] = useState(initialState)
    const route = useRoute()
    const dispatch = useDispatch()

    const { item } = route.params

    const {user} = useSelector((rState)=>{
        return rState.userReducer
    })
    

    const options = item.appointment.timeSlots.map((ele)=>{
       return `${timeConverter(ele.begin)} - ${timeConverter(ele.end)}`
    })

    options.unshift('Select value')


    const onSlotPress = () => {
        setState((prev) => {
            return {
                ...prev,
                showTimeSlots: !prev.showTimeSlots
            }
        })
    }


    const onDatePress=(value)=>{
        setState(prev=>{
            return{
                ...prev,
                showDatePicker: value
            }
        })
    }



    const onDateChange = (date)=>{
        setState(prev=>{
            return{
                ...prev,
                showDatePicker:false,
                bookingDate: date.type==='set' ? dayjs(date.nativeEvent.timestamp).format('DD/MM/YYYY') : prev.bookingDate,
                bookingUnformatted: date.type==='set' ? date.nativeEvent.timestamp : prev.bookingUnformatted
            }
        })
    }

    const onChangeSlot = (itemValue)=>{
        setState((prev)=>{
            return{
                ...prev,
                slot: itemValue === "Select value" ? null : itemValue
            } 
        })
    }
    const enableButton = bookingDate && slot

    const onBookPress = ()=>{
        const serviceId = item._id
        const userId = user._id
        // console.log(bookingDate )
        const [startTime, endTime] = slot.split('-')
        const trimmedStartTime = startTime?.trim()
        const trimmedEndTime = endTime?.trim()
        const formattedStartTime = dayjs(`${bookingDate} ${trimmedStartTime}`, 'DD/MM/YYYY hh:mm A').format('YYYY-MM-DD HH:mm')
        const formattedEndTime = dayjs(`${bookingDate} ${trimmedEndTime}`,'DD/MM/YYYY hh:mm A').format('YYYY-MM-DD HH:mm')
        const payload = {
            "serviceId": serviceId,
            "userId":userId,
            "startTime":formattedStartTime,
            "endTime":formattedEndTime
        }
        console.log(payload)
        dispatch(bookSlot(payload))
    }

    

    const onLocationClick = async () => {
        await Linking.openURL('https://www.google.com/maps/place/NITHYA+SANJEEVINI+YOGA+PRATHISHTANA/@12.9106634,77.5087062,17z/data=!3m1!4b1!4m5!3m4!1s0x3bae3f0699873fa1:0x1a09876c42b1a5bf!8m2!3d12.9106585!4d77.5108933')
    }
    const timeSlotLength = get(item, 'appointment.timeSlots', []).length - 1
    return (
        <View>
            <View style={styles.imageView}>
                <Image source={pic} style={{ height: 200, width: 200 }} />
            </View>
            <TouchableWithoutFeedback onPress={() => onSlotPress()}>
                <View style={styles.serviceView}>
                    <Text style={styles.servicetext}>{item?.name}</Text>
                    <View style={styles.screenView}>
                        <View>
                            <Text style={styles.dateText}>{item?.dateText}</Text>
                        </View>
                        <View style={{ borderBottomWidth: 0.5, borderColor: "grey" }}>
                            <Text style={styles.timeText}>{timeConverter(get(item, 'appointment.timeSlots[0].begin', ''))} - {timeConverter(get(item, `appointment.timeSlots[${timeSlotLength}].end`, ''))} </Text>
                        </View>
                        {showTimeSlots &&
                            <View style={styles.border}>
                                {get(item, 'appointment.timeSlots', []).map(slots => {
                                    return (
                                        <View key={slots._id}>
                                            <Text style={styles.startEndTime}>{timeConverter(slots.begin)} - {timeConverter(slots.end)}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        }
                    </View>

                </View>
            </TouchableWithoutFeedback>
            <View style={styles.locationView}>
                <Text style={styles.locationStyle}>Event Location</Text>
                <TouchableWithoutFeedback onPress={() => onLocationClick()}>
                    <Text style={styles.subLocationLink}>Navigate to Event Location</Text>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.bookSlotView}>
                <Text style={styles.bookSlot}>Book your Slot</Text>
               
                <View>
                {showDatePicker&&
                <DateTimePicker
                testID="dateTimePicker"
                value= {bookingUnformatted ? new Date(bookingUnformatted): new Date()}
                mode={'date'}
                is24Hour={true}
                minimumDate={new Date(dayjs().add(1, 'day').format('MMMM DD, YYYY')) }
                maximumDate={new Date(dayjs().add(2,"week").format('MMMM DD, YYYY'))}
                onChange={(date)=>onDateChange(date)}
                
              />}
              
                <TouchableWithoutFeedback onPress={()=>onDatePress(true)}>
                    <View>
                        <Text style={styles.bookingText}>Booking Date</Text>
                            <Text style={styles.bookingDate}>{bookingDate? bookingDate: "Select Booking Date"}</Text>
                    </View>
                </TouchableWithoutFeedback>
                </View>
                <View style={styles.bookSlot}>
                    <Text style={styles.bookingText}>Booking Slot</Text>
                </View>
            </View>
            <View>
                <Picker value={slot} onSelect={(itemValue,itemIndex)=>onChangeSlot(itemValue)} options={options}/>
            </View>
            <View>
                <ActionButton disabled={!enableButton}  title="Book Your Slot" onPress={()=>onBookPress()}/>
            </View>
        </View>
        
    )
}


const styles = StyleSheet.create({
    imageView: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20
    },
    serviceView: {
        paddingTop: 20,
        paddingLeft: 20
    },
    servicetext: {
        color: "black",
        fontWeight: "bold",
        fontSize: 30,
    },
    dateText: {
        paddingTop: 20,
        color: "black",
        fontSize: 18,
        fontWeight: "bold"
    },
    timeText: {
        paddingTop: 5,
        color: "#52504a",
        fontSize: 16,
        paddingBottom: 10
    },
    screenView: {
        borderBottomWidth: 0.5,
        borderColor: "grey",
        marginRight: 10
    },
    startEndTime: {
        paddingTop: 5,
        color: "#52504a",
        textAlign: 'center',
        paddingBottom: 5
    },

    border: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "black",
        display: 'flex',
        alignSelf: "center",
        width: '70%',
        marginBottom: 20,
        marginTop: 20
    },

    locationStyle: {
        paddingTop: 10,
        color: "black",
        fontWeight: "bold",
        fontSize: 18
    },

    subLocationLink: {
        paddingTop: 5,
        color: "#52504a",
        borderBottomWidth: 0.8,
        paddingBottom: 5,
        borderColor: "grey",
        paddingBottom: 10
    },

    locationView: {
        marginLeft: 20,
    },

    bookSlotView: {
        marginLeft: 20
    },

    bookSlot: {
        paddingTop: 10,
        color: "black",
        fontWeight: "bold",
        fontSize: 18,
        paddingBottom:5
    },

    bookingDate:{
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor:"black",
        marginRight:200,
        paddingLeft:10,
        height:50,
        paddingTop:5,
        borderRadius:10,
        display:"flex",
        paddingTop:15,
        color: "#52504a"
    },
    bookingText:{
        paddingBottom:5
    },
    bookingSlot:{
        marginRight:10
    }

})
export default EventScreen