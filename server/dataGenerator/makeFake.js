const faker = require('faker');
const fs = require('fs');
var a = require('./res44Tehama15.js');

// var column = ['apiKey',
//     'logoUrl',
//     'name',
//     'streetAddress',
//     'city',
//     'state',
//     'zip',
//     'foodTypes',
//     'phone',
//     'latitude',
//     'longitude',
//     'minFreeDelivery',
//     'taxRate',
//     'acceptsCash',
//     'acceptsCard',
//     'offersPickup',
//     'offersDelivery',
//     'isTestRestaurant',
//     'minWaitTime',
//     'maxWaitTime',
//     'open',
//     'url',
//     'hours',
//     'timezone'
// ]


var topTags = ['Good For A Date', 'Special Occasion', 'Authentic', 'Most Festive', 'Most Romantic', 'Great For Brunch',
    'Casual', 'Neighborhood Gem', 'Great for Infant', 'Great for Group', 'Fit For Foodies', 'Hole in the Wall',
    'Tasting Menu', 'Quiet Conversation'
];
var zipCodeNeighbor = {
    94102: 'Hayes Valley/Tenderloin/North of Market',
    94103: 'South of Market',
    94107: 'Potrero Hill',
    94108: 'Chinatown',
    94109: 'Polk/Russian Hill (Nob Hill)',
    94110: 'Inner Mission/Bernal Heights',
    94112: 'Ingelside-Excelsior/Crocker-Amazon',
    94114: 'Castro/Noe Valley',
    94115: 'Western Addition/Japantown',
    94116: 'Parkside/Forest Hill',
    94117: 'Haight-Ashbury',
    94118: 'Inner Richmond',
    94121: 'Outer Richmond',
    94122: 'Sunset',
    94123: 'Marina',
    94124: 'Bayview-Hunters Point',
    94127: 'St. Francis Wood/Miraloma/West Portal',
    94131: 'Twin Peaks-Glen Park',
    94132: 'Lake Merced',
    94133: 'North Beach/Chinatown',
    94134: 'Visitacion Valley/Sunnydale',
}
var paymentOptionsTags = ['AMEX', 'Discover', 'MasterCard', 'Visa'];
var diningStyleTags = ['Tie and Suit', 'Casual Dining', 'Business Casual'];
var diningStyleTags_l = diningStyleTags.length;

var dataDescription = a.map(function(i, idx) {
    // Restaurant top level description
    i.id = i.idx
    i.API = i.apiKey;
    i.star = Math.floor(Math.random() * 5);
    i.reviewCount = Math.floor(Math.random() * 600);
    i.priceLevel = Math.floor(Math.random() * 5);
    i.cuisine = i.foodTypes.filter(i => (i !== ''))[
        0
    ];
    i.topTags = topTags.filter((i) => (Math.random() < 0.13));
    i.description = faker.lorem.paragraphs();

    // Restaurant sidePanel description (LEFT)
    i.diningStyle = diningStyleTags[Math.floor((Math.random() * diningStyleTags_l))];
    i.website = faker.internet.url();
    i.paymentOptions = paymentOptionsTags.filter((i, idx) => (Math.random() < 0.66));;
    i.dressCode = i.diningStyle;
    i.chef = faker.name.findName();
    i.catering = (Math.random() < 0.4) ? faker.lorem.paragraphs() : 'No catering';
    i.privatePartyContact = faker.name.findName() + ': ' + faker.phone.phoneNumberFormat().slice(0,
        12);
    i.neighborhood = zipCodeNeighbor[i.zip] === undefined ? i.city : zipCodeNeighbor[i.zip];
    i.crossStreet = i.streetAddress.split(' ').filter(i => !Number(i) > 0).join(' ');
    return i;
})







fs.writeFile('res44Tehama.js', 'var dataDescription = [ ', (err, success) => {
    if (err) {
        throw err;
    } else {
        fs.appendFile('res44Tehama.js', JSON.stringify(a), function(err) {
            if (err) throw err;
            fs.appendFile('res44Tehama.js', ']; module.exports = dataDescription', function(err) {
                if (err) throw err;
            })
        });
    }
});

module.exports = dataDescription