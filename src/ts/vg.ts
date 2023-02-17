/*
1. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.
*/
export enum Sort {
  PRICE_ASCENDING = 'Stigande pris',
  PRICE_DECENDING = 'Sjunkande pris',
  NAME_ALPHABETIC = 'Alfabetisk ordning',
  NAME_ALPHABETIC_REVERSE = 'Omvänd alfabetisk ordning',
}

export class Product {
  constructor(
    public id: number,
    public name: string,
    public imageUrl: string[],
    public price: number,
    public description: string
  ) {}
}

export function sortProductsBy(sort: Sort, products: Product[]): Product[] {
  const copiedList: Product[] = [];
  products.forEach((product) => copiedList.push(product));

  if (sort === Sort.PRICE_ASCENDING) sortList('Price', copiedList);
  if (sort === Sort.PRICE_DECENDING) sortList('Price', copiedList).reverse();
  if (sort === Sort.NAME_ALPHABETIC) sortList('Name', copiedList);
  if (sort === Sort.NAME_ALPHABETIC_REVERSE)
    sortList('Name', copiedList).reverse();

  return copiedList;
}

export function sortList(
  whichAttribute: string,
  products: Product[]
): Product[] {
  if (whichAttribute === 'Price') {
    return products.sort((p1, p2) => p1.price - p2.price);
  } else {
    return products.sort((a, b) => 0 - (a.name < b.name ? 1 : -1));
  }
}

/*
  2. Refaktorera funktionen createProductHtml :)
  */
class Cart {
  addToCart(i: number) {
    console.log(`${i} Varför är jag tom?`);
  }
}

export function createProductHtml() {
  const cartList = getCartListFromStorage();
  const productList = getProductListFromStorage();

  let quantity = 0;
  for (let i = 0; i < cartList.length; i++) {
    quantity += cartList[i].quantity;
  }

  const floatingCart = document.getElementById(
    'floatingcartnumber'
  ) as HTMLElement;
  floatingCart.innerHTML = '' + quantity;

  for (let i = 0; i < productList.length; i++) {
    const dogproduct: HTMLDivElement = document.createElement('div');

    const dogImgContainer: HTMLDivElement = document.createElement('div');
    dogImgContainer.className = 'dogimgcontainer';
    dogproduct.appendChild(dogImgContainer);
    const dogImg: HTMLImageElement = createProductImage(i, dogImgContainer);

    const cartSymbolContainer: HTMLDivElement =
      createCartSymbolContainer(dogImgContainer);
    const cartSymbol: HTMLElement = createCartSymbol(cartSymbolContainer);

    createProductText(i, dogproduct);
    productList[i].productSpec = false;
    addEventListeners(dogImg, i, cartSymbol, cartSymbolContainer);
    createProductCategory(i, dogproduct);
  }

  const listastext = JSON.stringify(productList);
  localStorage.setItem('savedList', listastext);
  sessionStorage.clear();

  function createCartSymbol(cartSymbolContainer: HTMLDivElement) {
    const cartSymbol: HTMLElement = document.createElement('i');
    cartSymbol.className = 'bi bi-bag-plus';
    cartSymbolContainer.appendChild(cartSymbol);
    return cartSymbol;
  }

  function createCartSymbolContainer(dogImgContainer: HTMLDivElement) {
    const cartSymbolContainer: HTMLDivElement = document.createElement('div');
    cartSymbolContainer.className = 'cartSymbolContainer';
    dogImgContainer.appendChild(cartSymbolContainer);
    return cartSymbolContainer;
  }

  function getProductListFromStorage() {
    return JSON.parse(localStorage.getItem('savedList') || '[]');
  }

  function getCartListFromStorage() {
    return JSON.parse(localStorage.getItem('savedCartList') || '[]');
  }

  function createProductImage(i: number, dogImgContainer: HTMLDivElement) {
    const dogImg: HTMLImageElement = document.createElement('img');
    dogImg.src = productList[i].picture;
    dogImg.alt = productList[i].pictureAlt;
    dogImgContainer.appendChild(dogImg);
    return dogImg;
  }

  function addEventListeners(
    dogImg: HTMLImageElement,
    i: number,
    cartSymbol: HTMLElement,
    cartSymbolContainer: HTMLDivElement
  ) {
    dogImg.addEventListener('click', () => {
      productList[i].productSpec = !productList[i].productSpec;
      window.location.href = 'product-spec.html#backArrow';
      const listastext = JSON.stringify(productList);
      localStorage.setItem('savedList', listastext);
    });

    cartSymbol.addEventListener('click', () => {
      const cart = new Cart();
      cart.addToCart(i);
    });

    dogImg.addEventListener('mouseover', () => {
      cartSymbolContainer.classList.add('hover');
      dogImg.classList.add('hover');
    });

    dogImg.addEventListener('mouseout', () => {
      dogImg.classList.remove('hover');
      cartSymbolContainer.classList.remove('hover');
    });
  }

  function createProductText(i: number, dogproduct: HTMLDivElement) {
    const name: HTMLHeadingElement = document.createElement('h5');
    name.innerHTML = productList[i].name;
    dogproduct.appendChild(name);

    const price: HTMLHeadingElement = document.createElement('p');
    price.innerHTML = '$' + productList[i].price;
    dogproduct.appendChild(price);

    const info: HTMLHeadingElement = document.createElement('p');
    info.innerHTML = productList[i].info;
    dogproduct.appendChild(info);
  }

  function createProductCategory(i: number, dogproduct: HTMLDivElement) {
    const dogCategory: HTMLElement = document.getElementById(
      productList[i].category
    ) as HTMLElement;

    if (dogCategory) {
      dogCategory.className = 'dogproduct';
      dogCategory.appendChild(dogproduct);
    }
  }
}

