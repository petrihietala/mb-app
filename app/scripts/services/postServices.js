/**
 * Created by ph2 on 8.12.14.
 */

'use strict';


app.factory('PostService', function ($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  var posts = $firebase(ref.child('posts')).$asArray();

  var PostService = {
    all: posts,
    create: function (post) {
      return posts.$add(post);
    },
    get: function (postId) {
      return $firebase(ref.child('posts').child(postId)).$asObject();
    },
    delete: function (post) {
      return posts.$remove(post);
    },
    setDone: function (post) {
      post.done = true;
      return posts.$save(post);
    },
    removeDone: function () {

      var doneItems = posts.filter(function (ref) {
        return ref.done
      });

      $.each(doneItems, function() {
          PostService.delete(this);
      });
    }
  };

  return PostService;
});
