import {Tabs} from "expo-router";
import {Image} from "react-native";
import {Ionicons, MaterialCommunityIcons, FontAwesome} from "@expo/vector-icons";
import {Colors} from "../../../constants/Colors";


const Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTitleStyle: {
                    color: "white"
                }
            }}
        >
            <Tabs.Screen name="boards" options={{
                headerShown: false, title: "Boards", tabBarIcon: ({size, color}) => (
                    <Image style={{width: size, height: size}}
                           source={require("../../../assets/images/logo-icon-blue.png")}/>
                ),
            }}>
            </Tabs.Screen>
            <Tabs.Screen
                name="my-cards"
                options={{
                    title: "My Cards",
                    tabBarIcon: ({size, color}) => (
                        <MaterialCommunityIcons
                            name="view-dashboard-variant-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    tabBarIcon: ({size, color}) => (
                        <Ionicons name="search" size={size} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="notifications"
                options={{
                    title: "Notifications",
                    tabBarIcon: ({size, color}) => (
                        <Ionicons name="notifications-outline" size={size} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: "Account",
                    tabBarIcon: ({size, color}) => (
                        <FontAwesome name="user-circle" size={size} color={color}/>
                    ),
                }}
            />

        </Tabs>
    )
}

export default Layout;