import React, {useState} from 'react';

import {Text, TouchableOpacity, View} from 'react-native';
import {router} from "expo-router";

const COLORS = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F1C40F",
    "#8E44AD",
    "#16A085",
    "#E67E22",
    "#2ECC71",
    "#3498DB"
]

export const DEFAULT_COLOR = COLORS[0];

const ColorSelect = () => {

    const [selected, setSelected] = useState<string>()

    const onColorSelect = (color: string) => {
        setSelected(color);
        router.setParams({bg: color})
        router.dismiss();
    }

    return (
        <View style={{
            flexDirection: "row",
            flexGrow: 1,
            flexWrap: "wrap",
            justifyContent: "center"
        }}>
            {COLORS.map((color) => (
                <TouchableOpacity
                    key={color}
                    style={{
                        backgroundColor: color,
                        height: 100,
                        width: 100,
                        margin: 5,
                        borderRadius: 4,
                        borderWidth: selected == color ? 3 : 0,
                        borderColor: "#000000"
                    }}
                    onPress={() => onColorSelect(color)}
                />
            ))}
        </View>
    );
};

export default ColorSelect;