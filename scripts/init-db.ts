const ColorName = {
  White: 'white',
  CyanCornflowerBlue: 'cyanCornflowerBlue',
  BrightYellow: 'brightYellow',
  Linen: 'linen',
  SpaceCadet: 'spaceCadet',
  DavysGrey: 'davysGrey',
  Apple: 'apple',
  Pistachio: 'pistachio',
  Sunglow: 'sunGlow',
  DeepSaffron: 'deepSaffron',
  Black: 'black',
};

declare let Mongo;

/**
 *
 * This script is used to initialize the mongo database
 * with our default collections and seeded data.
 * Author: Tyler Beck
 */

const conn = new Mongo('localhost');
const db = conn.getDB('hom');

/**
 * Different bases for sandwiches / hoagies
 */
const SOFT_ROLL = 'softRoll';
const HARD_ROLL = 'hardRoll';
const WRAP = 'wrap';
const KETO = 'keto';

/**
 * Different types of "condiments"
 */
const VEGETABLE = 'vegetable';
const CONDIMENT = 'condiment';

/**
 * Different subtypes of condiments
 */
const DRESSING = 'dressing';

db.inventory.remove({});
db.inventory.insertMany([
  {name: SOFT_ROLL, value: 0},
  {name: HARD_ROLL, value: 0},
  {name: WRAP, value: 0},
  {name: KETO, value: 0},
]);

db.bread.remove({});
db.bread.insertMany([{name: SOFT_ROLL}, {name: HARD_ROLL}, {name: WRAP}, {name: KETO}]);

db.cheese.remove({});
db.cheese.insertMany([
  {name: 'Mild Provolone'},
  {name: 'Sharp Provolone'},
  {name: 'American'},
  {name: 'Mozzarella'},
  {name: 'Cheese Wiz'},
  {name: 'Swiss'},
  {name: 'Pepperjack'},
]);

db.condiment.remove({});
db.condiment.insertMany([
  // condiments
  {name: 'Mayo', type: CONDIMENT},
  {name: 'Oil', type: CONDIMENT},
  {name: 'Vinegar', type: CONDIMENT},
  {name: 'Spices', type: CONDIMENT},
  {name: 'Horseradish', type: CONDIMENT},
  {name: 'Black Olives', type: CONDIMENT},
  {name: 'Pickle', type: CONDIMENT},
  {name: 'Cole Slaw', type: CONDIMENT},
  {name: 'Russian Dressing', type: CONDIMENT, subtype: DRESSING},
  {name: 'Ranch Dressing', type: CONDIMENT, subtype: DRESSING},
  // vegetables
  {name: 'Lettuce', type: VEGETABLE},
  {name: 'Tomato', type: VEGETABLE},
  {name: 'Onion', versions: ['Sliced', 'Diced'], type: VEGETABLE},
]);

db.setting.remove({});
db.setting.insertMany([{key: 'ADDRESS', value: '601 W MAIN ST PALMYRA, PA 17078'}]);

db.category.remove({});
db.category.insertMany([
  {name: 'Hoagies', color: ColorName.Apple},
  {name: 'Burgers', color: ColorName.DeepSaffron},
  {name: 'Sides', color: ColorName.Pistachio},
  {name: 'Cheesesteaks', color: ColorName.CyanCornflowerBlue},
  {name: 'Chicken', color: ColorName.Sunglow},
]);
