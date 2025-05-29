import { StyleSheet } from "react-native";

const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  topinfo: {
    width: 375,
    height: 812,
    display: "flex",
    alignItems: "center",
    marginTop: 125,
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 20,
    width: '100%',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#D0D5DD',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    width: 310,
  },
  inputPlaceholder: {
    color: '#D0D5DD', 
  },
  buttonIn: {
    backgroundColor: '#E39F0C',
    borderRadius: 5,
    padding: 10,
    width: 350,
    alignItems: 'center',
    display: 'flex',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    lineHeight: 20,
    alignItems: 'flex-start'
  },
  textsignIn: {
    color: '#FFD900',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    lineHeight: 20,
    alignItems: 'flex-start'
  },
  frame: {
    marginTop: 50,
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
    marginBottom: 50
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
  texttitle: {
    marginLeft: 10,
    fontFamily: 'Montserrat-Regular',
    color: '#667085',
    fontSize: 14,
    lineHeight: 24,
    alignItems: 'flex-start'
  },
  inputframe: {
    width: 350,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  inputText: {
    alignItems: 'flex-start',
    padding: 10
  },
  showPasswordButton: {
    width: 25,
    height: 25,
  },
});

export default LoginStyle;
