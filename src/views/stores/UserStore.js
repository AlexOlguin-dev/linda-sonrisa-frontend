import { extendObservable } from "mobx";

/**
 * UserStore
 */

class UserStore {
 constructor() {
  extendObservable(this, {
    
    especialidades: []

  })
 }
}

export default new UserStore();