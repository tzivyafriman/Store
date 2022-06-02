const user=sessionStorage.getItem('currentUser');
if (!user)
location.href="login.html";

const addProduct=document.querySelector('#addProduct');
const formInsert=document.querySelector('#formInsert');

const insert=document.querySelector('#insert');
const inputName=document.querySelector('#name');
const inputPrice=document.querySelector('#price');
const inputQuantity=document.querySelector('#quantity');
const radioButtons = document.querySelectorAll('input[name="category"]');
const ourProducts = document.querySelector('#ourProducts');

const searchByName=document.querySelector('#searchByName');
const searchByPrice=document.querySelector('#searchByPrice');
const searchByOutOfStock=document.querySelector('#searchByOutOfStock');
const searchByAlsoOutOfStock=document.querySelector('#searchByAlsoOutOfStock');
const inputSearchByAlsoOutOfStock=document.querySelector('#inputSearchByAlsoOutOfStock');
const searchByCategory=document.querySelector('#searchByCategory');

const inputSearchName=document.querySelector('#inputSearchName');
const inputSearchPrice=document.querySelector('#inputSearchPrice');
const inputSearchPrice2=document.querySelector('#inputSearchPrice2');
const formUpdate=document.querySelector('#formUpdate');

let newProduct =document.createElement('div');
const quantityUpdate=document.querySelector('#quantityUpdate');
const priceUpdate=document.querySelector('#priceUpdate');
const nameUpdate=document.querySelector('#nameUpdate');
const update=document.querySelector('#update');
const categorieSearch=document.querySelector('#categorieSearch');
const resultSearch=document.querySelector('#resultSearch');


class Product{
  constructor(numOfProduct)
  {
    this.productName='',
    this.category='',
    this.price=0,
    this.quantity=0,
    this.code=numOfProduct;
    //console.log("this.productName: "+this.productName+",category: "+this.category+",this.price: "+this.price+" ,this.id:"+ this.id+",this.quantity: "+this.quantity)
  }
}

class Store{

  constructor()
  {
    this.numOfProduct=0;
    this.products=
    [
      {productName:"bread",category:"food",price:5,quantity:0},
      {productName:"milk",category:"food",price:20,quantity:200}
    ] 
  }
     
  showProducts()
  {
    s.products.forEach(p=>{
      ourProducts.append(p.productName+" ");
    })  
  }

addProduct (n,c,p,q)  {
      const pr = new Product(this.numOfProduct++);
      pr.productName=n;
      pr.category=c;
      pr.price=p;
      pr.quantity=q;
      this.products.push(pr);
      newProduct=document.createElement('div');
      newProduct.setAttribute('id','newProduct');
      newProduct.innerHTML=pr.productName;
      ourProducts.append(newProduct);
  }

  searchByName(n)
  {
     return this.products.filter(p => p.productName.includes(n)/* === "bread"*/);
  } 
  searchByPrice(s,b)
  {
    return this.products.filter(p => p.price> s && p.price<b );
  }
  searchByOutOfStock()
  {
     return this.products.filter(p => p.quantity==0);
  }
  searchByAlsoOutOfStock(f)
  {
    return this.products.filter(p => p.quantity < f)
  }
  searchByCategory(c)
  {
    return this.products.filter(p => p.category == c)
  }
}
  
const s=new Store();
s.showProducts();

var editMe;

let c = " ";

addProduct.onclick=()=>{
  if(user==0)
  {
    formInsert.style='display: block';
  }else
  {
      alert('not posability! you dont manager!');
  }
}

insert.onclick=()=>
{
  if(user==0)
  {
    formInsert.style.color='green';
    for (const radioButton of radioButtons) 
    {
        if (radioButton.checked) 
        {
            c = radioButton.value;
            break;
        }
    }
    s.addProduct(inputName.value,c,inputPrice.value,inputQuantity.value); 
    formInsert.style='display: none';
  }else
  {
      alert('not possible! you dont manager!');
  }
}

let editMe2;
ourProducts.onclick=()=>{
  if(user==0)
  {
    editMe=newProduct.innerHTML;
    editMe2=s.searchByName(newProduct.innerHTML)[0];
    formUpdate.style='display:block';
    nameUpdate.setAttribute('value',newProduct.innerHTML);
    quantityUpdate.setAttribute('value',editMe2.quantity);
    priceUpdate.setAttribute('value',editMe2.price);
  }else{
    alert('not possible! you dont manager!');
  }
}

update.onclick=()=>
{
  if(user==0)
  {
  editMe2=s.searchByName(newProduct.innerHTML)[0];
  editMe2.productName=nameUpdate.value;
  editMe2.price=priceUpdate.value;
  editMe2.quantity=quantityUpdate.value;
  formUpdate.style='display: none';
  s.searchByName(newProduct.innerHTML)[0]=editMe2;
  }else{
    alert('not possible! you dont manager!');
  }
};

searchByName.onclick=()=>{
  resultSearch.innerHTML=' ';
  s.searchByName(inputSearchName.value).forEach(p=>{
    resultSearch.append("code: "+p.code+" "+p.productName+"|| "+p.category+"|| "+p.price+"|| "+p.quantity+"-------------");
  });
}
searchByPrice.onclick=()=>{
  resultSearch.innerHTML=' ';
  s.searchByPrice(inputSearchPrice.value,inputSearchPrice2.value).forEach(p=>{
    resultSearch.append(p.productName+"|| "+p.category+"|| "+p.price+"|| "+p.quantity+"-------------");
});
}
searchByOutOfStock.onclick=()=>{
  resultSearch.innerHTML=' ';
  s.searchByOutOfStock().forEach(p=>{
    resultSearch.append(p.productName+"|| "+p.category+"|| "+p.price+"|| "+p.quantity+"-------------");
  });
}
searchByAlsoOutOfStock.onclick=()=>{
  resultSearch.innerHTML=' ';
  s.searchByAlsoOutOfStock(inputSearchByAlsoOutOfStock.value).forEach(p=>{
    resultSearch.append(p.productName+"|| "+p.category+"|| "+p.price+"|| "+p.quantity+"-------------");
  })
}
let searchBy;
categorieSearch.onchange=()=>
{
    if(categorieSearch.selectedIndex === 0) 
    searchBy="shoes";
    if(categorieSearch.selectedIndex === 1) 
    searchBy="drink";
    if(categorieSearch.selectedIndex === 2)
    searchBy="toys";
    if(categorieSearch.selectedIndex === 3)
    searchBy="food";
}
searchByCategory.onclick=()=>{
  resultSearch.innerHTML=' ';
  s.searchByCategory(searchBy).forEach(p=>{
    resultSearch.append(p.productName+"|| "+p.category+"|| "+p.price+"|| "+p.quantity+"-------------");
  });
}




  