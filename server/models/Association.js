const User = require('./User')
const Order = require('./Order')
const Product = require('./Product')
const ProductInOrder = require('./ProductInOrder')
const Message = require('./Message')
const Event = require('./Event')
const Category = require('./Category')

// user & order
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// user & product
User.hasMany(Product, { foreignKey: 'sellerId', as: 'productsOnSale' });
Product.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });


// user & msg
User.hasMany(Message, { foreignKey: 'fromUserId', as: 'sentMessages' });
User.hasMany(Message, { foreignKey: 'toUserId', as: 'receivedMessages' });
Message.belongsTo(User, { foreignKey: 'fromUserId', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'toUserId', as: 'receiver' });

// product & pio & order
Product.hasMany(ProductInOrder, { foreignKey: 'productId' });
ProductInOrder.belongsTo(Product, { foreignKey: 'productId' });
Order.hasMany(ProductInOrder, { foreignKey: 'orderId' });
ProductInOrder.belongsTo(Order, { foreignKey: 'orderId' });

// product & category
Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

// msg & product & order
Message.belongsTo(Product, { foreignKey: 'productId' });
Message.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = {User, Product, Order, ProductInOrder, Message, Event, Category}