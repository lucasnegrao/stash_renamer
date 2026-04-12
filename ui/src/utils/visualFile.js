// returns true if the file should be treated as a video in the UI
export function isVideo(o) {
    return o.__typename == "VideoFile" && o.video_codec != "gif";
}
//# sourceMappingURL=visualFile.js.map