import Keycloak from 'keycloak-js'
import store from '../../store'
import config from '../../../static/keycloak.json'

console.log(config);

// let keycloak = Keycloak('/static/keycloak.json');
let keycloak = Keycloak({ url: 'http://localhost:8080/auth', realm: 'demo', clientId: 'pamplemousse' });

export default (next, roles) => {
  console.log("init");
  keycloak.init({ onLoad: 'login-required' }).success(() => {
    console.log("Successful login");
    keycloak.updateToken(10)
      .success(() => {
        store.dispatch('authLogin', keycloak)
        if (roles) {
          if (keycloak.hasRealmRole(roles[0])) {
            next()
          } else {
            next({ name: 'Unauthorized' })
          }
        } else {
          next()
        }
      })
      .error((err)=>{
        console.log("error in init", err);
      })
  })
  .error(() => {
    console.log('failed to login')
  })
}
