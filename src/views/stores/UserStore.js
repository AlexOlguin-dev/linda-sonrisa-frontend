import { extendObservable } from "mobx";

/**
 * UserStore
 */

class UserStore {
 constructor() {
  extendObservable(this, {

   loading: false,
   isLoggedIn: false,
   username: '',


  })
 }
}

export default new UserStore();