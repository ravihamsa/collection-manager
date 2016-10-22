# collection-manager

Collection manager to handle next-prev operations on array
 
#Usage

```javascript


var Collection = require('../dist/Collection').default;
var collection = new Collection([1, 2, 3, 4, 5, 6])

console.log(collection.getActiveElement()); //1

collection.on('change', function (active, prevActive) {
    console.log(active);
})


collection.next(); //2
collection.next(); //3
collection.next(); //4
collection.next(); //5
collection.next(); //6
collection.next(); //element not available
collection.prev(); //5



```