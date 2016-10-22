/**
 * Created by ravi.hamsa on 6/24/16.
 */

var chai = require('chai'),  should = chai.should(), expect = chai.expect ,
    Collection = require('../dist/Collection').default;


var dataItems = [{id:1, name:'name'}, {id:2, name:'two'}, {id:3, name:'three'}];

describe('#non circular', function() {

    it('first element becomes active object', function(){
        var collection = new Collection(dataItems);
        expect(collection.getActiveElement()).to.equal(dataItems[0])
    })

    it('next set active element to second element', function(){
        var collection = new Collection(dataItems);
        collection.next();
        expect(collection.getActiveElement()).to.equal(dataItems[1])
    })

    it('next and prev set active element to first element', function(){
        var collection = new Collection(dataItems);
        collection.next();
        collection.prev();
        expect(collection.getActiveElement()).to.equal(dataItems[0])
    })
})


describe('#circular', function() {


    it('next beyond length returns first element', function(){
        var collection = new Collection(dataItems, {circular:true});
        collection.next();
        collection.next();
        collection.next();
        expect(collection.getActiveElement()).to.equal(dataItems[0])
    })

})
