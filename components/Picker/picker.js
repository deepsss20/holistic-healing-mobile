import React from "react"
import { View, Text } from "react-native"
import { Picker as Dropdown } from '@react-native-picker/picker';

const Picker = ({value,onSelect,options}) => {
    console.log(value)
    return (
        <View>
            <Dropdown
                placeholder="Select Slot"
                selectedValue={value}
                onValueChange={(itemValue, itemIndex) =>
                    onSelect(itemValue, itemIndex)
                }>
                {options.map((ele)=>{
                    return(
                        <Dropdown.Item key={ele} label={ele} value={ele} />
                    )
                })}
            </Dropdown>

        </View>
    )
}

export default Picker