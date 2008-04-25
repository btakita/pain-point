(function(window) {
  window.XmlBuilder = function(params) {
    if(!params) params = {};
    this.binding = params.binding || this;
    this._doc = [];
  }

  XmlBuilder.prototype.tag = function() {
    if(arguments.length > 3) {
      throw("XmlBulider#tag does not accept more than three arguments");
    }
    var tagName, attributes, value;
    tagName = arguments[0];

    var arg1 = arguments[1];
    if(typeof arg1 == 'object') {
      attributes = arg1;
      var arg2 = arguments[2];
      if(typeof arg2 == 'function' || typeof arg2 == 'string'){
        value = arg2;
      };
    } else if(typeof arg1 == 'function' || typeof arg1 == 'string'){
      value = arg1;
      var arg2 = arguments[2];
      if(typeof arg2 == 'object') {
        attributes = arg2;
      }
    };

    this._doc.push(new XmlBuilder.OpenTag(tagName, attributes));
    if(typeof value == 'function') {
      value.call(this.binding, this);
    } else if(typeof value == 'string') {
      this._doc.push(new XmlBuilder.Text(value));
    }
    this._doc.push(new XmlBuilder.CloseTag(tagName));
  }

  XmlBuilder.prototype.tagWithArrayArgs = function(tag, args) {
    if(!args) return this.tag(tag);

    var newArguments = [tag];
    for(var i=0; i < args.length; i++) {
      newArguments.push(args[i]);
    }
    return this.tag.apply(this, newArguments);
  }

  XmlBuilder.prototype.text = function(value) {
    this._doc.push(new XmlBuilder.Text(value));
  }

  XmlBuilder.prototype.textNode = function(value) {
    var html = this.escapeHtml(value);
    this._doc.push(new XmlBuilder.Text(html));
  }

  XmlBuilder.prototype.escapeHtml = function(html) {
    return html.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;")
  }

  XmlBuilder.prototype.toString = function() {
    var output = "";
    for(var i=0; i < this._doc.length; i++) {
      var element = this._doc[i];
      output += element.toString();
    }
    return output;
  }

  XmlBuilder.registerTag = function(tagName) {
    this.prototype[tagName] = function() {
      return this.tagWithArrayArgs(tagName, arguments);
    };
  }

  var supportedTags = [
    'a', 'acronym', 'address', 'area', 'b', 'base', 'bdo', 'big', 'blockquote', 'body',
    'br', 'button', 'caption', 'cite', 'code', 'dd', 'del', 'div', 'dl', 'dt', 'em',
    'fieldset', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'hr', 'html', 'i',
    'img', 'iframe', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'map',
    'meta', 'noframes', 'noscript', 'ol', 'optgroup', 'option', 'p', 'param', 'pre',
    'samp', 'script', 'select', 'small', 'span', 'strong', 'style', 'sub', 'sup',
    'table', 'tbody', 'td', 'textarea', 'th', 'thead', 'title', 'tr', 'tt', 'ul', 'var'
  ];
  for(var i=0; i < supportedTags.length; i++) {
    var tag = supportedTags[i];
    XmlBuilder.registerTag(tag);
  }

  XmlBuilder.OpenTag = function(tagName, attributes) {
    this.tagName = tagName;
    this.attributes = attributes;
  }

  XmlBuilder.OpenTag.prototype.toString = function() {
    var serializedAttributes = [];
    for(var attributeName in this.attributes) {
      serializedAttributes.push(attributeName + '="' + this.attributes[attributeName] + '"');
    }
    if(serializedAttributes.length > 0) {
      return "<" + this.tagName + " " + serializedAttributes.join(" ") + ">";
    } else {
      return "<" + this.tagName + ">";
    }
  }

  XmlBuilder.Text = function(value) {
    this.value = value;
  }

  XmlBuilder.Text.prototype.toString = function() {
    return this.value;
  }

  XmlBuilder.CloseTag = function(tagName) {
    this.tagName = tagName;
  }

  XmlBuilder.CloseTag.prototype.toString = function() {
    return "</" + this.tagName + ">";
  }
})(window);