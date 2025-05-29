import { StyleSheet } from "react-native";

const HomeStyle = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: '100%',
    height: '100%',
  },
  topinfo: {
    display: "flex",
    alignItems: "center",
  },
  info: {
    marginTop: 75,
    width: 375,
    height: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  frame: {
    marginTop: 25,
    borderWidth: 3,
    borderColor: '#E39F0C',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    width: 300,
    height: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  textframe: {
    marginTop: 10,
    display: "flex",
    alignItems: "flex-end",
    color: "#E39F0C",
    fontFamily: 'Montserrat-Bold',
    fontSize: 96,
    lineHeight: 100,
  },
  buttonmenu: {
    width: 414,
    height: 414,
    display: "flex",
    borderRadius: 30,
    flexDirection: "column",
    marginTop: 75,
  },
  option: {
    width: 414,
    height: 100,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 44,
  },
  rectangle: {
    width: 100,
    height: 100,
    backgroundColor: "#E39F0C",
    padding: 30,
    fontSize: 45,
    borderRadius: 39.85,
    alignItems: "center",
    justifyContent: "center",
  },
  moodStatusContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  moodStatusText: {
    color: "#E39F0C",
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    textAlign: "center",
  },
  moodText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    color: "#9DA4B4",
    textAlign: "center",
  },
  highlightText: {
    fontFamily: "Montserrat-SemiBold",
    color: "#6ea9f7",
  }
});

export default HomeStyle;