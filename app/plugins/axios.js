import axios from 'axios'
import store from '../store'

const VuePlugin = {
  install(Vue, options) {
    // Global default config
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.common['Accept'] = "application/json";

    axios.interceptors.request.use(
      config => {
        store.commit('SET_LOADING', true)
        return config;
      },
      error => {
        // Request bị lỗi, làm gì đó đi
        store.commit('SET_LOADING', false)
        console.log('Loi request: ', error)
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => {
        store.commit('SET_LOADING', false)
        return response;
      },
      error => {
        // Lấy dữ liệu bị lỗi thì làm gì đó đi
        store.commit('SET_LOADING', false)
        let { response } = error

        if (response) {
          switch (response.status) {
            case 404:
              console.log('Not Found!')
              break
            case 401:
              console.log('Unauthorized!')
              Alert.alert('Unauthorized!')
              break;
            case 403:
              console.log('Forbidden!')
              Alert.alert('Forbidden!')
              break;
            case 405:
              console.log('Method Not Allowed!')
              break;
            case 405:
              console.log('Too Many Requests!')
              break;
            case 500:
              console.log('Internal Server Error!')
              break;
            case 502:
              console.log('Bad Gateway!')
              break;
            default:
              console.log(`Mã lỗi mới: ${error.response.status}`);
              console.error(error.response);
              break;
          }
        } else if (error.message && error.message == "Network Error") {
          Alert.alert('Server error');
        }
        return Promise.reject(error);
      }
    );

    Vue.prototype.$axios = axios

  }
}



export default VuePlugin