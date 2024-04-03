class ProductService {
          validateProductData = (data) => {
                    const err = {};

                    const requiredFields = ['name', 'description', 'price', 'currency', 'quantity', 'category', 'branch', 'tags', 'stock_in', "stock_quantity", 'weight',
                              "image",
                              'dimension', 'shipping_methods', 'review', 'discount_price'];

                    requiredFields.forEach(field => {
                              if (!data[field]) {
                                        err[field] = `${field} is required`;
                              } else {
                                        delete err[field];
                              }
                    });

                    if (Object.keys(err).length === 0) {
                              return null
                    } else {
                              return err
                    }

          }
}