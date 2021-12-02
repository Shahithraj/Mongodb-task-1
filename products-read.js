// Task-1

// 1.Find all the information about each products

db.products.find({});

// 2.Find the product price which are between 400 to 800

db.products.find({ product_price: { $gt: 400, $lt: 800 } });

// 3.Find the product price which are not between 400 to 600

db.products.find({
  $or: [{ product_price: { $lte: 400 } }, { product_price: { $gte: 600 } }],
});

// 4.List the four product which are greater than 500 in price

db.products.find({ product_price: { $gt: 500 } }).limit(4);

// 5.Find the product name and product material of each products

db.products.find({}, { product_name: 1, product_material: 1, _id: 0 });

// 6.Find the product with a row id of 10

db.products.find({ id: "10" });

// 7.Find only the product name and product material

db.products.find({}, { id: 0, product_price: 0, _id: 0, product_color: 0 });

db.products.find({}, { product_name: 1, product_material: 1, _id: 0 });

// 8.Find all products which contain the value of soft in product material

db.products.find({ product_material: "Soft" });

// 9.Find products which contain product color indigo  and product price 492.00

db.products.find({ product_color: "indigo", product_price: "492.00" });

// 10.Delete the products which product price value are same

db.products
  .aggregate([
    {
      $group: { _id: { product_price: "$product_price" }, count: { $sum: 1 } },
    },
    { $match: { count: { $gt: 1 } } },
  ])
  .forEach((element) => {
    db.products.remove({ product_price: element._id.product_price });
  });
