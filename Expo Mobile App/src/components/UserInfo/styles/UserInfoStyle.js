import { StyleSheet } from "react-native";

const UserInfoStyle = StyleSheet.create({
    userInfo: {
        width: 157,
        height: 80,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 20,
      },
      signOutButton: {
        display: "flex",
        justifyContent: "center",
        marginLeft: 5,
      },
      username: {
        backgroundColor: '#ffb3c6',
        borderRadius: 30,
        width: 157,
        height: 62,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      userName: {
        color: "#FF5A63",
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        lineHeight: 20,
      },
    signOutButtonText: {
        color: "#FF5A63",
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        lineHeight: 14,
        textDecorationLine: 'underline'
    },
});

export default UserInfoStyle;