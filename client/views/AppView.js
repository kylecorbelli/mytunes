// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({

  initialize: function(params) {
    this.playerView = new PlayerView({model: this.model.get('currentSong')});
    this.libraryView = new LibraryView({collection: this.model.get('library')});
    this.songQueueView = new SongQueueView({collection: this.model.get('songQueue')});

    // change:currentSong - this is Backbone's way of allowing you to filter events to
    // ONLY receive change events for the specific property, 'currentSong'
    this.model.on('change:currentSong', function(model) {
      this.playerView.setSong(model.get('currentSong'));
    }, this);
  },

  render: function() {
    var $leftCol = $('<div class="col-sm-4 col-sm-offset-1"></div>');
    $leftCol.append(this.playerView.$el).append(this.songQueueView.$el);

    var $rightCol = $('<div class="col-sm-4 col-sm-offset-2"></div>');
    $rightCol.append(this.libraryView.$el);

    return this.$el.html([$leftCol, $rightCol]);
    //   this.libraryView.$el,
    //   this.songQueueView.$el
    // ]);
  }

});
