
import TextUtils from "../utils/text";
import { objectTitle } from "../core/files";
import { galleryTitle } from "../core/galleries";
import type SceneQueue from "../models/SceneQueue";
import { ISlimSceneData } from "../models/SlimSceneData";
import { IColumn, ListTable } from "./list/ListTable";
import { FileSize } from "./shared/FileSize";
import { useTableColumns } from "../hooks/useTableColumns";

const PluginApi = window.PluginApi;
type TSceneOperationStatus = "success" | "fail" | "warn";

interface ISceneOperationResult {
  status?: TSceneOperationStatus | null;
  statusText?: string | null;
  newPath?: string | null;
}

interface ISceneListTableProps {
  scenes: ISlimSceneData[];
  sceneOperationById?: Record<string, ISceneOperationResult>;
  queue?: SceneQueue;
  selectedIds: Set<string>;
  onSelectChange: (id: string, selected: boolean, shiftKey: boolean) => void;
}

  const React = PluginApi.React;
  const Link = PluginApi.libraries.ReactRouterDOM.Link;
  const NavUtils = PluginApi.utils.NavUtils;
  const { FormattedMessage } = PluginApi.libraries.Intl;
  const { Icon } = PluginApi.components;
  const { faCircleCheck, faCircleXmark, faTriangleExclamation } =
    PluginApi.libraries.FontAwesomeSolid;
  const { useSceneUpdate } = PluginApi.utils.StashService;

const TABLE_NAME = "scenes";

