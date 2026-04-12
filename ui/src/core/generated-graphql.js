// import { IUIConfig } from 'src/core/config';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {};
export var BlobsStorageType;
(function (BlobsStorageType) {
    /** Database */
    BlobsStorageType["Database"] = "DATABASE";
    /** Filesystem */
    BlobsStorageType["Filesystem"] = "FILESYSTEM";
})(BlobsStorageType || (BlobsStorageType = {}));
export var BulkUpdateIdMode;
(function (BulkUpdateIdMode) {
    BulkUpdateIdMode["Add"] = "ADD";
    BulkUpdateIdMode["Remove"] = "REMOVE";
    BulkUpdateIdMode["Set"] = "SET";
})(BulkUpdateIdMode || (BulkUpdateIdMode = {}));
export var CircumcisedEnum;
(function (CircumcisedEnum) {
    CircumcisedEnum["Cut"] = "CUT";
    CircumcisedEnum["Uncut"] = "UNCUT";
})(CircumcisedEnum || (CircumcisedEnum = {}));
export var CriterionModifier;
(function (CriterionModifier) {
    /** >= AND <= */
    CriterionModifier["Between"] = "BETWEEN";
    /** = */
    CriterionModifier["Equals"] = "EQUALS";
    CriterionModifier["Excludes"] = "EXCLUDES";
    /** > */
    CriterionModifier["GreaterThan"] = "GREATER_THAN";
    CriterionModifier["Includes"] = "INCLUDES";
    /** INCLUDES ALL */
    CriterionModifier["IncludesAll"] = "INCLUDES_ALL";
    /** IS NULL */
    CriterionModifier["IsNull"] = "IS_NULL";
    /** < */
    CriterionModifier["LessThan"] = "LESS_THAN";
    /** MATCHES REGEX */
    CriterionModifier["MatchesRegex"] = "MATCHES_REGEX";
    /** < OR > */
    CriterionModifier["NotBetween"] = "NOT_BETWEEN";
    /** != */
    CriterionModifier["NotEquals"] = "NOT_EQUALS";
    /** NOT MATCHES REGEX */
    CriterionModifier["NotMatchesRegex"] = "NOT_MATCHES_REGEX";
    /** IS NOT NULL */
    CriterionModifier["NotNull"] = "NOT_NULL";
})(CriterionModifier || (CriterionModifier = {}));
export var FilterMode;
(function (FilterMode) {
    FilterMode["Galleries"] = "GALLERIES";
    FilterMode["Groups"] = "GROUPS";
    FilterMode["Images"] = "IMAGES";
    FilterMode["Movies"] = "MOVIES";
    FilterMode["Performers"] = "PERFORMERS";
    FilterMode["Scenes"] = "SCENES";
    FilterMode["SceneMarkers"] = "SCENE_MARKERS";
    FilterMode["Studios"] = "STUDIOS";
    FilterMode["Tags"] = "TAGS";
})(FilterMode || (FilterMode = {}));
export var GenderEnum;
(function (GenderEnum) {
    GenderEnum["Female"] = "FEMALE";
    GenderEnum["Intersex"] = "INTERSEX";
    GenderEnum["Male"] = "MALE";
    GenderEnum["NonBinary"] = "NON_BINARY";
    GenderEnum["TransgenderFemale"] = "TRANSGENDER_FEMALE";
    GenderEnum["TransgenderMale"] = "TRANSGENDER_MALE";
})(GenderEnum || (GenderEnum = {}));
export var HashAlgorithm;
(function (HashAlgorithm) {
    HashAlgorithm["Md5"] = "MD5";
    /** oshash */
    HashAlgorithm["Oshash"] = "OSHASH";
})(HashAlgorithm || (HashAlgorithm = {}));
export var IdentifyFieldStrategy;
(function (IdentifyFieldStrategy) {
    /** Never sets the field value */
    IdentifyFieldStrategy["Ignore"] = "IGNORE";
    /**
     * For multi-value fields, merge with existing.
     * For single-value fields, ignore if already set
     */
    IdentifyFieldStrategy["Merge"] = "MERGE";
    /**
     * Always replaces the value if a value is found.
     * For multi-value fields, any existing values are removed and replaced with the
     * scraped values.
     */
    IdentifyFieldStrategy["Overwrite"] = "OVERWRITE";
})(IdentifyFieldStrategy || (IdentifyFieldStrategy = {}));
export var ImageLightboxDisplayMode;
(function (ImageLightboxDisplayMode) {
    ImageLightboxDisplayMode["FitX"] = "FIT_X";
    ImageLightboxDisplayMode["FitXy"] = "FIT_XY";
    ImageLightboxDisplayMode["Original"] = "ORIGINAL";
})(ImageLightboxDisplayMode || (ImageLightboxDisplayMode = {}));
export var ImageLightboxScrollMode;
(function (ImageLightboxScrollMode) {
    ImageLightboxScrollMode["PanY"] = "PAN_Y";
    ImageLightboxScrollMode["Zoom"] = "ZOOM";
})(ImageLightboxScrollMode || (ImageLightboxScrollMode = {}));
export var ImportDuplicateEnum;
(function (ImportDuplicateEnum) {
    ImportDuplicateEnum["Fail"] = "FAIL";
    ImportDuplicateEnum["Ignore"] = "IGNORE";
    ImportDuplicateEnum["Overwrite"] = "OVERWRITE";
})(ImportDuplicateEnum || (ImportDuplicateEnum = {}));
export var ImportMissingRefEnum;
(function (ImportMissingRefEnum) {
    ImportMissingRefEnum["Create"] = "CREATE";
    ImportMissingRefEnum["Fail"] = "FAIL";
    ImportMissingRefEnum["Ignore"] = "IGNORE";
})(ImportMissingRefEnum || (ImportMissingRefEnum = {}));
export var JobStatus;
(function (JobStatus) {
    JobStatus["Cancelled"] = "CANCELLED";
    JobStatus["Failed"] = "FAILED";
    JobStatus["Finished"] = "FINISHED";
    JobStatus["Ready"] = "READY";
    JobStatus["Running"] = "RUNNING";
    JobStatus["Stopping"] = "STOPPING";
})(JobStatus || (JobStatus = {}));
export var JobStatusUpdateType;
(function (JobStatusUpdateType) {
    JobStatusUpdateType["Add"] = "ADD";
    JobStatusUpdateType["Remove"] = "REMOVE";
    JobStatusUpdateType["Update"] = "UPDATE";
})(JobStatusUpdateType || (JobStatusUpdateType = {}));
export var LogLevel;
(function (LogLevel) {
    LogLevel["Debug"] = "Debug";
    LogLevel["Error"] = "Error";
    LogLevel["Info"] = "Info";
    LogLevel["Progress"] = "Progress";
    LogLevel["Trace"] = "Trace";
    LogLevel["Warning"] = "Warning";
})(LogLevel || (LogLevel = {}));
export var OrientationEnum;
(function (OrientationEnum) {
    /** Landscape */
    OrientationEnum["Landscape"] = "LANDSCAPE";
    /** Portrait */
    OrientationEnum["Portrait"] = "PORTRAIT";
    /** Square */
    OrientationEnum["Square"] = "SQUARE";
})(OrientationEnum || (OrientationEnum = {}));
export var PackageType;
(function (PackageType) {
    PackageType["Plugin"] = "Plugin";
    PackageType["Scraper"] = "Scraper";
})(PackageType || (PackageType = {}));
export var PluginSettingTypeEnum;
(function (PluginSettingTypeEnum) {
    PluginSettingTypeEnum["Boolean"] = "BOOLEAN";
    PluginSettingTypeEnum["Number"] = "NUMBER";
    PluginSettingTypeEnum["String"] = "STRING";
})(PluginSettingTypeEnum || (PluginSettingTypeEnum = {}));
export var PreviewPreset;
(function (PreviewPreset) {
    /** X264_FAST */
    PreviewPreset["Fast"] = "fast";
    /** X264_MEDIUM */
    PreviewPreset["Medium"] = "medium";
    /** X264_SLOW */
    PreviewPreset["Slow"] = "slow";
    /** X264_SLOWER */
    PreviewPreset["Slower"] = "slower";
    /** X264_ULTRAFAST */
    PreviewPreset["Ultrafast"] = "ultrafast";
    /** X264_VERYFAST */
    PreviewPreset["Veryfast"] = "veryfast";
    /** X264_VERYSLOW */
    PreviewPreset["Veryslow"] = "veryslow";
})(PreviewPreset || (PreviewPreset = {}));
export var ResolutionEnum;
(function (ResolutionEnum) {
    /** 8K */
    ResolutionEnum["EightK"] = "EIGHT_K";
    /** 5K */
    ResolutionEnum["FiveK"] = "FIVE_K";
    /** 4K */
    ResolutionEnum["FourK"] = "FOUR_K";
    /** 1080p */
    ResolutionEnum["FullHd"] = "FULL_HD";
    /** 8K+ */
    ResolutionEnum["Huge"] = "HUGE";
    /** 240p */
    ResolutionEnum["Low"] = "LOW";
    /** 1440p */
    ResolutionEnum["QuadHd"] = "QUAD_HD";
    /** 360p */
    ResolutionEnum["R360P"] = "R360P";
    /** 7K */
    ResolutionEnum["SevenK"] = "SEVEN_K";
    /** 6K */
    ResolutionEnum["SixK"] = "SIX_K";
    /** 480p */
    ResolutionEnum["Standard"] = "STANDARD";
    /** 720p */
    ResolutionEnum["StandardHd"] = "STANDARD_HD";
    /** 144p */
    ResolutionEnum["VeryLow"] = "VERY_LOW";
    /**
     * 1920p
     * @deprecated Use 4K instead
     */
    ResolutionEnum["VrHd"] = "VR_HD";
    /** 540p */
    ResolutionEnum["WebHd"] = "WEB_HD";
})(ResolutionEnum || (ResolutionEnum = {}));
/** Type of the content a scraper generates */
export var ScrapeContentType;
(function (ScrapeContentType) {
    ScrapeContentType["Gallery"] = "GALLERY";
    ScrapeContentType["Group"] = "GROUP";
    ScrapeContentType["Image"] = "IMAGE";
    ScrapeContentType["Movie"] = "MOVIE";
    ScrapeContentType["Performer"] = "PERFORMER";
    ScrapeContentType["Scene"] = "SCENE";
})(ScrapeContentType || (ScrapeContentType = {}));
export var ScrapeType;
(function (ScrapeType) {
    /** From existing object */
    ScrapeType["Fragment"] = "FRAGMENT";
    /** From text query */
    ScrapeType["Name"] = "NAME";
    /** From URL */
    ScrapeType["Url"] = "URL";
})(ScrapeType || (ScrapeType = {}));
export var SortDirectionEnum;
(function (SortDirectionEnum) {
    SortDirectionEnum["Asc"] = "ASC";
    SortDirectionEnum["Desc"] = "DESC";
})(SortDirectionEnum || (SortDirectionEnum = {}));
export var StreamingResolutionEnum;
(function (StreamingResolutionEnum) {
    /** 4k */
    StreamingResolutionEnum["FourK"] = "FOUR_K";
    /** 1080p */
    StreamingResolutionEnum["FullHd"] = "FULL_HD";
    /** 240p */
    StreamingResolutionEnum["Low"] = "LOW";
    /** Original */
    StreamingResolutionEnum["Original"] = "ORIGINAL";
    /** 480p */
    StreamingResolutionEnum["Standard"] = "STANDARD";
    /** 720p */
    StreamingResolutionEnum["StandardHd"] = "STANDARD_HD";
})(StreamingResolutionEnum || (StreamingResolutionEnum = {}));
export var SystemStatusEnum;
(function (SystemStatusEnum) {
    SystemStatusEnum["NeedsMigration"] = "NEEDS_MIGRATION";
    SystemStatusEnum["Ok"] = "OK";
    SystemStatusEnum["Setup"] = "SETUP";
})(SystemStatusEnum || (SystemStatusEnum = {}));
export const ConfigGeneralDataFragmentDoc = gql `
    fragment ConfigGeneralData on ConfigGeneralResult {
  stashes {
    path
    excludeVideo
    excludeImage
  }
  databasePath
  backupDirectoryPath
  deleteTrashPath
  generatedPath
  metadataPath
  scrapersPath
  pluginsPath
  cachePath
  blobsPath
  blobsStorage
  ffmpegPath
  ffprobePath
  calculateMD5
  videoFileNamingAlgorithm
  parallelTasks
  previewAudio
  previewSegments
  previewSegmentDuration
  previewExcludeStart
  previewExcludeEnd
  previewPreset
  transcodeHardwareAcceleration
  maxTranscodeSize
  maxStreamingTranscodeSize
  writeImageThumbnails
  createImageClipsFromVideos
  apiKey
  username
  password
  maxSessionAge
  logFile
  logOut
  logLevel
  logAccess
  logFileMaxSize
  useCustomSpriteInterval
  spriteInterval
  minimumSprites
  maximumSprites
  spriteScreenshotSize
  createGalleriesFromFolders
  galleryCoverRegex
  videoExtensions
  imageExtensions
  galleryExtensions
  excludes
  imageExcludes
  customPerformerImageLocation
  stashBoxes {
    name
    endpoint
    api_key
    max_requests_per_minute
  }
  pythonPath
  transcodeInputArgs
  transcodeOutputArgs
  liveTranscodeInputArgs
  liveTranscodeOutputArgs
  drawFunscriptHeatmapRange
  scraperPackageSources {
    name
    url
    local_path
  }
  pluginPackageSources {
    name
    url
    local_path
  }
}
    `;
export const ConfigInterfaceDataFragmentDoc = gql `
    fragment ConfigInterfaceData on ConfigInterfaceResult {
  sfwContentMode
  menuItems
  soundOnPreview
  wallShowTitle
  wallPlayback
  showScrubber
  maximumLoopDuration
  noBrowser
  notificationsEnabled
  autostartVideo
  autostartVideoOnPlaySelected
  continuePlaylistDefault
  showStudioAsText
  css
  cssEnabled
  javascript
  javascriptEnabled
  customLocales
  customLocalesEnabled
  disableCustomizations
  language
  imageLightbox {
    slideshowDelay
    displayMode
    scaleUp
    resetZoomOnNav
    scrollMode
    scrollAttemptsBeforeChange
    disableAnimation
  }
  disableDropdownCreate {
    performer
    tag
    studio
    movie
    gallery
  }
  handyKey
  funscriptOffset
  useStashHostedFunscript
}
    `;
export const ConfigDlnaDataFragmentDoc = gql `
    fragment ConfigDLNAData on ConfigDLNAResult {
  serverName
  enabled
  port
  whitelistedIPs
  interfaces
  videoSortOrder
}
    `;
export const ConfigScrapingDataFragmentDoc = gql `
    fragment ConfigScrapingData on ConfigScrapingResult {
  scraperUserAgent
  scraperCertCheck
  scraperCDPPath
  excludeTagPatterns
}
    `;
export const ScraperSourceDataFragmentDoc = gql `
    fragment ScraperSourceData on ScraperSource {
  stash_box_index
  stash_box_endpoint
  scraper_id
}
    `;
export const IdentifyFieldOptionsDataFragmentDoc = gql `
    fragment IdentifyFieldOptionsData on IdentifyFieldOptions {
  field
  strategy
  createMissing
}
    `;
export const IdentifyMetadataOptionsDataFragmentDoc = gql `
    fragment IdentifyMetadataOptionsData on IdentifyMetadataOptions {
  fieldOptions {
    ...IdentifyFieldOptionsData
  }
  setCoverImage
  setOrganized
  performerGenders
  skipMultipleMatches
  skipMultipleMatchTag
  skipSingleNamePerformers
  skipSingleNamePerformerTag
}
    ${IdentifyFieldOptionsDataFragmentDoc}`;
export const ConfigDefaultSettingsDataFragmentDoc = gql `
    fragment ConfigDefaultSettingsData on ConfigDefaultSettingsResult {
  scan {
    scanGenerateCovers
    scanGeneratePreviews
    scanGenerateImagePreviews
    scanGenerateSprites
    scanGeneratePhashes
    scanGenerateThumbnails
    scanGenerateClipPreviews
  }
  identify {
    sources {
      source {
        ...ScraperSourceData
      }
      options {
        ...IdentifyMetadataOptionsData
      }
    }
    options {
      ...IdentifyMetadataOptionsData
    }
  }
  autoTag {
    performers
    studios
    tags
  }
  generate {
    covers
    sprites
    previews
    imagePreviews
    previewOptions {
      previewSegments
      previewSegmentDuration
      previewExcludeStart
      previewExcludeEnd
      previewPreset
    }
    markers
    markerImagePreviews
    markerScreenshots
    transcodes
    phashes
    interactiveHeatmapsSpeeds
    clipPreviews
    imageThumbnails
  }
  deleteFile
  deleteGenerated
}
    ${ScraperSourceDataFragmentDoc}
${IdentifyMetadataOptionsDataFragmentDoc}`;
export const ConfigDataFragmentDoc = gql `
    fragment ConfigData on ConfigResult {
  general {
    ...ConfigGeneralData
  }
  interface {
    ...ConfigInterfaceData
  }
  dlna {
    ...ConfigDLNAData
  }
  scraping {
    ...ConfigScrapingData
  }
  defaults {
    ...ConfigDefaultSettingsData
  }
  ui
  plugins
}
    ${ConfigGeneralDataFragmentDoc}
${ConfigInterfaceDataFragmentDoc}
${ConfigDlnaDataFragmentDoc}
${ConfigScrapingDataFragmentDoc}
${ConfigDefaultSettingsDataFragmentDoc}`;
export const ImageFileDataFragmentDoc = gql `
    fragment ImageFileData on ImageFile {
  id
  path
  size
  mod_time
  width
  height
  fingerprints {
    type
    value
  }
}
    `;
export const SelectFolderDataFragmentDoc = gql `
    fragment SelectFolderData on Folder {
  id
  path
  basename
}
    `;
export const RecursiveFolderDataFragmentDoc = gql `
    fragment RecursiveFolderData on Folder {
  ...SelectFolderData
  parent_folders {
    ...SelectFolderData
  }
}
    ${SelectFolderDataFragmentDoc}`;
export const SavedFilterDataFragmentDoc = gql `
    fragment SavedFilterData on SavedFilter {
  id
  mode
  name
  find_filter {
    q
    page
    per_page
    sort
    direction
  }
  object_filter
  ui_options
}
    `;
export const SelectGalleryDataFragmentDoc = gql `
    fragment SelectGalleryData on Gallery {
  id
  title
  date
  code
  studio {
    name
  }
  cover {
    paths {
      thumbnail
    }
  }
  paths {
    preview
  }
  files {
    path
  }
  folder {
    path
  }
}
    `;
export const SelectGroupDataFragmentDoc = gql `
    fragment SelectGroupData on Group {
  id
  name
  aliases
  date
  studio {
    name
  }
  front_image_path
}
    `;
export const SlimStudioDataFragmentDoc = gql `
    fragment SlimStudioData on Studio {
  id
  name
  image_path
  stash_ids {
    endpoint
    stash_id
    updated_at
  }
  parent_studio {
    id
  }
  details
  rating100
  aliases
  tags {
    id
    name
  }
  favorite
  ignore_auto_tag
  organized
  o_counter
}
    `;
export const SlimTagDataFragmentDoc = gql `
    fragment SlimTagData on Tag {
  id
  name
  sort_name
  aliases
  image_path
  parent_count
  child_count
  stash_ids {
    endpoint
    stash_id
    updated_at
  }
}
    `;
export const SlimGroupDataFragmentDoc = gql `
    fragment SlimGroupData on Group {
  id
  name
  front_image_path
  rating100
}
    `;
export const ListGroupDataFragmentDoc = gql `
    fragment ListGroupData on Group {
  id
  name
  aliases
  duration
  date
  rating100
  director
  studio {
    ...SlimStudioData
  }
  tags {
    ...SlimTagData
  }
  containing_groups {
    group {
      ...SlimGroupData
    }
    description
  }
  synopsis
  urls
  front_image_path
  back_image_path
  scene_count
  performer_count
  sub_group_count
  o_counter
  scenes {
    id
    title
  }
}
    ${SlimStudioDataFragmentDoc}
${SlimTagDataFragmentDoc}
${SlimGroupDataFragmentDoc}`;
export const VisualFileDataFragmentDoc = gql `
    fragment VisualFileData on VisualFile {
  ... on BaseFile {
    id
    path
    size
    mod_time
    fingerprints {
      type
      value
    }
  }
  ... on ImageFile {
    id
    path
    size
    mod_time
    width
    height
    fingerprints {
      type
      value
    }
  }
  ... on VideoFile {
    id
    path
    size
    mod_time
    duration
    video_codec
    audio_codec
    width
    height
    frame_rate
    bit_rate
    fingerprints {
      type
      value
    }
  }
}
    `;
