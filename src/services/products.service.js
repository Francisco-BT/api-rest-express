const faker = require('faker');
const boom = require('boom');

const sequelize = require('../lib/sequelize');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;

    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price()),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = { id: faker.datatype.uuid(), ...data };
    this.products.push(newProduct);

    return newProduct;
  }

  async find() {
    const [data] = await sequelize.query('SELECT * FROM tasks;');

    return data;
  }

  async findOne(id) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw boom.notFound('product not found');
    }

    if (product.isBlock) {
      throw boom.conflict('product is block');
    }

    return product;
  }

  async update(id, data) {
    let product = await this.findOne(id);

    product.name = data.name || product.name;
    product.price = data.price || data.price === 0 ? data.price : product.price;
    product.image = data.image || product.image;

    return product;
  }

  async delete(id) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex === -1) {
      throw boom.notFound('product not found');
    }

    this.products.splice(productIndex, 1);

    return { id };
  }
}

module.exports = ProductsService;
