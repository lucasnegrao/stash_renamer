export interface IVideoFileFingerprint {
  type?: string | null;
  value?: string | null;
}

export interface IVideoFileData {
  id: string;
  path: string;
  size: number;
  mod_time?: string | null;
  duration?: number | null;
  video_codec?: string | null;
  audio_codec?: string | null;
  width?: number | null;
  height?: number | null;
  frame_rate?: number | null;
  bit_rate?: number | null;
  fingerprints: IVideoFileFingerprint[];
}

export interface ISlimSceneData {
  id: string;
  title?: string | null;
  code?: string | null;
  details?: string | null;
  director?: string | null;
  urls: string[];
  date?: string | null;
  rating100?: number | null;
  o_counter?: number | null;
  organized?: boolean | null;
  interactive?: boolean | null;
  interactive_speed?: number | null;
  resume_time?: number | null;
  play_duration?: number | null;
  play_count?: number | null;
  files: IVideoFileData[];
  paths: {
    screenshot?: string | null;
    preview?: string | null;
    stream?: string | null;
    webp?: string | null;
    vtt?: string | null;
    sprite?: string | null;
    funscript?: string | null;
    interactive_heatmap?: string | null;
    caption?: string | null;
  };
  scene_markers: Array<{
    id: string;
    title?: string | null;
    seconds?: number | null;
    primary_tag?: {
      id: string;
      name?: string | null;
    } | null;
  }>;
  galleries: Array<{
    id: string;
    files: Array<{ path: string }>;
    folder: { path: string };
    title?: string | null;
  }>;
  studio?: {
    id: string;
    name?: string | null;
    image_path?: string | null;
  } | null;
  groups: Array<{
    group: {
      id: string;
      name?: string | null;
      front_image_path?: string | null;
    };
    scene_index?: number | null;
  }>;
  tags: Array<{
    id: string;
    name?: string | null;
  }>;
  performers: Array<{
    id: string;
    name?: string | null;
    disambiguation?: string | null;
    gender?: string | null;
    favorite?: boolean | null;
    image_path?: string | null;
  }>;
  stash_ids: Array<{
    endpoint?: string | null;
    stash_id?: string | null;
    updated_at?: string | null;
  }>;
}
