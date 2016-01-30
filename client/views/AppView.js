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
      this.playerView.play();
    }, this);


    this.model.on('queueEmpty', function(model) {
      this.playerView.audioClear();
    }, this);
  },

  render: function() {
    if (this.model.get('currentSong').get('url')) {
      this.playerView.setSong(this.model.get('currentSong'));
      this.playerView.play();
    }

    var $header = $('<div class="row page-header"><h1>myTunes</h1></div>');
    var $row2 = $('<div class="row"></div>');

    var $leftCol = $('<div class="col-sm-6"></div>');
    $leftCol.append(this.playerView.$el).append(this.songQueueView.$el);

    var $rightCol = $('<div class="col-sm-6"></div>');
    $rightCol.append(this.libraryView.$el);

    $row2.append($leftCol).append($rightCol);
    return this.$el.html([$header, $row2]);
    //   this.libraryView.$el,
    //   this.songQueueView.$el
    // ]);
  }

});
