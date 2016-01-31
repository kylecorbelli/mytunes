// LibraryView.js - Defines a backbone view class for the music library.
var LibraryView = Backbone.View.extend({
 
  tagName: "div",
  className: "panel panel-defualt",

  initialize: function() {
    this.render();
  },

  render: function() {
    // to preserve event handlers on child nodes, we must call .detach() on them before overwriting with .html()
    // see http://api.jquery.com/detach/
  this.$el.children().detach();
    this.$el.html('');
    var $list = $('<ul class="list-unstyled"></ul>');
    $list.append(this.collection.map(function(song) {
        return new LibraryEntryView({model: song}).render();
      })
    );
    this.$el.append('<h3>Library</h3>').append($list);
  }

});
