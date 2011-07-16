var products = [
{
	id: 1,
	name: 'MacBook Air',
	description: 'Apple 13 inch MacBook Air',
	price: 1800
},
{
	id: 2,
	name: '27 iMac',
	description: 'Apple 27 inch iMac Desktop',
	price: 2200
},
{
	id: 3,
	name: 'Mac Mini',
	description: 'Apple Mac Mini Desktop',
	price: 600
}
];

module.exports.all = products;

module.exports.find = function(id) {
	id = parseInt(id, 10);
	var found = null;
	productloop: for(product_index in products) {
		var product = products[product_index];
		if(product.id == id) {
			found = product;
			break productloop;
		}
	};
	return found;
}