// SongQueueEntryView.js - Defines a backbone view class for the song queue entries.
var SongQueueEntryView = Backbone.View.extend({
  initialize : function() {
    this.model.on('change', this.render, this);
  },

  tagName: 'ul',
  className: 'list-unstyled',
  template: _.template('<li class="queue-entry"><%= artist %> - <%= title %> <span class="playcount"><%= playCount + " " + ("play").pluralize(playCount) %></span></li>'),

  events: {
    'click': function() {
      this.model.dequeue();
    }
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }
});
