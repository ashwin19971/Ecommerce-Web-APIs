var express = require('express');
var router = express.Router();

const products = {};
var idCnt = 1;

function isString(str) {
    if (typeof str == "string") {
        return true;
    }
    return false;
}

function isRealNumber(num) {
    return typeof num == 'number';
}

function isInteger(num) {
    return Number.isInteger(num);
}

// GET Products
router.get('/products/:product_id', (req, res) => {
    try {
        let id = req.params.product_id;
        if (!parseInt(id)) {
            throw "id is invalid";
        }
        id = parseInt(id);
        var data = products[id];
        if (data == undefined) {
            res.status(404).send({});
        } else {
            res.status(200).send(data);
        }
    } catch (err) {
        var errResponse = {
            status: "failure",
            reason: err || "Something Invalid"
        };
        res.status(400).send(errResponse);
    }
});

// Post products
router.post('/products', (req, res) => {
    try {
        var data = req.body;
        if (!isString(data.name)) {
            throw "name is not string";
        }
        if (!isString(data.category_name)) {
            throw "category name is not string";
        }
        if (!isString(data.description)) {
            throw "description is not string";
        }
        if (!isRealNumber(data.buy_price)) {
            throw "buy_price is not a real number";
        }
        if (!isRealNumber(data.sell_price)) {
            throw "sell_price is not a real number";
        }
        if (!isInteger(data.quantity)) {
            throw "quantity is not a integer";
        }
        if (data.quantity < 0) {
            res.status(416).send({
                status: "failure",
                reason: "Quantity is negative"
            });
        } else {
            var resObj = {
                id: idCnt,
                name: data.name,
                category_name: data.category_name,
                description: data.description,
                buy_price: data.buy_price,
                sell_price: data.sell_price,
                quantity: data.quantity
            };
            products[idCnt] = resObj;
            idCnt++;
            res.status(201).send(resObj);
        }
    } catch (err) {
        var errResponse = {
            status: "failure",
            reason: err || "Something Invalid"
        };
        res.status(400).send(errResponse);
    }
});

// Delete products
router.delete('/products/:product_id', (req, res) => {
    try {
        const id = parseInt(req.params.product_id);
        if (!id) {
            throw "id is invalid";
        }
        delete products[id];
        res.status(204).send({
            status: "success"
        });
    } catch (err) {
        var errResponse = {
            status: "failure",
            reason: err || "Something Invalid"
        };
        res.status(400).send(errResponse);
    }
});

// Update products
router.put('/products/:product_id', (req, res) => {
    try {
        const data = req.body;
        const id = parseInt(req.params.product_id);
        if (!id) {
            throw "id is invalid";
        }
        if (!isString(data.name)) {
            throw "name is not string";
        }
        if (!isString(data.category_name)) {
            throw "category name is not string";
        }
        if (!isString(data.description)) {
            throw "description is not string";
        }
        if (!isRealNumber(data.buy_price)) {
            throw "buy_price is not a real number";
        }
        if (!isRealNumber(data.sell_price)) {
            throw "sell_price is not a real number";
        }
        if (!isInteger(data.quantity)) {
            throw "quantity is not a integer";
        }
        var resObj = {
            id: id,
            name: data.name,
            category_name: data.category_name,
            description: data.description,
            buy_price: data.buy_price,
            sell_price: data.sell_price,
            quantity: data.quantity
        };
        products[id] = resObj;
        res.status(200).send({
            status: "success"
        });
    } catch (err) {
        var errResponse = {
            status: "failure",
            reason: err || "Something Invalid"
        };
        res.status(400).send(errResponse);
    }
});

module.exports = router;
