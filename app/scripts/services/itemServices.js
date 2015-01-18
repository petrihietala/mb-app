/**
 * Created by ph2 on 18.1.15.
 */


'use strict';


app.factory('ItemService', function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    var items = $firebase(ref.child('posts')).$asArray();

    var ItemService = {
        all: items,
        create: function (item) {

            var i = items;
            if (item.title != "") {
                i = items.$add(item);
            }

            return i;
        },
        get: function (itemId) {
            return $firebase(ref.child('posts').child(itemId)).$asObject();
        },
        delete: function (item) {
            return items.$remove(item);
        },
        setDone: function (item) {
            item.done = true;
            return items.$save(item);
        },
        removeDone: function () {

            var doneItems = items.filter(function (ref) {
                return ref.done
            });

            $.each(doneItems, function() {
                ItemService.delete(this);
            });
        }
    };

    return ItemService;
});
