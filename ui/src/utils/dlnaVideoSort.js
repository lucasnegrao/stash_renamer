export var VideoSortOrder;
(function (VideoSortOrder) {
    VideoSortOrder["Created_At"] = "created_at";
    VideoSortOrder["Date"] = "date";
    VideoSortOrder["Random"] = "random";
    VideoSortOrder["Title"] = "title";
    VideoSortOrder["Updated_At"] = "updated_at";
})(VideoSortOrder || (VideoSortOrder = {}));
export const defaultVideoSort = VideoSortOrder.Title;
export const videoSortOrderIntlMap = new Map([
    [VideoSortOrder.Created_At, "created_at"],
    [VideoSortOrder.Date, "date"],
    [VideoSortOrder.Random, "random"],
    [VideoSortOrder.Title, "title"],
    [VideoSortOrder.Updated_At, "updated_at"],
]);
//# sourceMappingURL=dlnaVideoSort.js.map