export const SlimImageDataFragmentDoc = gql `
    fragment SlimImageData on Image {
  id
  title
  code
  date
  urls
  details
  photographer
  rating100
  organized
  o_counter
  paths {
    thumbnail
    preview
    image
  }
  galleries {
    id
    title
    files {
      path
    }
    folder {
      path
    }
  }
  studio {
    id
    name
    image_path
  }
  tags {
    id
    name
  }
  performers {
    id
    name
    gender
    favorite
    image_path
  }
  visual_files {
    ...VisualFileData
  }
}
    ${VisualFileDataFragmentDoc}`;
export const GalleryFileDataFragmentDoc = gql `
    fragment GalleryFileData on GalleryFile {
  id
  path
  size
  mod_time
  fingerprints {
    type
    value
  }
}
    `;
export const FolderDataFragmentDoc = gql `
    fragment FolderData on Folder {
  id
  basename
  path
}
    `;
export const GalleryChapterDataFragmentDoc = gql `
    fragment GalleryChapterData on GalleryChapter {
  id
  title
  image_index
  gallery {
    id
  }
}
    `;
export const PerformerDataFragmentDoc = gql `
    fragment PerformerData on Performer {
  id
  name
  disambiguation
  urls
  gender
  birthdate
  ethnicity
  country
  eye_color
  height_cm
  measurements
  fake_tits
  penis_length
  circumcised
  career_start
  career_end
  tattoos
  piercings
  alias_list
  favorite
  ignore_auto_tag
  image_path
  scene_count
  image_count
  gallery_count
  group_count
  performer_count
  o_counter
  tags {
    ...SlimTagData
  }
  stash_ids {
    stash_id
    endpoint
    updated_at
  }
  rating100
  details
  death_date
  hair_color
  weight
  custom_fields
}
    ${SlimTagDataFragmentDoc}`;
export const VideoFileDataFragmentDoc = gql `
    fragment VideoFileData on VideoFile {
  id
  path
  size
  mod_time
  duration
  video_codec
  audio_codec
  width
  height
  frame_rate
  bit_rate
  fingerprints {
    type
    value
  }
}
    `;
export const SlimSceneDataFragmentDoc = gql `
    fragment SlimSceneData on Scene {
  id
  title
  code
  details
  director
  urls
  date
  rating100
  o_counter
  organized
  interactive
  interactive_speed
  resume_time
  play_duration
  play_count
  files {
    ...VideoFileData
  }
  paths {
    screenshot
    preview
    stream
    webp
    vtt
    sprite
    funscript
    interactive_heatmap
    caption
  }
  scene_markers {
    id
    title
    seconds
    primary_tag {
      id
      name
    }
  }
  galleries {
    id
    files {
      path
    }
    folder {
      path
    }
    title
  }
  studio {
    id
    name
    image_path
  }
  groups {
    group {
      id
      name
      front_image_path
    }
    scene_index
  }
  tags {
    id
    name
  }
  performers {
    id
    name
    disambiguation
    gender
    favorite
    image_path
  }
  stash_ids {
    endpoint
    stash_id
    updated_at
  }
}
    ${VideoFileDataFragmentDoc}`;
export const GalleryDataFragmentDoc = gql `
    fragment GalleryData on Gallery {
  id
  created_at
  updated_at
  title
  code
  date
  urls
  details
  photographer
  rating100
  organized
  paths {
    cover
    preview
  }
  files {
    ...GalleryFileData
  }
  folder {
    ...FolderData
  }
  image_count
  chapters {
    ...GalleryChapterData
  }
  studio {
    ...SlimStudioData
  }
  tags {
    ...SlimTagData
  }
  performers {
    ...PerformerData
  }
  scenes {
    ...SlimSceneData
  }
  custom_fields
}
    ${GalleryFileDataFragmentDoc}
${FolderDataFragmentDoc}
${GalleryChapterDataFragmentDoc}
${SlimStudioDataFragmentDoc}
${SlimTagDataFragmentDoc}
${PerformerDataFragmentDoc}
${SlimSceneDataFragmentDoc}`;
export const ImageDataFragmentDoc = gql `
    fragment ImageData on Image {
  id
  title
  code
  rating100
  date
  urls
  details
  photographer
  organized
  o_counter
  created_at
  updated_at
  paths {
    thumbnail
    preview
    image
  }
  galleries {
    ...GalleryData
  }
  studio {
    ...SlimStudioData
  }
  tags {
    ...SlimTagData
  }
  performers {
    ...PerformerData
  }
  visual_files {
    ...VisualFileData
  }
  custom_fields
}
    ${GalleryDataFragmentDoc}
${SlimStudioDataFragmentDoc}
${SlimTagDataFragmentDoc}
${PerformerDataFragmentDoc}
${VisualFileDataFragmentDoc}`;
export const JobDataFragmentDoc = gql `
    fragment JobData on Job {
  id
  status
  subTasks
  description
  progress
  startTime
  endTime
  addTime
  error
}
    `;
export const LogEntryDataFragmentDoc = gql `
    fragment LogEntryData on LogEntry {
  time
  level
  message
}
    `;
export const PackageDataFragmentDoc = gql `
    fragment PackageData on Package {
  package_id
  name
  version
  date
  metadata
  sourceURL
}
    `;
export const SlimPerformerDataFragmentDoc = gql `
    fragment SlimPerformerData on Performer {
  id
  name
  disambiguation
  gender
  urls
  image_path
  favorite
  ignore_auto_tag
  country
  birthdate
  ethnicity
  hair_color
  eye_color
  height_cm
  fake_tits
  penis_length
  circumcised
  career_start
  career_end
  tattoos
  piercings
  alias_list
  tags {
    id
    name
  }
  stash_ids {
    endpoint
    stash_id
    updated_at
  }
  rating100
  death_date
  weight
}
    `;
export const SelectPerformerDataFragmentDoc = gql `
    fragment SelectPerformerData on Performer {
  id
  name
  disambiguation
  alias_list
  image_path
  birthdate
  death_date
}
    `;
export const SceneMarkerSceneDataFragmentDoc = gql `
    fragment SceneMarkerSceneData on Scene {
  id
  title
  files {
    width
    height
    path
  }
  performers {
    id
    name
    image_path
  }
}
    `;
export const SceneMarkerDataFragmentDoc = gql `
    fragment SceneMarkerData on SceneMarker {
  id
  title
  seconds
  end_seconds
  stream
  preview
  screenshot
  scene {
    ...SceneMarkerSceneData
  }
  primary_tag {
    id
    name
  }
  tags {
    id
    name
  }
}
    ${SceneMarkerSceneDataFragmentDoc}`;
export const SlimGalleryDataFragmentDoc = gql `
    fragment SlimGalleryData on Gallery {
  id
  title
  code
  date
  urls
  details
  photographer
  rating100
  organized
  files {
    ...GalleryFileData
  }
  folder {
    ...FolderData
  }
  image_count
  chapters {
    id
    title
    image_index
  }
  studio {
    id
    name
    image_path
  }
  tags {
    id
    name
  }
  performers {
    id
    name
    gender
    favorite
    image_path
  }
  scenes {
    ...SlimSceneData
  }
  paths {
    cover
    preview
  }
}
    ${GalleryFileDataFragmentDoc}
${FolderDataFragmentDoc}
${SlimSceneDataFragmentDoc}`;
export const GroupDataFragmentDoc = gql `
    fragment GroupData on Group {
  id
  name
  aliases
  duration
  date
  rating100
  director
  studio {
    ...SlimStudioData
  }
  tags {
    ...SlimTagData
  }
  containing_groups {
    group {
      ...SlimGroupData
    }
    description
  }
  synopsis
  urls
  front_image_path
  back_image_path
  scene_count
  scene_count_all: scene_count(depth: -1)
  performer_count
  performer_count_all: performer_count(depth: -1)
  sub_group_count
  sub_group_count_all: sub_group_count(depth: -1)
  o_counter
  scenes {
    id
    title
  }
  custom_fields
}
    ${SlimStudioDataFragmentDoc}
${SlimTagDataFragmentDoc}
${SlimGroupDataFragmentDoc}`;
export const SceneDataFragmentDoc = gql `
    fragment SceneData on Scene {
  id
  title
  code
  details
  director
  urls
  date
  rating100
  o_counter
  organized
  interactive
  interactive_speed
  captions {
    language_code
    caption_type
  }
  created_at
  updated_at
  resume_time
  last_played_at
  play_duration
  play_count
  play_history
  o_history
  files {
    ...VideoFileData
  }
  paths {
    screenshot
    preview
    stream
    webp
    vtt
    sprite
    funscript
    interactive_heatmap
    caption
  }
  scene_markers {
    ...SceneMarkerData
  }
  galleries {
    ...SlimGalleryData
  }
  studio {
    ...SlimStudioData
  }
  groups {
    group {
      ...GroupData
    }
    scene_index
  }
  tags {
    ...SlimTagData
  }
  performers {
    ...PerformerData
  }
  stash_ids {
    endpoint
    stash_id
    updated_at
  }
  sceneStreams {
    url
    mime_type
    label
  }
  custom_fields
}
    ${VideoFileDataFragmentDoc}
${SceneMarkerDataFragmentDoc}
${SlimGalleryDataFragmentDoc}
${SlimStudioDataFragmentDoc}
${GroupDataFragmentDoc}
${SlimTagDataFragmentDoc}
${PerformerDataFragmentDoc}`;
export const SelectSceneDataFragmentDoc = gql `
    fragment SelectSceneData on Scene {
  id
  title
  date
  code
  studio {
    name
  }
  files {
    path
  }
  paths {
    screenshot
  }
}
    `;
export const ScrapedSceneTagDataFragmentDoc = gql `
    fragment ScrapedSceneTagData on ScrapedTag {
  stored_id
  name
  description
  alias_list
  parent {
    stored_id
    name
    description
  }
  remote_site_id
}
    `;
export const ScrapedStudioDataFragmentDoc = gql `
    fragment ScrapedStudioData on ScrapedStudio {
  stored_id
  name
  urls
  parent {
    stored_id
    name
    urls
    image
    details
    aliases
    tags {
      ...ScrapedSceneTagData
    }
    remote_site_id
  }
  image
  details
  aliases
  tags {
    ...ScrapedSceneTagData
  }
  remote_site_id
}
    ${ScrapedSceneTagDataFragmentDoc}`;
export const ScrapedPerformerDataFragmentDoc = gql `
    fragment ScrapedPerformerData on ScrapedPerformer {
  stored_id
  name
  disambiguation
  gender
  urls
  birthdate
  ethnicity
  country
  eye_color
  height
  measurements
  fake_tits
  penis_length
  circumcised
  career_start
  career_end
  tattoos
  piercings
  aliases
  tags {
    ...ScrapedSceneTagData
  }
  images
  details
  death_date
  hair_color
  weight
  remote_site_id
}
    ${ScrapedSceneTagDataFragmentDoc}`;
export const ScrapedGroupStudioDataFragmentDoc = gql `
    fragment ScrapedGroupStudioData on ScrapedStudio {
  stored_id
  name
  urls
}
    `;
export const ScrapedGroupDataFragmentDoc = gql `
    fragment ScrapedGroupData on ScrapedGroup {
  name
  aliases
  duration
  date
  rating
  director
  urls
  synopsis
  front_image
  back_image
  studio {
    ...ScrapedGroupStudioData
  }
  tags {
    ...ScrapedSceneTagData
  }
}
    ${ScrapedGroupStudioDataFragmentDoc}
${ScrapedSceneTagDataFragmentDoc}`;
export const ScrapedSceneStudioDataFragmentDoc = gql `
    fragment ScrapedSceneStudioData on ScrapedStudio {
  stored_id
  name
  urls
  parent {
    stored_id
    name
    urls
    image
    details
    aliases
    tags {
      ...ScrapedSceneTagData
    }
    remote_site_id
  }
  image
  details
  aliases
  tags {
    ...ScrapedSceneTagData
  }
  remote_site_id
}
    ${ScrapedSceneTagDataFragmentDoc}`;
export const ScrapedScenePerformerDataFragmentDoc = gql `
    fragment ScrapedScenePerformerData on ScrapedPerformer {
  stored_id
  name
  disambiguation
  gender
  urls
  birthdate
  ethnicity
  country
  eye_color
  height
  measurements
  fake_tits
  penis_length
  circumcised
  career_start
  career_end
  tattoos
  piercings
  aliases
  tags {
    ...ScrapedSceneTagData
  }
  remote_site_id
  images
  details
  death_date
  hair_color
  weight
}
    ${ScrapedSceneTagDataFragmentDoc}`;
export const ScrapedSceneGroupDataFragmentDoc = gql `
    fragment ScrapedSceneGroupData on ScrapedGroup {
  stored_id
  name
  aliases
  duration
  date
  rating
  director
  urls
  synopsis
  front_image
  back_image
  studio {
    ...ScrapedGroupStudioData
  }
  tags {
    ...ScrapedSceneTagData
  }
}
    ${ScrapedGroupStudioDataFragmentDoc}
${ScrapedSceneTagDataFragmentDoc}`;
export const ScrapedSceneDataFragmentDoc = gql `
    fragment ScrapedSceneData on ScrapedScene {
  title
  code
  details
  director
  urls
  date
  image
  remote_site_id
  file {
    size
    duration
    video_codec
    audio_codec
    width
    height
    framerate
    bitrate
  }
  studio {
    ...ScrapedSceneStudioData
  }
  tags {
    ...ScrapedSceneTagData
  }
  performers {
    ...ScrapedScenePerformerData
  }
  groups {
    ...ScrapedSceneGroupData
  }
  fingerprints {
    hash
    algorithm
    duration
  }
}
    ${ScrapedSceneStudioDataFragmentDoc}
${ScrapedSceneTagDataFragmentDoc}
${ScrapedScenePerformerDataFragmentDoc}
${ScrapedSceneGroupDataFragmentDoc}`;
export const ScrapedGalleryDataFragmentDoc = gql `
    fragment ScrapedGalleryData on ScrapedGallery {
  title
  code
  details
  urls
  photographer
  date
  studio {
    ...ScrapedSceneStudioData
  }
  tags {
    ...ScrapedSceneTagData
  }
  performers {
    ...ScrapedScenePerformerData
  }
}
    ${ScrapedSceneStudioDataFragmentDoc}
${ScrapedSceneTagDataFragmentDoc}
${ScrapedScenePerformerDataFragmentDoc}`;
export const ScrapedImageDataFragmentDoc = gql `
    fragment ScrapedImageData on ScrapedImage {
  title
  code
  details
  photographer
  urls
  date
  studio {
    ...ScrapedSceneStudioData
  }
  tags {
    ...ScrapedSceneTagData
  }
  performers {
    ...ScrapedScenePerformerData
  }
}
    ${ScrapedSceneStudioDataFragmentDoc}
${ScrapedSceneTagDataFragmentDoc}
${ScrapedScenePerformerDataFragmentDoc}`;
export const ScrapedStashBoxSceneDataFragmentDoc = gql `
    fragment ScrapedStashBoxSceneData on ScrapedScene {
  title
  code
  details
  director
  url
  date
  image
  remote_site_id
  duration
  file {
    size
    duration
    video_codec
    audio_codec
    width
    height
    framerate
    bitrate
  }
  fingerprints {
    hash
    algorithm
    duration
  }
  studio {
    ...ScrapedSceneStudioData
  }
  tags {
    ...ScrapedSceneTagData
  }
  performers {
    ...ScrapedScenePerformerData
  }
  groups {
    ...ScrapedSceneGroupData
  }
}
    ${ScrapedSceneStudioDataFragmentDoc}
${ScrapedSceneTagDataFragmentDoc}
${ScrapedScenePerformerDataFragmentDoc}
${ScrapedSceneGroupDataFragmentDoc}`;
export const ScrapedStashBoxPerformerDataFragmentDoc = gql `
    fragment ScrapedStashBoxPerformerData on StashBoxPerformerQueryResult {
  query
  results {
    ...ScrapedScenePerformerData
  }
}
    ${ScrapedScenePerformerDataFragmentDoc}`;
export const StudioDataFragmentDoc = gql `
    fragment StudioData on Studio {
  id
  name
  url
  urls
  parent_studio {
    id
    name
    url
    urls
    image_path
  }
  child_studios {
    id
    name
    image_path
  }
  ignore_auto_tag
  organized
  image_path
  scene_count
  scene_count_all: scene_count(depth: -1)
  image_count
  image_count_all: image_count(depth: -1)
  gallery_count
  gallery_count_all: gallery_count(depth: -1)
  performer_count
  performer_count_all: performer_count(depth: -1)
  group_count
  group_count_all: group_count(depth: -1)
  stash_ids {
    stash_id
    endpoint
    updated_at
  }
  details
  rating100
  favorite
  aliases
  tags {
    ...SlimTagData
  }
  o_counter
  custom_fields
}
    ${SlimTagDataFragmentDoc}`;
export const SelectStudioDataFragmentDoc = gql `
    fragment SelectStudioData on Studio {
  id
  name
  aliases
  details
  image_path
  parent_studio {
    id
    name
  }
}
    `;
export const TagDataFragmentDoc = gql `
    fragment TagData on Tag {
  id
  name
  sort_name
  description
  aliases
  ignore_auto_tag
  favorite
  stash_ids {
    endpoint
    stash_id
    updated_at
  }
  image_path
  scene_count
  scene_count_all: scene_count(depth: -1)
  scene_marker_count
  scene_marker_count_all: scene_marker_count(depth: -1)
  image_count
  image_count_all: image_count(depth: -1)
  gallery_count
  gallery_count_all: gallery_count(depth: -1)
  performer_count
  performer_count_all: performer_count(depth: -1)
  studio_count
  studio_count_all: studio_count(depth: -1)
  group_count
  group_count_all: group_count(depth: -1)
  parents {
    ...SlimTagData
  }
  children {
    ...SlimTagData
  }
  custom_fields
}
    ${SlimTagDataFragmentDoc}`;
export const SelectTagDataFragmentDoc = gql `
    fragment SelectTagData on Tag {
  id
  name
  sort_name
  favorite
  description
  aliases
  image_path
  parents {
    id
    name
    sort_name
  }
  stash_ids {
    endpoint
    stash_id
    updated_at
  }
}
    `;
export const TagListDataFragmentDoc = gql `
    fragment TagListData on Tag {
  id
  name
  sort_name
  description
  aliases
  ignore_auto_tag
  favorite
  stash_ids {
    endpoint
    stash_id
    updated_at
  }
  image_path
  scene_count
  scene_marker_count
  image_count
  gallery_count
  performer_count
  studio_count
  group_count
  parents {
    ...SlimTagData
  }
  children {
    ...SlimTagData
  }
}
    ${SlimTagDataFragmentDoc}`;
export const SetupDocument = gql `
    mutation Setup($input: SetupInput!) {
  setup(input: $input)
}
    `;
/**
 * __useSetupMutation__
 *
 * To run a mutation, you first call `useSetupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setupMutation, { data, loading, error }] = useSetupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetupMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SetupDocument, options);
}
export const MigrateDocument = gql `
    mutation Migrate($input: MigrateInput!) {
  migrate(input: $input)
}
    `;
/**
 * __useMigrateMutation__
 *
 * To run a mutation, you first call `useMigrateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMigrateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [migrateMutation, { data, loading, error }] = useMigrateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMigrateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(MigrateDocument, options);
}
export const DownloadFfMpegDocument = gql `
    mutation DownloadFFMpeg {
  downloadFFMpeg
}
    `;
/**
 * __useDownloadFfMpegMutation__
 *
 * To run a mutation, you first call `useDownloadFfMpegMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDownloadFfMpegMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [downloadFfMpegMutation, { data, loading, error }] = useDownloadFfMpegMutation({
 *   variables: {
 *   },
 * });
 */
export function useDownloadFfMpegMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(DownloadFfMpegDocument, options);
}
export const ConfigureGeneralDocument = gql `
    mutation ConfigureGeneral($input: ConfigGeneralInput!) {
  configureGeneral(input: $input) {
    ...ConfigGeneralData
  }
}
    ${ConfigGeneralDataFragmentDoc}`;
