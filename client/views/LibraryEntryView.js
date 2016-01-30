// LibraryEntryView.js - Defines a backbone view class for the entries that will appear within the library views. These will be inserted using the "subview" pattern.
var LibraryEntryView = Backbone.View.extend({
  initialize : function() {
    this.model.on('change', this.render, this);
  },

  tagName: 'ul',
  className: 'list-unstyled',
  template: _.template('<li><%= artist %> - <%= title %> (<%= playCount %> plays)</li>'),

  events: {
    'click': function() {
      // this.model.play();
      this.model.enqueue();
    }
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }

});
