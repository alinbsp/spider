var Node = require('../Node').Node;

exports.BlockStatement = function (body) {
  var self = this;
  Node.call(self);
  
  self.type = 'BlockStatement';
  self.body = body;
  
  body.forEach(function (statement, i) {
    if (statement) {
      statement.parent = self;
    } else {
      body[i] = { type: 'EmptyStatement' };
    }
  });  
};

exports.BlockStatement.prototype = Object.create(Node);

exports.BlockStatement.prototype.codegen = function () {
  if (!Node.prototype.codegen.call(this)) {
    return;
  }
  
  var i = 0;
  while (i < this.body.length) {
    var statement = this.body[i];
    
    if (!statement || statement.codeGenerated) {
      i++;
      continue;
    }
    
    if (statement.codegen()) {
      this.body[this.body.indexOf(statement)] = statement;
    }
    i++;
  }
  
  return this;
};