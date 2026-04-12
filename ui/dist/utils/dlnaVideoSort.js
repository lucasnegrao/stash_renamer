"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoSortOrderIntlMap = exports.defaultVideoSort = exports.VideoSortOrder = void 0;
var VideoSortOrder;
(function (VideoSortOrder) {
    VideoSortOrder["Created_At"] = "created_at";
    VideoSortOrder["Date"] = "date";
    VideoSortOrder["Random"] = "random";
    VideoSortOrder["Title"] = "title";
    VideoSortOrder["Updated_At"] = "updated_at";
})(VideoSortOrder || (exports.VideoSortOrder = VideoSortOrder = {}));
exports.defaultVideoSort = VideoSortOrder.Title;
exports.videoSortOrderIntlMap = new Map([
    [VideoSortOrder.Created_At, "created_at"],
    [VideoSortOrder.Date, "date"],
    [VideoSortOrder.Random, "random"],
    [VideoSortOrder.Title, "title"],
    [VideoSortOrder.Updated_At, "updated_at"],
]);
//# sourceMappingURL=dlnaVideoSort.js.map