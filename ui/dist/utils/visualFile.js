"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVideo = void 0;
// returns true if the file should be treated as a video in the UI
function isVideo(o) {
    return o.__typename == "VideoFile" && o.video_codec != "gif";
}
exports.isVideo = isVideo;
//# sourceMappingURL=visualFile.js.map