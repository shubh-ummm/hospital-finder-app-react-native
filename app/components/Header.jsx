import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Image source={require('../../assets/images/blue1c.png')} style={styles.logo}/>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer:{
    position:'absolute',
    zIndex:10,
    width:'100%',
    backgroundColor:'#eaeff5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  logo:{
    width:200,
    height:50,
    alignContent:'center',
    justifyContent:'center'

  }
})


export default Header