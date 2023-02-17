import './../scss/main.scss';
import * as g from './g';
import * as vg from './vg';

const jumpsInMeters = [2, 1, 3, 4, 1];
console.log(g.getLength(jumpsInMeters));

const studentSebastian = new g.Student('Sebastian', true);
console.log(g.getStudentStatus(studentSebastian));

const citys = [
  new g.City('Stockholm', new Date(), 12),
  new g.City('Stockholm', new Date(), 22),
  new g.City('Stockholm', new Date(), 32),
  new g.City('Stockholm', new Date(), 3),
  new g.City('Stockholm', new Date(), 15),
  new g.City('Stockholm', new Date(), 1),
  new g.City('Stockholm', new Date(), -10),
];

console.log(g.averageWeeklyTemperature(citys));

const chocolateIcecream = new g.Product(
  'Chocolate Icecream',
  15,
  5,
  'Taste of yumyum',
  'https://kids.kiddle.co/images/thumb/e/ea/Ice_cream_cone_%28cropped%29.jpg/410px-Ice_cream_cone_%28cropped%29.jpg',
  document.querySelector('body') as HTMLBodyElement
);

g.showProduct(chocolateIcecream);

const students = [
  new g.Student('Alen', true),
  new g.Student('Sebastian', true),
  new g.Student('Gustav', false),
];
g.presentStudents(students);

console.log(g.concatenateStrings());

const newUser = new g.User(
  'Alen',
  new Date(1994, 3 - 1, 11),
  'test@test,com',
  'qwerty'
);
g.createUser(newUser);

// VG

const products = [
  new vg.Product(1, 'B', [''], 15, 'yumyum'),
  new vg.Product(1, 'D', [''], 15, 'yumyum'),
  new vg.Product(1, 'A', [''], 20, 'yumyum'),
  new vg.Product(1, 'C', [''], 10000, 'yumyum'),
  new vg.Product(1, 'C', [''], 100, 'yumyum'),
  new vg.Product(1, 'C', [''], 120, 'yumyum'),
];

console.log(vg.sortProductsBy(vg.Sort.PRICE_DECENDING, products));

console.log(vg.sortList('Price', products));

const cartList = [
  { quantity: 15 },
  { quantity: 10 },
  { quantity: 5 },
  { quantity: 15 },
];
const cartListToJSON = JSON.stringify(cartList);
localStorage.setItem('savedCartList', cartListToJSON);

const productsToJSON = JSON.stringify(products);
localStorage.setItem('savedList', productsToJSON);
vg.createProductHtml();

const cartProducts = [
  new vg.CartProduct('A', '', 15, 10),
  new vg.CartProduct('A', '', 15, 10),
  new vg.CartProduct('A', '', 15, 10),
  new vg.CartProduct('A', '', 15, 10),
];
const cartToJSON = JSON.stringify(cartProducts);
localStorage.setItem('cartArray', cartToJSON);
vg.createCartHtml();
