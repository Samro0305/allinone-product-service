const API = "/api/products";

let editId = null;

/* ADD OR UPDATE PRODUCT */

function addProduct() {

const data = {
name: document.getElementById("name").value,
description: document.getElementById("description").value,
price: document.getElementById("price").value,
sku: document.getElementById("sku").value,
availability: document.getElementById("availability").value,
image: document.getElementById("image").value
};

if(editId){

fetch(API + "/" + editId,{
method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(data)
})
.then(()=>{
editId=null;
clearForm();
loadProducts();
});

}else{

fetch(API,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(data)
})
.then(()=>{
clearForm();
loadProducts();
});

}

}

/* LOAD PRODUCTS (ADMIN PAGE) */

function loadProducts(){

const list=document.getElementById("productList");
if(!list) return;

fetch(API)
.then(res=>res.json())
.then(data=>{

let html="";

data.forEach(p=>{

html+=`
<div class="card">

<img src="${p.image}" width="100">

<h3>${p.name}</h3>

<p>Price: ${p.price}</p>

<button onclick="editProduct(${p.id},'${p.name}','${p.description}','${p.price}','${p.sku}','${p.availability}','${p.image}')">
Edit
</button>

<button onclick="deleteProduct(${p.id})">
Delete
</button>

</div>
`;

});

list.innerHTML=html;

});

}

/* EDIT PRODUCT */

function editProduct(id,name,description,price,sku,availability,image){

editId=id;

document.getElementById("name").value=name;
document.getElementById("description").value=description;
document.getElementById("price").value=price;
document.getElementById("sku").value=sku;
document.getElementById("availability").value=availability;
document.getElementById("image").value=image;

window.scrollTo(0,0);

}

/* DELETE PRODUCT */

function deleteProduct(id){

fetch(API+"/"+id,{method:"DELETE"})
.then(()=>loadProducts());

}

/* CLEAR FORM */

function clearForm(){

document.getElementById("name").value="";
document.getElementById("description").value="";
document.getElementById("price").value="";
document.getElementById("sku").value="";
document.getElementById("availability").value="";
document.getElementById("image").value="";

}

/* SEARCH PRODUCTS */

let currentPage=1;

function search(page=1){

if(page<1) page=1;

currentPage=page;

let q=document.getElementById("searchBox").value;

fetch(`/api/products/search?q=${q}&page=${page}`)
.then(res=>res.json())
.then(data=>{

let html="";

data.results.forEach(p=>{

html+=`
<div class="card">

<img src="${p.image}" width="120">

<h3>${p.name}</h3>

<p>Price: ${p.price}</p>

<a href="product.html?id=${p.id}">
<button>View Details</button>
</a>

</div>
`;

});

html+=`
<br><br>
<button onclick="search(${currentPage-1})">Prev</button>
<button onclick="search(${currentPage+1})">Next</button>
`;

const results=document.getElementById("results");

if(results) results.innerHTML=html;

});

}

/* LOAD PRODUCTS WHEN PAGE OPENS */

loadProducts();