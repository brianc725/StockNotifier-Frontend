import { StyleSheet } from 'react-native';

export const Colors = {
  BG: 'white',
  BG_ALT: '#FFFBFE',
  PRIMARY: 'green',
  PRIMARY_LIGHT: 'lightgreen',
  SECONDARY: '#223843',
  TEXT_DARK: 'black',
  TEXT_LIGHT: 'white'
}

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BG,
  },
  formContainer: {
    position: 'absolute',
    top: 48,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 100,
  },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },
  landingInputContainer: {
    position: 'absolute',
    bottom: 96,
  },
  input: {
    height: 40,
    width: 350,
    marginBottom: 8,
    // padding: 10,
    paddingLeft: 0,
    color: 'rgba(0,0,0,0.7)', 
    borderBottomWidth: 1,
    borderBottomColor: Colors.PRIMARY,
  },
  badInput: {
    height: 40,
    width: 350,
    marginBottom: 8,
    // padding: 10,
    paddingLeft: 0,
    color: 'rgba(0,0,0,0.7)',
    borderBottomWidth: 1,
    borderBottomColor: 'red',
  },
  floatingLabelInputContainer: {
    paddingTop: 18,
    paddingBottom: 18,
  },
  errmsg: {
    color: 'red',
  },
  buttonContainer: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    marginTop: 50,
    width: 300
  },
  // buttonDisabledContainer: {
  //   backgroundColor: Colors.PRIMARY_LIGHT,
  //   padding: 15,
  //   marginTop: 15,
  //   width: 300
  // },
  buttonText: {
    color: Colors.TEXT_LIGHT,
    textAlign: 'center',
    fontWeight: '700'
  },
  // secondaryButtonContainer: {
  //   backgroundColor: '#DEDFE5',
  //   padding: 15,
  //   marginTop: 15,
  //   width: 300
  // },
  // secondaryButtonText: {
  //   color: '#434345',
  //   textAlign: 'center',
  //   fontWeight: '700'
  // },
  headerStyle: {
    backgroundColor: Colors.PRIMARY,
  },
  headerRightContainerStyle: {
    color: Colors.TEXT_LIGHT,
    padding: 15,
  }
});