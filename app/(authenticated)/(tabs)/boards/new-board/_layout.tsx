import {Stack, useRouter} from "expo-router";
import {TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "../../../../../constants/Colors";


const Layout = () => {
    const router = useRouter();

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Board",
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: "#7979f7",
                    },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="close" size={32} color={"#000"}/>
                        </TouchableOpacity>
                    )
                }}
            />
            <Stack.Screen
                name="color-select"
                options={{
                    headerShadowVisible: false,
                    title: "Board background",
                    headerStyle: {
                        backgroundColor: "white",
                    }
                }}
            />
        </Stack>
    )
}

export default Layout;