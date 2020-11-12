
import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native';
import * as Permission from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class App extends React.Component {
    constructor(){
        super();
        this.state={
            hasCameraPermission:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal',
        }
    }
    getCameraPermission=async()=>{
        const {status}=await Permission.askAsync(Permission.CAMERA);
        this.setState({
            hasCameraPermission:status==='granted',
        })
    }
    handleBarcodeScanner=(type,data)=>{
        this.setState({
            scanned:'true',
            buttonState:'clicked',
            scannedData:data,
        })
    }
  render(){
    const hasCameraPermission=this.state.hasCameraPermission;
    const scanned=this.state.scanned;
    const buttonState=this.state.buttonState;
    if(buttonState==='granted'&&hasCameraPermission){
        return(
            <BarCodeScanner onBarCodeScanned={scanned?undefined:this.handleBarcodeScanner} />
        )
    }
    else if(buttonState==='normal'){
  return (
    <View style={styles.container}>
          <Text>{
              hasCameraPermission==='granted'?this.state.scannedData:"Request Camera Access"
           } </Text>
          <TouchableOpacity onPress={this.getCameraPermission} >
          <Text>Scan QR code  </Text>
          </TouchableOpacity>
        </View>
  );
}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