/**
 * __useConfigureGeneralMutation__
 *
 * To run a mutation, you first call `useConfigureGeneralMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfigureGeneralMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [configureGeneralMutation, { data, loading, error }] = useConfigureGeneralMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConfigureGeneralMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ConfigureGeneralDocument, options);
}
export const ConfigureInterfaceDocument = gql `
    mutation ConfigureInterface($input: ConfigInterfaceInput!) {
  configureInterface(input: $input) {
    ...ConfigInterfaceData
  }
}
    ${ConfigInterfaceDataFragmentDoc}`;
/**
 * __useConfigureInterfaceMutation__
 *
 * To run a mutation, you first call `useConfigureInterfaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfigureInterfaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [configureInterfaceMutation, { data, loading, error }] = useConfigureInterfaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConfigureInterfaceMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ConfigureInterfaceDocument, options);
}
export const ConfigureDlnaDocument = gql `
    mutation ConfigureDLNA($input: ConfigDLNAInput!) {
  configureDLNA(input: $input) {
    ...ConfigDLNAData
  }
}
    ${ConfigDlnaDataFragmentDoc}`;
/**
 * __useConfigureDlnaMutation__
 *
 * To run a mutation, you first call `useConfigureDlnaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfigureDlnaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [configureDlnaMutation, { data, loading, error }] = useConfigureDlnaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConfigureDlnaMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ConfigureDlnaDocument, options);
}
export const ConfigureScrapingDocument = gql `
    mutation ConfigureScraping($input: ConfigScrapingInput!) {
  configureScraping(input: $input) {
    ...ConfigScrapingData
  }
}
    ${ConfigScrapingDataFragmentDoc}`;
/**
 * __useConfigureScrapingMutation__
 *
 * To run a mutation, you first call `useConfigureScrapingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfigureScrapingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [configureScrapingMutation, { data, loading, error }] = useConfigureScrapingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConfigureScrapingMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ConfigureScrapingDocument, options);
}
export const ConfigureDefaultsDocument = gql `
    mutation ConfigureDefaults($input: ConfigDefaultSettingsInput!) {
  configureDefaults(input: $input) {
    ...ConfigDefaultSettingsData
  }
}
    ${ConfigDefaultSettingsDataFragmentDoc}`;
/**
 * __useConfigureDefaultsMutation__
 *
 * To run a mutation, you first call `useConfigureDefaultsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfigureDefaultsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [configureDefaultsMutation, { data, loading, error }] = useConfigureDefaultsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConfigureDefaultsMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ConfigureDefaultsDocument, options);
}
export const ConfigureUiDocument = gql `
    mutation ConfigureUI($input: Map, $partial: Map) {
  configureUI(input: $input, partial: $partial)
}
    `;
/**
 * __useConfigureUiMutation__
 *
 * To run a mutation, you first call `useConfigureUiMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfigureUiMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [configureUiMutation, { data, loading, error }] = useConfigureUiMutation({
 *   variables: {
 *      input: // value for 'input'
 *      partial: // value for 'partial'
 *   },
 * });
 */
export function useConfigureUiMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ConfigureUiDocument, options);
}
export const ConfigureUiSettingDocument = gql `
    mutation ConfigureUISetting($key: String!, $value: Any) {
  configureUISetting(key: $key, value: $value)
}
    `;
/**
 * __useConfigureUiSettingMutation__
 *
 * To run a mutation, you first call `useConfigureUiSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfigureUiSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [configureUiSettingMutation, { data, loading, error }] = useConfigureUiSettingMutation({
 *   variables: {
 *      key: // value for 'key'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useConfigureUiSettingMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ConfigureUiSettingDocument, options);
}
export const GenerateApiKeyDocument = gql `
    mutation GenerateAPIKey($input: GenerateAPIKeyInput!) {
  generateAPIKey(input: $input)
}
    `;
/**
 * __useGenerateApiKeyMutation__
 *
 * To run a mutation, you first call `useGenerateApiKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateApiKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateApiKeyMutation, { data, loading, error }] = useGenerateApiKeyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateApiKeyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(GenerateApiKeyDocument, options);
}
export const EnableDlnaDocument = gql `
    mutation EnableDLNA($input: EnableDLNAInput!) {
  enableDLNA(input: $input)
}
    `;
/**
 * __useEnableDlnaMutation__
 *
 * To run a mutation, you first call `useEnableDlnaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableDlnaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableDlnaMutation, { data, loading, error }] = useEnableDlnaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEnableDlnaMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(EnableDlnaDocument, options);
}
export const DisableDlnaDocument = gql `
    mutation DisableDLNA($input: DisableDLNAInput!) {
  disableDLNA(input: $input)
}
    `;
/**
 * __useDisableDlnaMutation__
 *
 * To run a mutation, you first call `useDisableDlnaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisableDlnaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disableDlnaMutation, { data, loading, error }] = useDisableDlnaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDisableDlnaMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(DisableDlnaDocument, options);
}
export const AddTempDlnaipDocument = gql `
    mutation AddTempDLNAIP($input: AddTempDLNAIPInput!) {
  addTempDLNAIP(input: $input)
}
    `;
/**
 * __useAddTempDlnaipMutation__
 *
 * To run a mutation, you first call `useAddTempDlnaipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTempDlnaipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTempDlnaipMutation, { data, loading, error }] = useAddTempDlnaipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddTempDlnaipMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(AddTempDlnaipDocument, options);
}
export const RemoveTempDlnaipDocument = gql `
    mutation RemoveTempDLNAIP($input: RemoveTempDLNAIPInput!) {
  removeTempDLNAIP(input: $input)
}
    `;
/**
 * __useRemoveTempDlnaipMutation__
 *
 * To run a mutation, you first call `useRemoveTempDlnaipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTempDlnaipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTempDlnaipMutation, { data, loading, error }] = useRemoveTempDlnaipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveTempDlnaipMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(RemoveTempDlnaipDocument, options);
}
export const DeleteFilesDocument = gql `
    mutation DeleteFiles($ids: [ID!]!) {
  deleteFiles(ids: $ids)
}
    `;
/**
 * __useDeleteFilesMutation__
 *
 * To run a mutation, you first call `useDeleteFilesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFilesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFilesMutation, { data, loading, error }] = useDeleteFilesMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteFilesMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(DeleteFilesDocument, options);
}
export const RevealFileInFileManagerDocument = gql `
    mutation RevealFileInFileManager($id: ID!) {
  revealFileInFileManager(id: $id)
}
    `;
/**
 * __useRevealFileInFileManagerMutation__
 *
 * To run a mutation, you first call `useRevealFileInFileManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevealFileInFileManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revealFileInFileManagerMutation, { data, loading, error }] = useRevealFileInFileManagerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRevealFileInFileManagerMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(RevealFileInFileManagerDocument, options);
}
export const RevealFolderInFileManagerDocument = gql `
    mutation RevealFolderInFileManager($id: ID!) {
  revealFolderInFileManager(id: $id)
}
    `;
/**
 * __useRevealFolderInFileManagerMutation__
 *
 * To run a mutation, you first call `useRevealFolderInFileManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevealFolderInFileManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revealFolderInFileManagerMutation, { data, loading, error }] = useRevealFolderInFileManagerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRevealFolderInFileManagerMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(RevealFolderInFileManagerDocument, options);
}
export const SaveFilterDocument = gql `
    mutation SaveFilter($input: SaveFilterInput!) {
  saveFilter(input: $input) {
    ...SavedFilterData
  }
}
    ${SavedFilterDataFragmentDoc}`;
/**
 * __useSaveFilterMutation__
 *
 * To run a mutation, you first call `useSaveFilterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveFilterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveFilterMutation, { data, loading, error }] = useSaveFilterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveFilterMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SaveFilterDocument, options);
}
export const DestroySavedFilterDocument = gql `
    mutation DestroySavedFilter($input: DestroyFilterInput!) {
  destroySavedFilter(input: $input)
}
    `;
/**
 * __useDestroySavedFilterMutation__
 *
 * To run a mutation, you first call `useDestroySavedFilterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroySavedFilterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroySavedFilterMutation, { data, loading, error }] = useDestroySavedFilterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDestroySavedFilterMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(DestroySavedFilterDocument, options);
}
export const GalleryChapterCreateDocument = gql `
    mutation GalleryChapterCreate($title: String!, $image_index: Int!, $gallery_id: ID!) {
  galleryChapterCreate(
    input: {title: $title, image_index: $image_index, gallery_id: $gallery_id}
  ) {
    ...GalleryChapterData
  }
}
    ${GalleryChapterDataFragmentDoc}`;
/**
 * __useGalleryChapterCreateMutation__
 *
 * To run a mutation, you first call `useGalleryChapterCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGalleryChapterCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [galleryChapterCreateMutation, { data, loading, error }] = useGalleryChapterCreateMutation({
 *   variables: {
 *      title: // value for 'title'
 *      image_index: // value for 'image_index'
 *      gallery_id: // value for 'gallery_id'
 *   },
 * });
 */
export function useGalleryChapterCreateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(GalleryChapterCreateDocument, options);
}
export const GalleryChapterUpdateDocument = gql `
    mutation GalleryChapterUpdate($id: ID!, $title: String!, $image_index: Int!, $gallery_id: ID!) {
  galleryChapterUpdate(
    input: {id: $id, title: $title, image_index: $image_index, gallery_id: $gallery_id}
  ) {
    ...GalleryChapterData
  }
}
    ${GalleryChapterDataFragmentDoc}`;
/**
 * __useGalleryChapterUpdateMutation__
 *
 * To run a mutation, you first call `useGalleryChapterUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGalleryChapterUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [galleryChapterUpdateMutation, { data, loading, error }] = useGalleryChapterUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      image_index: // value for 'image_index'
 *      gallery_id: // value for 'gallery_id'
 *   },
 * });
 */
export function useGalleryChapterUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(GalleryChapterUpdateDocument, options);
}
export const GalleryChapterDestroyDocument = gql `
    mutation GalleryChapterDestroy($id: ID!) {
  galleryChapterDestroy(id: $id)
}
    `;
/**
 * __useGalleryChapterDestroyMutation__
 *
 * To run a mutation, you first call `useGalleryChapterDestroyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGalleryChapterDestroyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [galleryChapterDestroyMutation, { data, loading, error }] = useGalleryChapterDestroyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGalleryChapterDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(GalleryChapterDestroyDocument, options);
}
export const GalleryCreateDocument = gql `
    mutation GalleryCreate($input: GalleryCreateInput!) {
  galleryCreate(input: $input) {
    ...GalleryData
  }
}
    ${GalleryDataFragmentDoc}`;
/**
 * __useGalleryCreateMutation__
 *
 * To run a mutation, you first call `useGalleryCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGalleryCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [galleryCreateMutation, { data, loading, error }] = useGalleryCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGalleryCreateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(GalleryCreateDocument, options);
}
export const GalleryUpdateDocument = gql `
    mutation GalleryUpdate($input: GalleryUpdateInput!) {
  galleryUpdate(input: $input) {
    ...GalleryData
  }
}
    ${GalleryDataFragmentDoc}`;
/**
 * __useGalleryUpdateMutation__
 *
 * To run a mutation, you first call `useGalleryUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGalleryUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [galleryUpdateMutation, { data, loading, error }] = useGalleryUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGalleryUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(GalleryUpdateDocument, options);
}
export const BulkGalleryUpdateDocument = gql `
    mutation BulkGalleryUpdate($input: BulkGalleryUpdateInput!) {
  bulkGalleryUpdate(input: $input) {
    ...GalleryData
  }
}
    ${GalleryDataFragmentDoc}`;
/**
 * __useBulkGalleryUpdateMutation__
 *
 * To run a mutation, you first call `useBulkGalleryUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkGalleryUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkGalleryUpdateMutation, { data, loading, error }] = useBulkGalleryUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkGalleryUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(BulkGalleryUpdateDocument, options);
}
export const GalleriesUpdateDocument = gql `
    mutation GalleriesUpdate($input: [GalleryUpdateInput!]!) {
  galleriesUpdate(input: $input) {
    ...GalleryData
  }
}
    ${GalleryDataFragmentDoc}`;
/**
 * __useGalleriesUpdateMutation__
 *
 * To run a mutation, you first call `useGalleriesUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGalleriesUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [galleriesUpdateMutation, { data, loading, error }] = useGalleriesUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGalleriesUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(GalleriesUpdateDocument, options);
}
export const GalleryDestroyDocument = gql `
    mutation GalleryDestroy($ids: [ID!]!, $delete_file: Boolean, $delete_generated: Boolean) {
  galleryDestroy(
    input: {ids: $ids, delete_file: $delete_file, delete_generated: $delete_generated}
  )
}
    `;
/**
 * __useGalleryDestroyMutation__
 *
 * To run a mutation, you first call `useGalleryDestroyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGalleryDestroyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [galleryDestroyMutation, { data, loading, error }] = useGalleryDestroyMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *      delete_file: // value for 'delete_file'
 *      delete_generated: // value for 'delete_generated'
 *   },
 * });
 */
export function useGalleryDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(GalleryDestroyDocument, options);
}
export const AddGalleryImagesDocument = gql `
    mutation AddGalleryImages($gallery_id: ID!, $image_ids: [ID!]!) {
  addGalleryImages(input: {gallery_id: $gallery_id, image_ids: $image_ids})
}
    `;
/**
 * __useAddGalleryImagesMutation__
 *
 * To run a mutation, you first call `useAddGalleryImagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddGalleryImagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addGalleryImagesMutation, { data, loading, error }] = useAddGalleryImagesMutation({
 *   variables: {
 *      gallery_id: // value for 'gallery_id'
 *      image_ids: // value for 'image_ids'
 *   },
 * });
 */
export function useAddGalleryImagesMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(AddGalleryImagesDocument, options);
}
export const RemoveGalleryImagesDocument = gql `
    mutation RemoveGalleryImages($gallery_id: ID!, $image_ids: [ID!]!) {
  removeGalleryImages(input: {gallery_id: $gallery_id, image_ids: $image_ids})
}
    `;
/**
 * __useRemoveGalleryImagesMutation__
 *
 * To run a mutation, you first call `useRemoveGalleryImagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveGalleryImagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeGalleryImagesMutation, { data, loading, error }] = useRemoveGalleryImagesMutation({
 *   variables: {
 *      gallery_id: // value for 'gallery_id'
 *      image_ids: // value for 'image_ids'
 *   },
 * });
 */
export function useRemoveGalleryImagesMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(RemoveGalleryImagesDocument, options);
}
export const SetGalleryCoverDocument = gql `
    mutation SetGalleryCover($gallery_id: ID!, $cover_image_id: ID!) {
  setGalleryCover(
    input: {gallery_id: $gallery_id, cover_image_id: $cover_image_id}
  )
}
    `;
/**
 * __useSetGalleryCoverMutation__
 *
 * To run a mutation, you first call `useSetGalleryCoverMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetGalleryCoverMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setGalleryCoverMutation, { data, loading, error }] = useSetGalleryCoverMutation({
 *   variables: {
 *      gallery_id: // value for 'gallery_id'
 *      cover_image_id: // value for 'cover_image_id'
 *   },
 * });
 */
export function useSetGalleryCoverMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SetGalleryCoverDocument, options);
}
export const ResetGalleryCoverDocument = gql `
    mutation ResetGalleryCover($gallery_id: ID!) {
  resetGalleryCover(input: {gallery_id: $gallery_id})
}
    `;
/**
 * __useResetGalleryCoverMutation__
 *
 * To run a mutation, you first call `useResetGalleryCoverMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetGalleryCoverMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetGalleryCoverMutation, { data, loading, error }] = useResetGalleryCoverMutation({
 *   variables: {
 *      gallery_id: // value for 'gallery_id'
 *   },
 * });
 */
export function useResetGalleryCoverMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ResetGalleryCoverDocument, options);
}
export const GroupCreateDocument = gql `
    mutation GroupCreate($input: GroupCreateInput!) {
  groupCreate(input: $input) {
    ...GroupData
  }
}
    ${GroupDataFragmentDoc}`;
/**
 * __useGroupCreateMutation__
 *
 * To run a mutation, you first call `useGroupCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGroupCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [groupCreateMutation, { data, loading, error }] = useGroupCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGroupCreateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(GroupCreateDocument, options);
}
export const GroupUpdateDocument = gql `
    mutation GroupUpdate($input: GroupUpdateInput!) {
  groupUpdate(input: $input) {
    ...GroupData
  }
}
    ${GroupDataFragmentDoc}`;
/**
 * __useGroupUpdateMutation__
 *
 * To run a mutation, you first call `useGroupUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGroupUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [groupUpdateMutation, { data, loading, error }] = useGroupUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGroupUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(GroupUpdateDocument, options);
}
export const BulkGroupUpdateDocument = gql `
    mutation BulkGroupUpdate($input: BulkGroupUpdateInput!) {
  bulkGroupUpdate(input: $input) {
    ...GroupData
  }
}
    ${GroupDataFragmentDoc}`;
/**
 * __useBulkGroupUpdateMutation__
 *
 * To run a mutation, you first call `useBulkGroupUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkGroupUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkGroupUpdateMutation, { data, loading, error }] = useBulkGroupUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkGroupUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(BulkGroupUpdateDocument, options);
}
export const GroupDestroyDocument = gql `
    mutation GroupDestroy($id: ID!) {
  groupDestroy(input: {id: $id})
}
    `;
/**
 * __useGroupDestroyMutation__
 *
 * To run a mutation, you first call `useGroupDestroyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGroupDestroyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [groupDestroyMutation, { data, loading, error }] = useGroupDestroyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGroupDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(GroupDestroyDocument, options);
}
export const GroupsDestroyDocument = gql `
    mutation GroupsDestroy($ids: [ID!]!) {
  groupsDestroy(ids: $ids)
}
    `;
/**
 * __useGroupsDestroyMutation__
 *
 * To run a mutation, you first call `useGroupsDestroyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGroupsDestroyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [groupsDestroyMutation, { data, loading, error }] = useGroupsDestroyMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useGroupsDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(GroupsDestroyDocument, options);
}
export const AddGroupSubGroupsDocument = gql `
    mutation AddGroupSubGroups($input: GroupSubGroupAddInput!) {
  addGroupSubGroups(input: $input)
}
    `;
/**
 * __useAddGroupSubGroupsMutation__
 *
 * To run a mutation, you first call `useAddGroupSubGroupsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddGroupSubGroupsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addGroupSubGroupsMutation, { data, loading, error }] = useAddGroupSubGroupsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddGroupSubGroupsMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(AddGroupSubGroupsDocument, options);
}
export const RemoveGroupSubGroupsDocument = gql `
    mutation RemoveGroupSubGroups($input: GroupSubGroupRemoveInput!) {
  removeGroupSubGroups(input: $input)
}
    `;
/**
 * __useRemoveGroupSubGroupsMutation__
 *
 * To run a mutation, you first call `useRemoveGroupSubGroupsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveGroupSubGroupsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeGroupSubGroupsMutation, { data, loading, error }] = useRemoveGroupSubGroupsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveGroupSubGroupsMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(RemoveGroupSubGroupsDocument, options);
}
export const ReorderSubGroupsDocument = gql `
    mutation ReorderSubGroups($input: ReorderSubGroupsInput!) {
  reorderSubGroups(input: $input)
}
    `;
/**
 * __useReorderSubGroupsMutation__
 *
 * To run a mutation, you first call `useReorderSubGroupsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReorderSubGroupsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reorderSubGroupsMutation, { data, loading, error }] = useReorderSubGroupsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReorderSubGroupsMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ReorderSubGroupsDocument, options);
}
export const ImageUpdateDocument = gql `
    mutation ImageUpdate($input: ImageUpdateInput!) {
  imageUpdate(input: $input) {
    ...SlimImageData
  }
}
    ${SlimImageDataFragmentDoc}`;
/**
 * __useImageUpdateMutation__
 *
 * To run a mutation, you first call `useImageUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImageUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [imageUpdateMutation, { data, loading, error }] = useImageUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useImageUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ImageUpdateDocument, options);
}
export const BulkImageUpdateDocument = gql `
    mutation BulkImageUpdate($input: BulkImageUpdateInput!) {
  bulkImageUpdate(input: $input) {
    ...SlimImageData
  }
}
    ${SlimImageDataFragmentDoc}`;
/**
 * __useBulkImageUpdateMutation__
 *
 * To run a mutation, you first call `useBulkImageUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkImageUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkImageUpdateMutation, { data, loading, error }] = useBulkImageUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkImageUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(BulkImageUpdateDocument, options);
}
export const ImagesUpdateDocument = gql `
    mutation ImagesUpdate($input: [ImageUpdateInput!]!) {
  imagesUpdate(input: $input) {
    ...SlimImageData
  }
}
    ${SlimImageDataFragmentDoc}`;
/**
 * __useImagesUpdateMutation__
 *
 * To run a mutation, you first call `useImagesUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImagesUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [imagesUpdateMutation, { data, loading, error }] = useImagesUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useImagesUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ImagesUpdateDocument, options);
}
export const ImageIncrementODocument = gql `
    mutation ImageIncrementO($id: ID!) {
  imageIncrementO(id: $id)
}
    `;
/**
 * __useImageIncrementOMutation__
 *
 * To run a mutation, you first call `useImageIncrementOMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImageIncrementOMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [imageIncrementOMutation, { data, loading, error }] = useImageIncrementOMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useImageIncrementOMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ImageIncrementODocument, options);
}
export const ImageDecrementODocument = gql `
    mutation ImageDecrementO($id: ID!) {
  imageDecrementO(id: $id)
}
    `;
/**
 * __useImageDecrementOMutation__
 *
 * To run a mutation, you first call `useImageDecrementOMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImageDecrementOMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [imageDecrementOMutation, { data, loading, error }] = useImageDecrementOMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useImageDecrementOMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ImageDecrementODocument, options);
}
export const ImageResetODocument = gql `
    mutation ImageResetO($id: ID!) {
  imageResetO(id: $id)
}
    `;
/**
 * __useImageResetOMutation__
 *
 * To run a mutation, you first call `useImageResetOMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImageResetOMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [imageResetOMutation, { data, loading, error }] = useImageResetOMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useImageResetOMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ImageResetODocument, options);
}
export const ImageDestroyDocument = gql `
    mutation ImageDestroy($id: ID!, $delete_file: Boolean, $delete_generated: Boolean) {
  imageDestroy(
    input: {id: $id, delete_file: $delete_file, delete_generated: $delete_generated}
  )
}
    `;
/**
 * __useImageDestroyMutation__
 *
 * To run a mutation, you first call `useImageDestroyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImageDestroyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [imageDestroyMutation, { data, loading, error }] = useImageDestroyMutation({
 *   variables: {
 *      id: // value for 'id'
 *      delete_file: // value for 'delete_file'
 *      delete_generated: // value for 'delete_generated'
 *   },
 * });
 */
