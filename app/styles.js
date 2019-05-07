import { StyleSheet } from 'react-native';

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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: 'rgba(0,0,0,0.7)'
  },
  buttonContainer: {
      backgroundColor: '#2980b6',
      padding: 15,
      width: 300
  },
  buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700'
  }
});