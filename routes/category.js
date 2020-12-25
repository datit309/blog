var express = require('express');
var router = express.Router();
var passport = require('passport');
var Users = require('../models/users');
var Post = require('../models/post');
var Roles = require('../models/roles');
var Ads = require('../models/ads');
var Category = require('../models/category');
var Sequelize = require('sequelize');

const { check, validationResult } = require('express-validator');
const { createSchema } = require('../database/db');
/* GET users listing. */

router.get('/', function(req, res, next) {
    Category.findAll().then(function(cates) {
        var cateList = [];
        var cateListchild;
        cates.forEach(function(cate) {
            cateList.push({
                id: cate.id,
                name: cate.name,
                description: cate.description,
                parent: cate.parent
            });
            Category.findAll({
                where: {
                    parent: cate.id
                }
            }).then(function(cates1) {
                var temp;
                cates1.forEach(function(item) {
                    temp.push({
                        parent_id: cate.id,
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        parent: item.parent
                    });
                    console.log("trong ham " + item.name);
                });

            });
            // .then(function(cates1) {
            //     // var list = [];
            //     cates1.forEach(function(item) {
            //         cateListchild.push({
            //             parent_id: cate.id,
            //             id: item.id,
            //             name: item.name,
            //             description: item.description,
            //             parent: item.parent
            //         });
            //     });
            //     console.log("ketqua" + cateListchild);
            // });

            console.log("ketqua" + cateListchild);
        });

        res.render('admin/category/index', { title: 'add', list: cateList, listparent: cateListchild, errors: null, message: null, result: null });

    });

});
router.get('/add', function(req, res, next) {
    Category.findAll().then(function(cates) {
        var cateList = [];
        cates.forEach(function(cate) {
            cateList.push({
                id: cate.id,
                name: cate.name,
                description: cate.description,
                parent: cate.parent
            });
        });
        res.render('admin/category/add', { title: 'add', listparent: cateList, errors: null, message: null, result: null });
    });

});
router.post('/add', [check("cate_name", "cate_name không được bỏ trống").not().isEmpty(),
    check("cate_description", "cate_description không được bỏ trống").not().isEmpty()
], function(req, res, next) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('admin/category/add', { errors: errors.array(), user: req.user });
    } else {
        Category.create({
            name: req.body.cate_name,
            description: req.body.cate_description,
            parent: req.body.cate_parent
        });
        req.flash('success_msg', 'Đã thêm ');
        res.redirect('/category/add');
    }
});
router.get('/update/:id', function(req, res, next) {
    Category.findOne({ where: { id: req.params.id } }).then(function(cates) {
        res.render('admin/category/update', { title: 'update', errors: null, result: cates, message: null });
    });
});
router.post('/update/:id', [check("cate_name", "cate_name không được bỏ trống").not().isEmpty(),
    check("cate_description", "cate_description không được bỏ trống").not().isEmpty()
], function(req, res, next) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('admin/category/update/' + req.params.id, { errors: errors.array(), user: req.user });
    } else {
        Category.update({
            name: req.body.cate_name,
            description: req.body.cate_description,
            UpdatedAt: Sequelize.NOW
        }, {
            where: {
                id: req.params.id
            }
        }).then(function(cate) {
            req.flash('success_msg', 'Đã sửa');
            res.redirect('/category/');
        });
    }
});
router.get('/delete/:id', function(req, res, next) {
    Category.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(cate) {
        req.flash('success_msg', 'Đã xóa');
        res.redirect('/category/');
    });

});
module.exports = router;
// Hàm được sử dụng để kiểm tra đã login hay chưa
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated())
//         return next();
//     res.redirect('/users/login');
// }
function parent(params) {
    Category.findAll({
        where: {
            parent: params
        }
    }).then(function(item) {
        if (item) {
            // var list = [];
            // list.push({
            //     id: item.id,
            //     name: item.name,
            //     description: item.description,
            //     parent: item.parent
            // });
            return item;
        }
        return null;
    });
}