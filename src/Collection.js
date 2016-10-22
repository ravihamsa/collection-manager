/**
 * Created by ravi.hamsa on 6/23/16.
 */

import EventEmitter from "events";


class Collection extends EventEmitter {
    constructor(array, config) {
        super(...arguments);
        config = config || {};
        this._array = array || [];
        this._currentIndex = 0;
        this._circular = config.circular || false;
        this._current = null;
    }

    _bump(diff) {
        if (this._validateDiff(diff)) {
            this._currentIndex = this._normalizeCircularIndex(this._currentIndex + diff);
            this.triggerChange();
        } else {
            console.log('element not available')
        }
    }

    _normalizeCircularIndex(index) {
        let arrayLength = this._array.length;
        return (index + arrayLength) % arrayLength;
    }

    _validateDiff(diff) {
        let newIndex = this._currentIndex + diff;
        if (this._circular) {
            newIndex = this._normalizeCircularIndex(newIndex);
        }
        return this._array[newIndex] !== undefined;
    }

    next() {
        this._bump(1)
    }

    prev() {
        this._bump(-1)
    }

    hasNext() {
        return this._validateDiff(1);
    }

    hasPrev() {
        return this._validateDiff(-1);
    }

    isEmpty() {
        return this._array.length === 0;
    }

    getActiveIndex() {
        return this._currentIndex;
    }

    getActiveElement() {
        return this._array[this._currentIndex];
    }

    getArray(){
        return this._array;
    }

    reset(array) {
        this._array = array;
        this._currentIndex = 0;
        this._current = null;
        this.triggerChange();
    }

    on(event, callback) {
        super.on(event, callback);
        var unsubscribe = () => {
            super.removeListener(event, callback);
        };
        return unsubscribe;
    }

    trigger() {
        this.emit.apply(this, arguments)
    }

    triggerChange() {
        let prevElement = this._current;
        let currElement = this.getActiveElement();
        this.trigger('change', currElement, prevElement);
        this._current = currElement;
    }
}

export default Collection;