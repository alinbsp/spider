"use strict";
(function () {
    var Node = require("../Node").Node;
    function ArrayExpression(elements) {
        Node.call(this);
        this.type = "ArrayExpression";
        this.elements = elements;
        this.elements.every(function (element) {
            if (typeof element !== "undefined" && element !== null) {
                element.parent = this;
            }
            return true;
        }, this);
    }
    ArrayExpression.prototype = Object.create(Node);
    ArrayExpression.prototype.codegen = function () {
        if (!Node.prototype.codegen.call(this)) {
            return;
        }
        this.elements.every(function (element, i) {
            this.elements[i] = typeof element !== "undefined" && element !== null ? element.codegen() : void 0;
            return true;
        }, this);
        return this;
    };
    ArrayExpression.prototype.hasCallExpression = function () {
        return true;
    };
    exports.ArrayExpression = ArrayExpression;
}());

//# sourceMappingURL=lib/ast/expressions/ArrayExpression.map