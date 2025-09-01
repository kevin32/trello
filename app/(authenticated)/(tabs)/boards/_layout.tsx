import {Stack} from "expo-router";
import {Colors} from "../../../../constants/Colors";
import {Image} from "react-native";

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTitle: () => (
                        <Image
                            style={{width: 120, height: 50, resizeMode: "contain"}}
                            source={require("../../../../assets/images/trello-logo-gradient-white.png")}
                        />
                    ),

                }}
            />
            <Stack.Screen
                name="new-board"
                options={{
                    headerShown: false,
                    presentation: "modal"
                }}
            />
        </Stack>
    );
}
export default Layout;