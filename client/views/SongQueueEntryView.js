// SongQueueEntryView.js - Defines a backbone view class for the song queue entries.
var SongQueueEntryView = Backbone.View.extend({
  initialize : function() {
    this.model.on('change', this.render, this);
  },

  tagName:"li",
  className:"queue-entry",


  template: _.template(['<div class="voting">',
                          '<span class="glyphicon glyphicon-thumbs-up"></span>',
                          '<span class="like-count"><%= likes %></span>',
                          '<span class="glyphicon glyphicon-thumbs-down"></span>',
                        '</div>',  
                        '<span class="track-info"><%= artist %> - <%= title %></span>',
                        '<span class="playcount">',
                          '<%= playCount + " " + ("play").pluralize(playCount) %>',
                        '</span>'].join(' ')),

  events: {
    'click .track-info': function() {
      this.model.dequeue();
    },
    'click .glyphicon-thumbs-up': function() {
      this.model.upvote();
    },
    'click .glyphicon-thumbs-down': function() {
      this.model.downvote();
    }

  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }
});
