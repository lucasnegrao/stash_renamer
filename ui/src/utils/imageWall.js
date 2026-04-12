export var ImageWallDirection;
(function (ImageWallDirection) {
    ImageWallDirection["Column"] = "column";
    ImageWallDirection["Row"] = "row";
})(ImageWallDirection || (ImageWallDirection = {}));
export const defaultImageWallDirection = ImageWallDirection.Row;
export const defaultImageWallMargin = 3;
export const imageWallDirectionIntlMap = new Map([
    [ImageWallDirection.Column, "dialogs.imagewall.direction.column"],
    [ImageWallDirection.Row, "dialogs.imagewall.direction.row"],
]);
export const defaultImageWallOptions = {
    margin: defaultImageWallMargin,
    direction: defaultImageWallDirection,
};
//# sourceMappingURL=imageWall.js.map