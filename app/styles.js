import { StyleSheet } from 'react-native';

export const COLOR_BG = '#F8FFF4'
export const COLOR_BG_ALT = '#FFFBFE'
export const COLOR_PRIMARY = '#416165'
export const COLOR_SECONDARY = '#223843'
export const COLOR_TEXT = '#04151F'

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  input: {
    height: 40,
    width: 300,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: 'rgba(0,0,0,0.7)'
  },
  badInput: {
    height: 40,
    width: 300,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: 'rgba(0,0,0,0.7)',
    borderWidth: 1,
    borderColor: 'red'
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    padding: 15,
    marginTop: 15,
    width: 300
  },
  buttonDisabledContainer: {
    backgroundColor: '#b9d4e5',
    padding: 15,
    marginTop: 15,
    width: 300
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  },
  secondaryButtonContainer: {
    backgroundColor: '#DEDFE5',
    padding: 15,
    marginTop: 15,
    width: 300
  },
  secondaryButtonText: {
    color: '#434345',
    textAlign: 'center',
    fontWeight: '700'
  }
});