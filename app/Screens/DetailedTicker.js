import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Dimensions, ScrollView,
} from 'react-native';
import { Header } from 'react-native-elements';
import StockChart from '../Components/StockChart';
import SupportResistData from '../Components/SupportResistData';

// Don't want this page to show up in the Drawer Navigator 
class Hidden extends React.Component {
  render() {
    return null;
  }
}

const horizontalRule = (
  <View
    style={{
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      width: '95%',
    }}
  />
);

export default class Detailed extends Component {
  // Hide direct navigation to this page via Drawer
  static navigationOptions = {
    drawerLabel: <Hidden />,
  };

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');

    return (
      <View style={localStyles.container}>
        <Header
          leftComponent={{
            icon: 'arrow-back',
            color: '#fff',
            onPress: () => this.props.navigation.goBack(),
          }}
          centerComponent={{ text: item.symbol, style: { color: '#fff' } }}
          containerStyle={{
            backgroundColor: '#5E8D93',
          }}
        />

        {/* Standard information */}
        <View style={styles.card}>
          <View>
            <Text style={styles.idText}>{item.symbol}</Text>
            <Text style={styles.nameText}>{item.name}</Text>
          </View>
          <View>
            <Text style={styles.priceText}>${item.last}</Text>
          </View>
        </View>

        {horizontalRule}
        <StockChart support={item.supports[0]}
          resistance={item.resistances[0]}
          current={item.last}
        />
        {horizontalRule}

        {/* Support Resistance Information */}
        <ScrollView style={{ flex: 1, }}>
          <View style={styles.card}>
            <View style={styles.infoContainer}>
              <Text style={styles.idText}>Support(s)</Text>
              {
                item.supports.map((item) =>
                  <View style={styles.infoSpacing} key={item.price}>
                    <SupportResistData item={item} />
                  </View>
                )
              }
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.idText}>Resistance(s)</Text>
              {
                item.resistances.map((item) =>
                  <View style={styles.infoSpacing} key={item.price}>
                    <SupportResistData item={item} />
                  </View>
                )
              }
            </View>
          </View>
        </ScrollView>

      </View>
    );
  }
}

/* Get width of window */
const { width, height } = Dimensions.get('window');

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    top: 0,
    bottom: 0,
  },
});

const text = {
  color: 'black',
  fontSize: 20,
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    paddingLeft: 15,
    paddingRight: 15,
  },
  nameText: {
    fontSize: 12,
    color: '#616161'
  },
  idText: {
    ...text,
    fontWeight: 'bold',
  },
  priceText: {
    ...text,
  },
  infoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  infoText: {
    ...text,
    fontSize: 16,
  },
  infoSpacing: {
    marginTop: 10,
    marginBottom: 10,
  },
});