export function useImageDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ImageDestroyDocument, options);
}
export const ImagesDestroyDocument = gql `
    mutation ImagesDestroy($ids: [ID!]!, $delete_file: Boolean, $delete_generated: Boolean) {
  imagesDestroy(
    input: {ids: $ids, delete_file: $delete_file, delete_generated: $delete_generated}
  )
}
    `;
/**
 * __useImagesDestroyMutation__
 *
 * To run a mutation, you first call `useImagesDestroyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImagesDestroyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [imagesDestroyMutation, { data, loading, error }] = useImagesDestroyMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *      delete_file: // value for 'delete_file'
 *      delete_generated: // value for 'delete_generated'
 *   },
 * });
 */
export function useImagesDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ImagesDestroyDocument, options);
}
export const StopJobDocument = gql `
    mutation StopJob($job_id: ID!) {
  stopJob(job_id: $job_id)
}
    `;
/**
 * __useStopJobMutation__
 *
 * To run a mutation, you first call `useStopJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStopJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stopJobMutation, { data, loading, error }] = useStopJobMutation({
 *   variables: {
 *      job_id: // value for 'job_id'
 *   },
 * });
 */
export function useStopJobMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(StopJobDocument, options);
}
export const StopAllJobsDocument = gql `
    mutation StopAllJobs {
  stopAllJobs
}
    `;
/**
 * __useStopAllJobsMutation__
 *
 * To run a mutation, you first call `useStopAllJobsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStopAllJobsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stopAllJobsMutation, { data, loading, error }] = useStopAllJobsMutation({
 *   variables: {
 *   },
 * });
 */
export function useStopAllJobsMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(StopAllJobsDocument, options);
}
export const MetadataImportDocument = gql `
    mutation MetadataImport {
  metadataImport
}
    `;
/**
 * __useMetadataImportMutation__
 *
 * To run a mutation, you first call `useMetadataImportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMetadataImportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [metadataImportMutation, { data, loading, error }] = useMetadataImportMutation({
 *   variables: {
 *   },
 * });
 */
export function useMetadataImportMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(MetadataImportDocument, options);
}
export const MetadataExportDocument = gql `
    mutation MetadataExport {
  metadataExport
}
    `;
/**
 * __useMetadataExportMutation__
 *
 * To run a mutation, you first call `useMetadataExportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMetadataExportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [metadataExportMutation, { data, loading, error }] = useMetadataExportMutation({
 *   variables: {
 *   },
 * });
 */
export function useMetadataExportMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(MetadataExportDocument, options);
}
export const ExportObjectsDocument = gql `
    mutation ExportObjects($input: ExportObjectsInput!) {
  exportObjects(input: $input)
}
    `;
/**
 * __useExportObjectsMutation__
 *
 * To run a mutation, you first call `useExportObjectsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExportObjectsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [exportObjectsMutation, { data, loading, error }] = useExportObjectsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useExportObjectsMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ExportObjectsDocument, options);
}
export const ImportObjectsDocument = gql `
    mutation ImportObjects($input: ImportObjectsInput!) {
  importObjects(input: $input)
}
    `;
/**
 * __useImportObjectsMutation__
 *
 * To run a mutation, you first call `useImportObjectsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImportObjectsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [importObjectsMutation, { data, loading, error }] = useImportObjectsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useImportObjectsMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ImportObjectsDocument, options);
}
export const MetadataScanDocument = gql `
    mutation MetadataScan($input: ScanMetadataInput!) {
  metadataScan(input: $input)
}
    `;
/**
 * __useMetadataScanMutation__
 *
 * To run a mutation, you first call `useMetadataScanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMetadataScanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [metadataScanMutation, { data, loading, error }] = useMetadataScanMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMetadataScanMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(MetadataScanDocument, options);
}
export const MetadataGenerateDocument = gql `
    mutation MetadataGenerate($input: GenerateMetadataInput!) {
  metadataGenerate(input: $input)
}
    `;
/**
 * __useMetadataGenerateMutation__
 *
 * To run a mutation, you first call `useMetadataGenerateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMetadataGenerateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [metadataGenerateMutation, { data, loading, error }] = useMetadataGenerateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMetadataGenerateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(MetadataGenerateDocument, options);
}
export const MetadataAutoTagDocument = gql `
    mutation MetadataAutoTag($input: AutoTagMetadataInput!) {
  metadataAutoTag(input: $input)
}
    `;
/**
 * __useMetadataAutoTagMutation__
 *
 * To run a mutation, you first call `useMetadataAutoTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMetadataAutoTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [metadataAutoTagMutation, { data, loading, error }] = useMetadataAutoTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMetadataAutoTagMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(MetadataAutoTagDocument, options);
}
export const MetadataIdentifyDocument = gql `
    mutation MetadataIdentify($input: IdentifyMetadataInput!) {
  metadataIdentify(input: $input)
}
    `;
/**
 * __useMetadataIdentifyMutation__
 *
 * To run a mutation, you first call `useMetadataIdentifyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMetadataIdentifyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [metadataIdentifyMutation, { data, loading, error }] = useMetadataIdentifyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMetadataIdentifyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(MetadataIdentifyDocument, options);
}
export const MetadataCleanDocument = gql `
    mutation MetadataClean($input: CleanMetadataInput!) {
  metadataClean(input: $input)
}
    `;
/**
 * __useMetadataCleanMutation__
 *
 * To run a mutation, you first call `useMetadataCleanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMetadataCleanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [metadataCleanMutation, { data, loading, error }] = useMetadataCleanMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMetadataCleanMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(MetadataCleanDocument, options);
}
export const MetadataCleanGeneratedDocument = gql `
    mutation MetadataCleanGenerated($input: CleanGeneratedInput!) {
  metadataCleanGenerated(input: $input)
}
    `;
/**
 * __useMetadataCleanGeneratedMutation__
 *
 * To run a mutation, you first call `useMetadataCleanGeneratedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMetadataCleanGeneratedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [metadataCleanGeneratedMutation, { data, loading, error }] = useMetadataCleanGeneratedMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMetadataCleanGeneratedMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(MetadataCleanGeneratedDocument, options);
}
export const MigrateHashNamingDocument = gql `
    mutation MigrateHashNaming {
  migrateHashNaming
}
    `;
/**
 * __useMigrateHashNamingMutation__
 *
 * To run a mutation, you first call `useMigrateHashNamingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMigrateHashNamingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [migrateHashNamingMutation, { data, loading, error }] = useMigrateHashNamingMutation({
 *   variables: {
 *   },
 * });
 */
export function useMigrateHashNamingMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(MigrateHashNamingDocument, options);
}
export const BackupDatabaseDocument = gql `
    mutation BackupDatabase($input: BackupDatabaseInput!) {
  backupDatabase(input: $input)
}
    `;
/**
 * __useBackupDatabaseMutation__
 *
 * To run a mutation, you first call `useBackupDatabaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBackupDatabaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [backupDatabaseMutation, { data, loading, error }] = useBackupDatabaseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBackupDatabaseMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(BackupDatabaseDocument, options);
}
export const AnonymiseDatabaseDocument = gql `
    mutation AnonymiseDatabase($input: AnonymiseDatabaseInput!) {
  anonymiseDatabase(input: $input)
}
    `;
/**
 * __useAnonymiseDatabaseMutation__
 *
 * To run a mutation, you first call `useAnonymiseDatabaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAnonymiseDatabaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [anonymiseDatabaseMutation, { data, loading, error }] = useAnonymiseDatabaseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAnonymiseDatabaseMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(AnonymiseDatabaseDocument, options);
}
export const OptimiseDatabaseDocument = gql `
    mutation OptimiseDatabase {
  optimiseDatabase
}
    `;
/**
 * __useOptimiseDatabaseMutation__
 *
 * To run a mutation, you first call `useOptimiseDatabaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOptimiseDatabaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [optimiseDatabaseMutation, { data, loading, error }] = useOptimiseDatabaseMutation({
 *   variables: {
 *   },
 * });
 */
export function useOptimiseDatabaseMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(OptimiseDatabaseDocument, options);
}
export const MigrateSceneScreenshotsDocument = gql `
    mutation MigrateSceneScreenshots($input: MigrateSceneScreenshotsInput!) {
  migrateSceneScreenshots(input: $input)
}
    `;
/**
 * __useMigrateSceneScreenshotsMutation__
 *
 * To run a mutation, you first call `useMigrateSceneScreenshotsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMigrateSceneScreenshotsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [migrateSceneScreenshotsMutation, { data, loading, error }] = useMigrateSceneScreenshotsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMigrateSceneScreenshotsMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(MigrateSceneScreenshotsDocument, options);
}
export const MigrateBlobsDocument = gql `
    mutation MigrateBlobs($input: MigrateBlobsInput!) {
  migrateBlobs(input: $input)
}
    `;
/**
 * __useMigrateBlobsMutation__
 *
 * To run a mutation, you first call `useMigrateBlobsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMigrateBlobsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [migrateBlobsMutation, { data, loading, error }] = useMigrateBlobsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMigrateBlobsMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(MigrateBlobsDocument, options);
}
export const PerformerCreateDocument = gql `
    mutation PerformerCreate($input: PerformerCreateInput!) {
  performerCreate(input: $input) {
    ...PerformerData
  }
}
    ${PerformerDataFragmentDoc}`;
/**
 * __usePerformerCreateMutation__
 *
 * To run a mutation, you first call `usePerformerCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePerformerCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [performerCreateMutation, { data, loading, error }] = usePerformerCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePerformerCreateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(PerformerCreateDocument, options);
}
export const PerformerUpdateDocument = gql `
    mutation PerformerUpdate($input: PerformerUpdateInput!) {
  performerUpdate(input: $input) {
    ...PerformerData
  }
}
    ${PerformerDataFragmentDoc}`;
/**
 * __usePerformerUpdateMutation__
 *
 * To run a mutation, you first call `usePerformerUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePerformerUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [performerUpdateMutation, { data, loading, error }] = usePerformerUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePerformerUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(PerformerUpdateDocument, options);
}
export const BulkPerformerUpdateDocument = gql `
    mutation BulkPerformerUpdate($input: BulkPerformerUpdateInput!) {
  bulkPerformerUpdate(input: $input) {
    ...PerformerData
  }
}
    ${PerformerDataFragmentDoc}`;
/**
 * __useBulkPerformerUpdateMutation__
 *
 * To run a mutation, you first call `useBulkPerformerUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkPerformerUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkPerformerUpdateMutation, { data, loading, error }] = useBulkPerformerUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkPerformerUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(BulkPerformerUpdateDocument, options);
}
export const PerformerDestroyDocument = gql `
    mutation PerformerDestroy($id: ID!) {
  performerDestroy(input: {id: $id})
}
    `;
/**
 * __usePerformerDestroyMutation__
 *
 * To run a mutation, you first call `usePerformerDestroyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePerformerDestroyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [performerDestroyMutation, { data, loading, error }] = usePerformerDestroyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePerformerDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(PerformerDestroyDocument, options);
}
export const PerformersDestroyDocument = gql `
    mutation PerformersDestroy($ids: [ID!]!) {
  performersDestroy(ids: $ids)
}
    `;
/**
 * __usePerformersDestroyMutation__
 *
 * To run a mutation, you first call `usePerformersDestroyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePerformersDestroyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [performersDestroyMutation, { data, loading, error }] = usePerformersDestroyMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function usePerformersDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(PerformersDestroyDocument, options);
}
export const PerformerMergeDocument = gql `
    mutation PerformerMerge($input: PerformerMergeInput!) {
  performerMerge(input: $input) {
    id
  }
}
    `;
/**
 * __usePerformerMergeMutation__
 *
 * To run a mutation, you first call `usePerformerMergeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePerformerMergeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [performerMergeMutation, { data, loading, error }] = usePerformerMergeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePerformerMergeMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(PerformerMergeDocument, options);
}
export const ReloadPluginsDocument = gql `
    mutation ReloadPlugins {
  reloadPlugins
}
    `;
/**
 * __useReloadPluginsMutation__
 *
 * To run a mutation, you first call `useReloadPluginsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReloadPluginsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reloadPluginsMutation, { data, loading, error }] = useReloadPluginsMutation({
 *   variables: {
 *   },
 * });
 */
export function useReloadPluginsMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ReloadPluginsDocument, options);
}
export const RunPluginTaskDocument = gql `
    mutation RunPluginTask($plugin_id: ID!, $task_name: String!, $args_map: Map) {
  runPluginTask(plugin_id: $plugin_id, task_name: $task_name, args_map: $args_map)
}
    `;
/**
 * __useRunPluginTaskMutation__
 *
 * To run a mutation, you first call `useRunPluginTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRunPluginTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [runPluginTaskMutation, { data, loading, error }] = useRunPluginTaskMutation({
 *   variables: {
 *      plugin_id: // value for 'plugin_id'
 *      task_name: // value for 'task_name'
 *      args_map: // value for 'args_map'
 *   },
 * });
 */
export function useRunPluginTaskMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(RunPluginTaskDocument, options);
}
export const ConfigurePluginDocument = gql `
    mutation ConfigurePlugin($plugin_id: ID!, $input: Map!) {
  configurePlugin(plugin_id: $plugin_id, input: $input)
}
    `;
/**
 * __useConfigurePluginMutation__
 *
 * To run a mutation, you first call `useConfigurePluginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfigurePluginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [configurePluginMutation, { data, loading, error }] = useConfigurePluginMutation({
 *   variables: {
 *      plugin_id: // value for 'plugin_id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConfigurePluginMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ConfigurePluginDocument, options);
}
export const SetPluginsEnabledDocument = gql `
    mutation SetPluginsEnabled($enabledMap: BoolMap!) {
  setPluginsEnabled(enabledMap: $enabledMap)
}
    `;
/**
 * __useSetPluginsEnabledMutation__
 *
 * To run a mutation, you first call `useSetPluginsEnabledMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPluginsEnabledMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPluginsEnabledMutation, { data, loading, error }] = useSetPluginsEnabledMutation({
 *   variables: {
 *      enabledMap: // value for 'enabledMap'
 *   },
 * });
 */
export function useSetPluginsEnabledMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SetPluginsEnabledDocument, options);
}
export const InstallPluginPackagesDocument = gql `
    mutation InstallPluginPackages($packages: [PackageSpecInput!]!) {
  installPackages(type: Plugin, packages: $packages)
}
    `;
/**
 * __useInstallPluginPackagesMutation__
 *
 * To run a mutation, you first call `useInstallPluginPackagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInstallPluginPackagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [installPluginPackagesMutation, { data, loading, error }] = useInstallPluginPackagesMutation({
 *   variables: {
 *      packages: // value for 'packages'
 *   },
 * });
 */
export function useInstallPluginPackagesMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(InstallPluginPackagesDocument, options);
}
export const UpdatePluginPackagesDocument = gql `
    mutation UpdatePluginPackages($packages: [PackageSpecInput!]!) {
  updatePackages(type: Plugin, packages: $packages)
}
    `;
/**
 * __useUpdatePluginPackagesMutation__
 *
 * To run a mutation, you first call `useUpdatePluginPackagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePluginPackagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePluginPackagesMutation, { data, loading, error }] = useUpdatePluginPackagesMutation({
 *   variables: {
 *      packages: // value for 'packages'
 *   },
 * });
 */
export function useUpdatePluginPackagesMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(UpdatePluginPackagesDocument, options);
}
export const UninstallPluginPackagesDocument = gql `
    mutation UninstallPluginPackages($packages: [PackageSpecInput!]!) {
  uninstallPackages(type: Plugin, packages: $packages)
}
    `;
/**
 * __useUninstallPluginPackagesMutation__
 *
 * To run a mutation, you first call `useUninstallPluginPackagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUninstallPluginPackagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uninstallPluginPackagesMutation, { data, loading, error }] = useUninstallPluginPackagesMutation({
 *   variables: {
 *      packages: // value for 'packages'
 *   },
 * });
 */
export function useUninstallPluginPackagesMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(UninstallPluginPackagesDocument, options);
}
export const SceneMarkerCreateDocument = gql `
    mutation SceneMarkerCreate($title: String!, $seconds: Float!, $end_seconds: Float, $scene_id: ID!, $primary_tag_id: ID!, $tag_ids: [ID!] = []) {
  sceneMarkerCreate(
    input: {title: $title, seconds: $seconds, end_seconds: $end_seconds, scene_id: $scene_id, primary_tag_id: $primary_tag_id, tag_ids: $tag_ids}
  ) {
    ...SceneMarkerData
  }
}
    ${SceneMarkerDataFragmentDoc}`;
/**
 * __useSceneMarkerCreateMutation__
 *
 * To run a mutation, you first call `useSceneMarkerCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSceneMarkerCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sceneMarkerCreateMutation, { data, loading, error }] = useSceneMarkerCreateMutation({
 *   variables: {
 *      title: // value for 'title'
 *      seconds: // value for 'seconds'
 *      end_seconds: // value for 'end_seconds'
 *      scene_id: // value for 'scene_id'
 *      primary_tag_id: // value for 'primary_tag_id'
 *      tag_ids: // value for 'tag_ids'
 *   },
 * });
 */
export function useSceneMarkerCreateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SceneMarkerCreateDocument, options);
}
export const SceneMarkerUpdateDocument = gql `
    mutation SceneMarkerUpdate($id: ID!, $title: String!, $seconds: Float!, $end_seconds: Float, $scene_id: ID!, $primary_tag_id: ID!, $tag_ids: [ID!] = []) {
  sceneMarkerUpdate(
    input: {id: $id, title: $title, seconds: $seconds, end_seconds: $end_seconds, scene_id: $scene_id, primary_tag_id: $primary_tag_id, tag_ids: $tag_ids}
  ) {
    ...SceneMarkerData
  }
}
    ${SceneMarkerDataFragmentDoc}`;
/**
 * __useSceneMarkerUpdateMutation__
 *
 * To run a mutation, you first call `useSceneMarkerUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSceneMarkerUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sceneMarkerUpdateMutation, { data, loading, error }] = useSceneMarkerUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      seconds: // value for 'seconds'
 *      end_seconds: // value for 'end_seconds'
 *      scene_id: // value for 'scene_id'
 *      primary_tag_id: // value for 'primary_tag_id'
 *      tag_ids: // value for 'tag_ids'
 *   },
 * });
 */
export function useSceneMarkerUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SceneMarkerUpdateDocument, options);
}
export const BulkSceneMarkerUpdateDocument = gql `
    mutation BulkSceneMarkerUpdate($input: BulkSceneMarkerUpdateInput!) {
  bulkSceneMarkerUpdate(input: $input) {
    ...SceneMarkerData
  }
}
    ${SceneMarkerDataFragmentDoc}`;
