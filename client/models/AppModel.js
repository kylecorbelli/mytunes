// App.js - Defines a backbone model class for the whole app.

// helper method to make things pretty
String.prototype.pluralize = function(count, plural)
{
  plural = plural || this + 's';
  return (count === 1 ? this : plural); 
};

var AppModel = Backbone.Model.extend({

  initialize: function(params) {
    this.set('currentSong', new SongModel());
    this.set('songQueue', new SongQueue());


    /* Note that 'this' is passed as the third argument. That third argument is
    the context. The 'play' handler will always be bound to that context we pass in.
    In this example, we're binding it to the App. This is helpful because otherwise
    the 'this' we use that's actually in the function (this.set('currentSong', song)) would
    end up referring to the window. That's just what happens with all JS events. The handlers end up
    getting called from the window (unless we override it, as we do here). */
    

    this.get('songQueue').on('empty', function() {
      this.trigger('queueEmpty');
    }, this);

    this.get('songQueue').on('play', function(song) {
      this.set('currentSong', song);
    }, this);

    params.library.on('enqueue', function(song) {
      this.get('songQueue').add(song);
    }, this);

    params.library.on('play', function(song) {
      this.set('currentSong', song);
    }, this);

    var localQueue;
    var app = this;
    if (localStorage.songQueue) {
      localQueue = _.each(JSON.parse(localStorage.songQueue), function(attr) {
        var song = params.library.findWhere({title: attr.title, artist : attr.artist});
        app.get('songQueue').add(song);
      });

    }
  } // initialize



});
