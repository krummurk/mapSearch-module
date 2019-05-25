const mongoose = require('mongoose'); // mongod --config /usr/local/etc/mongod.conf
const Promise = require('bluebird')
mongoose.connect('mongodb://localhost/fetcher2');
var MenuSchema = mongoose.Schema({
    name: String,
    description: String,
    menus: [{
        name: String,
        description: String,
        items: [{
            name: String,
            description: String,
            basePrice: Number,
            modifiers: [{
                name: String,
                price: Number,
            }]
        }],
    }]
});
var RestaurantSchema = mongoose.Schema({
    apiKey: Number,
    logoUrl: String,
    name: String,
    streetAddress: String,
    city: String,
    state: String,
    zip: String,
    foodTypes: [String],
    phone: String,
    latitude: Number,
    longitude: Number,
    acceptsCash: Boolean,
    acceptsCard: Boolean,
    offersPickup: Boolean,
    offersDelivery: Boolean,
    isTestRestaurant: Boolean,
    minWaitTime: String,
    maxWaitTime: String,
    open: Boolean,
    url: String,
    hours: String,
    timezone: String,
    API: String,
    star: Number,
    reviewCount: Number,
    priceLevel: Number,
    cuisine: String,
    topTags: [String],
    description: String,
    diningStyle: String,
    website: String,
    paymentOptions: [String],
    dressCode: String,
    chef: String,
    catering: String,
    privatePartyContact: String,
    neighborhood: String,
    crossStreet: String,
    menus: [MenuSchema]
});
var Restaurant = mongoose.model('Restaurant', RestaurantSchema);


// mongoose need the schema to work properly 
// https://stackoverflow.com/questions/21429630/querying-a-collection-without-passing-schema-in-mongoose
var res = function(q, cb) {
    console.log('q=', q);
    Restaurant.find({ name: q }, (err, data) => {
        if (err) {
            cb(err, null)
        } else {
            cb(null, data);
        }
    });
}
var allres = function(n, cb) {
    console.log(n);
    Restaurant.find({'neighborhood': n}, (err, data) => {
        console.log(data.length)
        if (err) {
            cb(err, null)
        } else {
            cb(null, data);
        }
    });
} 
module.exports.res = res;
module.exports.allres = allres;