const router = require('express').Router();
let Product = require('../models/my-product.model');

router.route('/').get((req,res)=>{
    Product.find()
        .then(product=> res.json(product))
        .catch(err=> res.status(400).json('Error:'+err));
});

router.route('/add').post((req,res)=>{
    const product_name = req.body.product_name;
    const product_price = Number(req.body.product_price);

    const newProduct = new Product({
        product_name,
        product_price,
    });

    newProduct.save()
        .then(()=> res.json('Product added!'))
        .catch(err=>res.status(400).json('Error:'+err));
});

router.route('/:id').get((req,res)=>{
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Erro: '+err));
});

router.route('/get/:product_name').get((req,res)=>{
    Product.findOne({product_name:{$eq:req.params.product_name}})
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Erro: '+err));
});

router.route('/:id').delete((req,res)=>{
    Product.findByIdAndDelete(req.params.id)
        .then(()=> res.json('Product deleted.'))
        .catch(err => res.status(400).json('Erro: '+err));
});

router.route('/update/:id').post((req,res)=>{
    Product.findById(req.params.id)
        .then(products =>{
            products.product_name = req.body.product_name;
            products.product_price = Number(req.body.product_price);

            products.save()
                .then(()=> res.json('Product updated!'))
                .catch(err=>res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Erro: '+err));
});

module.exports = router;