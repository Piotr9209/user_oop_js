! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).uuidv4 = e()
}(this, (function () {
    "use strict";
    var t = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto),
        e = new Uint8Array(16);

    function o() {
        if (!t) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
        return t(e)
    }
    for (var n = [], r = 0; r < 256; ++r) n.push((r + 256).toString(16).substr(1));
    return function (t, e, r) {
        var u = (t = t || {}).random || (t.rng || o)();
        if (u[6] = 15 & u[6] | 64, u[8] = 63 & u[8] | 128, e) {
            r = r || 0;
            for (var d = 0; d < 16; ++d) e[r + d] = u[d];
            return e
        }
        return function (t, e) {
            var o = e || 0;
            return (n[t[o + 0]] + n[t[o + 1]] + n[t[o + 2]] + n[t[o + 3]] + "-" + n[t[o + 4]] + n[t[o + 5]] + "-" + n[t[o + 6]] + n[t[o + 7]] + "-" + n[t[o + 8]] + n[t[o + 9]] + "-" + n[t[o + 10]] + n[t[o + 11]] + n[t[o + 12]] + n[t[o + 13]] + n[t[o + 14]] + n[t[o + 15]]).toLowerCase()
        }(u)
    }
}));

// Obiekt charakteryzujący koszyk:
//     Ma mieć: listę wybranych przedmiotów, rabat % na koszyk, kod rabatowy
// Ma umożliwiać: dodawanie / usuwanie przedmiotów do /z koszyka, podliczać cene, podliczać ilośc
//     brac pod uwagę rabat oraz kod rabatowy jeśli istnieje(ma istnieć)

// Obiekt charakteryzujący przedmiot:
//     Ma miec: Nazwę, Kategorię, Cenę, Rabat % na przedmiot, id
// Ma umożliwiać: Tworzenie obiektu, wyświetlac o nim informacji(w odpowiedniej formie),
//     modyfikować cenę przedmiotu, określać jego rabat %



class Validator {

    static isEmptyString = (stringLikeValue) => {
        const notaString = typeof stringLikeValue !== 'string'
        const lengthIsNotZero = stringLikeValue.length !== 0

        const cond = (notaString || lengthIsNotZero)
        if (!cond) throw new Error('Params must be string')
    }

    static isEmptyNumber = (stringLikeValue) => {
        if (typeof stringLikeValue !== 'number') {
            throw new Error('discount must be number')
        }
    }

    static isProduct = (value) => {
        return value instanceof Product;
    }
}

class ShoppingCart {
    constructor() {
        this.listProduct = [];
    }

    // uwzglednij sprawdzenie czy dany produkt istnieje w koszyku. jesli istnieje w koszysku ma polaczyc metode countQuantity
    addProducts = (...products) => {
        products.forEach(product => {
            if (!Validator.isProduct(product)) {
                return false;
            }
            this.listProduct.push(product);
        })



        //wyliczaj cene na biezace, oraz ilosci w koszyku oraz sume rabat w koszyku - dorobić to
    }

    deleteProduct = (uuid) => {
        // Validator.isEmptyString(uuid);
        console.log(this.listProduct);
        //kod od 78 do 85 - zamienic na reduce jako jedna petla
        // const product = this.listProduct.find(productItem => productItem.uuid === uuid);

        // if (product) {
        //     const products = this.listProduct.filter(productItem => {
        //         return productItem.uuid !== product.uuid;
        //     })
        //     this.listProduct = products;
        // } else {
        //     return `args not found`
        // }

        return this.listProduct.reduce((acu, cur) => {
            if (cur.uuid !== uuid) {
                console.log(acu);
                console.log(cur);
            }
        }, [])

    }

    countQuantity = () => {
        console.log(this.listProduct);

        return this.listProduct.reduce((acu, cur) => {

            console.log(acu, cur.price)

            return (

                acu[cur.price] = acu + cur.price
                // quantity += acu + cur.quantity,
                // discount += acu + cur.discount
            )
            return price = acu.price + cur.price
        }, {
            price: 0,
            quantity: 0,
            discount: 0
        })

    }




