import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DailySteps from '../screens/DailySteps';
import Sleep from '../screens/Sleep';

const Drawer = createDrawerNavigator();

export default GoogleFit = ({logout, accessToken}) => {
  console.log('[Token]', accessToken);
  return (
    <Drawer.Navigator
      initialRouteName="Daily Steps"
      drawerContent={CustomDrawerContent(logout)}>
      <Drawer.Screen name="Daily Steps" component={DailySteps} />
      <Drawer.Screen name="Sleep Activity" component={Sleep} />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (logout) => (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.closeDrawer()}>
          {/* <Text>Hamburger</Text> */}
          <Image
            source={require('../assets/hamburger.png')}
            style={{height: 30, width: 30, margin: 10}}
          />
        </TouchableOpacity>
        <Text style={styles.menuLabel}>Menu</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={logout} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    marginRight: 20,
  },
  menuLabel: {
    fontSize: 20,
    fontWeight: '600',
  },
});