/**
 * __useBulkSceneMarkerUpdateMutation__
 *
 * To run a mutation, you first call `useBulkSceneMarkerUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkSceneMarkerUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkSceneMarkerUpdateMutation, { data, loading, error }] = useBulkSceneMarkerUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkSceneMarkerUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(BulkSceneMarkerUpdateDocument, options);
}
export const SceneMarkerDestroyDocument = gql `
    mutation SceneMarkerDestroy($id: ID!) {
  sceneMarkerDestroy(id: $id)
}
    `;
/**
 * __useSceneMarkerDestroyMutation__
 *
 * To run a mutation, you first call `useSceneMarkerDestroyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSceneMarkerDestroyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sceneMarkerDestroyMutation, { data, loading, error }] = useSceneMarkerDestroyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSceneMarkerDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SceneMarkerDestroyDocument, options);
}
export const SceneMarkersDestroyDocument = gql `
    mutation SceneMarkersDestroy($ids: [ID!]!) {
  sceneMarkersDestroy(ids: $ids)
}
    `;
/**
 * __useSceneMarkersDestroyMutation__
 *
 * To run a mutation, you first call `useSceneMarkersDestroyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSceneMarkersDestroyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sceneMarkersDestroyMutation, { data, loading, error }] = useSceneMarkersDestroyMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useSceneMarkersDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SceneMarkersDestroyDocument, options);
}
export const SceneCreateDocument = gql `
    mutation SceneCreate($input: SceneCreateInput!) {
  sceneCreate(input: $input) {
    ...SceneData
  }
}
    ${SceneDataFragmentDoc}`;
/**
 * __useSceneCreateMutation__
 *
 * To run a mutation, you first call `useSceneCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSceneCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sceneCreateMutation, { data, loading, error }] = useSceneCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSceneCreateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SceneCreateDocument, options);
}
export const SceneUpdateDocument = gql `
    mutation SceneUpdate($input: SceneUpdateInput!) {
  sceneUpdate(input: $input) {
    ...SceneData
  }
}
    ${SceneDataFragmentDoc}`;
/**
 * __useSceneUpdateMutation__
 *
 * To run a mutation, you first call `useSceneUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSceneUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sceneUpdateMutation, { data, loading, error }] = useSceneUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSceneUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SceneUpdateDocument, options);
}
export const BulkSceneUpdateDocument = gql `
    mutation BulkSceneUpdate($input: BulkSceneUpdateInput!) {
  bulkSceneUpdate(input: $input) {
    ...SceneData
  }
}
    ${SceneDataFragmentDoc}`;
/**
 * __useBulkSceneUpdateMutation__
 *
 * To run a mutation, you first call `useBulkSceneUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkSceneUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkSceneUpdateMutation, { data, loading, error }] = useBulkSceneUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkSceneUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(BulkSceneUpdateDocument, options);
}
export const ScenesUpdateDocument = gql `
    mutation ScenesUpdate($input: [SceneUpdateInput!]!) {
  scenesUpdate(input: $input) {
    ...SceneData
  }
}
    ${SceneDataFragmentDoc}`;
/**
 * __useScenesUpdateMutation__
 *
 * To run a mutation, you first call `useScenesUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useScenesUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [scenesUpdateMutation, { data, loading, error }] = useScenesUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useScenesUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ScenesUpdateDocument, options);
}
export const SceneSaveActivityDocument = gql `
    mutation SceneSaveActivity($id: ID!, $resume_time: Float, $playDuration: Float) {
  sceneSaveActivity(
    id: $id
    resume_time: $resume_time
    playDuration: $playDuration
  )
}
    `;
/**
 * __useSceneSaveActivityMutation__
 *
 * To run a mutation, you first call `useSceneSaveActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSceneSaveActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sceneSaveActivityMutation, { data, loading, error }] = useSceneSaveActivityMutation({
 *   variables: {
 *      id: // value for 'id'
 *      resume_time: // value for 'resume_time'
 *      playDuration: // value for 'playDuration'
 *   },
 * });
 */
export function useSceneSaveActivityMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SceneSaveActivityDocument, options);
}
export const SceneResetActivityDocument = gql `
    mutation SceneResetActivity($id: ID!, $reset_resume: Boolean!, $reset_duration: Boolean!) {
  sceneResetActivity(
    id: $id
    reset_resume: $reset_resume
    reset_duration: $reset_duration
  )
}
    `;
/**
 * __useSceneResetActivityMutation__
 *
 * To run a mutation, you first call `useSceneResetActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSceneResetActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sceneResetActivityMutation, { data, loading, error }] = useSceneResetActivityMutation({
 *   variables: {
 *      id: // value for 'id'
 *      reset_resume: // value for 'reset_resume'
 *      reset_duration: // value for 'reset_duration'
 *   },
 * });
 */
export function useSceneResetActivityMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SceneResetActivityDocument, options);
}
export const SceneAddPlayDocument = gql `
    mutation SceneAddPlay($id: ID!, $times: [Timestamp!]) {
  sceneAddPlay(id: $id, times: $times) {
    count
    history
  }
}
    `;
/**
 * __useSceneAddPlayMutation__
 *
 * To run a mutation, you first call `useSceneAddPlayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSceneAddPlayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sceneAddPlayMutation, { data, loading, error }] = useSceneAddPlayMutation({
 *   variables: {
 *      id: // value for 'id'
 *      times: // value for 'times'
 *   },
 * });
 */
export function useSceneAddPlayMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SceneAddPlayDocument, options);
}
export const SceneDeletePlayDocument = gql `
    mutation SceneDeletePlay($id: ID!, $times: [Timestamp!]) {
  sceneDeletePlay(id: $id, times: $times) {
    count
    history
  }
}
    `;
/**
 * __useSceneDeletePlayMutation__
 *
 * To run a mutation, you first call `useSceneDeletePlayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSceneDeletePlayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sceneDeletePlayMutation, { data, loading, error }] = useSceneDeletePlayMutation({
 *   variables: {
 *      id: // value for 'id'
 *      times: // value for 'times'
 *   },
 * });
 */
export function useSceneDeletePlayMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SceneDeletePlayDocument, options);
}
export const SceneResetPlayCountDocument = gql `
    mutation SceneResetPlayCount($id: ID!) {
  sceneResetPlayCount(id: $id)
}
    `;
/**
 * __useSceneResetPlayCountMutation__
 *
 * To run a mutation, you first call `useSceneResetPlayCountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSceneResetPlayCountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sceneResetPlayCountMutation, { data, loading, error }] = useSceneResetPlayCountMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSceneResetPlayCountMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SceneResetPlayCountDocument, options);
}
export const SceneAddODocument = gql `
    mutation SceneAddO($id: ID!, $times: [Timestamp!]) {
  sceneAddO(id: $id, times: $times) {
    count
    history
  }
}
    `;
/**
 * __useSceneAddOMutation__
 *
 * To run a mutation, you first call `useSceneAddOMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSceneAddOMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sceneAddOMutation, { data, loading, error }] = useSceneAddOMutation({
 *   variables: {
 *      id: // value for 'id'
 *      times: // value for 'times'
 *   },
 * });
 */
export function useSceneAddOMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SceneAddODocument, options);
}
export const SceneDeleteODocument = gql `
    mutation SceneDeleteO($id: ID!, $times: [Timestamp!]) {
  sceneDeleteO(id: $id, times: $times) {
    count
    history
  }
}
    `;
/**
 * __useSceneDeleteOMutation__
 *
 * To run a mutation, you first call `useSceneDeleteOMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSceneDeleteOMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sceneDeleteOMutation, { data, loading, error }] = useSceneDeleteOMutation({
 *   variables: {
 *      id: // value for 'id'
 *      times: // value for 'times'
 *   },
 * });
 */
export function useSceneDeleteOMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SceneDeleteODocument, options);
}
export const SceneResetODocument = gql `
    mutation SceneResetO($id: ID!) {
  sceneResetO(id: $id)
}
    `;
/**
 * __useSceneResetOMutation__
 *
 * To run a mutation, you first call `useSceneResetOMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSceneResetOMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sceneResetOMutation, { data, loading, error }] = useSceneResetOMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSceneResetOMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SceneResetODocument, options);
}
export const SceneDestroyDocument = gql `
    mutation SceneDestroy($id: ID!, $delete_file: Boolean, $delete_generated: Boolean) {
  sceneDestroy(
    input: {id: $id, delete_file: $delete_file, delete_generated: $delete_generated}
  )
}
    `;
/**
 * __useSceneDestroyMutation__
 *
 * To run a mutation, you first call `useSceneDestroyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSceneDestroyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sceneDestroyMutation, { data, loading, error }] = useSceneDestroyMutation({
 *   variables: {
 *      id: // value for 'id'
 *      delete_file: // value for 'delete_file'
 *      delete_generated: // value for 'delete_generated'
 *   },
 * });
 */
export function useSceneDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SceneDestroyDocument, options);
}
export const ScenesDestroyDocument = gql `
    mutation ScenesDestroy($ids: [ID!]!, $delete_file: Boolean, $delete_generated: Boolean) {
  scenesDestroy(
    input: {ids: $ids, delete_file: $delete_file, delete_generated: $delete_generated}
  )
}
    `;
/**
 * __useScenesDestroyMutation__
 *
 * To run a mutation, you first call `useScenesDestroyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useScenesDestroyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [scenesDestroyMutation, { data, loading, error }] = useScenesDestroyMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *      delete_file: // value for 'delete_file'
 *      delete_generated: // value for 'delete_generated'
 *   },
 * });
 */
export function useScenesDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ScenesDestroyDocument, options);
}
export const SceneGenerateScreenshotDocument = gql `
    mutation SceneGenerateScreenshot($id: ID!, $at: Float) {
  sceneGenerateScreenshot(id: $id, at: $at)
}
    `;
/**
 * __useSceneGenerateScreenshotMutation__
 *
 * To run a mutation, you first call `useSceneGenerateScreenshotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSceneGenerateScreenshotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sceneGenerateScreenshotMutation, { data, loading, error }] = useSceneGenerateScreenshotMutation({
 *   variables: {
 *      id: // value for 'id'
 *      at: // value for 'at'
 *   },
 * });
 */
export function useSceneGenerateScreenshotMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SceneGenerateScreenshotDocument, options);
}
export const SceneAssignFileDocument = gql `
    mutation SceneAssignFile($input: AssignSceneFileInput!) {
  sceneAssignFile(input: $input)
}
    `;
/**
 * __useSceneAssignFileMutation__
 *
 * To run a mutation, you first call `useSceneAssignFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSceneAssignFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sceneAssignFileMutation, { data, loading, error }] = useSceneAssignFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSceneAssignFileMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SceneAssignFileDocument, options);
}
export const SceneMergeDocument = gql `
    mutation SceneMerge($input: SceneMergeInput!) {
  sceneMerge(input: $input) {
    id
  }
}
    `;
/**
 * __useSceneMergeMutation__
 *
 * To run a mutation, you first call `useSceneMergeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSceneMergeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sceneMergeMutation, { data, loading, error }] = useSceneMergeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSceneMergeMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SceneMergeDocument, options);
}
export const ReloadScrapersDocument = gql `
    mutation ReloadScrapers {
  reloadScrapers
}
    `;
/**
 * __useReloadScrapersMutation__
 *
 * To run a mutation, you first call `useReloadScrapersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReloadScrapersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reloadScrapersMutation, { data, loading, error }] = useReloadScrapersMutation({
 *   variables: {
 *   },
 * });
 */
export function useReloadScrapersMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(ReloadScrapersDocument, options);
}
export const InstallScraperPackagesDocument = gql `
    mutation InstallScraperPackages($packages: [PackageSpecInput!]!) {
  installPackages(type: Scraper, packages: $packages)
}
    `;
/**
 * __useInstallScraperPackagesMutation__
 *
 * To run a mutation, you first call `useInstallScraperPackagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInstallScraperPackagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [installScraperPackagesMutation, { data, loading, error }] = useInstallScraperPackagesMutation({
 *   variables: {
 *      packages: // value for 'packages'
 *   },
 * });
 */
export function useInstallScraperPackagesMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(InstallScraperPackagesDocument, options);
}
export const UpdateScraperPackagesDocument = gql `
    mutation UpdateScraperPackages($packages: [PackageSpecInput!]!) {
  updatePackages(type: Scraper, packages: $packages)
}
    `;
/**
 * __useUpdateScraperPackagesMutation__
 *
 * To run a mutation, you first call `useUpdateScraperPackagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateScraperPackagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateScraperPackagesMutation, { data, loading, error }] = useUpdateScraperPackagesMutation({
 *   variables: {
 *      packages: // value for 'packages'
 *   },
 * });
 */
export function useUpdateScraperPackagesMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(UpdateScraperPackagesDocument, options);
}
export const UninstallScraperPackagesDocument = gql `
    mutation UninstallScraperPackages($packages: [PackageSpecInput!]!) {
  uninstallPackages(type: Scraper, packages: $packages)
}
    `;
/**
 * __useUninstallScraperPackagesMutation__
 *
 * To run a mutation, you first call `useUninstallScraperPackagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUninstallScraperPackagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uninstallScraperPackagesMutation, { data, loading, error }] = useUninstallScraperPackagesMutation({
 *   variables: {
 *      packages: // value for 'packages'
 *   },
 * });
 */
export function useUninstallScraperPackagesMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(UninstallScraperPackagesDocument, options);
}
export const SubmitStashBoxFingerprintsDocument = gql `
    mutation SubmitStashBoxFingerprints($input: StashBoxFingerprintSubmissionInput!) {
  submitStashBoxFingerprints(input: $input)
}
    `;
/**
 * __useSubmitStashBoxFingerprintsMutation__
 *
 * To run a mutation, you first call `useSubmitStashBoxFingerprintsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitStashBoxFingerprintsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitStashBoxFingerprintsMutation, { data, loading, error }] = useSubmitStashBoxFingerprintsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitStashBoxFingerprintsMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SubmitStashBoxFingerprintsDocument, options);
}
export const StashBoxBatchPerformerTagDocument = gql `
    mutation StashBoxBatchPerformerTag($input: StashBoxBatchTagInput!) {
  stashBoxBatchPerformerTag(input: $input)
}
    `;
/**
 * __useStashBoxBatchPerformerTagMutation__
 *
 * To run a mutation, you first call `useStashBoxBatchPerformerTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStashBoxBatchPerformerTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stashBoxBatchPerformerTagMutation, { data, loading, error }] = useStashBoxBatchPerformerTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStashBoxBatchPerformerTagMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(StashBoxBatchPerformerTagDocument, options);
}
export const StashBoxBatchStudioTagDocument = gql `
    mutation StashBoxBatchStudioTag($input: StashBoxBatchTagInput!) {
  stashBoxBatchStudioTag(input: $input)
}
    `;
/**
 * __useStashBoxBatchStudioTagMutation__
 *
 * To run a mutation, you first call `useStashBoxBatchStudioTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStashBoxBatchStudioTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stashBoxBatchStudioTagMutation, { data, loading, error }] = useStashBoxBatchStudioTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStashBoxBatchStudioTagMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(StashBoxBatchStudioTagDocument, options);
}
export const StashBoxBatchTagTagDocument = gql `
    mutation StashBoxBatchTagTag($input: StashBoxBatchTagInput!) {
  stashBoxBatchTagTag(input: $input)
}
    `;
/**
 * __useStashBoxBatchTagTagMutation__
 *
 * To run a mutation, you first call `useStashBoxBatchTagTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStashBoxBatchTagTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stashBoxBatchTagTagMutation, { data, loading, error }] = useStashBoxBatchTagTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStashBoxBatchTagTagMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(StashBoxBatchTagTagDocument, options);
}
export const SubmitStashBoxSceneDraftDocument = gql `
    mutation SubmitStashBoxSceneDraft($input: StashBoxDraftSubmissionInput!) {
  submitStashBoxSceneDraft(input: $input)
}
    `;
/**
 * __useSubmitStashBoxSceneDraftMutation__
 *
 * To run a mutation, you first call `useSubmitStashBoxSceneDraftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitStashBoxSceneDraftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitStashBoxSceneDraftMutation, { data, loading, error }] = useSubmitStashBoxSceneDraftMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitStashBoxSceneDraftMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SubmitStashBoxSceneDraftDocument, options);
}
export const SubmitStashBoxPerformerDraftDocument = gql `
    mutation SubmitStashBoxPerformerDraft($input: StashBoxDraftSubmissionInput!) {
  submitStashBoxPerformerDraft(input: $input)
}
    `;
/**
 * __useSubmitStashBoxPerformerDraftMutation__
 *
 * To run a mutation, you first call `useSubmitStashBoxPerformerDraftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitStashBoxPerformerDraftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitStashBoxPerformerDraftMutation, { data, loading, error }] = useSubmitStashBoxPerformerDraftMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitStashBoxPerformerDraftMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(SubmitStashBoxPerformerDraftDocument, options);
}
export const StudioCreateDocument = gql `
    mutation StudioCreate($input: StudioCreateInput!) {
  studioCreate(input: $input) {
    ...StudioData
  }
}
    ${StudioDataFragmentDoc}`;
/**
 * __useStudioCreateMutation__
 *
 * To run a mutation, you first call `useStudioCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStudioCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [studioCreateMutation, { data, loading, error }] = useStudioCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStudioCreateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(StudioCreateDocument, options);
}
export const StudioUpdateDocument = gql `
    mutation StudioUpdate($input: StudioUpdateInput!) {
  studioUpdate(input: $input) {
    ...StudioData
  }
}
    ${StudioDataFragmentDoc}`;
/**
 * __useStudioUpdateMutation__
 *
 * To run a mutation, you first call `useStudioUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStudioUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [studioUpdateMutation, { data, loading, error }] = useStudioUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStudioUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(StudioUpdateDocument, options);
}
export const BulkStudioUpdateDocument = gql `
    mutation BulkStudioUpdate($input: BulkStudioUpdateInput!) {
  bulkStudioUpdate(input: $input) {
    ...StudioData
  }
}
    ${StudioDataFragmentDoc}`;
/**
 * __useBulkStudioUpdateMutation__
 *
 * To run a mutation, you first call `useBulkStudioUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkStudioUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkStudioUpdateMutation, { data, loading, error }] = useBulkStudioUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkStudioUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(BulkStudioUpdateDocument, options);
}
export const StudioDestroyDocument = gql `
    mutation StudioDestroy($id: ID!) {
  studioDestroy(input: {id: $id})
}
    `;
/**
 * __useStudioDestroyMutation__
 *
 * To run a mutation, you first call `useStudioDestroyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStudioDestroyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [studioDestroyMutation, { data, loading, error }] = useStudioDestroyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStudioDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(StudioDestroyDocument, options);
}
export const StudiosDestroyDocument = gql `
    mutation StudiosDestroy($ids: [ID!]!) {
  studiosDestroy(ids: $ids)
}
    `;
/**
 * __useStudiosDestroyMutation__
 *
 * To run a mutation, you first call `useStudiosDestroyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStudiosDestroyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [studiosDestroyMutation, { data, loading, error }] = useStudiosDestroyMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useStudiosDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(StudiosDestroyDocument, options);
}
export const TagCreateDocument = gql `
    mutation TagCreate($input: TagCreateInput!) {
  tagCreate(input: $input) {
    ...TagData
  }
}
    ${TagDataFragmentDoc}`;
/**
 * __useTagCreateMutation__
 *
 * To run a mutation, you first call `useTagCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTagCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tagCreateMutation, { data, loading, error }] = useTagCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTagCreateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(TagCreateDocument, options);
}
export const TagDestroyDocument = gql `
    mutation TagDestroy($id: ID!) {
  tagDestroy(input: {id: $id})
}
    `;
/**
 * __useTagDestroyMutation__
 *
 * To run a mutation, you first call `useTagDestroyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTagDestroyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tagDestroyMutation, { data, loading, error }] = useTagDestroyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTagDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(TagDestroyDocument, options);
}
export const TagsDestroyDocument = gql `
    mutation TagsDestroy($ids: [ID!]!) {
  tagsDestroy(ids: $ids)
}
    `;
/**
 * __useTagsDestroyMutation__
 *
 * To run a mutation, you first call `useTagsDestroyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTagsDestroyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tagsDestroyMutation, { data, loading, error }] = useTagsDestroyMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useTagsDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(TagsDestroyDocument, options);
}
export const TagUpdateDocument = gql `
    mutation TagUpdate($input: TagUpdateInput!) {
  tagUpdate(input: $input) {
    ...TagData
  }
}
    ${TagDataFragmentDoc}`;
/**
 * __useTagUpdateMutation__
 *
 * To run a mutation, you first call `useTagUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTagUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tagUpdateMutation, { data, loading, error }] = useTagUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTagUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(TagUpdateDocument, options);
}
export const BulkTagUpdateDocument = gql `
    mutation BulkTagUpdate($input: BulkTagUpdateInput!) {
  bulkTagUpdate(input: $input) {
    ...TagData
  }
}
    ${TagDataFragmentDoc}`;
/**
 * __useBulkTagUpdateMutation__
 *
 * To run a mutation, you first call `useBulkTagUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkTagUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkTagUpdateMutation, { data, loading, error }] = useBulkTagUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkTagUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(BulkTagUpdateDocument, options);
}
export const TagsMergeDocument = gql `
    mutation TagsMerge($source: [ID!]!, $destination: ID!, $values: TagUpdateInput) {
  tagsMerge(input: {source: $source, destination: $destination, values: $values}) {
    ...TagData
  }
}
    ${TagDataFragmentDoc}`;
/**
 * __useTagsMergeMutation__
 *
 * To run a mutation, you first call `useTagsMergeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTagsMergeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tagsMergeMutation, { data, loading, error }] = useTagsMergeMutation({
 *   variables: {
 *      source: // value for 'source'
 *      destination: // value for 'destination'
 *      values: // value for 'values'
 *   },
 * });
 */
export function useTagsMergeMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(TagsMergeDocument, options);
}
export const DlnaStatusDocument = gql `
    query DLNAStatus {
  dlnaStatus {
    running
    until
    recentIPAddresses
    allowedIPAddresses {
      ipAddress
      until
    }
  }
}
    `;
