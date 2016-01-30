// PlayerView.js - Defines a backbone view class for the music player.
var PlayerView = Backbone.View.extend({

  // HTML5 (native) audio tag is being used
  // see: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video
  el: '<audio controls autoplay />',

  initialize: function() {
  },

  audioClear: function() {
    this.el.pause();
    this.$el.attr('src', '');
  },

  play: function() {
    this.el.play();
  },

  setSong: function(song) {
    this.model = song;
    this.el.onended = this.model.ended.bind(this.model);
    this.render();
  },

  render: function() {
    return this.$el.attr('src', this.model ? this.model.get('url') : '');
  }

});
