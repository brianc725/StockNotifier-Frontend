import { StyleSheet, Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');

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
    top: 36,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 100,
  },
  landingInputContainer: {
    position: 'absolute',
    bottom: 96,
  },
  input: {
    height: 48,
    width: dimensions.width - 80,
    paddingBottom: 0,
    marginBottom: 8,
    paddingLeft: 0,
    color: 'rgba(0,0,0,0.7)', 
    borderBottomWidth: 1,
    borderBottomColor: Colors.PRIMARY,
  },
  badInput: {
    height: 48,
    width: dimensions.width - 80,
    paddingBottom: 0,
    marginBottom: 8,
    paddingLeft: 0,
    color: 'rgba(0,0,0,0.7)',
    borderBottomWidth: 1,
    borderBottomColor: 'red',
  },
  floatingLabelInputContainer: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  errmsg: {
    fontSize: 12,
    color: 'red',
  },
  buttonContainer: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    marginTop: 50,
    width: dimensions.width - 80,
  },
  buttonText: {
    color: Colors.TEXT_LIGHT,
    textAlign: 'center',
    fontWeight: '700'
  },
  headerStyle: {
    backgroundColor: Colors.PRIMARY,
  },
  headerRightContainerStyle: {
    color: Colors.TEXT_LIGHT,
    padding: 15,
  }
});