/**
 * __useDlnaStatusQuery__
 *
 * To run a query within a React component, call `useDlnaStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useDlnaStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDlnaStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useDlnaStatusQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(DlnaStatusDocument, options);
}
export function useDlnaStatusLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(DlnaStatusDocument, options);
}
export function useDlnaStatusSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(DlnaStatusDocument, options);
}
export function refetchDlnaStatusQuery(variables) {
    return { query: DlnaStatusDocument, variables: variables };
}
export const FindSavedFilterDocument = gql `
    query FindSavedFilter($id: ID!) {
  findSavedFilter(id: $id) {
    ...SavedFilterData
  }
}
    ${SavedFilterDataFragmentDoc}`;
/**
 * __useFindSavedFilterQuery__
 *
 * To run a query within a React component, call `useFindSavedFilterQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSavedFilterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSavedFilterQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindSavedFilterQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindSavedFilterDocument, options);
}
export function useFindSavedFilterLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindSavedFilterDocument, options);
}
export function useFindSavedFilterSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindSavedFilterDocument, options);
}
export function refetchFindSavedFilterQuery(variables) {
    return { query: FindSavedFilterDocument, variables: variables };
}
export const FindSavedFiltersDocument = gql `
    query FindSavedFilters($mode: FilterMode) {
  findSavedFilters(mode: $mode) {
    ...SavedFilterData
  }
}
    ${SavedFilterDataFragmentDoc}`;
/**
 * __useFindSavedFiltersQuery__
 *
 * To run a query within a React component, call `useFindSavedFiltersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSavedFiltersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSavedFiltersQuery({
 *   variables: {
 *      mode: // value for 'mode'
 *   },
 * });
 */
export function useFindSavedFiltersQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindSavedFiltersDocument, options);
}
export function useFindSavedFiltersLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindSavedFiltersDocument, options);
}
export function useFindSavedFiltersSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindSavedFiltersDocument, options);
}
export function refetchFindSavedFiltersQuery(variables) {
    return { query: FindSavedFiltersDocument, variables: variables };
}
export const FindRootFoldersForSelectDocument = gql `
    query FindRootFoldersForSelect($zip_file_filter: MultiCriterionInput) {
  findFolders(
    filter: {per_page: -1, sort: "path", direction: ASC}
    folder_filter: {parent_folder: {modifier: IS_NULL}, zip_file: $zip_file_filter}
  ) {
    count
    folders {
      ...SelectFolderData
    }
  }
}
    ${SelectFolderDataFragmentDoc}`;
/**
 * __useFindRootFoldersForSelectQuery__
 *
 * To run a query within a React component, call `useFindRootFoldersForSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindRootFoldersForSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindRootFoldersForSelectQuery({
 *   variables: {
 *      zip_file_filter: // value for 'zip_file_filter'
 *   },
 * });
 */
export function useFindRootFoldersForSelectQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindRootFoldersForSelectDocument, options);
}
export function useFindRootFoldersForSelectLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindRootFoldersForSelectDocument, options);
}
export function useFindRootFoldersForSelectSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindRootFoldersForSelectDocument, options);
}
export function refetchFindRootFoldersForSelectQuery(variables) {
    return { query: FindRootFoldersForSelectDocument, variables: variables };
}
export const FindFoldersForQueryDocument = gql `
    query FindFoldersForQuery($filter: FindFilterType, $folder_filter: FolderFilterType, $ids: [ID!]) {
  findFolders(filter: $filter, folder_filter: $folder_filter, ids: $ids) {
    count
    folders {
      ...RecursiveFolderData
    }
  }
}
    ${RecursiveFolderDataFragmentDoc}`;
/**
 * __useFindFoldersForQueryQuery__
 *
 * To run a query within a React component, call `useFindFoldersForQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindFoldersForQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindFoldersForQueryQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      folder_filter: // value for 'folder_filter'
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useFindFoldersForQueryQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindFoldersForQueryDocument, options);
}
export function useFindFoldersForQueryLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindFoldersForQueryDocument, options);
}
export function useFindFoldersForQuerySuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindFoldersForQueryDocument, options);
}
export function refetchFindFoldersForQueryQuery(variables) {
    return { query: FindFoldersForQueryDocument, variables: variables };
}
export const FindFolderHierarchyForIDsDocument = gql `
    query FindFolderHierarchyForIDs($ids: [ID!]!) {
  findFolders(ids: $ids) {
    count
    folders {
      ...SelectFolderData
      parent_folders {
        ...SelectFolderData
        sub_folders {
          ...SelectFolderData
          zip_file {
            id
          }
        }
      }
    }
  }
}
    ${SelectFolderDataFragmentDoc}`;
/**
 * __useFindFolderHierarchyForIDsQuery__
 *
 * To run a query within a React component, call `useFindFolderHierarchyForIDsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindFolderHierarchyForIDsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindFolderHierarchyForIDsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useFindFolderHierarchyForIDsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindFolderHierarchyForIDsDocument, options);
}
export function useFindFolderHierarchyForIDsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindFolderHierarchyForIDsDocument, options);
}
export function useFindFolderHierarchyForIDsSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindFolderHierarchyForIDsDocument, options);
}
export function refetchFindFolderHierarchyForIDsQuery(variables) {
    return { query: FindFolderHierarchyForIDsDocument, variables: variables };
}
export const FindGalleriesDocument = gql `
    query FindGalleries($filter: FindFilterType, $gallery_filter: GalleryFilterType) {
  findGalleries(gallery_filter: $gallery_filter, filter: $filter) {
    count
    galleries {
      ...SlimGalleryData
    }
  }
}
    ${SlimGalleryDataFragmentDoc}`;
/**
 * __useFindGalleriesQuery__
 *
 * To run a query within a React component, call `useFindGalleriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindGalleriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindGalleriesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      gallery_filter: // value for 'gallery_filter'
 *   },
 * });
 */
export function useFindGalleriesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindGalleriesDocument, options);
}
export function useFindGalleriesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindGalleriesDocument, options);
}
export function useFindGalleriesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindGalleriesDocument, options);
}
export function refetchFindGalleriesQuery(variables) {
    return { query: FindGalleriesDocument, variables: variables };
}
export const FindGalleryDocument = gql `
    query FindGallery($id: ID!) {
  findGallery(id: $id) {
    ...GalleryData
  }
}
    ${GalleryDataFragmentDoc}`;
/**
 * __useFindGalleryQuery__
 *
 * To run a query within a React component, call `useFindGalleryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindGalleryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindGalleryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindGalleryQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindGalleryDocument, options);
}
export function useFindGalleryLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindGalleryDocument, options);
}
export function useFindGallerySuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindGalleryDocument, options);
}
export function refetchFindGalleryQuery(variables) {
    return { query: FindGalleryDocument, variables: variables };
}
export const FindGalleriesForSelectDocument = gql `
    query FindGalleriesForSelect($filter: FindFilterType, $gallery_filter: GalleryFilterType, $ids: [ID!]) {
  findGalleries(filter: $filter, gallery_filter: $gallery_filter, ids: $ids) {
    count
    galleries {
      ...SelectGalleryData
    }
  }
}
    ${SelectGalleryDataFragmentDoc}`;
/**
 * __useFindGalleriesForSelectQuery__
 *
 * To run a query within a React component, call `useFindGalleriesForSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindGalleriesForSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindGalleriesForSelectQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      gallery_filter: // value for 'gallery_filter'
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useFindGalleriesForSelectQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindGalleriesForSelectDocument, options);
}
export function useFindGalleriesForSelectLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindGalleriesForSelectDocument, options);
}
export function useFindGalleriesForSelectSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindGalleriesForSelectDocument, options);
}
export function refetchFindGalleriesForSelectQuery(variables) {
    return { query: FindGalleriesForSelectDocument, variables: variables };
}
export const FindGalleryImageIdDocument = gql `
    query FindGalleryImageID($id: ID!, $index: Int!) {
  findGallery(id: $id) {
    image(index: $index) {
      id
    }
  }
}
    `;
/**
 * __useFindGalleryImageIdQuery__
 *
 * To run a query within a React component, call `useFindGalleryImageIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindGalleryImageIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindGalleryImageIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *      index: // value for 'index'
 *   },
 * });
 */
export function useFindGalleryImageIdQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindGalleryImageIdDocument, options);
}
export function useFindGalleryImageIdLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindGalleryImageIdDocument, options);
}
export function useFindGalleryImageIdSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindGalleryImageIdDocument, options);
}
export function refetchFindGalleryImageIdQuery(variables) {
    return { query: FindGalleryImageIdDocument, variables: variables };
}
export const FindImagesDocument = gql `
    query FindImages($filter: FindFilterType, $image_filter: ImageFilterType, $image_ids: [Int!]) {
  findImages(filter: $filter, image_filter: $image_filter, image_ids: $image_ids) {
    count
    images {
      ...SlimImageData
    }
  }
}
    ${SlimImageDataFragmentDoc}`;
/**
 * __useFindImagesQuery__
 *
 * To run a query within a React component, call `useFindImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindImagesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      image_filter: // value for 'image_filter'
 *      image_ids: // value for 'image_ids'
 *   },
 * });
 */
export function useFindImagesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindImagesDocument, options);
}
export function useFindImagesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindImagesDocument, options);
}
export function useFindImagesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindImagesDocument, options);
}
export function refetchFindImagesQuery(variables) {
    return { query: FindImagesDocument, variables: variables };
}
export const FindImagesMetadataDocument = gql `
    query FindImagesMetadata($filter: FindFilterType, $image_filter: ImageFilterType, $image_ids: [Int!]) {
  findImages(filter: $filter, image_filter: $image_filter, image_ids: $image_ids) {
    megapixels
    filesize
  }
}
    `;
/**
 * __useFindImagesMetadataQuery__
 *
 * To run a query within a React component, call `useFindImagesMetadataQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindImagesMetadataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindImagesMetadataQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      image_filter: // value for 'image_filter'
 *      image_ids: // value for 'image_ids'
 *   },
 * });
 */
export function useFindImagesMetadataQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindImagesMetadataDocument, options);
}
export function useFindImagesMetadataLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindImagesMetadataDocument, options);
}
export function useFindImagesMetadataSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindImagesMetadataDocument, options);
}
export function refetchFindImagesMetadataQuery(variables) {
    return { query: FindImagesMetadataDocument, variables: variables };
}
export const FindImageDocument = gql `
    query FindImage($id: ID!, $checksum: String) {
  findImage(id: $id, checksum: $checksum) {
    ...ImageData
  }
}
    ${ImageDataFragmentDoc}`;
/**
 * __useFindImageQuery__
 *
 * To run a query within a React component, call `useFindImageQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindImageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindImageQuery({
 *   variables: {
 *      id: // value for 'id'
 *      checksum: // value for 'checksum'
 *   },
 * });
 */
export function useFindImageQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindImageDocument, options);
}
export function useFindImageLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindImageDocument, options);
}
export function useFindImageSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindImageDocument, options);
}
export function refetchFindImageQuery(variables) {
    return { query: FindImageDocument, variables: variables };
}
export const JobQueueDocument = gql `
    query JobQueue {
  jobQueue {
    ...JobData
  }
}
    ${JobDataFragmentDoc}`;
/**
 * __useJobQueueQuery__
 *
 * To run a query within a React component, call `useJobQueueQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobQueueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobQueueQuery({
 *   variables: {
 *   },
 * });
 */
export function useJobQueueQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(JobQueueDocument, options);
}
export function useJobQueueLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(JobQueueDocument, options);
}
export function useJobQueueSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(JobQueueDocument, options);
}
export function refetchJobQueueQuery(variables) {
    return { query: JobQueueDocument, variables: variables };
}
export const FindJobDocument = gql `
    query FindJob($input: FindJobInput!) {
  findJob(input: $input) {
    ...JobData
  }
}
    ${JobDataFragmentDoc}`;
/**
 * __useFindJobQuery__
 *
 * To run a query within a React component, call `useFindJobQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindJobQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindJobQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindJobQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindJobDocument, options);
}
export function useFindJobLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindJobDocument, options);
}
export function useFindJobSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindJobDocument, options);
}
export function refetchFindJobQuery(variables) {
    return { query: FindJobDocument, variables: variables };
}
export const SceneWallDocument = gql `
    query SceneWall($q: String) {
  sceneWall(q: $q) {
    ...SceneData
  }
}
    ${SceneDataFragmentDoc}`;
/**
 * __useSceneWallQuery__
 *
 * To run a query within a React component, call `useSceneWallQuery` and pass it any options that fit your needs.
 * When your component renders, `useSceneWallQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSceneWallQuery({
 *   variables: {
 *      q: // value for 'q'
 *   },
 * });
 */
export function useSceneWallQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(SceneWallDocument, options);
}
export function useSceneWallLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(SceneWallDocument, options);
}
export function useSceneWallSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(SceneWallDocument, options);
}
export function refetchSceneWallQuery(variables) {
    return { query: SceneWallDocument, variables: variables };
}
export const MarkerWallDocument = gql `
    query MarkerWall($q: String) {
  markerWall(q: $q) {
    ...SceneMarkerData
  }
}
    ${SceneMarkerDataFragmentDoc}`;
/**
 * __useMarkerWallQuery__
 *
 * To run a query within a React component, call `useMarkerWallQuery` and pass it any options that fit your needs.
 * When your component renders, `useMarkerWallQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarkerWallQuery({
 *   variables: {
 *      q: // value for 'q'
 *   },
 * });
 */
export function useMarkerWallQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(MarkerWallDocument, options);
}
export function useMarkerWallLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(MarkerWallDocument, options);
}
export function useMarkerWallSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(MarkerWallDocument, options);
}
export function refetchMarkerWallQuery(variables) {
    return { query: MarkerWallDocument, variables: variables };
}
export const MarkerStringsDocument = gql `
    query MarkerStrings($q: String, $sort: String) {
  markerStrings(q: $q, sort: $sort) {
    id
    count
    title
  }
}
    `;
/**
 * __useMarkerStringsQuery__
 *
 * To run a query within a React component, call `useMarkerStringsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMarkerStringsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarkerStringsQuery({
 *   variables: {
 *      q: // value for 'q'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useMarkerStringsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(MarkerStringsDocument, options);
}
export function useMarkerStringsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(MarkerStringsDocument, options);
}
export function useMarkerStringsSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(MarkerStringsDocument, options);
}
export function refetchMarkerStringsQuery(variables) {
    return { query: MarkerStringsDocument, variables: variables };
}
export const StatsDocument = gql `
    query Stats {
  stats {
    scene_count
    scenes_size
    scenes_duration
    image_count
    images_size
    gallery_count
    performer_count
    studio_count
    group_count
    tag_count
    total_o_count
    total_play_duration
    total_play_count
    scenes_played
  }
}
    `;
/**
 * __useStatsQuery__
 *
 * To run a query within a React component, call `useStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStatsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(StatsDocument, options);
}
export function useStatsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(StatsDocument, options);
}
export function useStatsSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(StatsDocument, options);
}
export function refetchStatsQuery(variables) {
    return { query: StatsDocument, variables: variables };
}
export const LogsDocument = gql `
    query Logs {
  logs {
    ...LogEntryData
  }
}
    ${LogEntryDataFragmentDoc}`;
/**
 * __useLogsQuery__
 *
 * To run a query within a React component, call `useLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(LogsDocument, options);
}
export function useLogsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(LogsDocument, options);
}
export function useLogsSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(LogsDocument, options);
}
export function refetchLogsQuery(variables) {
    return { query: LogsDocument, variables: variables };
}
export const VersionDocument = gql `
    query Version {
  version {
    version
    hash
    build_time
  }
}
    `;
/**
 * __useVersionQuery__
 *
 * To run a query within a React component, call `useVersionQuery` and pass it any options that fit your needs.
 * When your component renders, `useVersionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVersionQuery({
 *   variables: {
 *   },
 * });
 */
export function useVersionQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(VersionDocument, options);
}
export function useVersionLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(VersionDocument, options);
}
export function useVersionSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(VersionDocument, options);
}
export function refetchVersionQuery(variables) {
    return { query: VersionDocument, variables: variables };
}
export const LatestVersionDocument = gql `
    query LatestVersion {
  latestversion {
    version
    shorthash
    release_date
    url
  }
}
    `;
/**
 * __useLatestVersionQuery__
 *
 * To run a query within a React component, call `useLatestVersionQuery` and pass it any options that fit your needs.
 * When your component renders, `useLatestVersionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLatestVersionQuery({
 *   variables: {
 *   },
 * });
 */
export function useLatestVersionQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(LatestVersionDocument, options);
}
export function useLatestVersionLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(LatestVersionDocument, options);
}
export function useLatestVersionSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(LatestVersionDocument, options);
}
export function refetchLatestVersionQuery(variables) {
    return { query: LatestVersionDocument, variables: variables };
}
export const FindGroupsDocument = gql `
    query FindGroups($filter: FindFilterType, $group_filter: GroupFilterType) {
  findGroups(filter: $filter, group_filter: $group_filter) {
    count
    groups {
      ...ListGroupData
    }
  }
}
    ${ListGroupDataFragmentDoc}`;
/**
 * __useFindGroupsQuery__
 *
 * To run a query within a React component, call `useFindGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindGroupsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      group_filter: // value for 'group_filter'
 *   },
 * });
 */
export function useFindGroupsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindGroupsDocument, options);
}
export function useFindGroupsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindGroupsDocument, options);
}
export function useFindGroupsSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindGroupsDocument, options);
}
export function refetchFindGroupsQuery(variables) {
    return { query: FindGroupsDocument, variables: variables };
}
export const FindGroupDocument = gql `
    query FindGroup($id: ID!) {
  findGroup(id: $id) {
    ...GroupData
  }
}
    ${GroupDataFragmentDoc}`;
/**
 * __useFindGroupQuery__
 *
 * To run a query within a React component, call `useFindGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindGroupQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindGroupQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindGroupDocument, options);
}
export function useFindGroupLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindGroupDocument, options);
}
export function useFindGroupSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindGroupDocument, options);
}
export function refetchFindGroupQuery(variables) {
    return { query: FindGroupDocument, variables: variables };
}
export const FindGroupsForSelectDocument = gql `
    query FindGroupsForSelect($filter: FindFilterType, $group_filter: GroupFilterType, $ids: [ID!]) {
  findGroups(filter: $filter, group_filter: $group_filter, ids: $ids) {
    count
    groups {
      ...SelectGroupData
    }
  }
}
    ${SelectGroupDataFragmentDoc}`;
/**
 * __useFindGroupsForSelectQuery__
 *
 * To run a query within a React component, call `useFindGroupsForSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindGroupsForSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindGroupsForSelectQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      group_filter: // value for 'group_filter'
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useFindGroupsForSelectQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindGroupsForSelectDocument, options);
}
export function useFindGroupsForSelectLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindGroupsForSelectDocument, options);
}
export function useFindGroupsForSelectSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindGroupsForSelectDocument, options);
}
export function refetchFindGroupsForSelectQuery(variables) {
    return { query: FindGroupsForSelectDocument, variables: variables };
}
export const FindPerformersDocument = gql `
    query FindPerformers($filter: FindFilterType, $performer_filter: PerformerFilterType, $performer_ids: [Int!]) {
  findPerformers(
    filter: $filter
    performer_filter: $performer_filter
    performer_ids: $performer_ids
  ) {
    count
    performers {
      ...PerformerData
    }
  }
}
    ${PerformerDataFragmentDoc}`;
/**
 * __useFindPerformersQuery__
 *
 * To run a query within a React component, call `useFindPerformersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPerformersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPerformersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      performer_filter: // value for 'performer_filter'
 *      performer_ids: // value for 'performer_ids'
 *   },
 * });
 */
export function useFindPerformersQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindPerformersDocument, options);
}
export function useFindPerformersLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindPerformersDocument, options);
}
export function useFindPerformersSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindPerformersDocument, options);
}
export function refetchFindPerformersQuery(variables) {
    return { query: FindPerformersDocument, variables: variables };
}
export const FindPerformerDocument = gql `
    query FindPerformer($id: ID!) {
  findPerformer(id: $id) {
    ...PerformerData
  }
}
    ${PerformerDataFragmentDoc}`;