    countPrice = (discountCode) => {
        const arrayDiscountCode = ['rabat5', 'rabat10', 'rabat11', 'rabat20'];
        //przechwytywac rabat od stringa z rabatami np rabat5 = 5%, rabat 15=15%, uzyj regexpa do tego

        // const scoutDiscountCodeInArray = arrayDiscountCode.includes(discountCode);

        //postaraj sie zrobic rabat 5,10,11
        //zrobic jedna metode 'countPrice' lub 'sumPrice' i wyciagnac z niej wszystkie illsci takie jak - suma cen przed rabatem, suma cen po rabacie, % rabatu, ilosci


        const arrayPrice = this.listProduct.map(price => price.price)
        const resultPrice = arrayPrice.reduce((acu, cur) => {
            return acu + cur;
        })

        if (discountCode === undefined && resultPrice < 35) {
            return resultPrice;
        }
        if (discountCode === undefined && resultPrice > 35 && resultPrice < 50) {
            return `brakuje Ci ${50 - resultPrice} zł do skorzystania z rabatu. dodaj jeszcze jeden produkt`
        }
        if (discountCode === undefined && resultPrice > 50) {
            return `przekroczyłeś kwotę ${resultPrice}, mozesz skorzystać z rabatu jak zapiszesz się do newslettera, na meila otrzymasz kod rabatowy`
        }
        if (discountCode !== undefined && resultPrice < 50) {
            if (arrayDiscountCode.indexOf(discountCode)) {
                return `zly kod rabatowy, kwota do zaplaty to: ${resultPrice}`
            }
            return `kwota ${resultPrice} nie upowaznia do skorzystania z rabatu`
        }
        if (discountCode !== undefined && resultPrice > 50) {
            if (arrayDiscountCode.indexOf(discountCode)) {
                return `zly kod rabatowy, kwota do zaplay to: ${resultPrice}`
            }
            return `brawo uzyskales rabat ${resultPrice * 0.95}`
        }
    }
}


class Product {
    constructor(name, category, price, discount = 0, quantity = 1) {
        Validator.isEmptyString(name);
        Validator.isEmptyString(category);
        Validator.isEmptyNumber(price);
        Validator.isEmptyNumber(discount);
        Validator.isEmptyNumber(quantity);

        this.uuid = uuidv4();
        this.name = name;
        this.category = category;
        this.price = price;
        this.discount = discount;
        this.quantity = quantity;
    }

    update = (key, value) => {
        if (!['name', 'discount', 'quantity'].includes(key)) {
            throw new Error(`${key} is a wrong key`)
        }
        if (key === 'name') {
            Validator.isEmptyString(value)
        } else {
            Validator.isEmptyNumber(value)
        }
        this[key] = value
    }

    show = () => {
        return (
            `
            Produkt: ${this.name},
            Kategoria: ${this.category},
            Cena: ${(this.price * (1 - (this.discount / 100))).toFixed(2)} PLN,
            Rabat: ${this.discount} %,
            Ilość: ${this.quantity} sztuk,
            ID produktu: ${this.uuid}
            `
        )
    }
}

const product = new Product('banan', 'owoce', 3.00, 20, 10);
const product2 = new Product('gruszka', 'owoce', 4.00, 20, 20);
const product3 = new Product('jablko', 'owoce', 6.00, 20, 20);
const product4 = new Product('jablko', 'owoce', 9, 40, 40);
const product5 = new Product('jablko', 'owoce', 17, 40, 40);
const product6 = new Product('jablko', 'owoce', 23, 40, 40);

console.log(product.show());
console.log(product2.show());
console.log(product3.show());


const cart = new ShoppingCart('21323');
cart.addProducts(product, product2, product3, product4, product5, product6);

console.log(cart);