/*
    3. Refaktorera funktionen getfromstorage
    */
export class CartProduct {
  constructor(
    public name: string,
    public image: string,
    public price: number,
    public amount: number
  ) {}
}

export function createCartHtml() {
  const cartItems = getCartProductsFromStorage();
  const amountcontainer = document.getElementById(
    'amount-checkout-container2'
  ) as HTMLDivElement;

  const amounttext: HTMLTableCellElement = document.createElement('th');
  amountcontainer.appendChild(amounttext);
  amounttext.innerHTML = 'amount:';

  const titlecontainer = document.getElementById(
    'title-container'
  ) as HTMLTableRowElement;
  titlecontainer.innerHTML = '<strong>products:</strong>';

  const productquantity = createProductQuantity();

  const checkoutTotalElement = createCheckoutTotal();

  for (let i = 0; i < cartItems.length; i++) {
    const amountqt: HTMLTableCellElement = createTableHeadings(i);
    createBtns(amountqt);
  }

  createTotalPrice();

  function createCheckoutTotal() {
    const checkoutTotalElement = document.getElementById(
      'title-total'
    ) as HTMLTableCellElement;
    const totaltext: HTMLTableCellElement = document.createElement('th');
    checkoutTotalElement.appendChild(totaltext);
    totaltext.innerHTML = 'total:';
    return checkoutTotalElement;
  }

  function createProductQuantity() {
    const productquantity = document.getElementById(
      'product-quantity'
    ) as HTMLTableRowElement;
    const qttext: HTMLTableCellElement = document.createElement('th');
    productquantity.appendChild(qttext);
    qttext.innerHTML = 'change quantity:';
    return productquantity;
  }

  function getCartProductsFromStorage() {
    return JSON.parse(localStorage.getItem('cartArray') || '[]');
  }

  function createTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
      totalPrice += cartItems[i].price *= cartItems[i].amount;
    }

    const totalPriceElement: HTMLTableCellElement =
      document.createElement('th');
    checkoutTotalElement.appendChild(totalPriceElement);
    totalPriceElement.innerHTML = totalPrice + '$';
    totalPriceElement.id = 'totalincenter';
  }

  function createTableHeadings(i: number) {
    const productt: HTMLTableCellElement = document.createElement('th');
    titlecontainer.appendChild(productt);
    productt.innerHTML = cartItems[i].name;
    productt.className = 'hej';

    const amountt: HTMLTableCellElement = document.createElement('th');
    amountcontainer.appendChild(amountt);
    amountt.innerHTML = 'x' + cartItems[i].amount;
    amountt.className = 'hej';

    const amountqt: HTMLTableCellElement = document.createElement('th');
    productquantity.appendChild(amountqt);
    return amountqt;
  }

  function createBtns(amountqt: HTMLTableCellElement) {
    const amountplusbtn: HTMLButtonElement = document.createElement('button');
    amountqt.appendChild(amountplusbtn);
    amountqt.className = 'hej';

    const icon: HTMLSpanElement = document.createElement('i');
    amountplusbtn.appendChild(icon);

    icon.className = 'fas fa-minus';
    amountplusbtn.className = 'plusbtn';

    const icon2: HTMLSpanElement = document.createElement('i');
    icon2.className = 'fas fa-plus';

    const amountminusbtn: HTMLButtonElement = document.createElement('button');
    amountqt.appendChild(amountminusbtn);
    amountminusbtn.appendChild(icon2);
    amountminusbtn.className = 'minusbtn';
  }
}
