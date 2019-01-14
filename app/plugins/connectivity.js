/**
 * Detecting Online/Offline Connectivity
 * 
 * @require {connectivity}
 */

const connectivityModule = require("tns-core-modules/connectivity");
import store from '../store'

const VuePlugin = {
  install(Vue, options) {

    const myConnectionType = connectivityModule.getConnectionType();

    switch (myConnectionType) {
      case connectivityModule.connectionType.none:
        // Denotes no Internet connection.
        store.dispatch('setConnection', { type: 'none', status: false })
        console.log("No connection");

        break;
      case connectivityModule.connectionType.wifi:
        // Denotes a WiFi connection.
        store.dispatch('setConnection', { type: 'wifi', status: true })
        console.log("WiFi connection");
        break;
      case connectivityModule.connectionType.mobile:
        // Denotes a mobile connection, i.e. cellular network or WAN.
        store.dispatch('setConnection', { type: 'mobile', status: true })
        console.log("Mobile connection");
        break;
      case connectivityModule.connectionType.ethernet:
        // Denotes a ethernet connection.
        store.dispatch('setConnection', { type: 'ethernet', status: true })
        console.log("Ethernet connection");
        break;
      default:
        break;
    }

    connectivityModule.startMonitoring((newConnectionType) => {
      switch (newConnectionType) {
        case connectivityModule.connectionType.none:
          store.dispatch('setConnection', { type: 'none', status: false })
          console.log("Connection type changed to none.");
          break;
        case connectivityModule.connectionType.wifi:
          store.dispatch('setConnection', { type: 'wifi', status: true })
          console.log("Connection type changed to WiFi.");
          break;
        case connectivityModule.connectionType.mobile:
          sstore.dispatch('setConnection', { type: 'mobile', status: true })
          console.log("Connection type changed to mobile.");
          break;
        default:
          break;
      }
    });

  }
}

export default VuePlugin