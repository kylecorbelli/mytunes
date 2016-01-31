// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function() {
    this.on('add', function() {
      if (this.length === 1) {
        this.playFirst();
      }
    }, this);

    this.on('ended', function() {
      this.shift();
      if (this.length > 0) {
        this.playFirst();
      }
    }, this);

    this.on('dequeue', function(song) {
      var doPlay = this.indexOf(song) === 0;
      this.remove(song);
      if (this.length < 1) {
        this.trigger('empty');
      } else if (doPlay){
        this.playFirst();
      }
    }, this);


    this.on('change add remove', function() {
      localStorage.songQueue = JSON.stringify(this.toJSON());
    }, this);

  },
  
  playFirst: function() {
    this.at(0).play();
  }


});