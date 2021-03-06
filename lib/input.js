'use strict';

// ========== PACKAGES ==========
const minimist = require('minimist');

// ========== INPUT CLASS ==========
class Input {
  constructor(arg) {
    this.command = {};

    // format the args using minimist and then create an array of the formatted args object keys
    let formattedArgs = minimist(arg);
    let objKeyArray = Object.keys(formattedArgs);    

    // loop over the object key array 
    for (let i = 0; i < objKeyArray.length; i++) {
      // assign needed information to variables for ease of access
      let key = objKeyArray[i];
      let val = formattedArgs[key];

      // check the keys...
      switch(key) {
        // if the flag indicates "add"...
        case 'add':
        case 'a':
          // reassign this.command to this standardized object format
          this.command = { action: 'add', payload: val, categories: false };
          break;
    
        case 'c':
        case 'category':
          if (val === 'school'){
            this.command.categories = ['5e766dc5ac87d229d4091d19'];
          }
          if (val === 'home'){
            this.command.categories = ['5e766d24ac87d229d4091d18'];
          }
          if (val === 'work'){
            this.command.categories = ['5e766cadac87d229d4091d17'];
          }
          return;

        case 'list':
        case 'l':
          this.command = { action: 'list', payload: typeof val === 'string' ? val : false };
          return;

        case 'delete':
        case 'd':
          this.command = { action: 'delete', payload: val };
          return;

        // else do nothing, this.command remains an empty object
        default:
          break;
      }
    }
  }

  valid() {
    // if this.command is empty, return false
    if (!this.command) return false;
    // if there is no flag action, return false
    if (!this.command.action) return false;

    // if there is a flag action, check it for..
    switch(this.command.action){
      // if flag action is add...
      case 'add':
        // check that the type of payload is a string. if so, return true, else return false
        return typeof this.command.payload === 'string';

      case 'list':
        return true;

      case 'delete':
        return typeof this.command.payload === 'string';  

      // if action is not 'add', do nothing
      default:
        break;
    }
  }
}

// ========== EXPORT CONSTRUCTOR ==========
module.exports = Input;