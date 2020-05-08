let carts = document.querySelectorAll('.add-to-cart-btn');

let products=[
  { name:'Product 1',
    tag: 'product1',
    price:150,
    inCart:0
},
{ name:'Product 2',
  tag: 'product2',
  price:150,
  inCart:0
},
{ name:'Product 3',
  tag: 'product3',
  price:150,
  inCart:0
},
{ name:'Product 4',
  tag: 'product4',
  price:150,
  inCart:0
}
];


for (let i=0; i<carts.length; i++){
  carts[i].addEventListener('click',()=>{
    cartNumbers(products[i]);
    totalCost(products[i]);
  })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
    document.querySelector('#cart-count').textContent=productNumbers;

    }
}

function cartNumbers(product){

  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers=parseInt(productNumbers);
  if(productNumbers){
    localStorage.setItem('cartNumbers',productNumbers+1);
    document.querySelector('#cart-count').textContent=productNumbers+1;
  }else{
    localStorage.setItem('cartNumbers',1);
    document.querySelector('#cart-count').textContent=1;
  }
 setItems(product);
}

function setItems(product){
 let cartItems = localStorage.getItem('productsInCart');
 cartItems=JSON.parse(cartItems);


 if(cartItems!=null){
   if(cartItems[product.tag] ==undefined){
     cartItems = {
       ...cartItems,
       [product.tag]:product
     }
   }
   cartItems[product.tag].inCart += 1;
 }else{
     product.inCart = 1;
     cartItems={
     [product.tag]:product
  }
  }
  localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}

function totalCost(product){
  // console.log("es",product.price);
 let cartCost = localStorage.getItem('totalCost');



 if(cartCost!=null){
    cartCost = parseInt(cartCost);
   localStorage.setItem("totalCost", cartCost+product.price);
 }else{
   localStorage.setItem("totalCost", product.price);
 }

}

function displayCart(){
  let cartItems=localStorage.getItem("productsInCart");
  cartItems=JSON.parse(cartItems);
  let productContainer=document.querySelector(".products");
  let cartCost = localStorage.getItem('totalCost');


  if(cartItems && productContainer){
    productContainer.innerHTML='';
    Object.values(cartItems).map(item=>{
      productContainer.innerHTML += `
      <div class="cart-table clearfix">
      <table class="table table-responsive">

          <tbody>
              <tr>

                  <td class="cart_product_img">
                      <a href="#"><img src="../img/product-img/${item.tag}.PNG" alt="Product"></a>
                  </td>
                  <td class="cart_product_desc">
                      <h5>${item.name}</h5>
                  </td>
                  <td class="price">
                      <span>  ₹${item.price}</span>
                  </td>
                  <td class="qty">
                      <div class="qty-btn d-flex">
                          <p>Qty</p>
                          <div class="quantity">
                              <span class="qty-minus" onclick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty ) &amp;&amp; qty &gt; 1 ) effect.value--;return false;"><i class="fa fa-minus" aria-hidden="true"></i></span>
                              <input type="number" class="qty-text" id="qty" step="1" min="1" max="300" name="quantity" value="1">
                              <span class="qty-plus" onclick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty )) effect.value++;return false;"><i class="fa fa-plus" aria-hidden="true"></i></span>
                          </div>
                      </div>
                  </td>
              </tr>


          </tbody>
      </table>
      </div>
      `
    });

 productContainer.innerHTML+=`

 <div class="col-12 col-lg-4">
 <button type="submit" name="updatecart" value="5" class="btn amado-btn " style="margin-top:2rem; margin-left:4rem;">Update Cart</button>
     <div class="cart-summary">
         <h5>Cart Total</h5>
         <ul class="summary-table">

             <li><span>delivery:</span> <span>Free</span></li>
             <li><span>total:</span> <span>₹${cartCost}</span></li>
         </ul>
         <div class="cart-btn mt-100">
             <a href="cart.html" class="btn amado-btn w-100">Checkout</a>
         </div>
     </div>
 </div>
 `

  }

}
onLoadCartNumbers();
displayCart();


let removeItemIcon = document.querySelectorAll('.fa-trash');
for (let i=0; i<removeItemIcon.length; i++){
  removeItemIcon[i].addEventListener('click',()=>{
    removeItemIcon[i].parentElement.parentElement.remove();


  })
}
