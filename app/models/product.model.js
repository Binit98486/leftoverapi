const mongoose = require("mongoose");

const ProductSchemaDef = new mongoose.Schema({
          name: {
                    type: String,
                    required: true,
          },
          description: {
                    type: String,
                    required: true,
          },
          price: {
                    type: Number,
                    required: true,
          },
          currency: {
                    type: String,
                    required: true,
          },
          quantity: {
                    type: Number,
                    required: true,
          },
          category: {
                    type: String,
          },
          brand: {
                    type: String,
          },
          tags: {
                    type: String,
          },
          image: {
                    type: String,
          },
          variants: {
                    type: [String],
          },
          stock_quantity: {
                    type: Number,
          },
          in_stock: {
                    type: Boolean,
                    default: true,
          },
          weight: {
                    type: Number,
          },
          dimensions: {
                    type: {
                              length: Number,
                              width: Number,
                              height: Number,
                    },
          },
          shipping_methods: {
                    type: [String],
          },
          status: {
                    type: String,
                    enum: ['active', 'inactive'],
                    default: 'inactive',
          },
          availability: {
                    type: String,
                    enum: ['in stock', 'out of stock'],
                    default: 'out of stock',
          },
          publish_date: {
                    type: Date,
                    default: Date.now,
          },
          metadata: {
                    type: mongoose.Schema.Types.Mixed,
          },
          reviews: [
                    {
                              user: {
                                        type: mongoose.Schema.Types.ObjectId,
                                        ref: 'User',
                              },
                              rating: {
                                        type: Number,
                              },
                              comment: {
                                        type: String,
                              },
                              date: {
                                        type: Date,
                                        default: Date.now,
                              },
                    },
          ],
          discount_price: {
                    type: Number,
          },
          discount_percentage: {
                    type: Number,
          },
          related_products: [
                    {
                              type: mongoose.Schema.Types.ObjectId,
                              ref: 'Product',
                    },
          ],
});

const ProductModel = mongoose.model("Product", ProductSchemaDef);

module.exports = ProductModel;
