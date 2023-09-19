import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#6ea9f7",
    width: '100%',
    height: 812,
  },
  topinfo: {
    display: "flex",
    alignItems: "center",
  },
  info: {
    marginTop: 150,
    width: 375,
    height: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10
  },
  
  khung: {
    borderWidth: 3,
    borderColor: '#FFB3C6',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    width: 300,
    height: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textkhung: {
    display: "flex",
    alignItems: "flex-end",
    color: "#6ea9f7",
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    lineHeight: 48,
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
    justifyContent: "center",
    padding: 10,
    gap: 44,
  },
  rectangle: {
    width: 100,
    height: 100,
    backgroundColor: "#DBB1D3",
    padding: 30,
    fontSize: 45,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