export const SceneListTreeble: React.FC<ISceneListTableProps> = (
  props: ISceneListTableProps
) => {
  const intl = PluginApi.libraries.Intl.useIntl();

  const [updateScene] = PluginApi.utils.StashService.useSceneUpdate();

  function setRating(v: number | null, sceneId: string) {
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

  const CoverImageCell = (scene: ISlimSceneData, index: number) => {
    const title = objectTitle(scene);
    const sceneLink = props.queue
      ? props.queue.makeLink(scene.id, { sceneIndex: index })
      : `/scenes/${scene.id}`;

    return (
      <Link to={sceneLink}>
        <img
          loading="lazy"
          className="image-thumbnail"
          alt={title}
          src={scene.paths.screenshot ?? ""}
        />
      </Link>
    );
  };

  const TitleCell = (scene: ISlimSceneData, index: number) => {
    const title = objectTitle(scene);
    const sceneLink = props.queue
      ? props.queue.makeLink(scene.id, { sceneIndex: index })
      : `/scenes/${scene.id}`;

    return (
      <Link to={sceneLink} title={title}>
        <span>{title}</span>
      </Link>
    );
  };

  const DateCell = (scene: ISlimSceneData) => <>{scene.date || "-"}</>;

  const RatingCell = (scene: ISlimSceneData) => (
  <h1>{scene.rating100}</h1>
    // <RatingSystem
    //   value={scene.rating100}
    //   onSetRating={(value: number | null) => setRating(value, scene.id)}
    //   clickToRate
    // />
  );

  const DurationCell = (scene: ISlimSceneData) => {
    const file = scene.files.length > 0 ? scene.files[0] : undefined;
    const duration = file?.duration;
    return typeof duration === "number"
      ? TextUtils.secondsToTimestamp(duration)
      : null;
  };

  const TagCell = (scene: ISlimSceneData) => (
    <ul className="comma-list overflowable">
      {scene.tags.map((tag) => (
        <li key={tag.id}>
          <Link to={NavUtils.makeTagScenesUrl(tag)}>
            <span>{tag.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  const PerformersCell = (scene: ISlimSceneData) => (
    <ul className="comma-list overflowable">
      {scene.performers.map((performer) => (
        <li key={performer.id}>
          <Link to={NavUtils.makePerformerScenesUrl(performer)}>
            <span>{performer.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  const StudioCell = (scene: ISlimSceneData) => {
    if (scene.studio) {
      return (
        <Link
          to={NavUtils.makeStudioScenesUrl(scene.studio)}
          title={scene.studio.name}
        >
          <span>{scene.studio.name}</span>
        </Link>
      );
    }
  };

  const GroupCell = (scene: ISlimSceneData) => (
    <ul className="comma-list overflowable">
      {scene.groups.map((sceneGroup) => (
        <li key={sceneGroup.group.id}>
          <Link to={NavUtils.makeGroupScenesUrl(sceneGroup.group)}>
            <span>{sceneGroup.group.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  const GalleriesCell = (scene: ISlimSceneData) => (
    <ul className="comma-list overflowable">
      {scene.galleries.map((gallery) => (
        <li key={gallery.id}>
          <Link to={`/galleries/${gallery.id}`}>
            <span>{galleryTitle(gallery)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  const PlayCountCell = (scene: ISlimSceneData) => (
    <FormattedMessage
      id="plays"
      values={{ value: intl.formatNumber(scene.play_count ?? 0) }}
    />
  );

  const PlayDurationCell = (scene: ISlimSceneData) => (
    <>{TextUtils.secondsToTimestamp(scene.play_duration ?? 0)}</>
  );

  const ResolutionCell = (scene: ISlimSceneData) => (
    <ul className="comma-list">
      {scene.files.map((file) => (
        <li key={file.id}>
          <span> {TextUtils.resolution(file?.width ?? 0, file?.height ?? 0)}</span>
        </li>
      ))}
    </ul>
  );

  const FileSizeCell = (scene: ISlimSceneData) => (
    <ul className="comma-list">
      {scene.files.map((file) => (
        <li key={file.id}>
          <FileSize size={file.size} />
        </li>
      ))}
    </ul>
  );

  const FrameRateCell = (scene: ISlimSceneData) => (
    <ul className="comma-list">
      {scene.files.map((file) => (
        <li key={file.id}>
          <span>
            <FormattedMessage
              id="frames_per_second"
              values={{ value: intl.formatNumber(file.frame_rate ?? 0) }}
            />
          </span>
        </li>
      ))}
    </ul>
  );

  const BitRateCell = (scene: ISlimSceneData) => (
    <ul className="comma-list">
      {scene.files.map((file) => (
        <li key={file.id}>
          <span>
            <FormattedMessage
              id="megabits_per_second"
              values={{
                value: intl.formatNumber((file.bit_rate ?? 0) / 1000000, {
                  maximumFractionDigits: 2,
                }),
              }}
            />
          </span>
        </li>
      ))}
    </ul>
  );

  const AudioCodecCell = (scene: ISlimSceneData) => (
    <ul className="comma-list over">
      {scene.files.map((file) => (
        <li key={file.id}>
          <span>{file.audio_codec}</span>
        </li>
      ))}
    </ul>
  );

  const VideoCodecCell = (scene: ISlimSceneData) => (
    <ul className="comma-list">
      {scene.files.map((file) => (
        <li key={file.id}>
          <span>{file.video_codec}</span>
        </li>
      ))}
    </ul>
  );

  const PathCell = (scene: ISlimSceneData) => (
    <>
      {scene.files.map((file) => (
          <span>{file.path}</span>
      ))}
    </>
  );

  const StatusCell = (scene: ISlimSceneData) => {
    const status = props.sceneOperationById?.[scene.id]?.status;
    const statusText = props.sceneOperationById?.[scene.id]?.statusText || "";
    if (!status) return <span>-</span>;

    if (status === "success") {
      return <Icon icon={faCircleCheck} className="text-success" />;
    }
    if (status === "warn") {
      return (
        <span title={statusText || "Warning"}>
          <Icon icon={faTriangleExclamation} className="text-warning" />
        </span>
      );
    }
    return (
      <span title={statusText || "Error"}>
        <Icon icon={faCircleXmark} className="text-danger" />
      </span>
    );
  };

  const StatusTextCell = (scene: ISlimSceneData) => (
    <span>{props.sceneOperationById?.[scene.id]?.statusText || "-"}</span>
  );

  const NewPathCell = (scene: ISlimSceneData) => (
    <span>{props.sceneOperationById?.[scene.id]?.newPath || "-"}</span>
  );

  interface IColumnSpec {
    value: string;
    label: string;
    defaultShow?: boolean;
    mandatory?: boolean;
    resizable?: boolean;
    defaultWidth?: number;
    minWidth?: number;
    multiline?: boolean;
    maxLines?: number;
    render?: (
      scene: ISlimSceneData,
      index: number
    ) => React.ReactNode;
  }

  const allColumns: IColumnSpec[] = [
    {
      value: "cover_image",
      label: intl.formatMessage({ id: "cover_image" }),
      defaultShow: true,
      resizable: false,
      defaultWidth: 204,
      minWidth: 204,
      multiline: false,
      render: CoverImageCell,
    },
    {
      value: "title",
      label: intl.formatMessage({ id: "title" }),
      defaultShow: true,
      defaultWidth: 280,
      minWidth: 180,
      multiline: true,
      maxLines: 3,
      render: TitleCell,
    },
    {
      value: "date",
      label: intl.formatMessage({ id: "date" }),
      defaultShow: true,
      defaultWidth: 120,
      minWidth: 110,
      multiline: false,
      render: DateCell,
    },
    {
      value: "rating",
      label: intl.formatMessage({ id: "rating" }),
      defaultShow: true,
      defaultWidth: 96,
      minWidth: 90,
      multiline: false,
      render: RatingCell,
    },
    {
      value: "scene_code",
      label: intl.formatMessage({ id: "scene_code" }),
      defaultWidth: 140,
      minWidth: 120,
      multiline: false,
      render: (s) => <>{s.code}</>,
    },
    {
      value: "duration",
      label: intl.formatMessage({ id: "duration" }),
      defaultShow: true,
      defaultWidth: 110,
      minWidth: 100,
      multiline: false,
      render: DurationCell,
    },
    {
      value: "studio",
      label: intl.formatMessage({ id: "studio" }),
      defaultShow: true,
      defaultWidth: 180,
      minWidth: 140,
      render: StudioCell,
    },
    {
      value: "performers",
      label: intl.formatMessage({ id: "performers" }),
      defaultShow: true,
      defaultWidth: 240,
      minWidth: 180,
      multiline: true,
      maxLines: 3,
      render: PerformersCell,
    },
    {
      value: "tags",
      label: intl.formatMessage({ id: "tags" }),
      defaultShow: true,
      defaultWidth: 260,
      minWidth: 180,
      multiline: true,
      maxLines: 3,
      render: TagCell,
    },
    {
      value: "groups",
      label: intl.formatMessage({ id: "groups" }),
      defaultShow: true,
      defaultWidth: 220,
      minWidth: 160,
      render: GroupCell,
    },
    {
      value: "galleries",
      label: intl.formatMessage({ id: "galleries" }),
      defaultShow: true,
      defaultWidth: 220,
      minWidth: 170,
      render: GalleriesCell,
    },
    {
      value: "play_count",
      label: intl.formatMessage({ id: "play_count" }),
      defaultWidth: 120,
      minWidth: 110,
      multiline: false,
      render: PlayCountCell,
    },
    {
      value: "play_duration",
      label: intl.formatMessage({ id: "play_duration" }),
      defaultWidth: 130,
      minWidth: 120,
      multiline: false,
      render: PlayDurationCell,
    },
    {
      value: "o_counter",
      label: intl.formatMessage({ id: "o_count" }),
      defaultWidth: 100,
      minWidth: 90,
      multiline: false,
      render: (s) => <>{s.o_counter}</>,
    },
    {
      value: "resolution",
      label: intl.formatMessage({ id: "resolution" }),
      defaultWidth: 130,
      minWidth: 120,
      multiline: false,
      render: ResolutionCell,
    },
    {
      value: "path",
      label: intl.formatMessage({ id: "path" }),
      defaultWidth: 460,
      minWidth: 260,
      multiline: true,
      maxLines: 2,
      render: PathCell,
    },
    {
      value: "status",
      label: "Status",
      defaultShow: true,
      defaultWidth: 90,
      minWidth: 90,
      multiline: false,
      render: StatusCell,
    },
    {
      value: "status_text",
      label: "Status Text",
      defaultShow: true,
      defaultWidth: 240,
      minWidth: 180,
      multiline: true,
      maxLines: 2,
      render: StatusTextCell,
    },
    {
      value: "new_path",
      label: "New Path",
      defaultShow: true,
      defaultWidth: 420,
      minWidth: 240,
      multiline: true,
      maxLines: 2,
      render: NewPathCell,
    },
    {
      value: "filesize",
      label: intl.formatMessage({ id: "filesize" }),
      defaultWidth: 130,
      minWidth: 110,
      multiline: false,
      render: FileSizeCell,
    },
    {
      value: "framerate",
      label: intl.formatMessage({ id: "framerate" }),
      defaultWidth: 140,
      minWidth: 120,
      multiline: false,
      render: FrameRateCell,
    },
    {
      value: "bitrate",
      label: intl.formatMessage({ id: "bitrate" }),
      defaultWidth: 130,
      minWidth: 120,
      multiline: false,
      render: BitRateCell,
    },
    {
      value: "video_codec",
      label: intl.formatMessage({ id: "video_codec" }),
      defaultWidth: 130,
      minWidth: 120,
      multiline: false,
      render: VideoCodecCell,
    },
    {
      value: "audio_codec",
      label: intl.formatMessage({ id: "audio_codec" }),
      defaultWidth: 130,
      minWidth: 120,
      multiline: false,
      render: AudioCodecCell,
    },
  ];

  const defaultColumns = allColumns
    .filter((col) => col.defaultShow)
    .map((col) => col.value);

  const { selectedColumns, saveColumns } = useTableColumns(
    TABLE_NAME,
    defaultColumns
  );

  const columnRenderFuncs: Record<
    string,
    (scene: ISlimSceneData, index: number) => React.ReactNode
  > = {};
  allColumns.forEach((col) => {
    if (col.render) {
      columnRenderFuncs[col.value] = col.render;
    }
  });

  function renderCell(
    column: IColumn,
    scene: ISlimSceneData,
    index: number
  ) {
    const render = columnRenderFuncs[column.value];

    if (render) return render(scene, index);
  }

  function isSceneSelectable(scene: ISlimSceneData): boolean {
    const status = props.sceneOperationById?.[scene.id]?.status;
    if (!status) return true;
    return status === "success";
  }

  return (
    <ListTable
      tableName={TABLE_NAME}
      className="scene-table"
      items={props.scenes}
      allColumns={allColumns}
      columns={selectedColumns}
      setColumns={(c: string[]) => saveColumns(c)}
      selectedIds={props.selectedIds}
      onSelectChange={props.onSelectChange}
      isRowSelectable={(scene) => isSceneSelectable(scene)}
      renderCell={renderCell}
    />
  );
};
