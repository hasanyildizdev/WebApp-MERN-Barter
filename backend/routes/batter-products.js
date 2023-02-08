const router = require('express').Router();
let Product = require('../models/barter-product.model');

router.route('/').get((req,res)=>{
    Product.find()
        .then(Products=> res.json(Products))
        .catch(err=> res.status(400).json('Error:'+err));
});

router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const birth_date = Date.parse(req.body.birth_date);
    const product_name = req.body.product_name;
    const product_price = Number(req.body.product_price);

    const newProduct = new Product({
        username,
        password,
        birth_date,
        product_name,
        product_price,
    });

    newProduct.save()
        .then(()=> res.json('New Item added!'))
        .catch(err=>res.status(400).json('Error:'+err));
});

router.route('/:id').get((req,res)=>{
    Product.findById(req.params.id)
        .then(Product => res.json(Product))
        .catch(err => res.status(400).json('Erro: '+err));
});

router.route('/:id').delete((req,res)=>{
    Product.findByIdAndDelete(req.params.id)
        .then(()=> res.json('Item deleted.'))
        .catch(err => res.status(400).json('Erro: '+err));
});

router.route('/update/:id').post((req,res)=>{
    Product.findById(req.params.id)
        .then(Product =>{
            Product.username = req.body.username;
            Product.password = req.body.password;
            Product.birth_date = Date.parse(req.body.birth_date);
            Product.product_name = req.body.product_name;
            Product.product_price = Number(req.body.product_price);

            Product.save()
                .then(()=> res.json('Item updated!'))
                .catch(err=>res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Erro: '+err));
});

module.exports = router;