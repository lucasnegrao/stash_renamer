import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import TextUtils from "src/utils/text";
import { objectTitle } from "src/core/files";
import { galleryTitle } from "src/core/galleries";
import { ListTable } from "./list/ListTable";
import { FileSize } from "./shared/FileSize";
import { useTableColumns } from "src/hooks/useTableColumns";
const PluginApi = window.PluginApi;
const React = PluginApi.React;
const Link = PluginApi.libraries.ReactRouterDOM.Link;
const NavUtils = PluginApi.utils.NavUtils;
const { FormattedMessage } = PluginApi.libraries.Intl;
const { useSceneUpdate } = PluginApi.utils.StashService;
const TABLE_NAME = "scenes";
export const SceneListTable = (props) => {
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
        const title = objectTitle(scene);
        const sceneLink = props.queue
            ? props.queue.makeLink(scene.id, { sceneIndex: index })
            : `/scenes/${scene.id}`;
        return (_jsx(Link, { to: sceneLink, children: _jsx("img", { loading: "lazy", className: "image-thumbnail", alt: title, src: (_a = scene.paths.screenshot) !== null && _a !== void 0 ? _a : "" }) }));
    };
    const TitleCell = (scene, index) => {
        const title = objectTitle(scene);
        const sceneLink = props.queue
            ? props.queue.makeLink(scene.id, { sceneIndex: index })
            : `/scenes/${scene.id}`;
        return (_jsx(Link, { to: sceneLink, title: title, children: _jsx("span", { className: "ellips-data", children: title }) }));
    };
    const DateCell = (scene) => _jsx(_Fragment, { children: scene.date });
    const RatingCell = (scene) => (_jsx("h1", { children: scene.rating100 })
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
            ? TextUtils.secondsToTimestamp(duration)
            : null;
    };
    const TagCell = (scene) => (_jsx("ul", { className: "comma-list overflowable", children: scene.tags.map((tag) => (_jsx("li", { children: _jsx(Link, { to: NavUtils.makeTagScenesUrl(tag), children: _jsx("span", { children: tag.name }) }) }, tag.id))) }));
    const PerformersCell = (scene) => (_jsx("ul", { className: "comma-list overflowable", children: scene.performers.map((performer) => (_jsx("li", { children: _jsx(Link, { to: NavUtils.makePerformerScenesUrl(performer), children: _jsx("span", { children: performer.name }) }) }, performer.id))) }));
    const StudioCell = (scene) => {
        if (scene.studio) {
            return (_jsx(Link, { to: NavUtils.makeStudioScenesUrl(scene.studio), title: scene.studio.name, children: _jsx("span", { className: "ellips-data", children: scene.studio.name }) }));
        }
    };
    const GroupCell = (scene) => (_jsx("ul", { className: "comma-list overflowable", children: scene.groups.map((sceneGroup) => (_jsx("li", { children: _jsx(Link, { to: NavUtils.makeGroupScenesUrl(sceneGroup.group), children: _jsx("span", { className: "ellips-data", children: sceneGroup.group.name }) }) }, sceneGroup.group.id))) }));
    const GalleriesCell = (scene) => (_jsx("ul", { className: "comma-list overflowable", children: scene.galleries.map((gallery) => (_jsx("li", { children: _jsx(Link, { to: `/galleries/${gallery.id}`, children: _jsx("span", { children: galleryTitle(gallery) }) }) }, gallery.id))) }));
    const PlayCountCell = (scene) => {
        var _a;
        return (_jsx(FormattedMessage, { id: "plays", values: { value: intl.formatNumber((_a = scene.play_count) !== null && _a !== void 0 ? _a : 0) } }));
    };
    const PlayDurationCell = (scene) => {
        var _a;
        return (_jsx(_Fragment, { children: TextUtils.secondsToTimestamp((_a = scene.play_duration) !== null && _a !== void 0 ? _a : 0) }));
    };
    const ResolutionCell = (scene) => (_jsx("ul", { className: "comma-list", children: scene.files.map((file) => {
            var _a, _b;
            return (_jsx("li", { children: _jsxs("span", { children: [" ", TextUtils.resolution((_a = file === null || file === void 0 ? void 0 : file.width) !== null && _a !== void 0 ? _a : 0, (_b = file === null || file === void 0 ? void 0 : file.height) !== null && _b !== void 0 ? _b : 0)] }) }, file.id));
        }) }));
    const FileSizeCell = (scene) => (_jsx("ul", { className: "comma-list", children: scene.files.map((file) => (_jsx("li", { children: _jsx(FileSize, { size: file.size }) }, file.id))) }));
    const FrameRateCell = (scene) => (_jsx("ul", { className: "comma-list", children: scene.files.map((file) => {
            var _a;
            return (_jsx("li", { children: _jsx("span", { children: _jsx(FormattedMessage, { id: "frames_per_second", values: { value: intl.formatNumber((_a = file.frame_rate) !== null && _a !== void 0 ? _a : 0) } }) }) }, file.id));
        }) }));
    const BitRateCell = (scene) => (_jsx("ul", { className: "comma-list", children: scene.files.map((file) => {
            var _a;
            return (_jsx("li", { children: _jsx("span", { children: _jsx(FormattedMessage, { id: "megabits_per_second", values: {
                            value: intl.formatNumber(((_a = file.bit_rate) !== null && _a !== void 0 ? _a : 0) / 1000000, {
                                maximumFractionDigits: 2,
                            }),
                        } }) }) }, file.id));
        }) }));
    const AudioCodecCell = (scene) => (_jsx("ul", { className: "comma-list over", children: scene.files.map((file) => (_jsx("li", { children: _jsx("span", { children: file.audio_codec }) }, file.id))) }));
    const VideoCodecCell = (scene) => (_jsx("ul", { className: "comma-list", children: scene.files.map((file) => (_jsx("li", { children: _jsx("span", { children: file.video_codec }) }, file.id))) }));
    const PathCell = (scene) => (_jsx("ul", { className: "newline-list overflowable TruncatedText", children: scene.files.map((file) => (_jsx("li", { children: _jsx("span", { children: file.path }) }, file.id))) }));
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
            render: (s) => _jsx(_Fragment, { children: s.code }),
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
            render: (s) => _jsx(_Fragment, { children: s.o_counter }),
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
    const { selectedColumns, saveColumns } = useTableColumns(TABLE_NAME, defaultColumns);
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
    return (_jsx(ListTable, { className: "scene-table", items: props.scenes, allColumns: allColumns, columns: selectedColumns, setColumns: (c) => saveColumns(c), selectedIds: props.selectedIds, onSelectChange: props.onSelectChange, renderCell: renderCell }));
};
//# sourceMappingURL=SceneListTable.js.map