const API = "/api/products";

/* ADD PRODUCT */

function addProduct() {

fetch(API, {
method: "POST",
headers: { "Content-Type": "application/json" },

body: JSON.stringify({
name: document.getElementById("name").value,
description: document.getElementById("description").value,
price: document.getElementById("price").value,
sku: document.getElementById("sku").value,
availability: document.getElementById("availability").value,
image: document.getElementById("image").value
})

}).then(() => loadProducts());

}

/* LOAD PRODUCTS (ADMIN PAGE) */

function loadProducts() {

const list = document.getElementById("productList");

if (!list) return;   // prevents error in other pages

fetch(API)
.then(res => res.json())
.then(data => {

let html = "";

data.forEach(p => {

html += `
<div class="card">

<img src="${p.image}" width="100">

<h3>${p.name}</h3>

<p>Price: ${p.price}</p>

<button onclick="deleteProduct(${p.id})">Delete</button>

</div>
`;

});

list.innerHTML = html;

});

}

/* DELETE PRODUCT */

function deleteProduct(id) {

fetch(API + "/" + id, { method: "DELETE" })
.then(() => loadProducts());

}

/* SEARCH PRODUCTS */

let currentPage = 1;

function search(page = 1) {

if (page < 1) page = 1;

currentPage = page;

let q = document.getElementById("searchBox").value;

fetch(`/api/products/search?q=${q}&page=${page}`)
.then(res => res.json())
.then(data => {

let html = "";

data.results.forEach(p => {

html += `
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

html += `
<br><br>
<button onclick="search(${currentPage-1})">Prev</button>
<button onclick="search(${currentPage+1})">Next</button>
`;

const results = document.getElementById("results");

if (results) results.innerHTML = html;

});

}

/* LOAD PRODUCTS WHEN PAGE OPENS */

loadProducts();