// LibraryEntryView.js - Defines a backbone view class for the entries that will appear within the library views. These will be inserted using the "subview" pattern.
var LibraryEntryView = Backbone.View.extend({
  initialize : function() {
    this.model.on('change', this.render, this);
  },

  tagName:"li",
  className:"library-entry",
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
      this.model.enqueue();
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
