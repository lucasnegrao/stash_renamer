"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneListTreeble = void 0;
const text_1 = __importDefault(require("../utils/text"));
const files_1 = require("../core/files");
const galleries_1 = require("../core/galleries");
const ListTable_1 = require("./list/ListTable");
const FileSize_1 = require("./shared/FileSize");
const useTableColumns_1 = require("../hooks/useTableColumns");
const PluginApi = window.PluginApi;
const React = PluginApi.React;
const Link = PluginApi.libraries.ReactRouterDOM.Link;
const NavUtils = PluginApi.utils.NavUtils;
const { FormattedMessage } = PluginApi.libraries.Intl;
const { useSceneUpdate } = PluginApi.utils.StashService;
const TABLE_NAME = "scenes";
const SceneListTreeble = (props) => {
    const intl = PluginApi.libraries.Intl.useIntl();
    const [updateScene] = PluginApi.utils.StashService.useSceneUpdate();
    function setRating(v, sceneId) {
        if (sceneId) {
            updateScene({
                variables: {
                    input: {
                        id: sceneId,
                        rating100: v,
                    },
                },
            });
        }
    }
    const CoverImageCell = (scene, index) => {
        var _a;
        const title = (0, files_1.objectTitle)(scene);
        const sceneLink = props.queue
            ? props.queue.makeLink(scene.id, { sceneIndex: index })
            : `/scenes/${scene.id}`;
        return (React.createElement(Link, { to: sceneLink },
            React.createElement("img", { loading: "lazy", className: "image-thumbnail", alt: title, src: (_a = scene.paths.screenshot) !== null && _a !== void 0 ? _a : "" })));
    };
    const TitleCell = (scene, index) => {
        const title = (0, files_1.objectTitle)(scene);
        const sceneLink = props.queue
            ? props.queue.makeLink(scene.id, { sceneIndex: index })
            : `/scenes/${scene.id}`;
        return (React.createElement(Link, { to: sceneLink, title: title },
            React.createElement("span", { className: "ellips-data" }, title)));
    };
    const DateCell = (scene) => React.createElement(React.Fragment, null, scene.date);
    const RatingCell = (scene) => (React.createElement("h1", null, scene.rating100)
    // <RatingSystem
    //   value={scene.rating100}
    //   onSetRating={(value: number | null) => setRating(value, scene.id)}
    //   clickToRate
    // />
    );
    const DurationCell = (scene) => {
        const file = scene.files.length > 0 ? scene.files[0] : undefined;
        const duration = file === null || file === void 0 ? void 0 : file.duration;
        return typeof duration === "number"
            ? text_1.default.secondsToTimestamp(duration)
            : null;
    };
    const TagCell = (scene) => (React.createElement("ul", { className: "comma-list overflowable" }, scene.tags.map((tag) => (React.createElement("li", { key: tag.id },
        React.createElement(Link, { to: NavUtils.makeTagScenesUrl(tag) },
            React.createElement("span", null, tag.name)))))));
    const PerformersCell = (scene) => (React.createElement("ul", { className: "comma-list overflowable" }, scene.performers.map((performer) => (React.createElement("li", { key: performer.id },
        React.createElement(Link, { to: NavUtils.makePerformerScenesUrl(performer) },
            React.createElement("span", null, performer.name)))))));
    const StudioCell = (scene) => {
        if (scene.studio) {
            return (React.createElement(Link, { to: NavUtils.makeStudioScenesUrl(scene.studio), title: scene.studio.name },
                React.createElement("span", { className: "ellips-data" }, scene.studio.name)));
        }
    };
    const GroupCell = (scene) => (React.createElement("ul", { className: "comma-list overflowable" }, scene.groups.map((sceneGroup) => (React.createElement("li", { key: sceneGroup.group.id },
        React.createElement(Link, { to: NavUtils.makeGroupScenesUrl(sceneGroup.group) },
            React.createElement("span", { className: "ellips-data" }, sceneGroup.group.name)))))));
    const GalleriesCell = (scene) => (React.createElement("ul", { className: "comma-list overflowable" }, scene.galleries.map((gallery) => (React.createElement("li", { key: gallery.id },
        React.createElement(Link, { to: `/galleries/${gallery.id}` },
            React.createElement("span", null, (0, galleries_1.galleryTitle)(gallery))))))));
    const PlayCountCell = (scene) => {
        var _a;
        return (React.createElement(FormattedMessage, { id: "plays", values: { value: intl.formatNumber((_a = scene.play_count) !== null && _a !== void 0 ? _a : 0) } }));
    };
    const PlayDurationCell = (scene) => {
        var _a;
        return (React.createElement(React.Fragment, null, text_1.default.secondsToTimestamp((_a = scene.play_duration) !== null && _a !== void 0 ? _a : 0)));
    };
    const ResolutionCell = (scene) => (React.createElement("ul", { className: "comma-list" }, scene.files.map((file) => {
        var _a, _b;
        return (React.createElement("li", { key: file.id },
            React.createElement("span", null,
                " ",
                text_1.default.resolution((_a = file === null || file === void 0 ? void 0 : file.width) !== null && _a !== void 0 ? _a : 0, (_b = file === null || file === void 0 ? void 0 : file.height) !== null && _b !== void 0 ? _b : 0))));
    })));
    const FileSizeCell = (scene) => (React.createElement("ul", { className: "comma-list" }, scene.files.map((file) => (React.createElement("li", { key: file.id },
        React.createElement(FileSize_1.FileSize, { size: file.size }))))));
    const FrameRateCell = (scene) => (React.createElement("ul", { className: "comma-list" }, scene.files.map((file) => {
        var _a;
        return (React.createElement("li", { key: file.id },
            React.createElement("span", null,
                React.createElement(FormattedMessage, { id: "frames_per_second", values: { value: intl.formatNumber((_a = file.frame_rate) !== null && _a !== void 0 ? _a : 0) } }))));
    })));
    const BitRateCell = (scene) => (React.createElement("ul", { className: "comma-list" }, scene.files.map((file) => {
        var _a;
        return (React.createElement("li", { key: file.id },
            React.createElement("span", null,
                React.createElement(FormattedMessage, { id: "megabits_per_second", values: {
                        value: intl.formatNumber(((_a = file.bit_rate) !== null && _a !== void 0 ? _a : 0) / 1000000, {
                            maximumFractionDigits: 2,
                        }),
                    } }))));
    })));
    const AudioCodecCell = (scene) => (React.createElement("ul", { className: "comma-list over" }, scene.files.map((file) => (React.createElement("li", { key: file.id },
        React.createElement("span", null, file.audio_codec))))));
    const VideoCodecCell = (scene) => (React.createElement("ul", { className: "comma-list" }, scene.files.map((file) => (React.createElement("li", { key: file.id },
        React.createElement("span", null, file.video_codec))))));
    const PathCell = (scene) => (React.createElement("ul", { className: "newline-list overflowable TruncatedText" }, scene.files.map((file) => (React.createElement("li", { key: file.id },
        React.createElement("span", null, file.path))))));
    const allColumns = [
        {
            value: "cover_image",
            label: intl.formatMessage({ id: "cover_image" }),
            defaultShow: true,
            render: CoverImageCell,
        },
        {
            value: "title",
            label: intl.formatMessage({ id: "title" }),
            defaultShow: true,
            mandatory: true,
            render: TitleCell,
        },
        {
            value: "date",
            label: intl.formatMessage({ id: "date" }),
            defaultShow: true,
            render: DateCell,
        },
        {
            value: "rating",
            label: intl.formatMessage({ id: "rating" }),
            defaultShow: true,
            render: RatingCell,
        },
        {
            value: "scene_code",
            label: intl.formatMessage({ id: "scene_code" }),
            render: (s) => React.createElement(React.Fragment, null, s.code),
        },
        {
            value: "duration",
            label: intl.formatMessage({ id: "duration" }),
            defaultShow: true,
            render: DurationCell,
        },
        {
            value: "studio",
            label: intl.formatMessage({ id: "studio" }),
            defaultShow: true,
            render: StudioCell,
        },
        {
            value: "performers",
            label: intl.formatMessage({ id: "performers" }),
            defaultShow: true,
            render: PerformersCell,
        },
        {
            value: "tags",
            label: intl.formatMessage({ id: "tags" }),
            defaultShow: true,
            render: TagCell,
        },
        {
            value: "groups",
            label: intl.formatMessage({ id: "groups" }),
            defaultShow: true,
            render: GroupCell,
        },
        {
            value: "galleries",
            label: intl.formatMessage({ id: "galleries" }),
            defaultShow: true,
            render: GalleriesCell,
        },
        {
            value: "play_count",
            label: intl.formatMessage({ id: "play_count" }),
            render: PlayCountCell,
        },
        {
            value: "play_duration",
            label: intl.formatMessage({ id: "play_duration" }),
            render: PlayDurationCell,
        },
        {
            value: "o_counter",
            label: intl.formatMessage({ id: "o_count" }),
            render: (s) => React.createElement(React.Fragment, null, s.o_counter),
        },
        {
            value: "resolution",
            label: intl.formatMessage({ id: "resolution" }),
            render: ResolutionCell,
        },
        {
            value: "path",
            label: intl.formatMessage({ id: "path" }),
            render: PathCell,
        },
        {
            value: "filesize",
            label: intl.formatMessage({ id: "filesize" }),
            render: FileSizeCell,
        },
        {
            value: "framerate",
            label: intl.formatMessage({ id: "framerate" }),
            render: FrameRateCell,
        },
        {
            value: "bitrate",
            label: intl.formatMessage({ id: "bitrate" }),
            render: BitRateCell,
        },
        {
            value: "video_codec",
            label: intl.formatMessage({ id: "video_codec" }),
            render: VideoCodecCell,
        },
        {
            value: "audio_codec",
            label: intl.formatMessage({ id: "audio_codec" }),
            render: AudioCodecCell,
        },
    ];
    const defaultColumns = allColumns
        .filter((col) => col.defaultShow)
        .map((col) => col.value);
    const { selectedColumns, saveColumns } = (0, useTableColumns_1.useTableColumns)(TABLE_NAME, defaultColumns);
    const columnRenderFuncs = {};
    allColumns.forEach((col) => {
        if (col.render) {
            columnRenderFuncs[col.value] = col.render;
        }
    });
    function renderCell(column, scene, index) {
        const render = columnRenderFuncs[column.value];
        if (render)
            return render(scene, index);
    }
    return (React.createElement(ListTable_1.ListTable, { className: "scene-table", items: props.scenes, allColumns: allColumns, columns: selectedColumns, setColumns: (c) => saveColumns(c), selectedIds: props.selectedIds, onSelectChange: props.onSelectChange, renderCell: renderCell }));
};
exports.SceneListTreeble = SceneListTreeble;
//# sourceMappingURL=SceneListTable.js.map