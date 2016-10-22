/**
 * Created by ravi.hamsa on 6/23/16.
 */

var Collection = require('../dist/Collection').default;
var collection = new Collection([1, 2, 3, 4, 5, 6])

console.log(collection.getActiveElement()); //1

collection.on('change', function (active, prevActive) {
    console.log(active);
})


collection.next();
collection.next();
collection.next();
collection.next();
collection.next();
collection.next();
collection.next();