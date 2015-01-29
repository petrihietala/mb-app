/**
 * Created by ph2 on 18.1.15.
 */


'use strict';


app.factory('ItemService', function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    var items = $firebase(ref.child('items')).$asArray();

    var selectedItem = null;
    var isEditModeEnabled = true;


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
            return $firebase(ref.child('items').child(itemId)).$asObject();
        },
        delete: function (item) {
            return items.$remove(item);
        },
        update: function (item) {
            return items.$save(item);
        },
        removeDone: function () {

            var doneItems = items.filter(function (item) {
                return item.done
            });

            $.each(doneItems, function() {
                ItemService.delete(this);
            });
        },
        setSelectedItem: function(item) {
            selectedItem = item;
        },
        selectedItem: selectedItem,
        isEditModeEnabled: isEditModeEnabled,
        setEditMode: function(ref) {
            isEditModeEnabled = ref;
        }

    };

    return ItemService;
});
