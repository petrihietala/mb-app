"use strict";var app=angular.module("mb-app",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","firebase","ngStorage"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/items.html",controller:"ItemsCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]).constant("FIREBASE_URL","https://marketbasket.firebaseio.com");app.controller("ItemsCtrl",["$scope","ItemService","$localStorage",function(a,b,c){a.item=b.selectedItem,a.items=b.all,a.undoItemId=null,a.isEditModeEnabled=!1,a.storage=c.$default({donehidden:!1}),a.hideDone=a.storage.donehidden,a.getItems=function(b){var c=a.items;return b&&(c=c.filter(function(a){return!a.done})),c},a.deleteItem=function(a){b["delete"](a)},a.update=function(c){c.done?(a.undoItemId=null,b.update(c)):a.undoItemId=c.$id},a.cancelAdd=function(b){b.done=!0,a.undoItemId=null},a.addConfirmed=function(c){a.undoItemId=null,b.update(c)},a.selectItem=function(a){b.selectedItem=a},a.$watch(function(){return b.isEditModeEnabled},function(b){a.isEditModeEnabled=b}),a.$watch(function(){return a.isEditModeEnabled},function(c){0==c&&a.items.forEach(function(a){b.update(a)})})}]),app.factory("ItemService",["$firebase","FIREBASE_URL",function(a,b){var c=new Firebase(b),d=a(c.child("items")).$asArray(),e=null,f=!0,g={all:d,create:function(a){var b=d;return""!=a.title&&(b=d.$add(a)),b},get:function(b){return a(c.child("items").child(b)).$asObject()},"delete":function(a){return d.$remove(a)},update:function(a){return d.$save(a)},removeDone:function(){var a=d.filter(function(a){return a.done});$.each(a,function(){g["delete"](this)})},setSelectedItem:function(a){e=a},selectedItem:e,isEditModeEnabled:f,setEditMode:function(a){f=a}};return g}]),app.controller("NavCtrl",["$scope","$location","ItemService","$localStorage",function(a,b,c,d){a.item=c.selectedItem,a.isEditModeEnabled=!1,a.storage=d.$default({donehidden:!1}),a.addItem=function(){c.create(a.item).then(function(c){b.path("/items/"+c.name()),a.item={title:"",done:!1}})},a.removeDone=function(){c.removeDone()},a.$watch(function(){return a.isEditModeEnabled},function(a){c.isEditModeEnabled=a})}]);