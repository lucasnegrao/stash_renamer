"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultImageWallOptions = exports.imageWallDirectionIntlMap = exports.defaultImageWallMargin = exports.defaultImageWallDirection = exports.ImageWallDirection = void 0;
var ImageWallDirection;
(function (ImageWallDirection) {
    ImageWallDirection["Column"] = "column";
    ImageWallDirection["Row"] = "row";
})(ImageWallDirection || (exports.ImageWallDirection = ImageWallDirection = {}));
exports.defaultImageWallDirection = ImageWallDirection.Row;
exports.defaultImageWallMargin = 3;
exports.imageWallDirectionIntlMap = new Map([
    [ImageWallDirection.Column, "dialogs.imagewall.direction.column"],
    [ImageWallDirection.Row, "dialogs.imagewall.direction.row"],
]);
exports.defaultImageWallOptions = {
    margin: exports.defaultImageWallMargin,
    direction: exports.defaultImageWallDirection,
};
//# sourceMappingURL=imageWall.js.map