/**
 * __useFindPerformerQuery__
 *
 * To run a query within a React component, call `useFindPerformerQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPerformerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPerformerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindPerformerQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindPerformerDocument, options);
}
export function useFindPerformerLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindPerformerDocument, options);
}
export function useFindPerformerSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindPerformerDocument, options);
}
export function refetchFindPerformerQuery(variables) {
    return { query: FindPerformerDocument, variables: variables };
}
export const FindPerformersForSelectDocument = gql `
    query FindPerformersForSelect($filter: FindFilterType, $performer_filter: PerformerFilterType, $ids: [ID!]) {
  findPerformers(filter: $filter, performer_filter: $performer_filter, ids: $ids) {
    count
    performers {
      ...SelectPerformerData
    }
  }
}
    ${SelectPerformerDataFragmentDoc}`;
/**
 * __useFindPerformersForSelectQuery__
 *
 * To run a query within a React component, call `useFindPerformersForSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPerformersForSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPerformersForSelectQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      performer_filter: // value for 'performer_filter'
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useFindPerformersForSelectQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindPerformersForSelectDocument, options);
}
export function useFindPerformersForSelectLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindPerformersForSelectDocument, options);
}
export function useFindPerformersForSelectSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindPerformersForSelectDocument, options);
}
export function refetchFindPerformersForSelectQuery(variables) {
    return { query: FindPerformersForSelectDocument, variables: variables };
}
export const PluginsDocument = gql `
    query Plugins {
  plugins {
    id
    name
    enabled
    description
    url
    version
    tasks {
      name
      description
    }
    hooks {
      name
      description
      hooks
    }
    settings {
      name
      display_name
      description
      type
    }
    requires
    paths {
      css
      javascript
    }
  }
}
    `;
/**
 * __usePluginsQuery__
 *
 * To run a query within a React component, call `usePluginsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePluginsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePluginsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePluginsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(PluginsDocument, options);
}
export function usePluginsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(PluginsDocument, options);
}
export function usePluginsSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(PluginsDocument, options);
}
export function refetchPluginsQuery(variables) {
    return { query: PluginsDocument, variables: variables };
}
export const PluginTasksDocument = gql `
    query PluginTasks {
  pluginTasks {
    name
    description
    plugin {
      id
      name
      enabled
    }
  }
}
    `;
/**
 * __usePluginTasksQuery__
 *
 * To run a query within a React component, call `usePluginTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `usePluginTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePluginTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function usePluginTasksQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(PluginTasksDocument, options);
}
export function usePluginTasksLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(PluginTasksDocument, options);
}
export function usePluginTasksSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(PluginTasksDocument, options);
}
export function refetchPluginTasksQuery(variables) {
    return { query: PluginTasksDocument, variables: variables };
}
export const InstalledPluginPackagesDocument = gql `
    query InstalledPluginPackages {
  installedPackages(type: Plugin) {
    ...PackageData
  }
}
    ${PackageDataFragmentDoc}`;
/**
 * __useInstalledPluginPackagesQuery__
 *
 * To run a query within a React component, call `useInstalledPluginPackagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstalledPluginPackagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstalledPluginPackagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useInstalledPluginPackagesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(InstalledPluginPackagesDocument, options);
}
export function useInstalledPluginPackagesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(InstalledPluginPackagesDocument, options);
}
export function useInstalledPluginPackagesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(InstalledPluginPackagesDocument, options);
}
export function refetchInstalledPluginPackagesQuery(variables) {
    return { query: InstalledPluginPackagesDocument, variables: variables };
}
export const InstalledPluginPackagesStatusDocument = gql `
    query InstalledPluginPackagesStatus {
  installedPackages(type: Plugin) {
    ...PackageData
    source_package {
      ...PackageData
    }
  }
}
    ${PackageDataFragmentDoc}`;
/**
 * __useInstalledPluginPackagesStatusQuery__
 *
 * To run a query within a React component, call `useInstalledPluginPackagesStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstalledPluginPackagesStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstalledPluginPackagesStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useInstalledPluginPackagesStatusQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(InstalledPluginPackagesStatusDocument, options);
}
export function useInstalledPluginPackagesStatusLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(InstalledPluginPackagesStatusDocument, options);
}
export function useInstalledPluginPackagesStatusSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(InstalledPluginPackagesStatusDocument, options);
}
export function refetchInstalledPluginPackagesStatusQuery(variables) {
    return { query: InstalledPluginPackagesStatusDocument, variables: variables };
}
export const AvailablePluginPackagesDocument = gql `
    query AvailablePluginPackages($source: String!) {
  availablePackages(source: $source, type: Plugin) {
    ...PackageData
    requires {
      package_id
    }
  }
}
    ${PackageDataFragmentDoc}`;
/**
 * __useAvailablePluginPackagesQuery__
 *
 * To run a query within a React component, call `useAvailablePluginPackagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvailablePluginPackagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAvailablePluginPackagesQuery({
 *   variables: {
 *      source: // value for 'source'
 *   },
 * });
 */
export function useAvailablePluginPackagesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(AvailablePluginPackagesDocument, options);
}
export function useAvailablePluginPackagesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(AvailablePluginPackagesDocument, options);
}
export function useAvailablePluginPackagesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(AvailablePluginPackagesDocument, options);
}
export function refetchAvailablePluginPackagesQuery(variables) {
    return { query: AvailablePluginPackagesDocument, variables: variables };
}
export const FindSceneMarkersDocument = gql `
    query FindSceneMarkers($filter: FindFilterType, $scene_marker_filter: SceneMarkerFilterType) {
  findSceneMarkers(filter: $filter, scene_marker_filter: $scene_marker_filter) {
    count
    scene_markers {
      ...SceneMarkerData
    }
  }
}
    ${SceneMarkerDataFragmentDoc}`;
/**
 * __useFindSceneMarkersQuery__
 *
 * To run a query within a React component, call `useFindSceneMarkersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSceneMarkersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSceneMarkersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      scene_marker_filter: // value for 'scene_marker_filter'
 *   },
 * });
 */
export function useFindSceneMarkersQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindSceneMarkersDocument, options);
}
export function useFindSceneMarkersLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindSceneMarkersDocument, options);
}
export function useFindSceneMarkersSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindSceneMarkersDocument, options);
}
export function refetchFindSceneMarkersQuery(variables) {
    return { query: FindSceneMarkersDocument, variables: variables };
}
export const FindScenesDocument = gql `
    query FindScenes($filter: FindFilterType, $scene_filter: SceneFilterType, $scene_ids: [Int!]) {
  findScenes(filter: $filter, scene_filter: $scene_filter, scene_ids: $scene_ids) {
    count
    filesize
    duration
    scenes {
      ...SlimSceneData
    }
  }
}
    ${SlimSceneDataFragmentDoc}`;
/**
 * __useFindScenesQuery__
 *
 * To run a query within a React component, call `useFindScenesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindScenesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindScenesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      scene_filter: // value for 'scene_filter'
 *      scene_ids: // value for 'scene_ids'
 *   },
 * });
 */
export function useFindScenesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindScenesDocument, options);
}
export function useFindScenesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindScenesDocument, options);
}
export function useFindScenesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindScenesDocument, options);
}
export function refetchFindScenesQuery(variables) {
    return { query: FindScenesDocument, variables: variables };
}
export const FindScenesByPathRegexDocument = gql `
    query FindScenesByPathRegex($filter: FindFilterType) {
  findScenesByPathRegex(filter: $filter) {
    count
    filesize
    duration
    scenes {
      ...SlimSceneData
    }
  }
}
    ${SlimSceneDataFragmentDoc}`;
/**
 * __useFindScenesByPathRegexQuery__
 *
 * To run a query within a React component, call `useFindScenesByPathRegexQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindScenesByPathRegexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindScenesByPathRegexQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useFindScenesByPathRegexQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindScenesByPathRegexDocument, options);
}
export function useFindScenesByPathRegexLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindScenesByPathRegexDocument, options);
}
export function useFindScenesByPathRegexSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindScenesByPathRegexDocument, options);
}
export function refetchFindScenesByPathRegexQuery(variables) {
    return { query: FindScenesByPathRegexDocument, variables: variables };
}
export const FindDuplicateScenesDocument = gql `
    query FindDuplicateScenes($distance: Int, $duration_diff: Float) {
  findDuplicateScenes(distance: $distance, duration_diff: $duration_diff) {
    ...SlimSceneData
  }
}
    ${SlimSceneDataFragmentDoc}`;
/**
 * __useFindDuplicateScenesQuery__
 *
 * To run a query within a React component, call `useFindDuplicateScenesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindDuplicateScenesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindDuplicateScenesQuery({
 *   variables: {
 *      distance: // value for 'distance'
 *      duration_diff: // value for 'duration_diff'
 *   },
 * });
 */
export function useFindDuplicateScenesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindDuplicateScenesDocument, options);
}
export function useFindDuplicateScenesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindDuplicateScenesDocument, options);
}
export function useFindDuplicateScenesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindDuplicateScenesDocument, options);
}
export function refetchFindDuplicateScenesQuery(variables) {
    return { query: FindDuplicateScenesDocument, variables: variables };
}
export const FindSceneDocument = gql `
    query FindScene($id: ID!, $checksum: String) {
  findScene(id: $id, checksum: $checksum) {
    ...SceneData
  }
}
    ${SceneDataFragmentDoc}`;
/**
 * __useFindSceneQuery__
 *
 * To run a query within a React component, call `useFindSceneQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSceneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSceneQuery({
 *   variables: {
 *      id: // value for 'id'
 *      checksum: // value for 'checksum'
 *   },
 * });
 */
export function useFindSceneQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindSceneDocument, options);
}
export function useFindSceneLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindSceneDocument, options);
}
export function useFindSceneSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindSceneDocument, options);
}
export function refetchFindSceneQuery(variables) {
    return { query: FindSceneDocument, variables: variables };
}
export const FindFullScenesDocument = gql `
    query FindFullScenes($ids: [Int!]) {
  findScenes(scene_ids: $ids) {
    scenes {
      ...SceneData
    }
  }
}
    ${SceneDataFragmentDoc}`;
/**
 * __useFindFullScenesQuery__
 *
 * To run a query within a React component, call `useFindFullScenesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindFullScenesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindFullScenesQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useFindFullScenesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindFullScenesDocument, options);
}
export function useFindFullScenesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindFullScenesDocument, options);
}
export function useFindFullScenesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindFullScenesDocument, options);
}
export function refetchFindFullScenesQuery(variables) {
    return { query: FindFullScenesDocument, variables: variables };
}
export const FindSceneMarkerTagsDocument = gql `
    query FindSceneMarkerTags($id: ID!) {
  sceneMarkerTags(scene_id: $id) {
    tag {
      id
      name
    }
    scene_markers {
      ...SceneMarkerData
    }
  }
}
    ${SceneMarkerDataFragmentDoc}`;
/**
 * __useFindSceneMarkerTagsQuery__
 *
 * To run a query within a React component, call `useFindSceneMarkerTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSceneMarkerTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSceneMarkerTagsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindSceneMarkerTagsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindSceneMarkerTagsDocument, options);
}
export function useFindSceneMarkerTagsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindSceneMarkerTagsDocument, options);
}
export function useFindSceneMarkerTagsSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindSceneMarkerTagsDocument, options);
}
export function refetchFindSceneMarkerTagsQuery(variables) {
    return { query: FindSceneMarkerTagsDocument, variables: variables };
}
export const ParseSceneFilenamesDocument = gql `
    query ParseSceneFilenames($filter: FindFilterType!, $config: SceneParserInput!) {
  parseSceneFilenames(filter: $filter, config: $config) {
    count
    results {
      scene {
        ...SlimSceneData
      }
      title
      code
      details
      director
      url
      date
      rating
      studio_id
      gallery_ids
      movies {
        movie_id
      }
      performer_ids
      tag_ids
    }
  }
}
    ${SlimSceneDataFragmentDoc}`;
/**
 * __useParseSceneFilenamesQuery__
 *
 * To run a query within a React component, call `useParseSceneFilenamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useParseSceneFilenamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParseSceneFilenamesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      config: // value for 'config'
 *   },
 * });
 */
export function useParseSceneFilenamesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ParseSceneFilenamesDocument, options);
}
export function useParseSceneFilenamesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ParseSceneFilenamesDocument, options);
}
export function useParseSceneFilenamesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(ParseSceneFilenamesDocument, options);
}
export function refetchParseSceneFilenamesQuery(variables) {
    return { query: ParseSceneFilenamesDocument, variables: variables };
}
export const SceneStreamsDocument = gql `
    query SceneStreams($id: ID!) {
  findScene(id: $id) {
    sceneStreams {
      url
      mime_type
      label
    }
  }
}
    `;
/**
 * __useSceneStreamsQuery__
 *
 * To run a query within a React component, call `useSceneStreamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSceneStreamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSceneStreamsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSceneStreamsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(SceneStreamsDocument, options);
}
export function useSceneStreamsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(SceneStreamsDocument, options);
}
export function useSceneStreamsSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(SceneStreamsDocument, options);
}
export function refetchSceneStreamsQuery(variables) {
    return { query: SceneStreamsDocument, variables: variables };
}
export const FindScenesForSelectDocument = gql `
    query FindScenesForSelect($filter: FindFilterType, $scene_filter: SceneFilterType, $ids: [ID!]) {
  findScenes(filter: $filter, scene_filter: $scene_filter, ids: $ids) {
    count
    scenes {
      ...SelectSceneData
    }
  }
}
    ${SelectSceneDataFragmentDoc}`;
/**
 * __useFindScenesForSelectQuery__
 *
 * To run a query within a React component, call `useFindScenesForSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindScenesForSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindScenesForSelectQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      scene_filter: // value for 'scene_filter'
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useFindScenesForSelectQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindScenesForSelectDocument, options);
}
export function useFindScenesForSelectLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindScenesForSelectDocument, options);
}
export function useFindScenesForSelectSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindScenesForSelectDocument, options);
}
export function refetchFindScenesForSelectQuery(variables) {
    return { query: FindScenesForSelectDocument, variables: variables };
}
export const ListPerformerScrapersDocument = gql `
    query ListPerformerScrapers {
  listScrapers(types: [PERFORMER]) {
    id
    name
    performer {
      urls
      supported_scrapes
    }
  }
}
    `;
/**
 * __useListPerformerScrapersQuery__
 *
 * To run a query within a React component, call `useListPerformerScrapersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPerformerScrapersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPerformerScrapersQuery({
 *   variables: {
 *   },
 * });
 */
export function useListPerformerScrapersQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ListPerformerScrapersDocument, options);
}
export function useListPerformerScrapersLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ListPerformerScrapersDocument, options);
}
export function useListPerformerScrapersSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(ListPerformerScrapersDocument, options);
}
export function refetchListPerformerScrapersQuery(variables) {
    return { query: ListPerformerScrapersDocument, variables: variables };
}
export const ListSceneScrapersDocument = gql `
    query ListSceneScrapers {
  listScrapers(types: [SCENE]) {
    id
    name
    scene {
      urls
      supported_scrapes
    }
  }
}
    `;
/**
 * __useListSceneScrapersQuery__
 *
 * To run a query within a React component, call `useListSceneScrapersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListSceneScrapersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListSceneScrapersQuery({
 *   variables: {
 *   },
 * });
 */
export function useListSceneScrapersQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ListSceneScrapersDocument, options);
}
export function useListSceneScrapersLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ListSceneScrapersDocument, options);
}
export function useListSceneScrapersSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(ListSceneScrapersDocument, options);
}
export function refetchListSceneScrapersQuery(variables) {
    return { query: ListSceneScrapersDocument, variables: variables };
}
export const ListGalleryScrapersDocument = gql `
    query ListGalleryScrapers {
  listScrapers(types: [GALLERY]) {
    id
    name
    gallery {
      urls
      supported_scrapes
    }
  }
}
    `;
/**
 * __useListGalleryScrapersQuery__
 *
 * To run a query within a React component, call `useListGalleryScrapersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListGalleryScrapersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListGalleryScrapersQuery({
 *   variables: {
 *   },
 * });
 */
export function useListGalleryScrapersQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ListGalleryScrapersDocument, options);
}
export function useListGalleryScrapersLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ListGalleryScrapersDocument, options);
}
export function useListGalleryScrapersSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(ListGalleryScrapersDocument, options);
}
export function refetchListGalleryScrapersQuery(variables) {
    return { query: ListGalleryScrapersDocument, variables: variables };
}
export const ListImageScrapersDocument = gql `
    query ListImageScrapers {
  listScrapers(types: [IMAGE]) {
    id
    name
    image {
      urls
      supported_scrapes
    }
  }
}
    `;
/**
 * __useListImageScrapersQuery__
 *
 * To run a query within a React component, call `useListImageScrapersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListImageScrapersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListImageScrapersQuery({
 *   variables: {
 *   },
 * });
 */
export function useListImageScrapersQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ListImageScrapersDocument, options);
}
export function useListImageScrapersLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ListImageScrapersDocument, options);
}
export function useListImageScrapersSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(ListImageScrapersDocument, options);
}
export function refetchListImageScrapersQuery(variables) {
    return { query: ListImageScrapersDocument, variables: variables };
}
export const ListGroupScrapersDocument = gql `
    query ListGroupScrapers {
  listScrapers(types: [GROUP]) {
    id
    name
    group {
      urls
      supported_scrapes
    }
  }
}
    `;
/**
 * __useListGroupScrapersQuery__
 *
 * To run a query within a React component, call `useListGroupScrapersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListGroupScrapersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListGroupScrapersQuery({
 *   variables: {
 *   },
 * });
 */
export function useListGroupScrapersQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ListGroupScrapersDocument, options);
}
export function useListGroupScrapersLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ListGroupScrapersDocument, options);
}
export function useListGroupScrapersSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(ListGroupScrapersDocument, options);
}
export function refetchListGroupScrapersQuery(variables) {
    return { query: ListGroupScrapersDocument, variables: variables };
}
export const ScrapeSingleStudioDocument = gql `
    query ScrapeSingleStudio($source: ScraperSourceInput!, $input: ScrapeSingleStudioInput!) {
  scrapeSingleStudio(source: $source, input: $input) {
    ...ScrapedStudioData
  }
}
    ${ScrapedStudioDataFragmentDoc}`;
