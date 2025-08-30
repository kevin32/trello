import {ModalType} from "../types/enums";
import {TouchableOpacity, View, Text, TextInput, ActivityIndicator, StyleSheet, Alert} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {BottomSheetView} from "@gorhom/bottom-sheet";
import {useState} from "react";
import {useAuth} from "../context/AuthContext";
import {Colors} from "../constants/Colors";


interface EmailAuthModalProps {
    authType: ModalType | null;
    onBack?: () => void;
}

const EmailAuthModal = ({authType, onBack}: EmailAuthModalProps) => {


    const {signIn, signUp} = useAuth();

    const isSignUp = authType === ModalType.SignUp;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAuth = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert("Please fill in all required fields");
            return;
        }

        if (isSignUp) {
            if (password !== confirmPassword) {
                Alert.alert("Passwords do not match");
                return;
            }
            if (password.length < 6) {
                Alert.alert("Password must be at least 6 characters long");
                return;
            }
        }
        setLoading(true);

        try {
            let result;

            if (isSignUp) {
                result = await signUp(
                    email.trim(),
                    password,
                    firstName.trim()
                )
            } else {
                result = await signIn(
                    email.trim(),
                    password
                )
            }

            if (result.error) {
                const action = isSignUp ? "Sign up" : "Sign in";
                Alert.alert(`${action} Error`, result.error.message);
            }
        } catch (error) {
            console.error("Auth error: ", error);
            Alert.alert("ERROR", "Something went wrong. Please try again later.")
        } finally {
            setLoading(false);
        }

    }


    return (
        <BottomSheetView style={styles.modalContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack}>
                    <Ionicons name="arrow-back" size={24} color="black"/>
                </TouchableOpacity>
                <Text style={styles.title}>
                    {isSignUp ? "Register" : "Log in"}
                </Text>
            </View>


            {isSignUp && (
                <TextInput
                    style={styles.input}
                    placeholder="First name"
                    value={firstName}
                    onChangeText={setFirstName}
                    editable={!loading}
                />
            )}

            <TextInput
                style={styles.input}
                placeholder="Email address"
                value={email}
                onChangeText={setEmail}
                editable={!loading}

            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
                editable={!loading}

            />

            {isSignUp && (
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    secureTextEntry
                    onChangeText={setConfirmPassword}
                    editable={!loading}
                />
            )}

            <TouchableOpacity style={[styles.primaryButton, loading && styles.disabledBtn]}
                              onPress={handleAuth}
                              disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" size="small"/>
                ) : (
                    <Text style={styles.primaryButtonText}>{isSignUp ? "Register" : "Log in"}</Text>
                )}
            </TouchableOpacity>


        </BottomSheetView>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        padding: 20,
        gap: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        gap: 16,
    },
    title: {
        fontSize: 20,
        color: "#000",
        fontWeight: "700"
    },
    input: {
        borderWidth: 1,
        borderColor: "rgba(8,6,6,0.66)",
        padding: 16,
        borderRadius: 8,
        fontSize: 16,
    },
    primaryButton: {
        backgroundColor: Colors.primary,
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    primaryButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    disabledBtn: {
        opacity: 0.5,
    }
});

export default EmailAuthModal;