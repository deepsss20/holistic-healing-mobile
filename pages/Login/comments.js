import React, { useEffect } from "react"
import {Text, View} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { commentApi } from "../../redux/actions/comment.action"

export const CommentScreen = ()=>{

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(commentApi())
    },[])

    const {commentApi, commentLoading} = useSelector((rState)=>{
        return rState.commentReducer
    })
    
    return(
        <View>
            <Text> Hello</Text>
        </View>
    )
}

export default CommentScreen