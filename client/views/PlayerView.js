// PlayerView.js - Defines a backbone view class for the music player.
var PlayerView = Backbone.View.extend({

  // HTML5 (native) audio tag is being used
  // see: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video
  el: '<div class="panel panel-defualt"><h3>Now Playing</h3></div>',
  $playerHtml: $('<audio controls autoplay />'),
  $songInfo: $('<div class="song-info"></div>'),

  initialize: function() {
    this.model = null;
    this.render();
  },

  audioClear: function() {
    this.$playerHtml[0].pause();
    this.$playerHtml.attr('src', '');
    this.model = null;
    this.render();
  },

  play: function() {
    this.$playerHtml[0].play();
  },

  setSong: function(song) {
    this.model = song;
    this.$playerHtml[0].onended = this.model.ended.bind(this.model);
    this.render();
  },

  render: function() {
    this.$songInfo.text( this.model ? (this.model.get('artist') + ' - ' + this.model.get ('title')) : 'No Song');
    this.$playerHtml.attr('src', this.model ? this.model.get('url') : '');
    this.$el.append(this.$songInfo).append(this.$playerHtml);
    return this.$el;
  }

});
