const db = require("../db");

exports.getAllProducts = (callback)=>{
 db.all("SELECT * FROM products",callback);
};

exports.createProduct = (product,callback)=>{
 const {name,description,price,sku,availability,image}=product;

 db.run(
  `INSERT INTO products(name,description,price,sku,availability,image)
  VALUES(?,?,?,?,?,?)`,
  [name,description,price,sku,availability,image],
  callback
 );
};

exports.deleteProduct = (id,callback)=>{
 db.run("DELETE FROM products WHERE id=?",[id],callback);
};

exports.updateProduct = (id,product,callback)=>{
 const {name,description,price,sku,availability,image}=product;

 db.run(
 `UPDATE products SET name=?,description=?,price=?,sku=?,availability=?,image=? WHERE id=?`,
 [name,description,price,sku,availability,image,id],
 callback
 );
};

exports.searchProducts = (q, page, callback) => {

const limit = 5;   // products per page
const offset = (page - 1) * limit;

db.all(
`SELECT * FROM products 
 WHERE name LIKE ? 
 LIMIT ? OFFSET ?`,
[`%${q}%`, limit, offset],
callback
);

};