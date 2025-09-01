import React, {useState, useEffect} from 'react';

import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useLocalSearchParams, Stack, useRouter, Link} from "expo-router";
import {useSupabase} from "../../../context/SupabaseContext";

import {BlurView} from "expo-blur"

import {Board} from "../../../types/enums"
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {Colors} from "../../../constants/Colors";

import {useHeaderHeight} from "@react-navigation/elements";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import BoardArea from "../../../components/BoardArea";

const BoardView = () => {
    const {id, bg} = useLocalSearchParams<{ id: string, bg?: string }>();

    const {getBoardInfo} = useSupabase();
    const [board, setBoard] = useState<Board>();
    const router = useRouter();

    const headerHeight = useHeaderHeight();
    const {top} = useSafeAreaInsets();


    useEffect(() => {
        if (!id) return;
        loadBoard();

    }, [id]);

    const loadBoard = async () => {
        if (!id) return;

        const data = await getBoardInfo(id);
        setBoard(data);

    }

    const CustomHeader = () => (
        <BlurView intensity={80} tint="dark" style={{paddingTop: top}}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => {
                    router.dismiss();
                }}>
                    <Ionicons name="close" size={24} color={Colors.fontLight}/>
                </TouchableOpacity>

                <View style={{flex: 1}}>
                    <Text style={{color: Colors.fontLight, fontSize: 16}}>{board?.title}</Text>
                </View>

                <Text style={{color: Colors.fontLight, fontSize: 12}}>
                    Board of {(board as any)?.users.first_name}
                </Text>
                <Link href={""} asChild>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="dots-horizontal"
                                                size={26}
                                                color={Colors.fontLight}/>
                    </TouchableOpacity>
                </Link>
            </View>
        </BlurView>
    )

    return (
        <View style={{
            backgroundColor: bg,
            paddingTop: headerHeight,
            flex: 1,
        }}>
            <Stack.Screen
                options={{
                    title: board?.title,
                    headerTransparent: true,
                    header: () => <CustomHeader/>
                }}/>

            {board && <BoardArea board={board} />}
        </View>
    );
};


const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        backgroundColor: "",
        paddingHorizontal: 14,
        height: 50,
    },
});

export default BoardView;