/**
 * __useScrapeSingleStudioQuery__
 *
 * To run a query within a React component, call `useScrapeSingleStudioQuery` and pass it any options that fit your needs.
 * When your component renders, `useScrapeSingleStudioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScrapeSingleStudioQuery({
 *   variables: {
 *      source: // value for 'source'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useScrapeSingleStudioQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ScrapeSingleStudioDocument, options);
}
export function useScrapeSingleStudioLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ScrapeSingleStudioDocument, options);
}
export function useScrapeSingleStudioSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(ScrapeSingleStudioDocument, options);
}
export function refetchScrapeSingleStudioQuery(variables) {
    return { query: ScrapeSingleStudioDocument, variables: variables };
}
export const ScrapeSingleTagDocument = gql `
    query ScrapeSingleTag($source: ScraperSourceInput!, $input: ScrapeSingleTagInput!) {
  scrapeSingleTag(source: $source, input: $input) {
    ...ScrapedSceneTagData
  }
}
    ${ScrapedSceneTagDataFragmentDoc}`;
/**
 * __useScrapeSingleTagQuery__
 *
 * To run a query within a React component, call `useScrapeSingleTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useScrapeSingleTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScrapeSingleTagQuery({
 *   variables: {
 *      source: // value for 'source'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useScrapeSingleTagQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ScrapeSingleTagDocument, options);
}
export function useScrapeSingleTagLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ScrapeSingleTagDocument, options);
}
export function useScrapeSingleTagSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(ScrapeSingleTagDocument, options);
}
export function refetchScrapeSingleTagQuery(variables) {
    return { query: ScrapeSingleTagDocument, variables: variables };
}
export const ScrapeSinglePerformerDocument = gql `
    query ScrapeSinglePerformer($source: ScraperSourceInput!, $input: ScrapeSinglePerformerInput!) {
  scrapeSinglePerformer(source: $source, input: $input) {
    ...ScrapedPerformerData
  }
}
    ${ScrapedPerformerDataFragmentDoc}`;
/**
 * __useScrapeSinglePerformerQuery__
 *
 * To run a query within a React component, call `useScrapeSinglePerformerQuery` and pass it any options that fit your needs.
 * When your component renders, `useScrapeSinglePerformerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScrapeSinglePerformerQuery({
 *   variables: {
 *      source: // value for 'source'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useScrapeSinglePerformerQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ScrapeSinglePerformerDocument, options);
}
export function useScrapeSinglePerformerLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ScrapeSinglePerformerDocument, options);
}
export function useScrapeSinglePerformerSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(ScrapeSinglePerformerDocument, options);
}
export function refetchScrapeSinglePerformerQuery(variables) {
    return { query: ScrapeSinglePerformerDocument, variables: variables };
}
export const ScrapeMultiPerformersDocument = gql `
    query ScrapeMultiPerformers($source: ScraperSourceInput!, $input: ScrapeMultiPerformersInput!) {
  scrapeMultiPerformers(source: $source, input: $input) {
    ...ScrapedPerformerData
  }
}
    ${ScrapedPerformerDataFragmentDoc}`;
/**
 * __useScrapeMultiPerformersQuery__
 *
 * To run a query within a React component, call `useScrapeMultiPerformersQuery` and pass it any options that fit your needs.
 * When your component renders, `useScrapeMultiPerformersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScrapeMultiPerformersQuery({
 *   variables: {
 *      source: // value for 'source'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useScrapeMultiPerformersQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ScrapeMultiPerformersDocument, options);
}
export function useScrapeMultiPerformersLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ScrapeMultiPerformersDocument, options);
}
export function useScrapeMultiPerformersSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(ScrapeMultiPerformersDocument, options);
}
export function refetchScrapeMultiPerformersQuery(variables) {
    return { query: ScrapeMultiPerformersDocument, variables: variables };
}
export const ScrapePerformerUrlDocument = gql `
    query ScrapePerformerURL($url: String!) {
  scrapePerformerURL(url: $url) {
    ...ScrapedPerformerData
  }
}
    ${ScrapedPerformerDataFragmentDoc}`;
/**
 * __useScrapePerformerUrlQuery__
 *
 * To run a query within a React component, call `useScrapePerformerUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useScrapePerformerUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScrapePerformerUrlQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useScrapePerformerUrlQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ScrapePerformerUrlDocument, options);
}
export function useScrapePerformerUrlLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ScrapePerformerUrlDocument, options);
}
export function useScrapePerformerUrlSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(ScrapePerformerUrlDocument, options);
}
export function refetchScrapePerformerUrlQuery(variables) {
    return { query: ScrapePerformerUrlDocument, variables: variables };
}
export const ScrapeSingleSceneDocument = gql `
    query ScrapeSingleScene($source: ScraperSourceInput!, $input: ScrapeSingleSceneInput!) {
  scrapeSingleScene(source: $source, input: $input) {
    ...ScrapedSceneData
  }
}
    ${ScrapedSceneDataFragmentDoc}`;
/**
 * __useScrapeSingleSceneQuery__
 *
 * To run a query within a React component, call `useScrapeSingleSceneQuery` and pass it any options that fit your needs.
 * When your component renders, `useScrapeSingleSceneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScrapeSingleSceneQuery({
 *   variables: {
 *      source: // value for 'source'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useScrapeSingleSceneQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ScrapeSingleSceneDocument, options);
}
export function useScrapeSingleSceneLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ScrapeSingleSceneDocument, options);
}
export function useScrapeSingleSceneSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(ScrapeSingleSceneDocument, options);
}
export function refetchScrapeSingleSceneQuery(variables) {
    return { query: ScrapeSingleSceneDocument, variables: variables };
}
export const ScrapeMultiScenesDocument = gql `
    query ScrapeMultiScenes($source: ScraperSourceInput!, $input: ScrapeMultiScenesInput!) {
  scrapeMultiScenes(source: $source, input: $input) {
    ...ScrapedSceneData
  }
}
    ${ScrapedSceneDataFragmentDoc}`;
/**
 * __useScrapeMultiScenesQuery__
 *
 * To run a query within a React component, call `useScrapeMultiScenesQuery` and pass it any options that fit your needs.
 * When your component renders, `useScrapeMultiScenesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScrapeMultiScenesQuery({
 *   variables: {
 *      source: // value for 'source'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useScrapeMultiScenesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ScrapeMultiScenesDocument, options);
}
export function useScrapeMultiScenesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ScrapeMultiScenesDocument, options);
}
export function useScrapeMultiScenesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(ScrapeMultiScenesDocument, options);
}
export function refetchScrapeMultiScenesQuery(variables) {
    return { query: ScrapeMultiScenesDocument, variables: variables };
}
export const ScrapeSceneUrlDocument = gql `
    query ScrapeSceneURL($url: String!) {
  scrapeSceneURL(url: $url) {
    ...ScrapedSceneData
  }
}
    ${ScrapedSceneDataFragmentDoc}`;
/**
 * __useScrapeSceneUrlQuery__
 *
 * To run a query within a React component, call `useScrapeSceneUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useScrapeSceneUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScrapeSceneUrlQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useScrapeSceneUrlQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ScrapeSceneUrlDocument, options);
}
export function useScrapeSceneUrlLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ScrapeSceneUrlDocument, options);
}
export function useScrapeSceneUrlSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(ScrapeSceneUrlDocument, options);
}
export function refetchScrapeSceneUrlQuery(variables) {
    return { query: ScrapeSceneUrlDocument, variables: variables };
}
export const ScrapeSingleGalleryDocument = gql `
    query ScrapeSingleGallery($source: ScraperSourceInput!, $input: ScrapeSingleGalleryInput!) {
  scrapeSingleGallery(source: $source, input: $input) {
    ...ScrapedGalleryData
  }
}
    ${ScrapedGalleryDataFragmentDoc}`;
/**
 * __useScrapeSingleGalleryQuery__
 *
 * To run a query within a React component, call `useScrapeSingleGalleryQuery` and pass it any options that fit your needs.
 * When your component renders, `useScrapeSingleGalleryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScrapeSingleGalleryQuery({
 *   variables: {
 *      source: // value for 'source'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useScrapeSingleGalleryQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ScrapeSingleGalleryDocument, options);
}
export function useScrapeSingleGalleryLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ScrapeSingleGalleryDocument, options);
}
export function useScrapeSingleGallerySuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(ScrapeSingleGalleryDocument, options);
}
export function refetchScrapeSingleGalleryQuery(variables) {
    return { query: ScrapeSingleGalleryDocument, variables: variables };
}
export const ScrapeSingleImageDocument = gql `
    query ScrapeSingleImage($source: ScraperSourceInput!, $input: ScrapeSingleImageInput!) {
  scrapeSingleImage(source: $source, input: $input) {
    ...ScrapedImageData
  }
}
    ${ScrapedImageDataFragmentDoc}`;
/**
 * __useScrapeSingleImageQuery__
 *
 * To run a query within a React component, call `useScrapeSingleImageQuery` and pass it any options that fit your needs.
 * When your component renders, `useScrapeSingleImageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScrapeSingleImageQuery({
 *   variables: {
 *      source: // value for 'source'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useScrapeSingleImageQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ScrapeSingleImageDocument, options);
}
export function useScrapeSingleImageLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ScrapeSingleImageDocument, options);
}
export function useScrapeSingleImageSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(ScrapeSingleImageDocument, options);
}
export function refetchScrapeSingleImageQuery(variables) {
    return { query: ScrapeSingleImageDocument, variables: variables };
}
export const ScrapeGalleryUrlDocument = gql `
    query ScrapeGalleryURL($url: String!) {
  scrapeGalleryURL(url: $url) {
    ...ScrapedGalleryData
  }
}
    ${ScrapedGalleryDataFragmentDoc}`;
/**
 * __useScrapeGalleryUrlQuery__
 *
 * To run a query within a React component, call `useScrapeGalleryUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useScrapeGalleryUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScrapeGalleryUrlQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useScrapeGalleryUrlQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ScrapeGalleryUrlDocument, options);
}
export function useScrapeGalleryUrlLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ScrapeGalleryUrlDocument, options);
}
export function useScrapeGalleryUrlSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(ScrapeGalleryUrlDocument, options);
}
export function refetchScrapeGalleryUrlQuery(variables) {
    return { query: ScrapeGalleryUrlDocument, variables: variables };
}
export const ScrapeImageUrlDocument = gql `
    query ScrapeImageURL($url: String!) {
  scrapeImageURL(url: $url) {
    ...ScrapedImageData
  }
}
    ${ScrapedImageDataFragmentDoc}`;
/**
 * __useScrapeImageUrlQuery__
 *
 * To run a query within a React component, call `useScrapeImageUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useScrapeImageUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScrapeImageUrlQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useScrapeImageUrlQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ScrapeImageUrlDocument, options);
}
export function useScrapeImageUrlLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ScrapeImageUrlDocument, options);
}
export function useScrapeImageUrlSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(ScrapeImageUrlDocument, options);
}
export function refetchScrapeImageUrlQuery(variables) {
    return { query: ScrapeImageUrlDocument, variables: variables };
}
export const ScrapeGroupUrlDocument = gql `
    query ScrapeGroupURL($url: String!) {
  scrapeGroupURL(url: $url) {
    ...ScrapedGroupData
  }
}
    ${ScrapedGroupDataFragmentDoc}`;
/**
 * __useScrapeGroupUrlQuery__
 *
 * To run a query within a React component, call `useScrapeGroupUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useScrapeGroupUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScrapeGroupUrlQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useScrapeGroupUrlQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ScrapeGroupUrlDocument, options);
}
export function useScrapeGroupUrlLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ScrapeGroupUrlDocument, options);
}
export function useScrapeGroupUrlSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(ScrapeGroupUrlDocument, options);
}
export function refetchScrapeGroupUrlQuery(variables) {
    return { query: ScrapeGroupUrlDocument, variables: variables };
}
export const InstalledScraperPackagesDocument = gql `
    query InstalledScraperPackages {
  installedPackages(type: Scraper) {
    ...PackageData
  }
}
    ${PackageDataFragmentDoc}`;
/**
 * __useInstalledScraperPackagesQuery__
 *
 * To run a query within a React component, call `useInstalledScraperPackagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstalledScraperPackagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstalledScraperPackagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useInstalledScraperPackagesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(InstalledScraperPackagesDocument, options);
}
export function useInstalledScraperPackagesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(InstalledScraperPackagesDocument, options);
}
export function useInstalledScraperPackagesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(InstalledScraperPackagesDocument, options);
}
export function refetchInstalledScraperPackagesQuery(variables) {
    return { query: InstalledScraperPackagesDocument, variables: variables };
}
export const InstalledScraperPackagesStatusDocument = gql `
    query InstalledScraperPackagesStatus {
  installedPackages(type: Scraper) {
    ...PackageData
    source_package {
      ...PackageData
    }
  }
}
    ${PackageDataFragmentDoc}`;
/**
 * __useInstalledScraperPackagesStatusQuery__
 *
 * To run a query within a React component, call `useInstalledScraperPackagesStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstalledScraperPackagesStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstalledScraperPackagesStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useInstalledScraperPackagesStatusQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(InstalledScraperPackagesStatusDocument, options);
}
export function useInstalledScraperPackagesStatusLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(InstalledScraperPackagesStatusDocument, options);
}
export function useInstalledScraperPackagesStatusSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(InstalledScraperPackagesStatusDocument, options);
}
export function refetchInstalledScraperPackagesStatusQuery(variables) {
    return { query: InstalledScraperPackagesStatusDocument, variables: variables };
}
export const AvailableScraperPackagesDocument = gql `
    query AvailableScraperPackages($source: String!) {
  availablePackages(source: $source, type: Scraper) {
    ...PackageData
    requires {
      package_id
    }
  }
}
    ${PackageDataFragmentDoc}`;
/**
 * __useAvailableScraperPackagesQuery__
 *
 * To run a query within a React component, call `useAvailableScraperPackagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvailableScraperPackagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAvailableScraperPackagesQuery({
 *   variables: {
 *      source: // value for 'source'
 *   },
 * });
 */
export function useAvailableScraperPackagesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(AvailableScraperPackagesDocument, options);
}
export function useAvailableScraperPackagesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(AvailableScraperPackagesDocument, options);
}
export function useAvailableScraperPackagesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(AvailableScraperPackagesDocument, options);
}
export function refetchAvailableScraperPackagesQuery(variables) {
    return { query: AvailableScraperPackagesDocument, variables: variables };
}
export const ConfigurationDocument = gql `
    query Configuration {
  configuration {
    ...ConfigData
  }
}
    ${ConfigDataFragmentDoc}`;
/**
 * __useConfigurationQuery__
 *
 * To run a query within a React component, call `useConfigurationQuery` and pass it any options that fit your needs.
 * When your component renders, `useConfigurationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConfigurationQuery({
 *   variables: {
 *   },
 * });
 */
export function useConfigurationQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ConfigurationDocument, options);
}
export function useConfigurationLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ConfigurationDocument, options);
}
export function useConfigurationSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(ConfigurationDocument, options);
}
export function refetchConfigurationQuery(variables) {
    return { query: ConfigurationDocument, variables: variables };
}
export const DirectoryDocument = gql `
    query Directory($path: String) {
  directory(path: $path) {
    path
    parent
    directories
  }
}
    `;
/**
 * __useDirectoryQuery__
 *
 * To run a query within a React component, call `useDirectoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useDirectoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDirectoryQuery({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useDirectoryQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(DirectoryDocument, options);
}
export function useDirectoryLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(DirectoryDocument, options);
}
export function useDirectorySuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(DirectoryDocument, options);
}
export function refetchDirectoryQuery(variables) {
    return { query: DirectoryDocument, variables: variables };
}
export const ValidateStashBoxDocument = gql `
    query ValidateStashBox($input: StashBoxInput!) {
  validateStashBoxCredentials(input: $input) {
    valid
    status
  }
}
    `;
/**
 * __useValidateStashBoxQuery__
 *
 * To run a query within a React component, call `useValidateStashBoxQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateStashBoxQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateStashBoxQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useValidateStashBoxQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(ValidateStashBoxDocument, options);
}
export function useValidateStashBoxLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(ValidateStashBoxDocument, options);
}
export function useValidateStashBoxSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(ValidateStashBoxDocument, options);
}
export function refetchValidateStashBoxQuery(variables) {
    return { query: ValidateStashBoxDocument, variables: variables };
}
export const SystemStatusDocument = gql `
    query SystemStatus {
  systemStatus {
    databaseSchema
    databasePath
    appSchema
    status
    configPath
    os
    workingDir
    homeDir
    ffmpegPath
    ffprobePath
  }
}
    `;
/**
 * __useSystemStatusQuery__
 *
 * To run a query within a React component, call `useSystemStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useSystemStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSystemStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useSystemStatusQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(SystemStatusDocument, options);
}
export function useSystemStatusLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(SystemStatusDocument, options);
}
export function useSystemStatusSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(SystemStatusDocument, options);
}
export function refetchSystemStatusQuery(variables) {
    return { query: SystemStatusDocument, variables: variables };
}
export const FindStudiosDocument = gql `
    query FindStudios($filter: FindFilterType, $studio_filter: StudioFilterType) {
  findStudios(filter: $filter, studio_filter: $studio_filter) {
    count
    studios {
      ...StudioData
    }
  }
}
    ${StudioDataFragmentDoc}`;
/**
 * __useFindStudiosQuery__
 *
 * To run a query within a React component, call `useFindStudiosQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindStudiosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindStudiosQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      studio_filter: // value for 'studio_filter'
 *   },
 * });
 */
export function useFindStudiosQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindStudiosDocument, options);
}
export function useFindStudiosLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindStudiosDocument, options);
}
export function useFindStudiosSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindStudiosDocument, options);
}
export function refetchFindStudiosQuery(variables) {
    return { query: FindStudiosDocument, variables: variables };
}
export const FindStudioDocument = gql `
    query FindStudio($id: ID!) {
  findStudio(id: $id) {
    ...StudioData
  }
}
    ${StudioDataFragmentDoc}`;
/**
 * __useFindStudioQuery__
 *
 * To run a query within a React component, call `useFindStudioQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindStudioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindStudioQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindStudioQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindStudioDocument, options);
}
export function useFindStudioLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindStudioDocument, options);
}
export function useFindStudioSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindStudioDocument, options);
}
export function refetchFindStudioQuery(variables) {
    return { query: FindStudioDocument, variables: variables };
}
export const FindStudiosForSelectDocument = gql `
    query FindStudiosForSelect($filter: FindFilterType, $studio_filter: StudioFilterType, $ids: [ID!]) {
  findStudios(filter: $filter, studio_filter: $studio_filter, ids: $ids) {
    count
    studios {
      ...SelectStudioData
    }
  }
}
    ${SelectStudioDataFragmentDoc}`;
/**
 * __useFindStudiosForSelectQuery__
 *
 * To run a query within a React component, call `useFindStudiosForSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindStudiosForSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindStudiosForSelectQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      studio_filter: // value for 'studio_filter'
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useFindStudiosForSelectQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindStudiosForSelectDocument, options);
}
export function useFindStudiosForSelectLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindStudiosForSelectDocument, options);
}
export function useFindStudiosForSelectSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindStudiosForSelectDocument, options);
}
export function refetchFindStudiosForSelectQuery(variables) {
    return { query: FindStudiosForSelectDocument, variables: variables };
}
export const FindTagsDocument = gql `
    query FindTags($filter: FindFilterType, $tag_filter: TagFilterType, $ids: [ID!]) {
  findTags(filter: $filter, tag_filter: $tag_filter, ids: $ids) {
    count
    tags {
      ...TagData
    }
  }
}
    ${TagDataFragmentDoc}`;
/**
 * __useFindTagsQuery__
 *
 * To run a query within a React component, call `useFindTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTagsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      tag_filter: // value for 'tag_filter'
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useFindTagsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindTagsDocument, options);
}
export function useFindTagsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindTagsDocument, options);
}
export function useFindTagsSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindTagsDocument, options);
}
export function refetchFindTagsQuery(variables) {
    return { query: FindTagsDocument, variables: variables };
}
export const FindTagDocument = gql `
    query FindTag($id: ID!) {
  findTag(id: $id) {
    ...TagData
  }
}
    ${TagDataFragmentDoc}`;
/**
 * __useFindTagQuery__
 *
 * To run a query within a React component, call `useFindTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTagQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindTagQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindTagDocument, options);
}
export function useFindTagLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindTagDocument, options);
}
export function useFindTagSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindTagDocument, options);
}
export function refetchFindTagQuery(variables) {
    return { query: FindTagDocument, variables: variables };
}
export const FindTagsForSelectDocument = gql `
    query FindTagsForSelect($filter: FindFilterType, $tag_filter: TagFilterType, $ids: [ID!]) {
  findTags(filter: $filter, tag_filter: $tag_filter, ids: $ids) {
    count
    tags {
      ...SelectTagData
    }
  }
}
    ${SelectTagDataFragmentDoc}`;
/**
 * __useFindTagsForSelectQuery__
 *
 * To run a query within a React component, call `useFindTagsForSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTagsForSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTagsForSelectQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      tag_filter: // value for 'tag_filter'
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useFindTagsForSelectQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindTagsForSelectDocument, options);
}
export function useFindTagsForSelectLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindTagsForSelectDocument, options);
}
export function useFindTagsForSelectSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindTagsForSelectDocument, options);
}
export function refetchFindTagsForSelectQuery(variables) {
    return { query: FindTagsForSelectDocument, variables: variables };
}
export const FindTagsForListDocument = gql `
    query FindTagsForList($filter: FindFilterType, $tag_filter: TagFilterType) {
  findTags(filter: $filter, tag_filter: $tag_filter) {
    count
    tags {
      ...TagListData
    }
  }
}
    ${TagListDataFragmentDoc}`;
/**
 * __useFindTagsForListQuery__
 *
 * To run a query within a React component, call `useFindTagsForListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTagsForListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTagsForListQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      tag_filter: // value for 'tag_filter'
 *   },
 * });
 */
export function useFindTagsForListQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(FindTagsForListDocument, options);
}
export function useFindTagsForListLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(FindTagsForListDocument, options);
}
export function useFindTagsForListSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(FindTagsForListDocument, options);
}
export function refetchFindTagsForListQuery(variables) {
    return { query: FindTagsForListDocument, variables: variables };
}
export const JobsSubscribeDocument = gql `
    subscription JobsSubscribe {
  jobsSubscribe {
    type
    job {
      id
      status
      subTasks
      description
      progress
      error
      startTime
    }
  }
}
    `;
/**
 * __useJobsSubscribeSubscription__
 *
 * To run a query within a React component, call `useJobsSubscribeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useJobsSubscribeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobsSubscribeSubscription({
 *   variables: {
 *   },
 * });
 */
export function useJobsSubscribeSubscription(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSubscription(JobsSubscribeDocument, options);
}
export const LoggingSubscribeDocument = gql `
    subscription LoggingSubscribe {
  loggingSubscribe {
    ...LogEntryData
  }
}
    ${LogEntryDataFragmentDoc}`;
/**
 * __useLoggingSubscribeSubscription__
 *
 * To run a query within a React component, call `useLoggingSubscribeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLoggingSubscribeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoggingSubscribeSubscription({
 *   variables: {
 *   },
 * });
 */
export function useLoggingSubscribeSubscription(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSubscription(LoggingSubscribeDocument, options);
}
export const ScanCompleteSubscribeDocument = gql `
    subscription ScanCompleteSubscribe {
  scanCompleteSubscribe
}
    `;
/**
 * __useScanCompleteSubscribeSubscription__
 *
 * To run a query within a React component, call `useScanCompleteSubscribeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useScanCompleteSubscribeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScanCompleteSubscribeSubscription({
 *   variables: {
 *   },
 * });
 */
export function useScanCompleteSubscribeSubscription(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSubscription(ScanCompleteSubscribeDocument, options);
}
//# sourceMappingURL=generated-graphql.js.map