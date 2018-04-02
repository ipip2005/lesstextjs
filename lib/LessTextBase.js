var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
var LessTextBase = (function (_super) {
    __extends(LessTextBase, _super);
    function LessTextBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LessTextBase.prototype.render = function () {
        return (React.createElement("p", null, this.props.text));
    };
    return LessTextBase;
}(React.PureComponent));
export { LessTextBase };

//# sourceMappingURL=LessTextBase.js.map
