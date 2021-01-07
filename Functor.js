// 组合
const compose = function (f, g) {
    return function (x) {
        return f(g(x))
    }
}

function add(x, y) {
    return x + y
}

const addX = function (y) {
    return function (x) {
        return x + y
    };
}

// addX(2)(1)

class Functor {
    constructor(val) {
        this.val = val
    }

    map(f) {
        return new Functor(f(this.val))
    }
}

Functor.of = function (val) {
    return new Functor(val)
}
// (new Functor(2)).map(_ => _ + 2)
// Functor.of(2).map(_ => _ + 2).map(_ => _ * 3)

class Maybe extends Functor {
    map(f) {
        console.log(this.val)
        return this.val ? Maybe.of(f(this.val)) : Maybe.of(null);
    }
}
Maybe.of = function (val) {
    return new Maybe(val)
}
// Maybe.of(null).map(_ => _.toUpperCase())

class Either extends Functor {
    constructor(left, right) {
        super(right)
        this.left = left
        this.right = right
    }

    map(f) {
        return this._right ?
            Either.of(this._left, f(this._right)) :
            Either.of(f(this._left), this._right);
    }
}
Either.of = function (left, right) {
    return new Either(left, right)
}

class Ap extends Functor {
    ap(F) {
        return Ap.of(this.val(F.val));
    }
}
Ap.of = function (val) {
    return new Ap(val)
}

class Monad extends Functor {
    join() {
        return this.val;
    }
    flatMap(f) {
        return this.map(f).join();
    }
}
Monad.of = function (val) {
    return new Monad(this.val)
}