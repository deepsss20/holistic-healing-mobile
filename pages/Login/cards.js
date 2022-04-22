import React, { useEffect } from "react"
import {View, Text, FlatList} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { apiSlot } from "../../redux/actions/api.actions"

const CardScreen= ()=>{

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(apiSlot())
    },[])

    const {api, apiLoading} = useSelector((rState)=>{
        return rState.apiReducer
    })

    const Display = ({body, title})=>{
        return(
            <View>
                <Text>{title}</Text>
                <Text>{body}</Text>
            </View>
        )
    }
    // console.log(api.length, apiLoading)
    return(
    <View>
        <FlatList
        data={api}
        renderItem={(props)=><Display {...props.item} /> }
        keyExtractor={item=> item.id}
        />
    </View>
    )
}

export default CardScreen