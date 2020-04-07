'use strict';

const _ = require('lodash');

const usersExample = [
  { id: 1, name: 'Fong', age: 23, friendIds: [2, 3],height:176,weight:64 },
  { id: 2, name: 'Kevin', age: 40, friendIds: [1] ,height:176,weight:64 },
  { id: 3, name: 'Mary', age: 18, friendIds: [1],height:176,weight:64  }
];

class ExampleConnector {

  loadMe(index) {
    return usersExample[index];
  }

  loadFriends(friendIds) {
    return usersExample.filter(user => friendIds.includes(user.id));
  }

  loadHeight(parent,params) {
    const {unit} = params;
    if (!unit || unit === "CENTIMETRE") return parent.height;
    else if (unit === "METRE") return parent.height / 100;
    else if (unit === "FOOT") return parent.height / 30.48;
    throw new Error(`Height unit "${unit}" not supported.`);
  }
  loadweight(parent,params) {
    const { unit } = params;
      // 支援 default 值 KILOGRAM
      if (!unit || unit === "KILOGRAM") return parent.weight;
      else if (unit === "GRAM") return parent.weight * 100;
      else if (unit === "POUND") return parent.weight / 0.45359237;
      throw new Error(`Weight unit "${unit}" not supported.`);
  }
}
module.exports = ExampleConnector;

