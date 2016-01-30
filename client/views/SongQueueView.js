// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({

  tagName: "div",
  // className: "panel panel-defualt",

  initialize: function() {
    this.collection.on('add remove', this.render, this);
    this.render();
  },

  render: function() {
    // to preserve event handlers on child nodes, we must call .detach() on them before overwriting with .html()
    // see http://api.jquery.com/detach/
    this.$el.children().detach();
    var $list = $('<ul class="list-unstyled"></ul>');
    $list.append(this.collection.map(function(song) {
        return new SongQueueEntryView({model: song}).render();
      })
    );
    this.$el.append('<h3>Song Queue</h3>').append($list);
  }

});
