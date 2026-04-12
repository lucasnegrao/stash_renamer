"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformerDataFragmentDoc = exports.GalleryChapterDataFragmentDoc = exports.FolderDataFragmentDoc = exports.GalleryFileDataFragmentDoc = exports.SlimImageDataFragmentDoc = exports.VisualFileDataFragmentDoc = exports.ListGroupDataFragmentDoc = exports.SlimGroupDataFragmentDoc = exports.SlimTagDataFragmentDoc = exports.SlimStudioDataFragmentDoc = exports.SelectGroupDataFragmentDoc = exports.SelectGalleryDataFragmentDoc = exports.SavedFilterDataFragmentDoc = exports.RecursiveFolderDataFragmentDoc = exports.SelectFolderDataFragmentDoc = exports.ImageFileDataFragmentDoc = exports.ConfigDataFragmentDoc = exports.ConfigDefaultSettingsDataFragmentDoc = exports.IdentifyMetadataOptionsDataFragmentDoc = exports.IdentifyFieldOptionsDataFragmentDoc = exports.ScraperSourceDataFragmentDoc = exports.ConfigScrapingDataFragmentDoc = exports.ConfigDlnaDataFragmentDoc = exports.ConfigInterfaceDataFragmentDoc = exports.ConfigGeneralDataFragmentDoc = exports.SystemStatusEnum = exports.StreamingResolutionEnum = exports.SortDirectionEnum = exports.ScrapeType = exports.ScrapeContentType = exports.ResolutionEnum = exports.PreviewPreset = exports.PluginSettingTypeEnum = exports.PackageType = exports.OrientationEnum = exports.LogLevel = exports.JobStatusUpdateType = exports.JobStatus = exports.ImportMissingRefEnum = exports.ImportDuplicateEnum = exports.ImageLightboxScrollMode = exports.ImageLightboxDisplayMode = exports.IdentifyFieldStrategy = exports.HashAlgorithm = exports.GenderEnum = exports.FilterMode = exports.CriterionModifier = exports.CircumcisedEnum = exports.BulkUpdateIdMode = exports.BlobsStorageType = void 0;
exports.ConfigureUiDocument = exports.useConfigureDefaultsMutation = exports.ConfigureDefaultsDocument = exports.useConfigureScrapingMutation = exports.ConfigureScrapingDocument = exports.useConfigureDlnaMutation = exports.ConfigureDlnaDocument = exports.useConfigureInterfaceMutation = exports.ConfigureInterfaceDocument = exports.useConfigureGeneralMutation = exports.ConfigureGeneralDocument = exports.useDownloadFfMpegMutation = exports.DownloadFfMpegDocument = exports.useMigrateMutation = exports.MigrateDocument = exports.useSetupMutation = exports.SetupDocument = exports.TagListDataFragmentDoc = exports.SelectTagDataFragmentDoc = exports.TagDataFragmentDoc = exports.SelectStudioDataFragmentDoc = exports.StudioDataFragmentDoc = exports.ScrapedStashBoxPerformerDataFragmentDoc = exports.ScrapedStashBoxSceneDataFragmentDoc = exports.ScrapedImageDataFragmentDoc = exports.ScrapedGalleryDataFragmentDoc = exports.ScrapedSceneDataFragmentDoc = exports.ScrapedSceneGroupDataFragmentDoc = exports.ScrapedScenePerformerDataFragmentDoc = exports.ScrapedSceneStudioDataFragmentDoc = exports.ScrapedGroupDataFragmentDoc = exports.ScrapedGroupStudioDataFragmentDoc = exports.ScrapedPerformerDataFragmentDoc = exports.ScrapedStudioDataFragmentDoc = exports.ScrapedSceneTagDataFragmentDoc = exports.SelectSceneDataFragmentDoc = exports.SceneDataFragmentDoc = exports.GroupDataFragmentDoc = exports.SlimGalleryDataFragmentDoc = exports.SceneMarkerDataFragmentDoc = exports.SceneMarkerSceneDataFragmentDoc = exports.SelectPerformerDataFragmentDoc = exports.SlimPerformerDataFragmentDoc = exports.PackageDataFragmentDoc = exports.LogEntryDataFragmentDoc = exports.JobDataFragmentDoc = exports.ImageDataFragmentDoc = exports.GalleryDataFragmentDoc = exports.SlimSceneDataFragmentDoc = exports.VideoFileDataFragmentDoc = void 0;
exports.GroupUpdateDocument = exports.useGroupCreateMutation = exports.GroupCreateDocument = exports.useResetGalleryCoverMutation = exports.ResetGalleryCoverDocument = exports.useSetGalleryCoverMutation = exports.SetGalleryCoverDocument = exports.useRemoveGalleryImagesMutation = exports.RemoveGalleryImagesDocument = exports.useAddGalleryImagesMutation = exports.AddGalleryImagesDocument = exports.useGalleryDestroyMutation = exports.GalleryDestroyDocument = exports.useGalleriesUpdateMutation = exports.GalleriesUpdateDocument = exports.useBulkGalleryUpdateMutation = exports.BulkGalleryUpdateDocument = exports.useGalleryUpdateMutation = exports.GalleryUpdateDocument = exports.useGalleryCreateMutation = exports.GalleryCreateDocument = exports.useGalleryChapterDestroyMutation = exports.GalleryChapterDestroyDocument = exports.useGalleryChapterUpdateMutation = exports.GalleryChapterUpdateDocument = exports.useGalleryChapterCreateMutation = exports.GalleryChapterCreateDocument = exports.useDestroySavedFilterMutation = exports.DestroySavedFilterDocument = exports.useSaveFilterMutation = exports.SaveFilterDocument = exports.useRevealFolderInFileManagerMutation = exports.RevealFolderInFileManagerDocument = exports.useRevealFileInFileManagerMutation = exports.RevealFileInFileManagerDocument = exports.useDeleteFilesMutation = exports.DeleteFilesDocument = exports.useRemoveTempDlnaipMutation = exports.RemoveTempDlnaipDocument = exports.useAddTempDlnaipMutation = exports.AddTempDlnaipDocument = exports.useDisableDlnaMutation = exports.DisableDlnaDocument = exports.useEnableDlnaMutation = exports.EnableDlnaDocument = exports.useGenerateApiKeyMutation = exports.GenerateApiKeyDocument = exports.useConfigureUiSettingMutation = exports.ConfigureUiSettingDocument = exports.useConfigureUiMutation = void 0;
exports.MetadataCleanDocument = exports.useMetadataIdentifyMutation = exports.MetadataIdentifyDocument = exports.useMetadataAutoTagMutation = exports.MetadataAutoTagDocument = exports.useMetadataGenerateMutation = exports.MetadataGenerateDocument = exports.useMetadataScanMutation = exports.MetadataScanDocument = exports.useImportObjectsMutation = exports.ImportObjectsDocument = exports.useExportObjectsMutation = exports.ExportObjectsDocument = exports.useMetadataExportMutation = exports.MetadataExportDocument = exports.useMetadataImportMutation = exports.MetadataImportDocument = exports.useStopAllJobsMutation = exports.StopAllJobsDocument = exports.useStopJobMutation = exports.StopJobDocument = exports.useImagesDestroyMutation = exports.ImagesDestroyDocument = exports.useImageDestroyMutation = exports.ImageDestroyDocument = exports.useImageResetOMutation = exports.ImageResetODocument = exports.useImageDecrementOMutation = exports.ImageDecrementODocument = exports.useImageIncrementOMutation = exports.ImageIncrementODocument = exports.useImagesUpdateMutation = exports.ImagesUpdateDocument = exports.useBulkImageUpdateMutation = exports.BulkImageUpdateDocument = exports.useImageUpdateMutation = exports.ImageUpdateDocument = exports.useReorderSubGroupsMutation = exports.ReorderSubGroupsDocument = exports.useRemoveGroupSubGroupsMutation = exports.RemoveGroupSubGroupsDocument = exports.useAddGroupSubGroupsMutation = exports.AddGroupSubGroupsDocument = exports.useGroupsDestroyMutation = exports.GroupsDestroyDocument = exports.useGroupDestroyMutation = exports.GroupDestroyDocument = exports.useBulkGroupUpdateMutation = exports.BulkGroupUpdateDocument = exports.useGroupUpdateMutation = void 0;
exports.SceneMarkersDestroyDocument = exports.useSceneMarkerDestroyMutation = exports.SceneMarkerDestroyDocument = exports.useBulkSceneMarkerUpdateMutation = exports.BulkSceneMarkerUpdateDocument = exports.useSceneMarkerUpdateMutation = exports.SceneMarkerUpdateDocument = exports.useSceneMarkerCreateMutation = exports.SceneMarkerCreateDocument = exports.useUninstallPluginPackagesMutation = exports.UninstallPluginPackagesDocument = exports.useUpdatePluginPackagesMutation = exports.UpdatePluginPackagesDocument = exports.useInstallPluginPackagesMutation = exports.InstallPluginPackagesDocument = exports.useSetPluginsEnabledMutation = exports.SetPluginsEnabledDocument = exports.useConfigurePluginMutation = exports.ConfigurePluginDocument = exports.useRunPluginTaskMutation = exports.RunPluginTaskDocument = exports.useReloadPluginsMutation = exports.ReloadPluginsDocument = exports.usePerformerMergeMutation = exports.PerformerMergeDocument = exports.usePerformersDestroyMutation = exports.PerformersDestroyDocument = exports.usePerformerDestroyMutation = exports.PerformerDestroyDocument = exports.useBulkPerformerUpdateMutation = exports.BulkPerformerUpdateDocument = exports.usePerformerUpdateMutation = exports.PerformerUpdateDocument = exports.usePerformerCreateMutation = exports.PerformerCreateDocument = exports.useMigrateBlobsMutation = exports.MigrateBlobsDocument = exports.useMigrateSceneScreenshotsMutation = exports.MigrateSceneScreenshotsDocument = exports.useOptimiseDatabaseMutation = exports.OptimiseDatabaseDocument = exports.useAnonymiseDatabaseMutation = exports.AnonymiseDatabaseDocument = exports.useBackupDatabaseMutation = exports.BackupDatabaseDocument = exports.useMigrateHashNamingMutation = exports.MigrateHashNamingDocument = exports.useMetadataCleanGeneratedMutation = exports.MetadataCleanGeneratedDocument = exports.useMetadataCleanMutation = void 0;
exports.StashBoxBatchTagTagDocument = exports.useStashBoxBatchStudioTagMutation = exports.StashBoxBatchStudioTagDocument = exports.useStashBoxBatchPerformerTagMutation = exports.StashBoxBatchPerformerTagDocument = exports.useSubmitStashBoxFingerprintsMutation = exports.SubmitStashBoxFingerprintsDocument = exports.useUninstallScraperPackagesMutation = exports.UninstallScraperPackagesDocument = exports.useUpdateScraperPackagesMutation = exports.UpdateScraperPackagesDocument = exports.useInstallScraperPackagesMutation = exports.InstallScraperPackagesDocument = exports.useReloadScrapersMutation = exports.ReloadScrapersDocument = exports.useSceneMergeMutation = exports.SceneMergeDocument = exports.useSceneAssignFileMutation = exports.SceneAssignFileDocument = exports.useSceneGenerateScreenshotMutation = exports.SceneGenerateScreenshotDocument = exports.useScenesDestroyMutation = exports.ScenesDestroyDocument = exports.useSceneDestroyMutation = exports.SceneDestroyDocument = exports.useSceneResetOMutation = exports.SceneResetODocument = exports.useSceneDeleteOMutation = exports.SceneDeleteODocument = exports.useSceneAddOMutation = exports.SceneAddODocument = exports.useSceneResetPlayCountMutation = exports.SceneResetPlayCountDocument = exports.useSceneDeletePlayMutation = exports.SceneDeletePlayDocument = exports.useSceneAddPlayMutation = exports.SceneAddPlayDocument = exports.useSceneResetActivityMutation = exports.SceneResetActivityDocument = exports.useSceneSaveActivityMutation = exports.SceneSaveActivityDocument = exports.useScenesUpdateMutation = exports.ScenesUpdateDocument = exports.useBulkSceneUpdateMutation = exports.BulkSceneUpdateDocument = exports.useSceneUpdateMutation = exports.SceneUpdateDocument = exports.useSceneCreateMutation = exports.SceneCreateDocument = exports.useSceneMarkersDestroyMutation = void 0;
exports.useFindFoldersForQueryLazyQuery = exports.useFindFoldersForQueryQuery = exports.FindFoldersForQueryDocument = exports.refetchFindRootFoldersForSelectQuery = exports.useFindRootFoldersForSelectSuspenseQuery = exports.useFindRootFoldersForSelectLazyQuery = exports.useFindRootFoldersForSelectQuery = exports.FindRootFoldersForSelectDocument = exports.refetchFindSavedFiltersQuery = exports.useFindSavedFiltersSuspenseQuery = exports.useFindSavedFiltersLazyQuery = exports.useFindSavedFiltersQuery = exports.FindSavedFiltersDocument = exports.refetchFindSavedFilterQuery = exports.useFindSavedFilterSuspenseQuery = exports.useFindSavedFilterLazyQuery = exports.useFindSavedFilterQuery = exports.FindSavedFilterDocument = exports.refetchDlnaStatusQuery = exports.useDlnaStatusSuspenseQuery = exports.useDlnaStatusLazyQuery = exports.useDlnaStatusQuery = exports.DlnaStatusDocument = exports.useTagsMergeMutation = exports.TagsMergeDocument = exports.useBulkTagUpdateMutation = exports.BulkTagUpdateDocument = exports.useTagUpdateMutation = exports.TagUpdateDocument = exports.useTagsDestroyMutation = exports.TagsDestroyDocument = exports.useTagDestroyMutation = exports.TagDestroyDocument = exports.useTagCreateMutation = exports.TagCreateDocument = exports.useStudiosDestroyMutation = exports.StudiosDestroyDocument = exports.useStudioDestroyMutation = exports.StudioDestroyDocument = exports.useBulkStudioUpdateMutation = exports.BulkStudioUpdateDocument = exports.useStudioUpdateMutation = exports.StudioUpdateDocument = exports.useStudioCreateMutation = exports.StudioCreateDocument = exports.useSubmitStashBoxPerformerDraftMutation = exports.SubmitStashBoxPerformerDraftDocument = exports.useSubmitStashBoxSceneDraftMutation = exports.SubmitStashBoxSceneDraftDocument = exports.useStashBoxBatchTagTagMutation = void 0;
exports.useFindJobLazyQuery = exports.useFindJobQuery = exports.FindJobDocument = exports.refetchJobQueueQuery = exports.useJobQueueSuspenseQuery = exports.useJobQueueLazyQuery = exports.useJobQueueQuery = exports.JobQueueDocument = exports.refetchFindImageQuery = exports.useFindImageSuspenseQuery = exports.useFindImageLazyQuery = exports.useFindImageQuery = exports.FindImageDocument = exports.refetchFindImagesMetadataQuery = exports.useFindImagesMetadataSuspenseQuery = exports.useFindImagesMetadataLazyQuery = exports.useFindImagesMetadataQuery = exports.FindImagesMetadataDocument = exports.refetchFindImagesQuery = exports.useFindImagesSuspenseQuery = exports.useFindImagesLazyQuery = exports.useFindImagesQuery = exports.FindImagesDocument = exports.refetchFindGalleryImageIdQuery = exports.useFindGalleryImageIdSuspenseQuery = exports.useFindGalleryImageIdLazyQuery = exports.useFindGalleryImageIdQuery = exports.FindGalleryImageIdDocument = exports.refetchFindGalleriesForSelectQuery = exports.useFindGalleriesForSelectSuspenseQuery = exports.useFindGalleriesForSelectLazyQuery = exports.useFindGalleriesForSelectQuery = exports.FindGalleriesForSelectDocument = exports.refetchFindGalleryQuery = exports.useFindGallerySuspenseQuery = exports.useFindGalleryLazyQuery = exports.useFindGalleryQuery = exports.FindGalleryDocument = exports.refetchFindGalleriesQuery = exports.useFindGalleriesSuspenseQuery = exports.useFindGalleriesLazyQuery = exports.useFindGalleriesQuery = exports.FindGalleriesDocument = exports.refetchFindFolderHierarchyForIDsQuery = exports.useFindFolderHierarchyForIDsSuspenseQuery = exports.useFindFolderHierarchyForIDsLazyQuery = exports.useFindFolderHierarchyForIDsQuery = exports.FindFolderHierarchyForIDsDocument = exports.refetchFindFoldersForQueryQuery = exports.useFindFoldersForQuerySuspenseQuery = void 0;
exports.useFindGroupsForSelectLazyQuery = exports.useFindGroupsForSelectQuery = exports.FindGroupsForSelectDocument = exports.refetchFindGroupQuery = exports.useFindGroupSuspenseQuery = exports.useFindGroupLazyQuery = exports.useFindGroupQuery = exports.FindGroupDocument = exports.refetchFindGroupsQuery = exports.useFindGroupsSuspenseQuery = exports.useFindGroupsLazyQuery = exports.useFindGroupsQuery = exports.FindGroupsDocument = exports.refetchLatestVersionQuery = exports.useLatestVersionSuspenseQuery = exports.useLatestVersionLazyQuery = exports.useLatestVersionQuery = exports.LatestVersionDocument = exports.refetchVersionQuery = exports.useVersionSuspenseQuery = exports.useVersionLazyQuery = exports.useVersionQuery = exports.VersionDocument = exports.refetchLogsQuery = exports.useLogsSuspenseQuery = exports.useLogsLazyQuery = exports.useLogsQuery = exports.LogsDocument = exports.refetchStatsQuery = exports.useStatsSuspenseQuery = exports.useStatsLazyQuery = exports.useStatsQuery = exports.StatsDocument = exports.refetchMarkerStringsQuery = exports.useMarkerStringsSuspenseQuery = exports.useMarkerStringsLazyQuery = exports.useMarkerStringsQuery = exports.MarkerStringsDocument = exports.refetchMarkerWallQuery = exports.useMarkerWallSuspenseQuery = exports.useMarkerWallLazyQuery = exports.useMarkerWallQuery = exports.MarkerWallDocument = exports.refetchSceneWallQuery = exports.useSceneWallSuspenseQuery = exports.useSceneWallLazyQuery = exports.useSceneWallQuery = exports.SceneWallDocument = exports.refetchFindJobQuery = exports.useFindJobSuspenseQuery = void 0;
exports.useFindScenesLazyQuery = exports.useFindScenesQuery = exports.FindScenesDocument = exports.refetchFindSceneMarkersQuery = exports.useFindSceneMarkersSuspenseQuery = exports.useFindSceneMarkersLazyQuery = exports.useFindSceneMarkersQuery = exports.FindSceneMarkersDocument = exports.refetchAvailablePluginPackagesQuery = exports.useAvailablePluginPackagesSuspenseQuery = exports.useAvailablePluginPackagesLazyQuery = exports.useAvailablePluginPackagesQuery = exports.AvailablePluginPackagesDocument = exports.refetchInstalledPluginPackagesStatusQuery = exports.useInstalledPluginPackagesStatusSuspenseQuery = exports.useInstalledPluginPackagesStatusLazyQuery = exports.useInstalledPluginPackagesStatusQuery = exports.InstalledPluginPackagesStatusDocument = exports.refetchInstalledPluginPackagesQuery = exports.useInstalledPluginPackagesSuspenseQuery = exports.useInstalledPluginPackagesLazyQuery = exports.useInstalledPluginPackagesQuery = exports.InstalledPluginPackagesDocument = exports.refetchPluginTasksQuery = exports.usePluginTasksSuspenseQuery = exports.usePluginTasksLazyQuery = exports.usePluginTasksQuery = exports.PluginTasksDocument = exports.refetchPluginsQuery = exports.usePluginsSuspenseQuery = exports.usePluginsLazyQuery = exports.usePluginsQuery = exports.PluginsDocument = exports.refetchFindPerformersForSelectQuery = exports.useFindPerformersForSelectSuspenseQuery = exports.useFindPerformersForSelectLazyQuery = exports.useFindPerformersForSelectQuery = exports.FindPerformersForSelectDocument = exports.refetchFindPerformerQuery = exports.useFindPerformerSuspenseQuery = exports.useFindPerformerLazyQuery = exports.useFindPerformerQuery = exports.FindPerformerDocument = exports.refetchFindPerformersQuery = exports.useFindPerformersSuspenseQuery = exports.useFindPerformersLazyQuery = exports.useFindPerformersQuery = exports.FindPerformersDocument = exports.refetchFindGroupsForSelectQuery = exports.useFindGroupsForSelectSuspenseQuery = void 0;
exports.useListSceneScrapersLazyQuery = exports.useListSceneScrapersQuery = exports.ListSceneScrapersDocument = exports.refetchListPerformerScrapersQuery = exports.useListPerformerScrapersSuspenseQuery = exports.useListPerformerScrapersLazyQuery = exports.useListPerformerScrapersQuery = exports.ListPerformerScrapersDocument = exports.refetchFindScenesForSelectQuery = exports.useFindScenesForSelectSuspenseQuery = exports.useFindScenesForSelectLazyQuery = exports.useFindScenesForSelectQuery = exports.FindScenesForSelectDocument = exports.refetchSceneStreamsQuery = exports.useSceneStreamsSuspenseQuery = exports.useSceneStreamsLazyQuery = exports.useSceneStreamsQuery = exports.SceneStreamsDocument = exports.refetchParseSceneFilenamesQuery = exports.useParseSceneFilenamesSuspenseQuery = exports.useParseSceneFilenamesLazyQuery = exports.useParseSceneFilenamesQuery = exports.ParseSceneFilenamesDocument = exports.refetchFindSceneMarkerTagsQuery = exports.useFindSceneMarkerTagsSuspenseQuery = exports.useFindSceneMarkerTagsLazyQuery = exports.useFindSceneMarkerTagsQuery = exports.FindSceneMarkerTagsDocument = exports.refetchFindFullScenesQuery = exports.useFindFullScenesSuspenseQuery = exports.useFindFullScenesLazyQuery = exports.useFindFullScenesQuery = exports.FindFullScenesDocument = exports.refetchFindSceneQuery = exports.useFindSceneSuspenseQuery = exports.useFindSceneLazyQuery = exports.useFindSceneQuery = exports.FindSceneDocument = exports.refetchFindDuplicateScenesQuery = exports.useFindDuplicateScenesSuspenseQuery = exports.useFindDuplicateScenesLazyQuery = exports.useFindDuplicateScenesQuery = exports.FindDuplicateScenesDocument = exports.refetchFindScenesByPathRegexQuery = exports.useFindScenesByPathRegexSuspenseQuery = exports.useFindScenesByPathRegexLazyQuery = exports.useFindScenesByPathRegexQuery = exports.FindScenesByPathRegexDocument = exports.refetchFindScenesQuery = exports.useFindScenesSuspenseQuery = void 0;
exports.useScrapeMultiScenesLazyQuery = exports.useScrapeMultiScenesQuery = exports.ScrapeMultiScenesDocument = exports.refetchScrapeSingleSceneQuery = exports.useScrapeSingleSceneSuspenseQuery = exports.useScrapeSingleSceneLazyQuery = exports.useScrapeSingleSceneQuery = exports.ScrapeSingleSceneDocument = exports.refetchScrapePerformerUrlQuery = exports.useScrapePerformerUrlSuspenseQuery = exports.useScrapePerformerUrlLazyQuery = exports.useScrapePerformerUrlQuery = exports.ScrapePerformerUrlDocument = exports.refetchScrapeMultiPerformersQuery = exports.useScrapeMultiPerformersSuspenseQuery = exports.useScrapeMultiPerformersLazyQuery = exports.useScrapeMultiPerformersQuery = exports.ScrapeMultiPerformersDocument = exports.refetchScrapeSinglePerformerQuery = exports.useScrapeSinglePerformerSuspenseQuery = exports.useScrapeSinglePerformerLazyQuery = exports.useScrapeSinglePerformerQuery = exports.ScrapeSinglePerformerDocument = exports.refetchScrapeSingleTagQuery = exports.useScrapeSingleTagSuspenseQuery = exports.useScrapeSingleTagLazyQuery = exports.useScrapeSingleTagQuery = exports.ScrapeSingleTagDocument = exports.refetchScrapeSingleStudioQuery = exports.useScrapeSingleStudioSuspenseQuery = exports.useScrapeSingleStudioLazyQuery = exports.useScrapeSingleStudioQuery = exports.ScrapeSingleStudioDocument = exports.refetchListGroupScrapersQuery = exports.useListGroupScrapersSuspenseQuery = exports.useListGroupScrapersLazyQuery = exports.useListGroupScrapersQuery = exports.ListGroupScrapersDocument = exports.refetchListImageScrapersQuery = exports.useListImageScrapersSuspenseQuery = exports.useListImageScrapersLazyQuery = exports.useListImageScrapersQuery = exports.ListImageScrapersDocument = exports.refetchListGalleryScrapersQuery = exports.useListGalleryScrapersSuspenseQuery = exports.useListGalleryScrapersLazyQuery = exports.useListGalleryScrapersQuery = exports.ListGalleryScrapersDocument = exports.refetchListSceneScrapersQuery = exports.useListSceneScrapersSuspenseQuery = void 0;
exports.useConfigurationLazyQuery = exports.useConfigurationQuery = exports.ConfigurationDocument = exports.refetchAvailableScraperPackagesQuery = exports.useAvailableScraperPackagesSuspenseQuery = exports.useAvailableScraperPackagesLazyQuery = exports.useAvailableScraperPackagesQuery = exports.AvailableScraperPackagesDocument = exports.refetchInstalledScraperPackagesStatusQuery = exports.useInstalledScraperPackagesStatusSuspenseQuery = exports.useInstalledScraperPackagesStatusLazyQuery = exports.useInstalledScraperPackagesStatusQuery = exports.InstalledScraperPackagesStatusDocument = exports.refetchInstalledScraperPackagesQuery = exports.useInstalledScraperPackagesSuspenseQuery = exports.useInstalledScraperPackagesLazyQuery = exports.useInstalledScraperPackagesQuery = exports.InstalledScraperPackagesDocument = exports.refetchScrapeGroupUrlQuery = exports.useScrapeGroupUrlSuspenseQuery = exports.useScrapeGroupUrlLazyQuery = exports.useScrapeGroupUrlQuery = exports.ScrapeGroupUrlDocument = exports.refetchScrapeImageUrlQuery = exports.useScrapeImageUrlSuspenseQuery = exports.useScrapeImageUrlLazyQuery = exports.useScrapeImageUrlQuery = exports.ScrapeImageUrlDocument = exports.refetchScrapeGalleryUrlQuery = exports.useScrapeGalleryUrlSuspenseQuery = exports.useScrapeGalleryUrlLazyQuery = exports.useScrapeGalleryUrlQuery = exports.ScrapeGalleryUrlDocument = exports.refetchScrapeSingleImageQuery = exports.useScrapeSingleImageSuspenseQuery = exports.useScrapeSingleImageLazyQuery = exports.useScrapeSingleImageQuery = exports.ScrapeSingleImageDocument = exports.refetchScrapeSingleGalleryQuery = exports.useScrapeSingleGallerySuspenseQuery = exports.useScrapeSingleGalleryLazyQuery = exports.useScrapeSingleGalleryQuery = exports.ScrapeSingleGalleryDocument = exports.refetchScrapeSceneUrlQuery = exports.useScrapeSceneUrlSuspenseQuery = exports.useScrapeSceneUrlLazyQuery = exports.useScrapeSceneUrlQuery = exports.ScrapeSceneUrlDocument = exports.refetchScrapeMultiScenesQuery = exports.useScrapeMultiScenesSuspenseQuery = void 0;
exports.useFindTagsForListLazyQuery = exports.useFindTagsForListQuery = exports.FindTagsForListDocument = exports.refetchFindTagsForSelectQuery = exports.useFindTagsForSelectSuspenseQuery = exports.useFindTagsForSelectLazyQuery = exports.useFindTagsForSelectQuery = exports.FindTagsForSelectDocument = exports.refetchFindTagQuery = exports.useFindTagSuspenseQuery = exports.useFindTagLazyQuery = exports.useFindTagQuery = exports.FindTagDocument = exports.refetchFindTagsQuery = exports.useFindTagsSuspenseQuery = exports.useFindTagsLazyQuery = exports.useFindTagsQuery = exports.FindTagsDocument = exports.refetchFindStudiosForSelectQuery = exports.useFindStudiosForSelectSuspenseQuery = exports.useFindStudiosForSelectLazyQuery = exports.useFindStudiosForSelectQuery = exports.FindStudiosForSelectDocument = exports.refetchFindStudioQuery = exports.useFindStudioSuspenseQuery = exports.useFindStudioLazyQuery = exports.useFindStudioQuery = exports.FindStudioDocument = exports.refetchFindStudiosQuery = exports.useFindStudiosSuspenseQuery = exports.useFindStudiosLazyQuery = exports.useFindStudiosQuery = exports.FindStudiosDocument = exports.refetchSystemStatusQuery = exports.useSystemStatusSuspenseQuery = exports.useSystemStatusLazyQuery = exports.useSystemStatusQuery = exports.SystemStatusDocument = exports.refetchValidateStashBoxQuery = exports.useValidateStashBoxSuspenseQuery = exports.useValidateStashBoxLazyQuery = exports.useValidateStashBoxQuery = exports.ValidateStashBoxDocument = exports.refetchDirectoryQuery = exports.useDirectorySuspenseQuery = exports.useDirectoryLazyQuery = exports.useDirectoryQuery = exports.DirectoryDocument = exports.refetchConfigurationQuery = exports.useConfigurationSuspenseQuery = void 0;
exports.useScanCompleteSubscribeSubscription = exports.ScanCompleteSubscribeDocument = exports.useLoggingSubscribeSubscription = exports.LoggingSubscribeDocument = exports.useJobsSubscribeSubscription = exports.JobsSubscribeDocument = exports.refetchFindTagsForListQuery = exports.useFindTagsForListSuspenseQuery = void 0;
// import { IUIConfig } from 'src/core/config';
const client_1 = require("@apollo/client");
const Apollo = __importStar(require("@apollo/client"));
const defaultOptions = {};
var BlobsStorageType;
(function (BlobsStorageType) {
    /** Database */
    BlobsStorageType["Database"] = "DATABASE";
    /** Filesystem */
    BlobsStorageType["Filesystem"] = "FILESYSTEM";
})(BlobsStorageType || (exports.BlobsStorageType = BlobsStorageType = {}));
var BulkUpdateIdMode;
(function (BulkUpdateIdMode) {
    BulkUpdateIdMode["Add"] = "ADD";
    BulkUpdateIdMode["Remove"] = "REMOVE";
    BulkUpdateIdMode["Set"] = "SET";
})(BulkUpdateIdMode || (exports.BulkUpdateIdMode = BulkUpdateIdMode = {}));
var CircumcisedEnum;
(function (CircumcisedEnum) {
    CircumcisedEnum["Cut"] = "CUT";
    CircumcisedEnum["Uncut"] = "UNCUT";
})(CircumcisedEnum || (exports.CircumcisedEnum = CircumcisedEnum = {}));
var CriterionModifier;
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
})(CriterionModifier || (exports.CriterionModifier = CriterionModifier = {}));
var FilterMode;
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
})(FilterMode || (exports.FilterMode = FilterMode = {}));
var GenderEnum;
(function (GenderEnum) {
    GenderEnum["Female"] = "FEMALE";
    GenderEnum["Intersex"] = "INTERSEX";
    GenderEnum["Male"] = "MALE";
    GenderEnum["NonBinary"] = "NON_BINARY";
    GenderEnum["TransgenderFemale"] = "TRANSGENDER_FEMALE";
    GenderEnum["TransgenderMale"] = "TRANSGENDER_MALE";
})(GenderEnum || (exports.GenderEnum = GenderEnum = {}));
var HashAlgorithm;
(function (HashAlgorithm) {
    HashAlgorithm["Md5"] = "MD5";
    /** oshash */
    HashAlgorithm["Oshash"] = "OSHASH";
})(HashAlgorithm || (exports.HashAlgorithm = HashAlgorithm = {}));
var IdentifyFieldStrategy;
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
})(IdentifyFieldStrategy || (exports.IdentifyFieldStrategy = IdentifyFieldStrategy = {}));
var ImageLightboxDisplayMode;
(function (ImageLightboxDisplayMode) {
    ImageLightboxDisplayMode["FitX"] = "FIT_X";
    ImageLightboxDisplayMode["FitXy"] = "FIT_XY";
    ImageLightboxDisplayMode["Original"] = "ORIGINAL";
})(ImageLightboxDisplayMode || (exports.ImageLightboxDisplayMode = ImageLightboxDisplayMode = {}));
var ImageLightboxScrollMode;
(function (ImageLightboxScrollMode) {
    ImageLightboxScrollMode["PanY"] = "PAN_Y";
    ImageLightboxScrollMode["Zoom"] = "ZOOM";
})(ImageLightboxScrollMode || (exports.ImageLightboxScrollMode = ImageLightboxScrollMode = {}));
var ImportDuplicateEnum;
(function (ImportDuplicateEnum) {
    ImportDuplicateEnum["Fail"] = "FAIL";
    ImportDuplicateEnum["Ignore"] = "IGNORE";
    ImportDuplicateEnum["Overwrite"] = "OVERWRITE";
})(ImportDuplicateEnum || (exports.ImportDuplicateEnum = ImportDuplicateEnum = {}));
var ImportMissingRefEnum;
(function (ImportMissingRefEnum) {
    ImportMissingRefEnum["Create"] = "CREATE";
    ImportMissingRefEnum["Fail"] = "FAIL";
    ImportMissingRefEnum["Ignore"] = "IGNORE";
})(ImportMissingRefEnum || (exports.ImportMissingRefEnum = ImportMissingRefEnum = {}));
var JobStatus;
(function (JobStatus) {
    JobStatus["Cancelled"] = "CANCELLED";
    JobStatus["Failed"] = "FAILED";
    JobStatus["Finished"] = "FINISHED";
    JobStatus["Ready"] = "READY";
    JobStatus["Running"] = "RUNNING";
    JobStatus["Stopping"] = "STOPPING";
})(JobStatus || (exports.JobStatus = JobStatus = {}));
var JobStatusUpdateType;
(function (JobStatusUpdateType) {
    JobStatusUpdateType["Add"] = "ADD";
    JobStatusUpdateType["Remove"] = "REMOVE";
    JobStatusUpdateType["Update"] = "UPDATE";
})(JobStatusUpdateType || (exports.JobStatusUpdateType = JobStatusUpdateType = {}));
var LogLevel;
(function (LogLevel) {
    LogLevel["Debug"] = "Debug";
    LogLevel["Error"] = "Error";
    LogLevel["Info"] = "Info";
    LogLevel["Progress"] = "Progress";
    LogLevel["Trace"] = "Trace";
    LogLevel["Warning"] = "Warning";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
var OrientationEnum;
(function (OrientationEnum) {
    /** Landscape */
    OrientationEnum["Landscape"] = "LANDSCAPE";
    /** Portrait */
    OrientationEnum["Portrait"] = "PORTRAIT";
    /** Square */
    OrientationEnum["Square"] = "SQUARE";
})(OrientationEnum || (exports.OrientationEnum = OrientationEnum = {}));
var PackageType;
(function (PackageType) {
    PackageType["Plugin"] = "Plugin";
    PackageType["Scraper"] = "Scraper";
})(PackageType || (exports.PackageType = PackageType = {}));
var PluginSettingTypeEnum;
(function (PluginSettingTypeEnum) {
    PluginSettingTypeEnum["Boolean"] = "BOOLEAN";
    PluginSettingTypeEnum["Number"] = "NUMBER";
    PluginSettingTypeEnum["String"] = "STRING";
})(PluginSettingTypeEnum || (exports.PluginSettingTypeEnum = PluginSettingTypeEnum = {}));
var PreviewPreset;
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
})(PreviewPreset || (exports.PreviewPreset = PreviewPreset = {}));
var ResolutionEnum;
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
})(ResolutionEnum || (exports.ResolutionEnum = ResolutionEnum = {}));
/** Type of the content a scraper generates */
var ScrapeContentType;
(function (ScrapeContentType) {
    ScrapeContentType["Gallery"] = "GALLERY";
    ScrapeContentType["Group"] = "GROUP";
    ScrapeContentType["Image"] = "IMAGE";
    ScrapeContentType["Movie"] = "MOVIE";
    ScrapeContentType["Performer"] = "PERFORMER";
    ScrapeContentType["Scene"] = "SCENE";
})(ScrapeContentType || (exports.ScrapeContentType = ScrapeContentType = {}));
var ScrapeType;
(function (ScrapeType) {
    /** From existing object */
    ScrapeType["Fragment"] = "FRAGMENT";
    /** From text query */
    ScrapeType["Name"] = "NAME";
    /** From URL */
    ScrapeType["Url"] = "URL";
})(ScrapeType || (exports.ScrapeType = ScrapeType = {}));
var SortDirectionEnum;
(function (SortDirectionEnum) {
    SortDirectionEnum["Asc"] = "ASC";
    SortDirectionEnum["Desc"] = "DESC";
})(SortDirectionEnum || (exports.SortDirectionEnum = SortDirectionEnum = {}));
var StreamingResolutionEnum;
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
})(StreamingResolutionEnum || (exports.StreamingResolutionEnum = StreamingResolutionEnum = {}));
var SystemStatusEnum;
(function (SystemStatusEnum) {
    SystemStatusEnum["NeedsMigration"] = "NEEDS_MIGRATION";
    SystemStatusEnum["Ok"] = "OK";
    SystemStatusEnum["Setup"] = "SETUP";
})(SystemStatusEnum || (exports.SystemStatusEnum = SystemStatusEnum = {}));
exports.ConfigGeneralDataFragmentDoc = (0, client_1.gql) `
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
exports.ConfigInterfaceDataFragmentDoc = (0, client_1.gql) `
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
exports.ConfigDlnaDataFragmentDoc = (0, client_1.gql) `
    fragment ConfigDLNAData on ConfigDLNAResult {
  serverName
  enabled
  port
  whitelistedIPs
  interfaces
  videoSortOrder
}
    `;
exports.ConfigScrapingDataFragmentDoc = (0, client_1.gql) `
    fragment ConfigScrapingData on ConfigScrapingResult {
  scraperUserAgent
  scraperCertCheck
  scraperCDPPath
  excludeTagPatterns
}
    `;
exports.ScraperSourceDataFragmentDoc = (0, client_1.gql) `
    fragment ScraperSourceData on ScraperSource {
  stash_box_index
  stash_box_endpoint
  scraper_id
}
    `;
exports.IdentifyFieldOptionsDataFragmentDoc = (0, client_1.gql) `
    fragment IdentifyFieldOptionsData on IdentifyFieldOptions {
  field
  strategy
  createMissing
}
    `;
exports.IdentifyMetadataOptionsDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.IdentifyFieldOptionsDataFragmentDoc}`;
exports.ConfigDefaultSettingsDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.ScraperSourceDataFragmentDoc}
${exports.IdentifyMetadataOptionsDataFragmentDoc}`;
exports.ConfigDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.ConfigGeneralDataFragmentDoc}
${exports.ConfigInterfaceDataFragmentDoc}
${exports.ConfigDlnaDataFragmentDoc}
${exports.ConfigScrapingDataFragmentDoc}
${exports.ConfigDefaultSettingsDataFragmentDoc}`;
exports.ImageFileDataFragmentDoc = (0, client_1.gql) `
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
exports.SelectFolderDataFragmentDoc = (0, client_1.gql) `
    fragment SelectFolderData on Folder {
  id
  path
  basename
}
    `;
exports.RecursiveFolderDataFragmentDoc = (0, client_1.gql) `
    fragment RecursiveFolderData on Folder {
  ...SelectFolderData
  parent_folders {
    ...SelectFolderData
  }
}
    ${exports.SelectFolderDataFragmentDoc}`;
exports.SavedFilterDataFragmentDoc = (0, client_1.gql) `
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
exports.SelectGalleryDataFragmentDoc = (0, client_1.gql) `
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
exports.SelectGroupDataFragmentDoc = (0, client_1.gql) `
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
exports.SlimStudioDataFragmentDoc = (0, client_1.gql) `
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
exports.SlimTagDataFragmentDoc = (0, client_1.gql) `
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
exports.SlimGroupDataFragmentDoc = (0, client_1.gql) `
    fragment SlimGroupData on Group {
  id
  name
  front_image_path
  rating100
}
    `;
exports.ListGroupDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.SlimStudioDataFragmentDoc}
${exports.SlimTagDataFragmentDoc}
${exports.SlimGroupDataFragmentDoc}`;
exports.VisualFileDataFragmentDoc = (0, client_1.gql) `
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
exports.SlimImageDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.VisualFileDataFragmentDoc}`;
exports.GalleryFileDataFragmentDoc = (0, client_1.gql) `
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
exports.FolderDataFragmentDoc = (0, client_1.gql) `
    fragment FolderData on Folder {
  id
  basename
  path
}
    `;
exports.GalleryChapterDataFragmentDoc = (0, client_1.gql) `
    fragment GalleryChapterData on GalleryChapter {
  id
  title
  image_index
  gallery {
    id
  }
}
    `;
exports.PerformerDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.SlimTagDataFragmentDoc}`;
exports.VideoFileDataFragmentDoc = (0, client_1.gql) `
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
exports.SlimSceneDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.VideoFileDataFragmentDoc}`;
exports.GalleryDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.GalleryFileDataFragmentDoc}
${exports.FolderDataFragmentDoc}
${exports.GalleryChapterDataFragmentDoc}
${exports.SlimStudioDataFragmentDoc}
${exports.SlimTagDataFragmentDoc}
${exports.PerformerDataFragmentDoc}
${exports.SlimSceneDataFragmentDoc}`;
exports.ImageDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.GalleryDataFragmentDoc}
${exports.SlimStudioDataFragmentDoc}
${exports.SlimTagDataFragmentDoc}
${exports.PerformerDataFragmentDoc}
${exports.VisualFileDataFragmentDoc}`;
exports.JobDataFragmentDoc = (0, client_1.gql) `
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
exports.LogEntryDataFragmentDoc = (0, client_1.gql) `
    fragment LogEntryData on LogEntry {
  time
  level
  message
}
    `;
exports.PackageDataFragmentDoc = (0, client_1.gql) `
    fragment PackageData on Package {
  package_id
  name
  version
  date
  metadata
  sourceURL
}
    `;
exports.SlimPerformerDataFragmentDoc = (0, client_1.gql) `
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
exports.SelectPerformerDataFragmentDoc = (0, client_1.gql) `
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
exports.SceneMarkerSceneDataFragmentDoc = (0, client_1.gql) `
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
exports.SceneMarkerDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.SceneMarkerSceneDataFragmentDoc}`;
exports.SlimGalleryDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.GalleryFileDataFragmentDoc}
${exports.FolderDataFragmentDoc}
${exports.SlimSceneDataFragmentDoc}`;
exports.GroupDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.SlimStudioDataFragmentDoc}
${exports.SlimTagDataFragmentDoc}
${exports.SlimGroupDataFragmentDoc}`;
exports.SceneDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.VideoFileDataFragmentDoc}
${exports.SceneMarkerDataFragmentDoc}
${exports.SlimGalleryDataFragmentDoc}
${exports.SlimStudioDataFragmentDoc}
${exports.GroupDataFragmentDoc}
${exports.SlimTagDataFragmentDoc}
${exports.PerformerDataFragmentDoc}`;
exports.SelectSceneDataFragmentDoc = (0, client_1.gql) `
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
exports.ScrapedSceneTagDataFragmentDoc = (0, client_1.gql) `
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
exports.ScrapedStudioDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.ScrapedSceneTagDataFragmentDoc}`;
exports.ScrapedPerformerDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.ScrapedSceneTagDataFragmentDoc}`;
exports.ScrapedGroupStudioDataFragmentDoc = (0, client_1.gql) `
    fragment ScrapedGroupStudioData on ScrapedStudio {
  stored_id
  name
  urls
}
    `;
exports.ScrapedGroupDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.ScrapedGroupStudioDataFragmentDoc}
${exports.ScrapedSceneTagDataFragmentDoc}`;
exports.ScrapedSceneStudioDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.ScrapedSceneTagDataFragmentDoc}`;
exports.ScrapedScenePerformerDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.ScrapedSceneTagDataFragmentDoc}`;
exports.ScrapedSceneGroupDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.ScrapedGroupStudioDataFragmentDoc}
${exports.ScrapedSceneTagDataFragmentDoc}`;
exports.ScrapedSceneDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.ScrapedSceneStudioDataFragmentDoc}
${exports.ScrapedSceneTagDataFragmentDoc}
${exports.ScrapedScenePerformerDataFragmentDoc}
${exports.ScrapedSceneGroupDataFragmentDoc}`;
exports.ScrapedGalleryDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.ScrapedSceneStudioDataFragmentDoc}
${exports.ScrapedSceneTagDataFragmentDoc}
${exports.ScrapedScenePerformerDataFragmentDoc}`;
exports.ScrapedImageDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.ScrapedSceneStudioDataFragmentDoc}
${exports.ScrapedSceneTagDataFragmentDoc}
${exports.ScrapedScenePerformerDataFragmentDoc}`;
exports.ScrapedStashBoxSceneDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.ScrapedSceneStudioDataFragmentDoc}
${exports.ScrapedSceneTagDataFragmentDoc}
${exports.ScrapedScenePerformerDataFragmentDoc}
${exports.ScrapedSceneGroupDataFragmentDoc}`;
exports.ScrapedStashBoxPerformerDataFragmentDoc = (0, client_1.gql) `
    fragment ScrapedStashBoxPerformerData on StashBoxPerformerQueryResult {
  query
  results {
    ...ScrapedScenePerformerData
  }
}
    ${exports.ScrapedScenePerformerDataFragmentDoc}`;
exports.StudioDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.SlimTagDataFragmentDoc}`;
exports.SelectStudioDataFragmentDoc = (0, client_1.gql) `
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
exports.TagDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.SlimTagDataFragmentDoc}`;
exports.SelectTagDataFragmentDoc = (0, client_1.gql) `
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
exports.TagListDataFragmentDoc = (0, client_1.gql) `
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
    ${exports.SlimTagDataFragmentDoc}`;
exports.SetupDocument = (0, client_1.gql) `
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
function useSetupMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SetupDocument, options);
}
exports.useSetupMutation = useSetupMutation;
exports.MigrateDocument = (0, client_1.gql) `
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
function useMigrateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.MigrateDocument, options);
}
exports.useMigrateMutation = useMigrateMutation;
exports.DownloadFfMpegDocument = (0, client_1.gql) `
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
function useDownloadFfMpegMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.DownloadFfMpegDocument, options);
}
exports.useDownloadFfMpegMutation = useDownloadFfMpegMutation;
exports.ConfigureGeneralDocument = (0, client_1.gql) `
    mutation ConfigureGeneral($input: ConfigGeneralInput!) {
  configureGeneral(input: $input) {
    ...ConfigGeneralData
  }
}
    ${exports.ConfigGeneralDataFragmentDoc}`;
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
function useConfigureGeneralMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ConfigureGeneralDocument, options);
}
exports.useConfigureGeneralMutation = useConfigureGeneralMutation;
exports.ConfigureInterfaceDocument = (0, client_1.gql) `
    mutation ConfigureInterface($input: ConfigInterfaceInput!) {
  configureInterface(input: $input) {
    ...ConfigInterfaceData
  }
}
    ${exports.ConfigInterfaceDataFragmentDoc}`;
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
function useConfigureInterfaceMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ConfigureInterfaceDocument, options);
}
exports.useConfigureInterfaceMutation = useConfigureInterfaceMutation;
exports.ConfigureDlnaDocument = (0, client_1.gql) `
    mutation ConfigureDLNA($input: ConfigDLNAInput!) {
  configureDLNA(input: $input) {
    ...ConfigDLNAData
  }
}
    ${exports.ConfigDlnaDataFragmentDoc}`;
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
function useConfigureDlnaMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ConfigureDlnaDocument, options);
}
exports.useConfigureDlnaMutation = useConfigureDlnaMutation;
exports.ConfigureScrapingDocument = (0, client_1.gql) `
    mutation ConfigureScraping($input: ConfigScrapingInput!) {
  configureScraping(input: $input) {
    ...ConfigScrapingData
  }
}
    ${exports.ConfigScrapingDataFragmentDoc}`;
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
function useConfigureScrapingMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ConfigureScrapingDocument, options);
}
exports.useConfigureScrapingMutation = useConfigureScrapingMutation;
exports.ConfigureDefaultsDocument = (0, client_1.gql) `
    mutation ConfigureDefaults($input: ConfigDefaultSettingsInput!) {
  configureDefaults(input: $input) {
    ...ConfigDefaultSettingsData
  }
}
    ${exports.ConfigDefaultSettingsDataFragmentDoc}`;
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
function useConfigureDefaultsMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ConfigureDefaultsDocument, options);
}
exports.useConfigureDefaultsMutation = useConfigureDefaultsMutation;
exports.ConfigureUiDocument = (0, client_1.gql) `
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
function useConfigureUiMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ConfigureUiDocument, options);
}
exports.useConfigureUiMutation = useConfigureUiMutation;
exports.ConfigureUiSettingDocument = (0, client_1.gql) `
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
function useConfigureUiSettingMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ConfigureUiSettingDocument, options);
}
exports.useConfigureUiSettingMutation = useConfigureUiSettingMutation;
exports.GenerateApiKeyDocument = (0, client_1.gql) `
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
function useGenerateApiKeyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.GenerateApiKeyDocument, options);
}
exports.useGenerateApiKeyMutation = useGenerateApiKeyMutation;
exports.EnableDlnaDocument = (0, client_1.gql) `
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
function useEnableDlnaMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.EnableDlnaDocument, options);
}
exports.useEnableDlnaMutation = useEnableDlnaMutation;
exports.DisableDlnaDocument = (0, client_1.gql) `
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
function useDisableDlnaMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.DisableDlnaDocument, options);
}
exports.useDisableDlnaMutation = useDisableDlnaMutation;
exports.AddTempDlnaipDocument = (0, client_1.gql) `
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
function useAddTempDlnaipMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.AddTempDlnaipDocument, options);
}
exports.useAddTempDlnaipMutation = useAddTempDlnaipMutation;
exports.RemoveTempDlnaipDocument = (0, client_1.gql) `
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
function useRemoveTempDlnaipMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.RemoveTempDlnaipDocument, options);
}
exports.useRemoveTempDlnaipMutation = useRemoveTempDlnaipMutation;
exports.DeleteFilesDocument = (0, client_1.gql) `
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
function useDeleteFilesMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.DeleteFilesDocument, options);
}
exports.useDeleteFilesMutation = useDeleteFilesMutation;
exports.RevealFileInFileManagerDocument = (0, client_1.gql) `
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
function useRevealFileInFileManagerMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.RevealFileInFileManagerDocument, options);
}
exports.useRevealFileInFileManagerMutation = useRevealFileInFileManagerMutation;
exports.RevealFolderInFileManagerDocument = (0, client_1.gql) `
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
function useRevealFolderInFileManagerMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.RevealFolderInFileManagerDocument, options);
}
exports.useRevealFolderInFileManagerMutation = useRevealFolderInFileManagerMutation;
exports.SaveFilterDocument = (0, client_1.gql) `
    mutation SaveFilter($input: SaveFilterInput!) {
  saveFilter(input: $input) {
    ...SavedFilterData
  }
}
    ${exports.SavedFilterDataFragmentDoc}`;
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
function useSaveFilterMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SaveFilterDocument, options);
}
exports.useSaveFilterMutation = useSaveFilterMutation;
exports.DestroySavedFilterDocument = (0, client_1.gql) `
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
function useDestroySavedFilterMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.DestroySavedFilterDocument, options);
}
exports.useDestroySavedFilterMutation = useDestroySavedFilterMutation;
exports.GalleryChapterCreateDocument = (0, client_1.gql) `
    mutation GalleryChapterCreate($title: String!, $image_index: Int!, $gallery_id: ID!) {
  galleryChapterCreate(
    input: {title: $title, image_index: $image_index, gallery_id: $gallery_id}
  ) {
    ...GalleryChapterData
  }
}
    ${exports.GalleryChapterDataFragmentDoc}`;
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
function useGalleryChapterCreateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.GalleryChapterCreateDocument, options);
}
exports.useGalleryChapterCreateMutation = useGalleryChapterCreateMutation;
exports.GalleryChapterUpdateDocument = (0, client_1.gql) `
    mutation GalleryChapterUpdate($id: ID!, $title: String!, $image_index: Int!, $gallery_id: ID!) {
  galleryChapterUpdate(
    input: {id: $id, title: $title, image_index: $image_index, gallery_id: $gallery_id}
  ) {
    ...GalleryChapterData
  }
}
    ${exports.GalleryChapterDataFragmentDoc}`;
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
function useGalleryChapterUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.GalleryChapterUpdateDocument, options);
}
exports.useGalleryChapterUpdateMutation = useGalleryChapterUpdateMutation;
exports.GalleryChapterDestroyDocument = (0, client_1.gql) `
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
function useGalleryChapterDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.GalleryChapterDestroyDocument, options);
}
exports.useGalleryChapterDestroyMutation = useGalleryChapterDestroyMutation;
exports.GalleryCreateDocument = (0, client_1.gql) `
    mutation GalleryCreate($input: GalleryCreateInput!) {
  galleryCreate(input: $input) {
    ...GalleryData
  }
}
    ${exports.GalleryDataFragmentDoc}`;
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
function useGalleryCreateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.GalleryCreateDocument, options);
}
exports.useGalleryCreateMutation = useGalleryCreateMutation;
exports.GalleryUpdateDocument = (0, client_1.gql) `
    mutation GalleryUpdate($input: GalleryUpdateInput!) {
  galleryUpdate(input: $input) {
    ...GalleryData
  }
}
    ${exports.GalleryDataFragmentDoc}`;
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
function useGalleryUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.GalleryUpdateDocument, options);
}
exports.useGalleryUpdateMutation = useGalleryUpdateMutation;
exports.BulkGalleryUpdateDocument = (0, client_1.gql) `
    mutation BulkGalleryUpdate($input: BulkGalleryUpdateInput!) {
  bulkGalleryUpdate(input: $input) {
    ...GalleryData
  }
}
    ${exports.GalleryDataFragmentDoc}`;
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
function useBulkGalleryUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.BulkGalleryUpdateDocument, options);
}
exports.useBulkGalleryUpdateMutation = useBulkGalleryUpdateMutation;
exports.GalleriesUpdateDocument = (0, client_1.gql) `
    mutation GalleriesUpdate($input: [GalleryUpdateInput!]!) {
  galleriesUpdate(input: $input) {
    ...GalleryData
  }
}
    ${exports.GalleryDataFragmentDoc}`;
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
function useGalleriesUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.GalleriesUpdateDocument, options);
}
exports.useGalleriesUpdateMutation = useGalleriesUpdateMutation;
exports.GalleryDestroyDocument = (0, client_1.gql) `
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
function useGalleryDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.GalleryDestroyDocument, options);
}
exports.useGalleryDestroyMutation = useGalleryDestroyMutation;
exports.AddGalleryImagesDocument = (0, client_1.gql) `
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
function useAddGalleryImagesMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.AddGalleryImagesDocument, options);
}
exports.useAddGalleryImagesMutation = useAddGalleryImagesMutation;
exports.RemoveGalleryImagesDocument = (0, client_1.gql) `
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
function useRemoveGalleryImagesMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.RemoveGalleryImagesDocument, options);
}
exports.useRemoveGalleryImagesMutation = useRemoveGalleryImagesMutation;
exports.SetGalleryCoverDocument = (0, client_1.gql) `
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
function useSetGalleryCoverMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SetGalleryCoverDocument, options);
}
exports.useSetGalleryCoverMutation = useSetGalleryCoverMutation;
exports.ResetGalleryCoverDocument = (0, client_1.gql) `
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
function useResetGalleryCoverMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ResetGalleryCoverDocument, options);
}
exports.useResetGalleryCoverMutation = useResetGalleryCoverMutation;
exports.GroupCreateDocument = (0, client_1.gql) `
    mutation GroupCreate($input: GroupCreateInput!) {
  groupCreate(input: $input) {
    ...GroupData
  }
}
    ${exports.GroupDataFragmentDoc}`;
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
function useGroupCreateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.GroupCreateDocument, options);
}
exports.useGroupCreateMutation = useGroupCreateMutation;
exports.GroupUpdateDocument = (0, client_1.gql) `
    mutation GroupUpdate($input: GroupUpdateInput!) {
  groupUpdate(input: $input) {
    ...GroupData
  }
}
    ${exports.GroupDataFragmentDoc}`;
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
function useGroupUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.GroupUpdateDocument, options);
}
exports.useGroupUpdateMutation = useGroupUpdateMutation;
exports.BulkGroupUpdateDocument = (0, client_1.gql) `
    mutation BulkGroupUpdate($input: BulkGroupUpdateInput!) {
  bulkGroupUpdate(input: $input) {
    ...GroupData
  }
}
    ${exports.GroupDataFragmentDoc}`;
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
function useBulkGroupUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.BulkGroupUpdateDocument, options);
}
exports.useBulkGroupUpdateMutation = useBulkGroupUpdateMutation;
exports.GroupDestroyDocument = (0, client_1.gql) `
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
function useGroupDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.GroupDestroyDocument, options);
}
exports.useGroupDestroyMutation = useGroupDestroyMutation;
exports.GroupsDestroyDocument = (0, client_1.gql) `
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
function useGroupsDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.GroupsDestroyDocument, options);
}
exports.useGroupsDestroyMutation = useGroupsDestroyMutation;
exports.AddGroupSubGroupsDocument = (0, client_1.gql) `
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
function useAddGroupSubGroupsMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.AddGroupSubGroupsDocument, options);
}
exports.useAddGroupSubGroupsMutation = useAddGroupSubGroupsMutation;
exports.RemoveGroupSubGroupsDocument = (0, client_1.gql) `
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
function useRemoveGroupSubGroupsMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.RemoveGroupSubGroupsDocument, options);
}
exports.useRemoveGroupSubGroupsMutation = useRemoveGroupSubGroupsMutation;
exports.ReorderSubGroupsDocument = (0, client_1.gql) `
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
function useReorderSubGroupsMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ReorderSubGroupsDocument, options);
}
exports.useReorderSubGroupsMutation = useReorderSubGroupsMutation;
exports.ImageUpdateDocument = (0, client_1.gql) `
    mutation ImageUpdate($input: ImageUpdateInput!) {
  imageUpdate(input: $input) {
    ...SlimImageData
  }
}
    ${exports.SlimImageDataFragmentDoc}`;
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
function useImageUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ImageUpdateDocument, options);
}
exports.useImageUpdateMutation = useImageUpdateMutation;
exports.BulkImageUpdateDocument = (0, client_1.gql) `
    mutation BulkImageUpdate($input: BulkImageUpdateInput!) {
  bulkImageUpdate(input: $input) {
    ...SlimImageData
  }
}
    ${exports.SlimImageDataFragmentDoc}`;
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
function useBulkImageUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.BulkImageUpdateDocument, options);
}
exports.useBulkImageUpdateMutation = useBulkImageUpdateMutation;
exports.ImagesUpdateDocument = (0, client_1.gql) `
    mutation ImagesUpdate($input: [ImageUpdateInput!]!) {
  imagesUpdate(input: $input) {
    ...SlimImageData
  }
}
    ${exports.SlimImageDataFragmentDoc}`;
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
function useImagesUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ImagesUpdateDocument, options);
}
exports.useImagesUpdateMutation = useImagesUpdateMutation;
exports.ImageIncrementODocument = (0, client_1.gql) `
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
function useImageIncrementOMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ImageIncrementODocument, options);
}
exports.useImageIncrementOMutation = useImageIncrementOMutation;
exports.ImageDecrementODocument = (0, client_1.gql) `
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
function useImageDecrementOMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ImageDecrementODocument, options);
}
exports.useImageDecrementOMutation = useImageDecrementOMutation;
exports.ImageResetODocument = (0, client_1.gql) `
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
function useImageResetOMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ImageResetODocument, options);
}
exports.useImageResetOMutation = useImageResetOMutation;
exports.ImageDestroyDocument = (0, client_1.gql) `
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
function useImageDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ImageDestroyDocument, options);
}
exports.useImageDestroyMutation = useImageDestroyMutation;
exports.ImagesDestroyDocument = (0, client_1.gql) `
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
function useImagesDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ImagesDestroyDocument, options);
}
exports.useImagesDestroyMutation = useImagesDestroyMutation;
exports.StopJobDocument = (0, client_1.gql) `
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
function useStopJobMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.StopJobDocument, options);
}
exports.useStopJobMutation = useStopJobMutation;
exports.StopAllJobsDocument = (0, client_1.gql) `
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
function useStopAllJobsMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.StopAllJobsDocument, options);
}
exports.useStopAllJobsMutation = useStopAllJobsMutation;
exports.MetadataImportDocument = (0, client_1.gql) `
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
function useMetadataImportMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.MetadataImportDocument, options);
}
exports.useMetadataImportMutation = useMetadataImportMutation;
exports.MetadataExportDocument = (0, client_1.gql) `
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
function useMetadataExportMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.MetadataExportDocument, options);
}
exports.useMetadataExportMutation = useMetadataExportMutation;
exports.ExportObjectsDocument = (0, client_1.gql) `
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
function useExportObjectsMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ExportObjectsDocument, options);
}
exports.useExportObjectsMutation = useExportObjectsMutation;
exports.ImportObjectsDocument = (0, client_1.gql) `
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
function useImportObjectsMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ImportObjectsDocument, options);
}
exports.useImportObjectsMutation = useImportObjectsMutation;
exports.MetadataScanDocument = (0, client_1.gql) `
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
function useMetadataScanMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.MetadataScanDocument, options);
}
exports.useMetadataScanMutation = useMetadataScanMutation;
exports.MetadataGenerateDocument = (0, client_1.gql) `
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
function useMetadataGenerateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.MetadataGenerateDocument, options);
}
exports.useMetadataGenerateMutation = useMetadataGenerateMutation;
exports.MetadataAutoTagDocument = (0, client_1.gql) `
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
function useMetadataAutoTagMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.MetadataAutoTagDocument, options);
}
exports.useMetadataAutoTagMutation = useMetadataAutoTagMutation;
exports.MetadataIdentifyDocument = (0, client_1.gql) `
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
function useMetadataIdentifyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.MetadataIdentifyDocument, options);
}
exports.useMetadataIdentifyMutation = useMetadataIdentifyMutation;
exports.MetadataCleanDocument = (0, client_1.gql) `
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
function useMetadataCleanMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.MetadataCleanDocument, options);
}
exports.useMetadataCleanMutation = useMetadataCleanMutation;
exports.MetadataCleanGeneratedDocument = (0, client_1.gql) `
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
function useMetadataCleanGeneratedMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.MetadataCleanGeneratedDocument, options);
}
exports.useMetadataCleanGeneratedMutation = useMetadataCleanGeneratedMutation;
exports.MigrateHashNamingDocument = (0, client_1.gql) `
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
function useMigrateHashNamingMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.MigrateHashNamingDocument, options);
}
exports.useMigrateHashNamingMutation = useMigrateHashNamingMutation;
exports.BackupDatabaseDocument = (0, client_1.gql) `
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
function useBackupDatabaseMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.BackupDatabaseDocument, options);
}
exports.useBackupDatabaseMutation = useBackupDatabaseMutation;
exports.AnonymiseDatabaseDocument = (0, client_1.gql) `
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
function useAnonymiseDatabaseMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.AnonymiseDatabaseDocument, options);
}
exports.useAnonymiseDatabaseMutation = useAnonymiseDatabaseMutation;
exports.OptimiseDatabaseDocument = (0, client_1.gql) `
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
function useOptimiseDatabaseMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.OptimiseDatabaseDocument, options);
}
exports.useOptimiseDatabaseMutation = useOptimiseDatabaseMutation;
exports.MigrateSceneScreenshotsDocument = (0, client_1.gql) `
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
function useMigrateSceneScreenshotsMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.MigrateSceneScreenshotsDocument, options);
}
exports.useMigrateSceneScreenshotsMutation = useMigrateSceneScreenshotsMutation;
exports.MigrateBlobsDocument = (0, client_1.gql) `
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
function useMigrateBlobsMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.MigrateBlobsDocument, options);
}
exports.useMigrateBlobsMutation = useMigrateBlobsMutation;
exports.PerformerCreateDocument = (0, client_1.gql) `
    mutation PerformerCreate($input: PerformerCreateInput!) {
  performerCreate(input: $input) {
    ...PerformerData
  }
}
    ${exports.PerformerDataFragmentDoc}`;
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
function usePerformerCreateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.PerformerCreateDocument, options);
}
exports.usePerformerCreateMutation = usePerformerCreateMutation;
exports.PerformerUpdateDocument = (0, client_1.gql) `
    mutation PerformerUpdate($input: PerformerUpdateInput!) {
  performerUpdate(input: $input) {
    ...PerformerData
  }
}
    ${exports.PerformerDataFragmentDoc}`;
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
function usePerformerUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.PerformerUpdateDocument, options);
}
exports.usePerformerUpdateMutation = usePerformerUpdateMutation;
exports.BulkPerformerUpdateDocument = (0, client_1.gql) `
    mutation BulkPerformerUpdate($input: BulkPerformerUpdateInput!) {
  bulkPerformerUpdate(input: $input) {
    ...PerformerData
  }
}
    ${exports.PerformerDataFragmentDoc}`;
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
function useBulkPerformerUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.BulkPerformerUpdateDocument, options);
}
exports.useBulkPerformerUpdateMutation = useBulkPerformerUpdateMutation;
exports.PerformerDestroyDocument = (0, client_1.gql) `
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
function usePerformerDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.PerformerDestroyDocument, options);
}
exports.usePerformerDestroyMutation = usePerformerDestroyMutation;
exports.PerformersDestroyDocument = (0, client_1.gql) `
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
function usePerformersDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.PerformersDestroyDocument, options);
}
exports.usePerformersDestroyMutation = usePerformersDestroyMutation;
exports.PerformerMergeDocument = (0, client_1.gql) `
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
function usePerformerMergeMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.PerformerMergeDocument, options);
}
exports.usePerformerMergeMutation = usePerformerMergeMutation;
exports.ReloadPluginsDocument = (0, client_1.gql) `
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
function useReloadPluginsMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ReloadPluginsDocument, options);
}
exports.useReloadPluginsMutation = useReloadPluginsMutation;
exports.RunPluginTaskDocument = (0, client_1.gql) `
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
function useRunPluginTaskMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.RunPluginTaskDocument, options);
}
exports.useRunPluginTaskMutation = useRunPluginTaskMutation;
exports.ConfigurePluginDocument = (0, client_1.gql) `
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
function useConfigurePluginMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ConfigurePluginDocument, options);
}
exports.useConfigurePluginMutation = useConfigurePluginMutation;
exports.SetPluginsEnabledDocument = (0, client_1.gql) `
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
function useSetPluginsEnabledMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SetPluginsEnabledDocument, options);
}
exports.useSetPluginsEnabledMutation = useSetPluginsEnabledMutation;
exports.InstallPluginPackagesDocument = (0, client_1.gql) `
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
function useInstallPluginPackagesMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.InstallPluginPackagesDocument, options);
}
exports.useInstallPluginPackagesMutation = useInstallPluginPackagesMutation;
exports.UpdatePluginPackagesDocument = (0, client_1.gql) `
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
function useUpdatePluginPackagesMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.UpdatePluginPackagesDocument, options);
}
exports.useUpdatePluginPackagesMutation = useUpdatePluginPackagesMutation;
exports.UninstallPluginPackagesDocument = (0, client_1.gql) `
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
function useUninstallPluginPackagesMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.UninstallPluginPackagesDocument, options);
}
exports.useUninstallPluginPackagesMutation = useUninstallPluginPackagesMutation;
exports.SceneMarkerCreateDocument = (0, client_1.gql) `
    mutation SceneMarkerCreate($title: String!, $seconds: Float!, $end_seconds: Float, $scene_id: ID!, $primary_tag_id: ID!, $tag_ids: [ID!] = []) {
  sceneMarkerCreate(
    input: {title: $title, seconds: $seconds, end_seconds: $end_seconds, scene_id: $scene_id, primary_tag_id: $primary_tag_id, tag_ids: $tag_ids}
  ) {
    ...SceneMarkerData
  }
}
    ${exports.SceneMarkerDataFragmentDoc}`;
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
function useSceneMarkerCreateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SceneMarkerCreateDocument, options);
}
exports.useSceneMarkerCreateMutation = useSceneMarkerCreateMutation;
exports.SceneMarkerUpdateDocument = (0, client_1.gql) `
    mutation SceneMarkerUpdate($id: ID!, $title: String!, $seconds: Float!, $end_seconds: Float, $scene_id: ID!, $primary_tag_id: ID!, $tag_ids: [ID!] = []) {
  sceneMarkerUpdate(
    input: {id: $id, title: $title, seconds: $seconds, end_seconds: $end_seconds, scene_id: $scene_id, primary_tag_id: $primary_tag_id, tag_ids: $tag_ids}
  ) {
    ...SceneMarkerData
  }
}
    ${exports.SceneMarkerDataFragmentDoc}`;
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
function useSceneMarkerUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SceneMarkerUpdateDocument, options);
}
exports.useSceneMarkerUpdateMutation = useSceneMarkerUpdateMutation;
exports.BulkSceneMarkerUpdateDocument = (0, client_1.gql) `
    mutation BulkSceneMarkerUpdate($input: BulkSceneMarkerUpdateInput!) {
  bulkSceneMarkerUpdate(input: $input) {
    ...SceneMarkerData
  }
}
    ${exports.SceneMarkerDataFragmentDoc}`;
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
function useBulkSceneMarkerUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.BulkSceneMarkerUpdateDocument, options);
}
exports.useBulkSceneMarkerUpdateMutation = useBulkSceneMarkerUpdateMutation;
exports.SceneMarkerDestroyDocument = (0, client_1.gql) `
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
function useSceneMarkerDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SceneMarkerDestroyDocument, options);
}
exports.useSceneMarkerDestroyMutation = useSceneMarkerDestroyMutation;
exports.SceneMarkersDestroyDocument = (0, client_1.gql) `
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
function useSceneMarkersDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SceneMarkersDestroyDocument, options);
}
exports.useSceneMarkersDestroyMutation = useSceneMarkersDestroyMutation;
exports.SceneCreateDocument = (0, client_1.gql) `
    mutation SceneCreate($input: SceneCreateInput!) {
  sceneCreate(input: $input) {
    ...SceneData
  }
}
    ${exports.SceneDataFragmentDoc}`;
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
function useSceneCreateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SceneCreateDocument, options);
}
exports.useSceneCreateMutation = useSceneCreateMutation;
exports.SceneUpdateDocument = (0, client_1.gql) `
    mutation SceneUpdate($input: SceneUpdateInput!) {
  sceneUpdate(input: $input) {
    ...SceneData
  }
}
    ${exports.SceneDataFragmentDoc}`;
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
function useSceneUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SceneUpdateDocument, options);
}
exports.useSceneUpdateMutation = useSceneUpdateMutation;
exports.BulkSceneUpdateDocument = (0, client_1.gql) `
    mutation BulkSceneUpdate($input: BulkSceneUpdateInput!) {
  bulkSceneUpdate(input: $input) {
    ...SceneData
  }
}
    ${exports.SceneDataFragmentDoc}`;
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
function useBulkSceneUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.BulkSceneUpdateDocument, options);
}
exports.useBulkSceneUpdateMutation = useBulkSceneUpdateMutation;
exports.ScenesUpdateDocument = (0, client_1.gql) `
    mutation ScenesUpdate($input: [SceneUpdateInput!]!) {
  scenesUpdate(input: $input) {
    ...SceneData
  }
}
    ${exports.SceneDataFragmentDoc}`;
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
function useScenesUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ScenesUpdateDocument, options);
}
exports.useScenesUpdateMutation = useScenesUpdateMutation;
exports.SceneSaveActivityDocument = (0, client_1.gql) `
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
function useSceneSaveActivityMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SceneSaveActivityDocument, options);
}
exports.useSceneSaveActivityMutation = useSceneSaveActivityMutation;
exports.SceneResetActivityDocument = (0, client_1.gql) `
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
function useSceneResetActivityMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SceneResetActivityDocument, options);
}
exports.useSceneResetActivityMutation = useSceneResetActivityMutation;
exports.SceneAddPlayDocument = (0, client_1.gql) `
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
function useSceneAddPlayMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SceneAddPlayDocument, options);
}
exports.useSceneAddPlayMutation = useSceneAddPlayMutation;
exports.SceneDeletePlayDocument = (0, client_1.gql) `
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
function useSceneDeletePlayMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SceneDeletePlayDocument, options);
}
exports.useSceneDeletePlayMutation = useSceneDeletePlayMutation;
exports.SceneResetPlayCountDocument = (0, client_1.gql) `
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
function useSceneResetPlayCountMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SceneResetPlayCountDocument, options);
}
exports.useSceneResetPlayCountMutation = useSceneResetPlayCountMutation;
exports.SceneAddODocument = (0, client_1.gql) `
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
function useSceneAddOMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SceneAddODocument, options);
}
exports.useSceneAddOMutation = useSceneAddOMutation;
exports.SceneDeleteODocument = (0, client_1.gql) `
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
function useSceneDeleteOMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SceneDeleteODocument, options);
}
exports.useSceneDeleteOMutation = useSceneDeleteOMutation;
exports.SceneResetODocument = (0, client_1.gql) `
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
function useSceneResetOMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SceneResetODocument, options);
}
exports.useSceneResetOMutation = useSceneResetOMutation;
exports.SceneDestroyDocument = (0, client_1.gql) `
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
function useSceneDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SceneDestroyDocument, options);
}
exports.useSceneDestroyMutation = useSceneDestroyMutation;
exports.ScenesDestroyDocument = (0, client_1.gql) `
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
function useScenesDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ScenesDestroyDocument, options);
}
exports.useScenesDestroyMutation = useScenesDestroyMutation;
exports.SceneGenerateScreenshotDocument = (0, client_1.gql) `
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
function useSceneGenerateScreenshotMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SceneGenerateScreenshotDocument, options);
}
exports.useSceneGenerateScreenshotMutation = useSceneGenerateScreenshotMutation;
exports.SceneAssignFileDocument = (0, client_1.gql) `
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
function useSceneAssignFileMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SceneAssignFileDocument, options);
}
exports.useSceneAssignFileMutation = useSceneAssignFileMutation;
exports.SceneMergeDocument = (0, client_1.gql) `
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
function useSceneMergeMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SceneMergeDocument, options);
}
exports.useSceneMergeMutation = useSceneMergeMutation;
exports.ReloadScrapersDocument = (0, client_1.gql) `
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
function useReloadScrapersMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.ReloadScrapersDocument, options);
}
exports.useReloadScrapersMutation = useReloadScrapersMutation;
exports.InstallScraperPackagesDocument = (0, client_1.gql) `
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
function useInstallScraperPackagesMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.InstallScraperPackagesDocument, options);
}
exports.useInstallScraperPackagesMutation = useInstallScraperPackagesMutation;
exports.UpdateScraperPackagesDocument = (0, client_1.gql) `
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
function useUpdateScraperPackagesMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.UpdateScraperPackagesDocument, options);
}
exports.useUpdateScraperPackagesMutation = useUpdateScraperPackagesMutation;
exports.UninstallScraperPackagesDocument = (0, client_1.gql) `
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
function useUninstallScraperPackagesMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.UninstallScraperPackagesDocument, options);
}
exports.useUninstallScraperPackagesMutation = useUninstallScraperPackagesMutation;
exports.SubmitStashBoxFingerprintsDocument = (0, client_1.gql) `
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
function useSubmitStashBoxFingerprintsMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SubmitStashBoxFingerprintsDocument, options);
}
exports.useSubmitStashBoxFingerprintsMutation = useSubmitStashBoxFingerprintsMutation;
exports.StashBoxBatchPerformerTagDocument = (0, client_1.gql) `
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
function useStashBoxBatchPerformerTagMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.StashBoxBatchPerformerTagDocument, options);
}
exports.useStashBoxBatchPerformerTagMutation = useStashBoxBatchPerformerTagMutation;
exports.StashBoxBatchStudioTagDocument = (0, client_1.gql) `
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
function useStashBoxBatchStudioTagMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.StashBoxBatchStudioTagDocument, options);
}
exports.useStashBoxBatchStudioTagMutation = useStashBoxBatchStudioTagMutation;
exports.StashBoxBatchTagTagDocument = (0, client_1.gql) `
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
function useStashBoxBatchTagTagMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.StashBoxBatchTagTagDocument, options);
}
exports.useStashBoxBatchTagTagMutation = useStashBoxBatchTagTagMutation;
exports.SubmitStashBoxSceneDraftDocument = (0, client_1.gql) `
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
function useSubmitStashBoxSceneDraftMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SubmitStashBoxSceneDraftDocument, options);
}
exports.useSubmitStashBoxSceneDraftMutation = useSubmitStashBoxSceneDraftMutation;
exports.SubmitStashBoxPerformerDraftDocument = (0, client_1.gql) `
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
function useSubmitStashBoxPerformerDraftMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.SubmitStashBoxPerformerDraftDocument, options);
}
exports.useSubmitStashBoxPerformerDraftMutation = useSubmitStashBoxPerformerDraftMutation;
exports.StudioCreateDocument = (0, client_1.gql) `
    mutation StudioCreate($input: StudioCreateInput!) {
  studioCreate(input: $input) {
    ...StudioData
  }
}
    ${exports.StudioDataFragmentDoc}`;
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
function useStudioCreateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.StudioCreateDocument, options);
}
exports.useStudioCreateMutation = useStudioCreateMutation;
exports.StudioUpdateDocument = (0, client_1.gql) `
    mutation StudioUpdate($input: StudioUpdateInput!) {
  studioUpdate(input: $input) {
    ...StudioData
  }
}
    ${exports.StudioDataFragmentDoc}`;
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
function useStudioUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.StudioUpdateDocument, options);
}
exports.useStudioUpdateMutation = useStudioUpdateMutation;
exports.BulkStudioUpdateDocument = (0, client_1.gql) `
    mutation BulkStudioUpdate($input: BulkStudioUpdateInput!) {
  bulkStudioUpdate(input: $input) {
    ...StudioData
  }
}
    ${exports.StudioDataFragmentDoc}`;
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
function useBulkStudioUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.BulkStudioUpdateDocument, options);
}
exports.useBulkStudioUpdateMutation = useBulkStudioUpdateMutation;
exports.StudioDestroyDocument = (0, client_1.gql) `
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
function useStudioDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.StudioDestroyDocument, options);
}
exports.useStudioDestroyMutation = useStudioDestroyMutation;
exports.StudiosDestroyDocument = (0, client_1.gql) `
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
function useStudiosDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.StudiosDestroyDocument, options);
}
exports.useStudiosDestroyMutation = useStudiosDestroyMutation;
exports.TagCreateDocument = (0, client_1.gql) `
    mutation TagCreate($input: TagCreateInput!) {
  tagCreate(input: $input) {
    ...TagData
  }
}
    ${exports.TagDataFragmentDoc}`;
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
function useTagCreateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.TagCreateDocument, options);
}
exports.useTagCreateMutation = useTagCreateMutation;
exports.TagDestroyDocument = (0, client_1.gql) `
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
function useTagDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.TagDestroyDocument, options);
}
exports.useTagDestroyMutation = useTagDestroyMutation;
exports.TagsDestroyDocument = (0, client_1.gql) `
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
function useTagsDestroyMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.TagsDestroyDocument, options);
}
exports.useTagsDestroyMutation = useTagsDestroyMutation;
exports.TagUpdateDocument = (0, client_1.gql) `
    mutation TagUpdate($input: TagUpdateInput!) {
  tagUpdate(input: $input) {
    ...TagData
  }
}
    ${exports.TagDataFragmentDoc}`;
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
function useTagUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.TagUpdateDocument, options);
}
exports.useTagUpdateMutation = useTagUpdateMutation;
exports.BulkTagUpdateDocument = (0, client_1.gql) `
    mutation BulkTagUpdate($input: BulkTagUpdateInput!) {
  bulkTagUpdate(input: $input) {
    ...TagData
  }
}
    ${exports.TagDataFragmentDoc}`;
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
function useBulkTagUpdateMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.BulkTagUpdateDocument, options);
}
exports.useBulkTagUpdateMutation = useBulkTagUpdateMutation;
exports.TagsMergeDocument = (0, client_1.gql) `
    mutation TagsMerge($source: [ID!]!, $destination: ID!, $values: TagUpdateInput) {
  tagsMerge(input: {source: $source, destination: $destination, values: $values}) {
    ...TagData
  }
}
    ${exports.TagDataFragmentDoc}`;
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
function useTagsMergeMutation(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation(exports.TagsMergeDocument, options);
}
exports.useTagsMergeMutation = useTagsMergeMutation;
exports.DlnaStatusDocument = (0, client_1.gql) `
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
function useDlnaStatusQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.DlnaStatusDocument, options);
}
exports.useDlnaStatusQuery = useDlnaStatusQuery;
function useDlnaStatusLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.DlnaStatusDocument, options);
}
exports.useDlnaStatusLazyQuery = useDlnaStatusLazyQuery;
function useDlnaStatusSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.DlnaStatusDocument, options);
}
exports.useDlnaStatusSuspenseQuery = useDlnaStatusSuspenseQuery;
function refetchDlnaStatusQuery(variables) {
    return { query: exports.DlnaStatusDocument, variables: variables };
}
exports.refetchDlnaStatusQuery = refetchDlnaStatusQuery;
exports.FindSavedFilterDocument = (0, client_1.gql) `
    query FindSavedFilter($id: ID!) {
  findSavedFilter(id: $id) {
    ...SavedFilterData
  }
}
    ${exports.SavedFilterDataFragmentDoc}`;
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
function useFindSavedFilterQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindSavedFilterDocument, options);
}
exports.useFindSavedFilterQuery = useFindSavedFilterQuery;
function useFindSavedFilterLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindSavedFilterDocument, options);
}
exports.useFindSavedFilterLazyQuery = useFindSavedFilterLazyQuery;
function useFindSavedFilterSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindSavedFilterDocument, options);
}
exports.useFindSavedFilterSuspenseQuery = useFindSavedFilterSuspenseQuery;
function refetchFindSavedFilterQuery(variables) {
    return { query: exports.FindSavedFilterDocument, variables: variables };
}
exports.refetchFindSavedFilterQuery = refetchFindSavedFilterQuery;
exports.FindSavedFiltersDocument = (0, client_1.gql) `
    query FindSavedFilters($mode: FilterMode) {
  findSavedFilters(mode: $mode) {
    ...SavedFilterData
  }
}
    ${exports.SavedFilterDataFragmentDoc}`;
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
function useFindSavedFiltersQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindSavedFiltersDocument, options);
}
exports.useFindSavedFiltersQuery = useFindSavedFiltersQuery;
function useFindSavedFiltersLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindSavedFiltersDocument, options);
}
exports.useFindSavedFiltersLazyQuery = useFindSavedFiltersLazyQuery;
function useFindSavedFiltersSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindSavedFiltersDocument, options);
}
exports.useFindSavedFiltersSuspenseQuery = useFindSavedFiltersSuspenseQuery;
function refetchFindSavedFiltersQuery(variables) {
    return { query: exports.FindSavedFiltersDocument, variables: variables };
}
exports.refetchFindSavedFiltersQuery = refetchFindSavedFiltersQuery;
exports.FindRootFoldersForSelectDocument = (0, client_1.gql) `
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
    ${exports.SelectFolderDataFragmentDoc}`;
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
function useFindRootFoldersForSelectQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindRootFoldersForSelectDocument, options);
}
exports.useFindRootFoldersForSelectQuery = useFindRootFoldersForSelectQuery;
function useFindRootFoldersForSelectLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindRootFoldersForSelectDocument, options);
}
exports.useFindRootFoldersForSelectLazyQuery = useFindRootFoldersForSelectLazyQuery;
function useFindRootFoldersForSelectSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindRootFoldersForSelectDocument, options);
}
exports.useFindRootFoldersForSelectSuspenseQuery = useFindRootFoldersForSelectSuspenseQuery;
function refetchFindRootFoldersForSelectQuery(variables) {
    return { query: exports.FindRootFoldersForSelectDocument, variables: variables };
}
exports.refetchFindRootFoldersForSelectQuery = refetchFindRootFoldersForSelectQuery;
exports.FindFoldersForQueryDocument = (0, client_1.gql) `
    query FindFoldersForQuery($filter: FindFilterType, $folder_filter: FolderFilterType, $ids: [ID!]) {
  findFolders(filter: $filter, folder_filter: $folder_filter, ids: $ids) {
    count
    folders {
      ...RecursiveFolderData
    }
  }
}
    ${exports.RecursiveFolderDataFragmentDoc}`;
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
function useFindFoldersForQueryQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindFoldersForQueryDocument, options);
}
exports.useFindFoldersForQueryQuery = useFindFoldersForQueryQuery;
function useFindFoldersForQueryLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindFoldersForQueryDocument, options);
}
exports.useFindFoldersForQueryLazyQuery = useFindFoldersForQueryLazyQuery;
function useFindFoldersForQuerySuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindFoldersForQueryDocument, options);
}
exports.useFindFoldersForQuerySuspenseQuery = useFindFoldersForQuerySuspenseQuery;
function refetchFindFoldersForQueryQuery(variables) {
    return { query: exports.FindFoldersForQueryDocument, variables: variables };
}
exports.refetchFindFoldersForQueryQuery = refetchFindFoldersForQueryQuery;
exports.FindFolderHierarchyForIDsDocument = (0, client_1.gql) `
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
    ${exports.SelectFolderDataFragmentDoc}`;
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
function useFindFolderHierarchyForIDsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindFolderHierarchyForIDsDocument, options);
}
exports.useFindFolderHierarchyForIDsQuery = useFindFolderHierarchyForIDsQuery;
function useFindFolderHierarchyForIDsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindFolderHierarchyForIDsDocument, options);
}
exports.useFindFolderHierarchyForIDsLazyQuery = useFindFolderHierarchyForIDsLazyQuery;
function useFindFolderHierarchyForIDsSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindFolderHierarchyForIDsDocument, options);
}
exports.useFindFolderHierarchyForIDsSuspenseQuery = useFindFolderHierarchyForIDsSuspenseQuery;
function refetchFindFolderHierarchyForIDsQuery(variables) {
    return { query: exports.FindFolderHierarchyForIDsDocument, variables: variables };
}
exports.refetchFindFolderHierarchyForIDsQuery = refetchFindFolderHierarchyForIDsQuery;
exports.FindGalleriesDocument = (0, client_1.gql) `
    query FindGalleries($filter: FindFilterType, $gallery_filter: GalleryFilterType) {
  findGalleries(gallery_filter: $gallery_filter, filter: $filter) {
    count
    galleries {
      ...SlimGalleryData
    }
  }
}
    ${exports.SlimGalleryDataFragmentDoc}`;
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
function useFindGalleriesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindGalleriesDocument, options);
}
exports.useFindGalleriesQuery = useFindGalleriesQuery;
function useFindGalleriesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindGalleriesDocument, options);
}
exports.useFindGalleriesLazyQuery = useFindGalleriesLazyQuery;
function useFindGalleriesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindGalleriesDocument, options);
}
exports.useFindGalleriesSuspenseQuery = useFindGalleriesSuspenseQuery;
function refetchFindGalleriesQuery(variables) {
    return { query: exports.FindGalleriesDocument, variables: variables };
}
exports.refetchFindGalleriesQuery = refetchFindGalleriesQuery;
exports.FindGalleryDocument = (0, client_1.gql) `
    query FindGallery($id: ID!) {
  findGallery(id: $id) {
    ...GalleryData
  }
}
    ${exports.GalleryDataFragmentDoc}`;
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
function useFindGalleryQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindGalleryDocument, options);
}
exports.useFindGalleryQuery = useFindGalleryQuery;
function useFindGalleryLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindGalleryDocument, options);
}
exports.useFindGalleryLazyQuery = useFindGalleryLazyQuery;
function useFindGallerySuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindGalleryDocument, options);
}
exports.useFindGallerySuspenseQuery = useFindGallerySuspenseQuery;
function refetchFindGalleryQuery(variables) {
    return { query: exports.FindGalleryDocument, variables: variables };
}
exports.refetchFindGalleryQuery = refetchFindGalleryQuery;
exports.FindGalleriesForSelectDocument = (0, client_1.gql) `
    query FindGalleriesForSelect($filter: FindFilterType, $gallery_filter: GalleryFilterType, $ids: [ID!]) {
  findGalleries(filter: $filter, gallery_filter: $gallery_filter, ids: $ids) {
    count
    galleries {
      ...SelectGalleryData
    }
  }
}
    ${exports.SelectGalleryDataFragmentDoc}`;
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
function useFindGalleriesForSelectQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindGalleriesForSelectDocument, options);
}
exports.useFindGalleriesForSelectQuery = useFindGalleriesForSelectQuery;
function useFindGalleriesForSelectLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindGalleriesForSelectDocument, options);
}
exports.useFindGalleriesForSelectLazyQuery = useFindGalleriesForSelectLazyQuery;
function useFindGalleriesForSelectSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindGalleriesForSelectDocument, options);
}
exports.useFindGalleriesForSelectSuspenseQuery = useFindGalleriesForSelectSuspenseQuery;
function refetchFindGalleriesForSelectQuery(variables) {
    return { query: exports.FindGalleriesForSelectDocument, variables: variables };
}
exports.refetchFindGalleriesForSelectQuery = refetchFindGalleriesForSelectQuery;
exports.FindGalleryImageIdDocument = (0, client_1.gql) `
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
function useFindGalleryImageIdQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindGalleryImageIdDocument, options);
}
exports.useFindGalleryImageIdQuery = useFindGalleryImageIdQuery;
function useFindGalleryImageIdLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindGalleryImageIdDocument, options);
}
exports.useFindGalleryImageIdLazyQuery = useFindGalleryImageIdLazyQuery;
function useFindGalleryImageIdSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindGalleryImageIdDocument, options);
}
exports.useFindGalleryImageIdSuspenseQuery = useFindGalleryImageIdSuspenseQuery;
function refetchFindGalleryImageIdQuery(variables) {
    return { query: exports.FindGalleryImageIdDocument, variables: variables };
}
exports.refetchFindGalleryImageIdQuery = refetchFindGalleryImageIdQuery;
exports.FindImagesDocument = (0, client_1.gql) `
    query FindImages($filter: FindFilterType, $image_filter: ImageFilterType, $image_ids: [Int!]) {
  findImages(filter: $filter, image_filter: $image_filter, image_ids: $image_ids) {
    count
    images {
      ...SlimImageData
    }
  }
}
    ${exports.SlimImageDataFragmentDoc}`;
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
function useFindImagesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindImagesDocument, options);
}
exports.useFindImagesQuery = useFindImagesQuery;
function useFindImagesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindImagesDocument, options);
}
exports.useFindImagesLazyQuery = useFindImagesLazyQuery;
function useFindImagesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindImagesDocument, options);
}
exports.useFindImagesSuspenseQuery = useFindImagesSuspenseQuery;
function refetchFindImagesQuery(variables) {
    return { query: exports.FindImagesDocument, variables: variables };
}
exports.refetchFindImagesQuery = refetchFindImagesQuery;
exports.FindImagesMetadataDocument = (0, client_1.gql) `
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
function useFindImagesMetadataQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindImagesMetadataDocument, options);
}
exports.useFindImagesMetadataQuery = useFindImagesMetadataQuery;
function useFindImagesMetadataLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindImagesMetadataDocument, options);
}
exports.useFindImagesMetadataLazyQuery = useFindImagesMetadataLazyQuery;
function useFindImagesMetadataSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindImagesMetadataDocument, options);
}
exports.useFindImagesMetadataSuspenseQuery = useFindImagesMetadataSuspenseQuery;
function refetchFindImagesMetadataQuery(variables) {
    return { query: exports.FindImagesMetadataDocument, variables: variables };
}
exports.refetchFindImagesMetadataQuery = refetchFindImagesMetadataQuery;
exports.FindImageDocument = (0, client_1.gql) `
    query FindImage($id: ID!, $checksum: String) {
  findImage(id: $id, checksum: $checksum) {
    ...ImageData
  }
}
    ${exports.ImageDataFragmentDoc}`;
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
function useFindImageQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindImageDocument, options);
}
exports.useFindImageQuery = useFindImageQuery;
function useFindImageLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindImageDocument, options);
}
exports.useFindImageLazyQuery = useFindImageLazyQuery;
function useFindImageSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindImageDocument, options);
}
exports.useFindImageSuspenseQuery = useFindImageSuspenseQuery;
function refetchFindImageQuery(variables) {
    return { query: exports.FindImageDocument, variables: variables };
}
exports.refetchFindImageQuery = refetchFindImageQuery;
exports.JobQueueDocument = (0, client_1.gql) `
    query JobQueue {
  jobQueue {
    ...JobData
  }
}
    ${exports.JobDataFragmentDoc}`;
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
function useJobQueueQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.JobQueueDocument, options);
}
exports.useJobQueueQuery = useJobQueueQuery;
function useJobQueueLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.JobQueueDocument, options);
}
exports.useJobQueueLazyQuery = useJobQueueLazyQuery;
function useJobQueueSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.JobQueueDocument, options);
}
exports.useJobQueueSuspenseQuery = useJobQueueSuspenseQuery;
function refetchJobQueueQuery(variables) {
    return { query: exports.JobQueueDocument, variables: variables };
}
exports.refetchJobQueueQuery = refetchJobQueueQuery;
exports.FindJobDocument = (0, client_1.gql) `
    query FindJob($input: FindJobInput!) {
  findJob(input: $input) {
    ...JobData
  }
}
    ${exports.JobDataFragmentDoc}`;
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
function useFindJobQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindJobDocument, options);
}
exports.useFindJobQuery = useFindJobQuery;
function useFindJobLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindJobDocument, options);
}
exports.useFindJobLazyQuery = useFindJobLazyQuery;
function useFindJobSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindJobDocument, options);
}
exports.useFindJobSuspenseQuery = useFindJobSuspenseQuery;
function refetchFindJobQuery(variables) {
    return { query: exports.FindJobDocument, variables: variables };
}
exports.refetchFindJobQuery = refetchFindJobQuery;
exports.SceneWallDocument = (0, client_1.gql) `
    query SceneWall($q: String) {
  sceneWall(q: $q) {
    ...SceneData
  }
}
    ${exports.SceneDataFragmentDoc}`;
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
function useSceneWallQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.SceneWallDocument, options);
}
exports.useSceneWallQuery = useSceneWallQuery;
function useSceneWallLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.SceneWallDocument, options);
}
exports.useSceneWallLazyQuery = useSceneWallLazyQuery;
function useSceneWallSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.SceneWallDocument, options);
}
exports.useSceneWallSuspenseQuery = useSceneWallSuspenseQuery;
function refetchSceneWallQuery(variables) {
    return { query: exports.SceneWallDocument, variables: variables };
}
exports.refetchSceneWallQuery = refetchSceneWallQuery;
exports.MarkerWallDocument = (0, client_1.gql) `
    query MarkerWall($q: String) {
  markerWall(q: $q) {
    ...SceneMarkerData
  }
}
    ${exports.SceneMarkerDataFragmentDoc}`;
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
function useMarkerWallQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.MarkerWallDocument, options);
}
exports.useMarkerWallQuery = useMarkerWallQuery;
function useMarkerWallLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.MarkerWallDocument, options);
}
exports.useMarkerWallLazyQuery = useMarkerWallLazyQuery;
function useMarkerWallSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.MarkerWallDocument, options);
}
exports.useMarkerWallSuspenseQuery = useMarkerWallSuspenseQuery;
function refetchMarkerWallQuery(variables) {
    return { query: exports.MarkerWallDocument, variables: variables };
}
exports.refetchMarkerWallQuery = refetchMarkerWallQuery;
exports.MarkerStringsDocument = (0, client_1.gql) `
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
function useMarkerStringsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.MarkerStringsDocument, options);
}
exports.useMarkerStringsQuery = useMarkerStringsQuery;
function useMarkerStringsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.MarkerStringsDocument, options);
}
exports.useMarkerStringsLazyQuery = useMarkerStringsLazyQuery;
function useMarkerStringsSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.MarkerStringsDocument, options);
}
exports.useMarkerStringsSuspenseQuery = useMarkerStringsSuspenseQuery;
function refetchMarkerStringsQuery(variables) {
    return { query: exports.MarkerStringsDocument, variables: variables };
}
exports.refetchMarkerStringsQuery = refetchMarkerStringsQuery;
exports.StatsDocument = (0, client_1.gql) `
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
function useStatsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.StatsDocument, options);
}
exports.useStatsQuery = useStatsQuery;
function useStatsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.StatsDocument, options);
}
exports.useStatsLazyQuery = useStatsLazyQuery;
function useStatsSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.StatsDocument, options);
}
exports.useStatsSuspenseQuery = useStatsSuspenseQuery;
function refetchStatsQuery(variables) {
    return { query: exports.StatsDocument, variables: variables };
}
exports.refetchStatsQuery = refetchStatsQuery;
exports.LogsDocument = (0, client_1.gql) `
    query Logs {
  logs {
    ...LogEntryData
  }
}
    ${exports.LogEntryDataFragmentDoc}`;
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
function useLogsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.LogsDocument, options);
}
exports.useLogsQuery = useLogsQuery;
function useLogsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.LogsDocument, options);
}
exports.useLogsLazyQuery = useLogsLazyQuery;
function useLogsSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.LogsDocument, options);
}
exports.useLogsSuspenseQuery = useLogsSuspenseQuery;
function refetchLogsQuery(variables) {
    return { query: exports.LogsDocument, variables: variables };
}
exports.refetchLogsQuery = refetchLogsQuery;
exports.VersionDocument = (0, client_1.gql) `
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
function useVersionQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.VersionDocument, options);
}
exports.useVersionQuery = useVersionQuery;
function useVersionLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.VersionDocument, options);
}
exports.useVersionLazyQuery = useVersionLazyQuery;
function useVersionSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.VersionDocument, options);
}
exports.useVersionSuspenseQuery = useVersionSuspenseQuery;
function refetchVersionQuery(variables) {
    return { query: exports.VersionDocument, variables: variables };
}
exports.refetchVersionQuery = refetchVersionQuery;
exports.LatestVersionDocument = (0, client_1.gql) `
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
function useLatestVersionQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.LatestVersionDocument, options);
}
exports.useLatestVersionQuery = useLatestVersionQuery;
function useLatestVersionLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.LatestVersionDocument, options);
}
exports.useLatestVersionLazyQuery = useLatestVersionLazyQuery;
function useLatestVersionSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.LatestVersionDocument, options);
}
exports.useLatestVersionSuspenseQuery = useLatestVersionSuspenseQuery;
function refetchLatestVersionQuery(variables) {
    return { query: exports.LatestVersionDocument, variables: variables };
}
exports.refetchLatestVersionQuery = refetchLatestVersionQuery;
exports.FindGroupsDocument = (0, client_1.gql) `
    query FindGroups($filter: FindFilterType, $group_filter: GroupFilterType) {
  findGroups(filter: $filter, group_filter: $group_filter) {
    count
    groups {
      ...ListGroupData
    }
  }
}
    ${exports.ListGroupDataFragmentDoc}`;
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
function useFindGroupsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindGroupsDocument, options);
}
exports.useFindGroupsQuery = useFindGroupsQuery;
function useFindGroupsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindGroupsDocument, options);
}
exports.useFindGroupsLazyQuery = useFindGroupsLazyQuery;
function useFindGroupsSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindGroupsDocument, options);
}
exports.useFindGroupsSuspenseQuery = useFindGroupsSuspenseQuery;
function refetchFindGroupsQuery(variables) {
    return { query: exports.FindGroupsDocument, variables: variables };
}
exports.refetchFindGroupsQuery = refetchFindGroupsQuery;
exports.FindGroupDocument = (0, client_1.gql) `
    query FindGroup($id: ID!) {
  findGroup(id: $id) {
    ...GroupData
  }
}
    ${exports.GroupDataFragmentDoc}`;
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
function useFindGroupQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindGroupDocument, options);
}
exports.useFindGroupQuery = useFindGroupQuery;
function useFindGroupLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindGroupDocument, options);
}
exports.useFindGroupLazyQuery = useFindGroupLazyQuery;
function useFindGroupSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindGroupDocument, options);
}
exports.useFindGroupSuspenseQuery = useFindGroupSuspenseQuery;
function refetchFindGroupQuery(variables) {
    return { query: exports.FindGroupDocument, variables: variables };
}
exports.refetchFindGroupQuery = refetchFindGroupQuery;
exports.FindGroupsForSelectDocument = (0, client_1.gql) `
    query FindGroupsForSelect($filter: FindFilterType, $group_filter: GroupFilterType, $ids: [ID!]) {
  findGroups(filter: $filter, group_filter: $group_filter, ids: $ids) {
    count
    groups {
      ...SelectGroupData
    }
  }
}
    ${exports.SelectGroupDataFragmentDoc}`;
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
function useFindGroupsForSelectQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindGroupsForSelectDocument, options);
}
exports.useFindGroupsForSelectQuery = useFindGroupsForSelectQuery;
function useFindGroupsForSelectLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindGroupsForSelectDocument, options);
}
exports.useFindGroupsForSelectLazyQuery = useFindGroupsForSelectLazyQuery;
function useFindGroupsForSelectSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindGroupsForSelectDocument, options);
}
exports.useFindGroupsForSelectSuspenseQuery = useFindGroupsForSelectSuspenseQuery;
function refetchFindGroupsForSelectQuery(variables) {
    return { query: exports.FindGroupsForSelectDocument, variables: variables };
}
exports.refetchFindGroupsForSelectQuery = refetchFindGroupsForSelectQuery;
exports.FindPerformersDocument = (0, client_1.gql) `
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
    ${exports.PerformerDataFragmentDoc}`;
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
function useFindPerformersQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindPerformersDocument, options);
}
exports.useFindPerformersQuery = useFindPerformersQuery;
function useFindPerformersLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindPerformersDocument, options);
}
exports.useFindPerformersLazyQuery = useFindPerformersLazyQuery;
function useFindPerformersSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindPerformersDocument, options);
}
exports.useFindPerformersSuspenseQuery = useFindPerformersSuspenseQuery;
function refetchFindPerformersQuery(variables) {
    return { query: exports.FindPerformersDocument, variables: variables };
}
exports.refetchFindPerformersQuery = refetchFindPerformersQuery;
exports.FindPerformerDocument = (0, client_1.gql) `
    query FindPerformer($id: ID!) {
  findPerformer(id: $id) {
    ...PerformerData
  }
}
    ${exports.PerformerDataFragmentDoc}`;
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
function useFindPerformerQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindPerformerDocument, options);
}
exports.useFindPerformerQuery = useFindPerformerQuery;
function useFindPerformerLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindPerformerDocument, options);
}
exports.useFindPerformerLazyQuery = useFindPerformerLazyQuery;
function useFindPerformerSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindPerformerDocument, options);
}
exports.useFindPerformerSuspenseQuery = useFindPerformerSuspenseQuery;
function refetchFindPerformerQuery(variables) {
    return { query: exports.FindPerformerDocument, variables: variables };
}
exports.refetchFindPerformerQuery = refetchFindPerformerQuery;
exports.FindPerformersForSelectDocument = (0, client_1.gql) `
    query FindPerformersForSelect($filter: FindFilterType, $performer_filter: PerformerFilterType, $ids: [ID!]) {
  findPerformers(filter: $filter, performer_filter: $performer_filter, ids: $ids) {
    count
    performers {
      ...SelectPerformerData
    }
  }
}
    ${exports.SelectPerformerDataFragmentDoc}`;
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
function useFindPerformersForSelectQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindPerformersForSelectDocument, options);
}
exports.useFindPerformersForSelectQuery = useFindPerformersForSelectQuery;
function useFindPerformersForSelectLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindPerformersForSelectDocument, options);
}
exports.useFindPerformersForSelectLazyQuery = useFindPerformersForSelectLazyQuery;
function useFindPerformersForSelectSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindPerformersForSelectDocument, options);
}
exports.useFindPerformersForSelectSuspenseQuery = useFindPerformersForSelectSuspenseQuery;
function refetchFindPerformersForSelectQuery(variables) {
    return { query: exports.FindPerformersForSelectDocument, variables: variables };
}
exports.refetchFindPerformersForSelectQuery = refetchFindPerformersForSelectQuery;
exports.PluginsDocument = (0, client_1.gql) `
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
function usePluginsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.PluginsDocument, options);
}
exports.usePluginsQuery = usePluginsQuery;
function usePluginsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.PluginsDocument, options);
}
exports.usePluginsLazyQuery = usePluginsLazyQuery;
function usePluginsSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.PluginsDocument, options);
}
exports.usePluginsSuspenseQuery = usePluginsSuspenseQuery;
function refetchPluginsQuery(variables) {
    return { query: exports.PluginsDocument, variables: variables };
}
exports.refetchPluginsQuery = refetchPluginsQuery;
exports.PluginTasksDocument = (0, client_1.gql) `
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
function usePluginTasksQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.PluginTasksDocument, options);
}
exports.usePluginTasksQuery = usePluginTasksQuery;
function usePluginTasksLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.PluginTasksDocument, options);
}
exports.usePluginTasksLazyQuery = usePluginTasksLazyQuery;
function usePluginTasksSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.PluginTasksDocument, options);
}
exports.usePluginTasksSuspenseQuery = usePluginTasksSuspenseQuery;
function refetchPluginTasksQuery(variables) {
    return { query: exports.PluginTasksDocument, variables: variables };
}
exports.refetchPluginTasksQuery = refetchPluginTasksQuery;
exports.InstalledPluginPackagesDocument = (0, client_1.gql) `
    query InstalledPluginPackages {
  installedPackages(type: Plugin) {
    ...PackageData
  }
}
    ${exports.PackageDataFragmentDoc}`;
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
function useInstalledPluginPackagesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.InstalledPluginPackagesDocument, options);
}
exports.useInstalledPluginPackagesQuery = useInstalledPluginPackagesQuery;
function useInstalledPluginPackagesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.InstalledPluginPackagesDocument, options);
}
exports.useInstalledPluginPackagesLazyQuery = useInstalledPluginPackagesLazyQuery;
function useInstalledPluginPackagesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.InstalledPluginPackagesDocument, options);
}
exports.useInstalledPluginPackagesSuspenseQuery = useInstalledPluginPackagesSuspenseQuery;
function refetchInstalledPluginPackagesQuery(variables) {
    return { query: exports.InstalledPluginPackagesDocument, variables: variables };
}
exports.refetchInstalledPluginPackagesQuery = refetchInstalledPluginPackagesQuery;
exports.InstalledPluginPackagesStatusDocument = (0, client_1.gql) `
    query InstalledPluginPackagesStatus {
  installedPackages(type: Plugin) {
    ...PackageData
    source_package {
      ...PackageData
    }
  }
}
    ${exports.PackageDataFragmentDoc}`;
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
function useInstalledPluginPackagesStatusQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.InstalledPluginPackagesStatusDocument, options);
}
exports.useInstalledPluginPackagesStatusQuery = useInstalledPluginPackagesStatusQuery;
function useInstalledPluginPackagesStatusLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.InstalledPluginPackagesStatusDocument, options);
}
exports.useInstalledPluginPackagesStatusLazyQuery = useInstalledPluginPackagesStatusLazyQuery;
function useInstalledPluginPackagesStatusSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.InstalledPluginPackagesStatusDocument, options);
}
exports.useInstalledPluginPackagesStatusSuspenseQuery = useInstalledPluginPackagesStatusSuspenseQuery;
function refetchInstalledPluginPackagesStatusQuery(variables) {
    return { query: exports.InstalledPluginPackagesStatusDocument, variables: variables };
}
exports.refetchInstalledPluginPackagesStatusQuery = refetchInstalledPluginPackagesStatusQuery;
exports.AvailablePluginPackagesDocument = (0, client_1.gql) `
    query AvailablePluginPackages($source: String!) {
  availablePackages(source: $source, type: Plugin) {
    ...PackageData
    requires {
      package_id
    }
  }
}
    ${exports.PackageDataFragmentDoc}`;
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
function useAvailablePluginPackagesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.AvailablePluginPackagesDocument, options);
}
exports.useAvailablePluginPackagesQuery = useAvailablePluginPackagesQuery;
function useAvailablePluginPackagesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.AvailablePluginPackagesDocument, options);
}
exports.useAvailablePluginPackagesLazyQuery = useAvailablePluginPackagesLazyQuery;
function useAvailablePluginPackagesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.AvailablePluginPackagesDocument, options);
}
exports.useAvailablePluginPackagesSuspenseQuery = useAvailablePluginPackagesSuspenseQuery;
function refetchAvailablePluginPackagesQuery(variables) {
    return { query: exports.AvailablePluginPackagesDocument, variables: variables };
}
exports.refetchAvailablePluginPackagesQuery = refetchAvailablePluginPackagesQuery;
exports.FindSceneMarkersDocument = (0, client_1.gql) `
    query FindSceneMarkers($filter: FindFilterType, $scene_marker_filter: SceneMarkerFilterType) {
  findSceneMarkers(filter: $filter, scene_marker_filter: $scene_marker_filter) {
    count
    scene_markers {
      ...SceneMarkerData
    }
  }
}
    ${exports.SceneMarkerDataFragmentDoc}`;
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
function useFindSceneMarkersQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindSceneMarkersDocument, options);
}
exports.useFindSceneMarkersQuery = useFindSceneMarkersQuery;
function useFindSceneMarkersLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindSceneMarkersDocument, options);
}
exports.useFindSceneMarkersLazyQuery = useFindSceneMarkersLazyQuery;
function useFindSceneMarkersSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindSceneMarkersDocument, options);
}
exports.useFindSceneMarkersSuspenseQuery = useFindSceneMarkersSuspenseQuery;
function refetchFindSceneMarkersQuery(variables) {
    return { query: exports.FindSceneMarkersDocument, variables: variables };
}
exports.refetchFindSceneMarkersQuery = refetchFindSceneMarkersQuery;
exports.FindScenesDocument = (0, client_1.gql) `
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
    ${exports.SlimSceneDataFragmentDoc}`;
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
function useFindScenesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindScenesDocument, options);
}
exports.useFindScenesQuery = useFindScenesQuery;
function useFindScenesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindScenesDocument, options);
}
exports.useFindScenesLazyQuery = useFindScenesLazyQuery;
function useFindScenesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindScenesDocument, options);
}
exports.useFindScenesSuspenseQuery = useFindScenesSuspenseQuery;
function refetchFindScenesQuery(variables) {
    return { query: exports.FindScenesDocument, variables: variables };
}
exports.refetchFindScenesQuery = refetchFindScenesQuery;
exports.FindScenesByPathRegexDocument = (0, client_1.gql) `
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
    ${exports.SlimSceneDataFragmentDoc}`;
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
function useFindScenesByPathRegexQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindScenesByPathRegexDocument, options);
}
exports.useFindScenesByPathRegexQuery = useFindScenesByPathRegexQuery;
function useFindScenesByPathRegexLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindScenesByPathRegexDocument, options);
}
exports.useFindScenesByPathRegexLazyQuery = useFindScenesByPathRegexLazyQuery;
function useFindScenesByPathRegexSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindScenesByPathRegexDocument, options);
}
exports.useFindScenesByPathRegexSuspenseQuery = useFindScenesByPathRegexSuspenseQuery;
function refetchFindScenesByPathRegexQuery(variables) {
    return { query: exports.FindScenesByPathRegexDocument, variables: variables };
}
exports.refetchFindScenesByPathRegexQuery = refetchFindScenesByPathRegexQuery;
exports.FindDuplicateScenesDocument = (0, client_1.gql) `
    query FindDuplicateScenes($distance: Int, $duration_diff: Float) {
  findDuplicateScenes(distance: $distance, duration_diff: $duration_diff) {
    ...SlimSceneData
  }
}
    ${exports.SlimSceneDataFragmentDoc}`;
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
function useFindDuplicateScenesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindDuplicateScenesDocument, options);
}
exports.useFindDuplicateScenesQuery = useFindDuplicateScenesQuery;
function useFindDuplicateScenesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindDuplicateScenesDocument, options);
}
exports.useFindDuplicateScenesLazyQuery = useFindDuplicateScenesLazyQuery;
function useFindDuplicateScenesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindDuplicateScenesDocument, options);
}
exports.useFindDuplicateScenesSuspenseQuery = useFindDuplicateScenesSuspenseQuery;
function refetchFindDuplicateScenesQuery(variables) {
    return { query: exports.FindDuplicateScenesDocument, variables: variables };
}
exports.refetchFindDuplicateScenesQuery = refetchFindDuplicateScenesQuery;
exports.FindSceneDocument = (0, client_1.gql) `
    query FindScene($id: ID!, $checksum: String) {
  findScene(id: $id, checksum: $checksum) {
    ...SceneData
  }
}
    ${exports.SceneDataFragmentDoc}`;
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
function useFindSceneQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindSceneDocument, options);
}
exports.useFindSceneQuery = useFindSceneQuery;
function useFindSceneLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindSceneDocument, options);
}
exports.useFindSceneLazyQuery = useFindSceneLazyQuery;
function useFindSceneSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindSceneDocument, options);
}
exports.useFindSceneSuspenseQuery = useFindSceneSuspenseQuery;
function refetchFindSceneQuery(variables) {
    return { query: exports.FindSceneDocument, variables: variables };
}
exports.refetchFindSceneQuery = refetchFindSceneQuery;
exports.FindFullScenesDocument = (0, client_1.gql) `
    query FindFullScenes($ids: [Int!]) {
  findScenes(scene_ids: $ids) {
    scenes {
      ...SceneData
    }
  }
}
    ${exports.SceneDataFragmentDoc}`;
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
function useFindFullScenesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindFullScenesDocument, options);
}
exports.useFindFullScenesQuery = useFindFullScenesQuery;
function useFindFullScenesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindFullScenesDocument, options);
}
exports.useFindFullScenesLazyQuery = useFindFullScenesLazyQuery;
function useFindFullScenesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindFullScenesDocument, options);
}
exports.useFindFullScenesSuspenseQuery = useFindFullScenesSuspenseQuery;
function refetchFindFullScenesQuery(variables) {
    return { query: exports.FindFullScenesDocument, variables: variables };
}
exports.refetchFindFullScenesQuery = refetchFindFullScenesQuery;
exports.FindSceneMarkerTagsDocument = (0, client_1.gql) `
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
    ${exports.SceneMarkerDataFragmentDoc}`;
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
function useFindSceneMarkerTagsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindSceneMarkerTagsDocument, options);
}
exports.useFindSceneMarkerTagsQuery = useFindSceneMarkerTagsQuery;
function useFindSceneMarkerTagsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindSceneMarkerTagsDocument, options);
}
exports.useFindSceneMarkerTagsLazyQuery = useFindSceneMarkerTagsLazyQuery;
function useFindSceneMarkerTagsSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindSceneMarkerTagsDocument, options);
}
exports.useFindSceneMarkerTagsSuspenseQuery = useFindSceneMarkerTagsSuspenseQuery;
function refetchFindSceneMarkerTagsQuery(variables) {
    return { query: exports.FindSceneMarkerTagsDocument, variables: variables };
}
exports.refetchFindSceneMarkerTagsQuery = refetchFindSceneMarkerTagsQuery;
exports.ParseSceneFilenamesDocument = (0, client_1.gql) `
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
    ${exports.SlimSceneDataFragmentDoc}`;
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
function useParseSceneFilenamesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.ParseSceneFilenamesDocument, options);
}
exports.useParseSceneFilenamesQuery = useParseSceneFilenamesQuery;
function useParseSceneFilenamesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.ParseSceneFilenamesDocument, options);
}
exports.useParseSceneFilenamesLazyQuery = useParseSceneFilenamesLazyQuery;
function useParseSceneFilenamesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.ParseSceneFilenamesDocument, options);
}
exports.useParseSceneFilenamesSuspenseQuery = useParseSceneFilenamesSuspenseQuery;
function refetchParseSceneFilenamesQuery(variables) {
    return { query: exports.ParseSceneFilenamesDocument, variables: variables };
}
exports.refetchParseSceneFilenamesQuery = refetchParseSceneFilenamesQuery;
exports.SceneStreamsDocument = (0, client_1.gql) `
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
function useSceneStreamsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.SceneStreamsDocument, options);
}
exports.useSceneStreamsQuery = useSceneStreamsQuery;
function useSceneStreamsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.SceneStreamsDocument, options);
}
exports.useSceneStreamsLazyQuery = useSceneStreamsLazyQuery;
function useSceneStreamsSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.SceneStreamsDocument, options);
}
exports.useSceneStreamsSuspenseQuery = useSceneStreamsSuspenseQuery;
function refetchSceneStreamsQuery(variables) {
    return { query: exports.SceneStreamsDocument, variables: variables };
}
exports.refetchSceneStreamsQuery = refetchSceneStreamsQuery;
exports.FindScenesForSelectDocument = (0, client_1.gql) `
    query FindScenesForSelect($filter: FindFilterType, $scene_filter: SceneFilterType, $ids: [ID!]) {
  findScenes(filter: $filter, scene_filter: $scene_filter, ids: $ids) {
    count
    scenes {
      ...SelectSceneData
    }
  }
}
    ${exports.SelectSceneDataFragmentDoc}`;
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
function useFindScenesForSelectQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindScenesForSelectDocument, options);
}
exports.useFindScenesForSelectQuery = useFindScenesForSelectQuery;
function useFindScenesForSelectLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindScenesForSelectDocument, options);
}
exports.useFindScenesForSelectLazyQuery = useFindScenesForSelectLazyQuery;
function useFindScenesForSelectSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindScenesForSelectDocument, options);
}
exports.useFindScenesForSelectSuspenseQuery = useFindScenesForSelectSuspenseQuery;
function refetchFindScenesForSelectQuery(variables) {
    return { query: exports.FindScenesForSelectDocument, variables: variables };
}
exports.refetchFindScenesForSelectQuery = refetchFindScenesForSelectQuery;
exports.ListPerformerScrapersDocument = (0, client_1.gql) `
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
function useListPerformerScrapersQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.ListPerformerScrapersDocument, options);
}
exports.useListPerformerScrapersQuery = useListPerformerScrapersQuery;
function useListPerformerScrapersLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.ListPerformerScrapersDocument, options);
}
exports.useListPerformerScrapersLazyQuery = useListPerformerScrapersLazyQuery;
function useListPerformerScrapersSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.ListPerformerScrapersDocument, options);
}
exports.useListPerformerScrapersSuspenseQuery = useListPerformerScrapersSuspenseQuery;
function refetchListPerformerScrapersQuery(variables) {
    return { query: exports.ListPerformerScrapersDocument, variables: variables };
}
exports.refetchListPerformerScrapersQuery = refetchListPerformerScrapersQuery;
exports.ListSceneScrapersDocument = (0, client_1.gql) `
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
function useListSceneScrapersQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.ListSceneScrapersDocument, options);
}
exports.useListSceneScrapersQuery = useListSceneScrapersQuery;
function useListSceneScrapersLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.ListSceneScrapersDocument, options);
}
exports.useListSceneScrapersLazyQuery = useListSceneScrapersLazyQuery;
function useListSceneScrapersSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.ListSceneScrapersDocument, options);
}
exports.useListSceneScrapersSuspenseQuery = useListSceneScrapersSuspenseQuery;
function refetchListSceneScrapersQuery(variables) {
    return { query: exports.ListSceneScrapersDocument, variables: variables };
}
exports.refetchListSceneScrapersQuery = refetchListSceneScrapersQuery;
exports.ListGalleryScrapersDocument = (0, client_1.gql) `
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
function useListGalleryScrapersQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.ListGalleryScrapersDocument, options);
}
exports.useListGalleryScrapersQuery = useListGalleryScrapersQuery;
function useListGalleryScrapersLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.ListGalleryScrapersDocument, options);
}
exports.useListGalleryScrapersLazyQuery = useListGalleryScrapersLazyQuery;
function useListGalleryScrapersSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.ListGalleryScrapersDocument, options);
}
exports.useListGalleryScrapersSuspenseQuery = useListGalleryScrapersSuspenseQuery;
function refetchListGalleryScrapersQuery(variables) {
    return { query: exports.ListGalleryScrapersDocument, variables: variables };
}
exports.refetchListGalleryScrapersQuery = refetchListGalleryScrapersQuery;
exports.ListImageScrapersDocument = (0, client_1.gql) `
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
function useListImageScrapersQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.ListImageScrapersDocument, options);
}
exports.useListImageScrapersQuery = useListImageScrapersQuery;
function useListImageScrapersLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.ListImageScrapersDocument, options);
}
exports.useListImageScrapersLazyQuery = useListImageScrapersLazyQuery;
function useListImageScrapersSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.ListImageScrapersDocument, options);
}
exports.useListImageScrapersSuspenseQuery = useListImageScrapersSuspenseQuery;
function refetchListImageScrapersQuery(variables) {
    return { query: exports.ListImageScrapersDocument, variables: variables };
}
exports.refetchListImageScrapersQuery = refetchListImageScrapersQuery;
exports.ListGroupScrapersDocument = (0, client_1.gql) `
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
function useListGroupScrapersQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.ListGroupScrapersDocument, options);
}
exports.useListGroupScrapersQuery = useListGroupScrapersQuery;
function useListGroupScrapersLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.ListGroupScrapersDocument, options);
}
exports.useListGroupScrapersLazyQuery = useListGroupScrapersLazyQuery;
function useListGroupScrapersSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.ListGroupScrapersDocument, options);
}
exports.useListGroupScrapersSuspenseQuery = useListGroupScrapersSuspenseQuery;
function refetchListGroupScrapersQuery(variables) {
    return { query: exports.ListGroupScrapersDocument, variables: variables };
}
exports.refetchListGroupScrapersQuery = refetchListGroupScrapersQuery;
exports.ScrapeSingleStudioDocument = (0, client_1.gql) `
    query ScrapeSingleStudio($source: ScraperSourceInput!, $input: ScrapeSingleStudioInput!) {
  scrapeSingleStudio(source: $source, input: $input) {
    ...ScrapedStudioData
  }
}
    ${exports.ScrapedStudioDataFragmentDoc}`;
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
function useScrapeSingleStudioQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.ScrapeSingleStudioDocument, options);
}
exports.useScrapeSingleStudioQuery = useScrapeSingleStudioQuery;
function useScrapeSingleStudioLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.ScrapeSingleStudioDocument, options);
}
exports.useScrapeSingleStudioLazyQuery = useScrapeSingleStudioLazyQuery;
function useScrapeSingleStudioSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.ScrapeSingleStudioDocument, options);
}
exports.useScrapeSingleStudioSuspenseQuery = useScrapeSingleStudioSuspenseQuery;
function refetchScrapeSingleStudioQuery(variables) {
    return { query: exports.ScrapeSingleStudioDocument, variables: variables };
}
exports.refetchScrapeSingleStudioQuery = refetchScrapeSingleStudioQuery;
exports.ScrapeSingleTagDocument = (0, client_1.gql) `
    query ScrapeSingleTag($source: ScraperSourceInput!, $input: ScrapeSingleTagInput!) {
  scrapeSingleTag(source: $source, input: $input) {
    ...ScrapedSceneTagData
  }
}
    ${exports.ScrapedSceneTagDataFragmentDoc}`;
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
function useScrapeSingleTagQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.ScrapeSingleTagDocument, options);
}
exports.useScrapeSingleTagQuery = useScrapeSingleTagQuery;
function useScrapeSingleTagLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.ScrapeSingleTagDocument, options);
}
exports.useScrapeSingleTagLazyQuery = useScrapeSingleTagLazyQuery;
function useScrapeSingleTagSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.ScrapeSingleTagDocument, options);
}
exports.useScrapeSingleTagSuspenseQuery = useScrapeSingleTagSuspenseQuery;
function refetchScrapeSingleTagQuery(variables) {
    return { query: exports.ScrapeSingleTagDocument, variables: variables };
}
exports.refetchScrapeSingleTagQuery = refetchScrapeSingleTagQuery;
exports.ScrapeSinglePerformerDocument = (0, client_1.gql) `
    query ScrapeSinglePerformer($source: ScraperSourceInput!, $input: ScrapeSinglePerformerInput!) {
  scrapeSinglePerformer(source: $source, input: $input) {
    ...ScrapedPerformerData
  }
}
    ${exports.ScrapedPerformerDataFragmentDoc}`;
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
function useScrapeSinglePerformerQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.ScrapeSinglePerformerDocument, options);
}
exports.useScrapeSinglePerformerQuery = useScrapeSinglePerformerQuery;
function useScrapeSinglePerformerLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.ScrapeSinglePerformerDocument, options);
}
exports.useScrapeSinglePerformerLazyQuery = useScrapeSinglePerformerLazyQuery;
function useScrapeSinglePerformerSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.ScrapeSinglePerformerDocument, options);
}
exports.useScrapeSinglePerformerSuspenseQuery = useScrapeSinglePerformerSuspenseQuery;
function refetchScrapeSinglePerformerQuery(variables) {
    return { query: exports.ScrapeSinglePerformerDocument, variables: variables };
}
exports.refetchScrapeSinglePerformerQuery = refetchScrapeSinglePerformerQuery;
exports.ScrapeMultiPerformersDocument = (0, client_1.gql) `
    query ScrapeMultiPerformers($source: ScraperSourceInput!, $input: ScrapeMultiPerformersInput!) {
  scrapeMultiPerformers(source: $source, input: $input) {
    ...ScrapedPerformerData
  }
}
    ${exports.ScrapedPerformerDataFragmentDoc}`;
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
function useScrapeMultiPerformersQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.ScrapeMultiPerformersDocument, options);
}
exports.useScrapeMultiPerformersQuery = useScrapeMultiPerformersQuery;
function useScrapeMultiPerformersLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.ScrapeMultiPerformersDocument, options);
}
exports.useScrapeMultiPerformersLazyQuery = useScrapeMultiPerformersLazyQuery;
function useScrapeMultiPerformersSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.ScrapeMultiPerformersDocument, options);
}
exports.useScrapeMultiPerformersSuspenseQuery = useScrapeMultiPerformersSuspenseQuery;
function refetchScrapeMultiPerformersQuery(variables) {
    return { query: exports.ScrapeMultiPerformersDocument, variables: variables };
}
exports.refetchScrapeMultiPerformersQuery = refetchScrapeMultiPerformersQuery;
exports.ScrapePerformerUrlDocument = (0, client_1.gql) `
    query ScrapePerformerURL($url: String!) {
  scrapePerformerURL(url: $url) {
    ...ScrapedPerformerData
  }
}
    ${exports.ScrapedPerformerDataFragmentDoc}`;
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
function useScrapePerformerUrlQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.ScrapePerformerUrlDocument, options);
}
exports.useScrapePerformerUrlQuery = useScrapePerformerUrlQuery;
function useScrapePerformerUrlLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.ScrapePerformerUrlDocument, options);
}
exports.useScrapePerformerUrlLazyQuery = useScrapePerformerUrlLazyQuery;
function useScrapePerformerUrlSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.ScrapePerformerUrlDocument, options);
}
exports.useScrapePerformerUrlSuspenseQuery = useScrapePerformerUrlSuspenseQuery;
function refetchScrapePerformerUrlQuery(variables) {
    return { query: exports.ScrapePerformerUrlDocument, variables: variables };
}
exports.refetchScrapePerformerUrlQuery = refetchScrapePerformerUrlQuery;
exports.ScrapeSingleSceneDocument = (0, client_1.gql) `
    query ScrapeSingleScene($source: ScraperSourceInput!, $input: ScrapeSingleSceneInput!) {
  scrapeSingleScene(source: $source, input: $input) {
    ...ScrapedSceneData
  }
}
    ${exports.ScrapedSceneDataFragmentDoc}`;
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
function useScrapeSingleSceneQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.ScrapeSingleSceneDocument, options);
}
exports.useScrapeSingleSceneQuery = useScrapeSingleSceneQuery;
function useScrapeSingleSceneLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.ScrapeSingleSceneDocument, options);
}
exports.useScrapeSingleSceneLazyQuery = useScrapeSingleSceneLazyQuery;
function useScrapeSingleSceneSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.ScrapeSingleSceneDocument, options);
}
exports.useScrapeSingleSceneSuspenseQuery = useScrapeSingleSceneSuspenseQuery;
function refetchScrapeSingleSceneQuery(variables) {
    return { query: exports.ScrapeSingleSceneDocument, variables: variables };
}
exports.refetchScrapeSingleSceneQuery = refetchScrapeSingleSceneQuery;
exports.ScrapeMultiScenesDocument = (0, client_1.gql) `
    query ScrapeMultiScenes($source: ScraperSourceInput!, $input: ScrapeMultiScenesInput!) {
  scrapeMultiScenes(source: $source, input: $input) {
    ...ScrapedSceneData
  }
}
    ${exports.ScrapedSceneDataFragmentDoc}`;
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
function useScrapeMultiScenesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.ScrapeMultiScenesDocument, options);
}
exports.useScrapeMultiScenesQuery = useScrapeMultiScenesQuery;
function useScrapeMultiScenesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.ScrapeMultiScenesDocument, options);
}
exports.useScrapeMultiScenesLazyQuery = useScrapeMultiScenesLazyQuery;
function useScrapeMultiScenesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.ScrapeMultiScenesDocument, options);
}
exports.useScrapeMultiScenesSuspenseQuery = useScrapeMultiScenesSuspenseQuery;
function refetchScrapeMultiScenesQuery(variables) {
    return { query: exports.ScrapeMultiScenesDocument, variables: variables };
}
exports.refetchScrapeMultiScenesQuery = refetchScrapeMultiScenesQuery;
exports.ScrapeSceneUrlDocument = (0, client_1.gql) `
    query ScrapeSceneURL($url: String!) {
  scrapeSceneURL(url: $url) {
    ...ScrapedSceneData
  }
}
    ${exports.ScrapedSceneDataFragmentDoc}`;
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
function useScrapeSceneUrlQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.ScrapeSceneUrlDocument, options);
}
exports.useScrapeSceneUrlQuery = useScrapeSceneUrlQuery;
function useScrapeSceneUrlLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.ScrapeSceneUrlDocument, options);
}
exports.useScrapeSceneUrlLazyQuery = useScrapeSceneUrlLazyQuery;
function useScrapeSceneUrlSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.ScrapeSceneUrlDocument, options);
}
exports.useScrapeSceneUrlSuspenseQuery = useScrapeSceneUrlSuspenseQuery;
function refetchScrapeSceneUrlQuery(variables) {
    return { query: exports.ScrapeSceneUrlDocument, variables: variables };
}
exports.refetchScrapeSceneUrlQuery = refetchScrapeSceneUrlQuery;
exports.ScrapeSingleGalleryDocument = (0, client_1.gql) `
    query ScrapeSingleGallery($source: ScraperSourceInput!, $input: ScrapeSingleGalleryInput!) {
  scrapeSingleGallery(source: $source, input: $input) {
    ...ScrapedGalleryData
  }
}
    ${exports.ScrapedGalleryDataFragmentDoc}`;
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
function useScrapeSingleGalleryQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.ScrapeSingleGalleryDocument, options);
}
exports.useScrapeSingleGalleryQuery = useScrapeSingleGalleryQuery;
function useScrapeSingleGalleryLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.ScrapeSingleGalleryDocument, options);
}
exports.useScrapeSingleGalleryLazyQuery = useScrapeSingleGalleryLazyQuery;
function useScrapeSingleGallerySuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.ScrapeSingleGalleryDocument, options);
}
exports.useScrapeSingleGallerySuspenseQuery = useScrapeSingleGallerySuspenseQuery;
function refetchScrapeSingleGalleryQuery(variables) {
    return { query: exports.ScrapeSingleGalleryDocument, variables: variables };
}
exports.refetchScrapeSingleGalleryQuery = refetchScrapeSingleGalleryQuery;
exports.ScrapeSingleImageDocument = (0, client_1.gql) `
    query ScrapeSingleImage($source: ScraperSourceInput!, $input: ScrapeSingleImageInput!) {
  scrapeSingleImage(source: $source, input: $input) {
    ...ScrapedImageData
  }
}
    ${exports.ScrapedImageDataFragmentDoc}`;
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
function useScrapeSingleImageQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.ScrapeSingleImageDocument, options);
}
exports.useScrapeSingleImageQuery = useScrapeSingleImageQuery;
function useScrapeSingleImageLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.ScrapeSingleImageDocument, options);
}
exports.useScrapeSingleImageLazyQuery = useScrapeSingleImageLazyQuery;
function useScrapeSingleImageSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.ScrapeSingleImageDocument, options);
}
exports.useScrapeSingleImageSuspenseQuery = useScrapeSingleImageSuspenseQuery;
function refetchScrapeSingleImageQuery(variables) {
    return { query: exports.ScrapeSingleImageDocument, variables: variables };
}
exports.refetchScrapeSingleImageQuery = refetchScrapeSingleImageQuery;
exports.ScrapeGalleryUrlDocument = (0, client_1.gql) `
    query ScrapeGalleryURL($url: String!) {
  scrapeGalleryURL(url: $url) {
    ...ScrapedGalleryData
  }
}
    ${exports.ScrapedGalleryDataFragmentDoc}`;
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
function useScrapeGalleryUrlQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.ScrapeGalleryUrlDocument, options);
}
exports.useScrapeGalleryUrlQuery = useScrapeGalleryUrlQuery;
function useScrapeGalleryUrlLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.ScrapeGalleryUrlDocument, options);
}
exports.useScrapeGalleryUrlLazyQuery = useScrapeGalleryUrlLazyQuery;
function useScrapeGalleryUrlSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.ScrapeGalleryUrlDocument, options);
}
exports.useScrapeGalleryUrlSuspenseQuery = useScrapeGalleryUrlSuspenseQuery;
function refetchScrapeGalleryUrlQuery(variables) {
    return { query: exports.ScrapeGalleryUrlDocument, variables: variables };
}
exports.refetchScrapeGalleryUrlQuery = refetchScrapeGalleryUrlQuery;
exports.ScrapeImageUrlDocument = (0, client_1.gql) `
    query ScrapeImageURL($url: String!) {
  scrapeImageURL(url: $url) {
    ...ScrapedImageData
  }
}
    ${exports.ScrapedImageDataFragmentDoc}`;
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
function useScrapeImageUrlQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.ScrapeImageUrlDocument, options);
}
exports.useScrapeImageUrlQuery = useScrapeImageUrlQuery;
function useScrapeImageUrlLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.ScrapeImageUrlDocument, options);
}
exports.useScrapeImageUrlLazyQuery = useScrapeImageUrlLazyQuery;
function useScrapeImageUrlSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.ScrapeImageUrlDocument, options);
}
exports.useScrapeImageUrlSuspenseQuery = useScrapeImageUrlSuspenseQuery;
function refetchScrapeImageUrlQuery(variables) {
    return { query: exports.ScrapeImageUrlDocument, variables: variables };
}
exports.refetchScrapeImageUrlQuery = refetchScrapeImageUrlQuery;
exports.ScrapeGroupUrlDocument = (0, client_1.gql) `
    query ScrapeGroupURL($url: String!) {
  scrapeGroupURL(url: $url) {
    ...ScrapedGroupData
  }
}
    ${exports.ScrapedGroupDataFragmentDoc}`;
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
function useScrapeGroupUrlQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.ScrapeGroupUrlDocument, options);
}
exports.useScrapeGroupUrlQuery = useScrapeGroupUrlQuery;
function useScrapeGroupUrlLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.ScrapeGroupUrlDocument, options);
}
exports.useScrapeGroupUrlLazyQuery = useScrapeGroupUrlLazyQuery;
function useScrapeGroupUrlSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.ScrapeGroupUrlDocument, options);
}
exports.useScrapeGroupUrlSuspenseQuery = useScrapeGroupUrlSuspenseQuery;
function refetchScrapeGroupUrlQuery(variables) {
    return { query: exports.ScrapeGroupUrlDocument, variables: variables };
}
exports.refetchScrapeGroupUrlQuery = refetchScrapeGroupUrlQuery;
exports.InstalledScraperPackagesDocument = (0, client_1.gql) `
    query InstalledScraperPackages {
  installedPackages(type: Scraper) {
    ...PackageData
  }
}
    ${exports.PackageDataFragmentDoc}`;
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
function useInstalledScraperPackagesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.InstalledScraperPackagesDocument, options);
}
exports.useInstalledScraperPackagesQuery = useInstalledScraperPackagesQuery;
function useInstalledScraperPackagesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.InstalledScraperPackagesDocument, options);
}
exports.useInstalledScraperPackagesLazyQuery = useInstalledScraperPackagesLazyQuery;
function useInstalledScraperPackagesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.InstalledScraperPackagesDocument, options);
}
exports.useInstalledScraperPackagesSuspenseQuery = useInstalledScraperPackagesSuspenseQuery;
function refetchInstalledScraperPackagesQuery(variables) {
    return { query: exports.InstalledScraperPackagesDocument, variables: variables };
}
exports.refetchInstalledScraperPackagesQuery = refetchInstalledScraperPackagesQuery;
exports.InstalledScraperPackagesStatusDocument = (0, client_1.gql) `
    query InstalledScraperPackagesStatus {
  installedPackages(type: Scraper) {
    ...PackageData
    source_package {
      ...PackageData
    }
  }
}
    ${exports.PackageDataFragmentDoc}`;
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
function useInstalledScraperPackagesStatusQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.InstalledScraperPackagesStatusDocument, options);
}
exports.useInstalledScraperPackagesStatusQuery = useInstalledScraperPackagesStatusQuery;
function useInstalledScraperPackagesStatusLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.InstalledScraperPackagesStatusDocument, options);
}
exports.useInstalledScraperPackagesStatusLazyQuery = useInstalledScraperPackagesStatusLazyQuery;
function useInstalledScraperPackagesStatusSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.InstalledScraperPackagesStatusDocument, options);
}
exports.useInstalledScraperPackagesStatusSuspenseQuery = useInstalledScraperPackagesStatusSuspenseQuery;
function refetchInstalledScraperPackagesStatusQuery(variables) {
    return { query: exports.InstalledScraperPackagesStatusDocument, variables: variables };
}
exports.refetchInstalledScraperPackagesStatusQuery = refetchInstalledScraperPackagesStatusQuery;
exports.AvailableScraperPackagesDocument = (0, client_1.gql) `
    query AvailableScraperPackages($source: String!) {
  availablePackages(source: $source, type: Scraper) {
    ...PackageData
    requires {
      package_id
    }
  }
}
    ${exports.PackageDataFragmentDoc}`;
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
function useAvailableScraperPackagesQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.AvailableScraperPackagesDocument, options);
}
exports.useAvailableScraperPackagesQuery = useAvailableScraperPackagesQuery;
function useAvailableScraperPackagesLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.AvailableScraperPackagesDocument, options);
}
exports.useAvailableScraperPackagesLazyQuery = useAvailableScraperPackagesLazyQuery;
function useAvailableScraperPackagesSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.AvailableScraperPackagesDocument, options);
}
exports.useAvailableScraperPackagesSuspenseQuery = useAvailableScraperPackagesSuspenseQuery;
function refetchAvailableScraperPackagesQuery(variables) {
    return { query: exports.AvailableScraperPackagesDocument, variables: variables };
}
exports.refetchAvailableScraperPackagesQuery = refetchAvailableScraperPackagesQuery;
exports.ConfigurationDocument = (0, client_1.gql) `
    query Configuration {
  configuration {
    ...ConfigData
  }
}
    ${exports.ConfigDataFragmentDoc}`;
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
function useConfigurationQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.ConfigurationDocument, options);
}
exports.useConfigurationQuery = useConfigurationQuery;
function useConfigurationLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.ConfigurationDocument, options);
}
exports.useConfigurationLazyQuery = useConfigurationLazyQuery;
function useConfigurationSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.ConfigurationDocument, options);
}
exports.useConfigurationSuspenseQuery = useConfigurationSuspenseQuery;
function refetchConfigurationQuery(variables) {
    return { query: exports.ConfigurationDocument, variables: variables };
}
exports.refetchConfigurationQuery = refetchConfigurationQuery;
exports.DirectoryDocument = (0, client_1.gql) `
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
function useDirectoryQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.DirectoryDocument, options);
}
exports.useDirectoryQuery = useDirectoryQuery;
function useDirectoryLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.DirectoryDocument, options);
}
exports.useDirectoryLazyQuery = useDirectoryLazyQuery;
function useDirectorySuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.DirectoryDocument, options);
}
exports.useDirectorySuspenseQuery = useDirectorySuspenseQuery;
function refetchDirectoryQuery(variables) {
    return { query: exports.DirectoryDocument, variables: variables };
}
exports.refetchDirectoryQuery = refetchDirectoryQuery;
exports.ValidateStashBoxDocument = (0, client_1.gql) `
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
function useValidateStashBoxQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.ValidateStashBoxDocument, options);
}
exports.useValidateStashBoxQuery = useValidateStashBoxQuery;
function useValidateStashBoxLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.ValidateStashBoxDocument, options);
}
exports.useValidateStashBoxLazyQuery = useValidateStashBoxLazyQuery;
function useValidateStashBoxSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.ValidateStashBoxDocument, options);
}
exports.useValidateStashBoxSuspenseQuery = useValidateStashBoxSuspenseQuery;
function refetchValidateStashBoxQuery(variables) {
    return { query: exports.ValidateStashBoxDocument, variables: variables };
}
exports.refetchValidateStashBoxQuery = refetchValidateStashBoxQuery;
exports.SystemStatusDocument = (0, client_1.gql) `
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
function useSystemStatusQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.SystemStatusDocument, options);
}
exports.useSystemStatusQuery = useSystemStatusQuery;
function useSystemStatusLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.SystemStatusDocument, options);
}
exports.useSystemStatusLazyQuery = useSystemStatusLazyQuery;
function useSystemStatusSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.SystemStatusDocument, options);
}
exports.useSystemStatusSuspenseQuery = useSystemStatusSuspenseQuery;
function refetchSystemStatusQuery(variables) {
    return { query: exports.SystemStatusDocument, variables: variables };
}
exports.refetchSystemStatusQuery = refetchSystemStatusQuery;
exports.FindStudiosDocument = (0, client_1.gql) `
    query FindStudios($filter: FindFilterType, $studio_filter: StudioFilterType) {
  findStudios(filter: $filter, studio_filter: $studio_filter) {
    count
    studios {
      ...StudioData
    }
  }
}
    ${exports.StudioDataFragmentDoc}`;
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
function useFindStudiosQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindStudiosDocument, options);
}
exports.useFindStudiosQuery = useFindStudiosQuery;
function useFindStudiosLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindStudiosDocument, options);
}
exports.useFindStudiosLazyQuery = useFindStudiosLazyQuery;
function useFindStudiosSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindStudiosDocument, options);
}
exports.useFindStudiosSuspenseQuery = useFindStudiosSuspenseQuery;
function refetchFindStudiosQuery(variables) {
    return { query: exports.FindStudiosDocument, variables: variables };
}
exports.refetchFindStudiosQuery = refetchFindStudiosQuery;
exports.FindStudioDocument = (0, client_1.gql) `
    query FindStudio($id: ID!) {
  findStudio(id: $id) {
    ...StudioData
  }
}
    ${exports.StudioDataFragmentDoc}`;
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
function useFindStudioQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindStudioDocument, options);
}
exports.useFindStudioQuery = useFindStudioQuery;
function useFindStudioLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindStudioDocument, options);
}
exports.useFindStudioLazyQuery = useFindStudioLazyQuery;
function useFindStudioSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindStudioDocument, options);
}
exports.useFindStudioSuspenseQuery = useFindStudioSuspenseQuery;
function refetchFindStudioQuery(variables) {
    return { query: exports.FindStudioDocument, variables: variables };
}
exports.refetchFindStudioQuery = refetchFindStudioQuery;
exports.FindStudiosForSelectDocument = (0, client_1.gql) `
    query FindStudiosForSelect($filter: FindFilterType, $studio_filter: StudioFilterType, $ids: [ID!]) {
  findStudios(filter: $filter, studio_filter: $studio_filter, ids: $ids) {
    count
    studios {
      ...SelectStudioData
    }
  }
}
    ${exports.SelectStudioDataFragmentDoc}`;
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
function useFindStudiosForSelectQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindStudiosForSelectDocument, options);
}
exports.useFindStudiosForSelectQuery = useFindStudiosForSelectQuery;
function useFindStudiosForSelectLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindStudiosForSelectDocument, options);
}
exports.useFindStudiosForSelectLazyQuery = useFindStudiosForSelectLazyQuery;
function useFindStudiosForSelectSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindStudiosForSelectDocument, options);
}
exports.useFindStudiosForSelectSuspenseQuery = useFindStudiosForSelectSuspenseQuery;
function refetchFindStudiosForSelectQuery(variables) {
    return { query: exports.FindStudiosForSelectDocument, variables: variables };
}
exports.refetchFindStudiosForSelectQuery = refetchFindStudiosForSelectQuery;
exports.FindTagsDocument = (0, client_1.gql) `
    query FindTags($filter: FindFilterType, $tag_filter: TagFilterType, $ids: [ID!]) {
  findTags(filter: $filter, tag_filter: $tag_filter, ids: $ids) {
    count
    tags {
      ...TagData
    }
  }
}
    ${exports.TagDataFragmentDoc}`;
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
function useFindTagsQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindTagsDocument, options);
}
exports.useFindTagsQuery = useFindTagsQuery;
function useFindTagsLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindTagsDocument, options);
}
exports.useFindTagsLazyQuery = useFindTagsLazyQuery;
function useFindTagsSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindTagsDocument, options);
}
exports.useFindTagsSuspenseQuery = useFindTagsSuspenseQuery;
function refetchFindTagsQuery(variables) {
    return { query: exports.FindTagsDocument, variables: variables };
}
exports.refetchFindTagsQuery = refetchFindTagsQuery;
exports.FindTagDocument = (0, client_1.gql) `
    query FindTag($id: ID!) {
  findTag(id: $id) {
    ...TagData
  }
}
    ${exports.TagDataFragmentDoc}`;
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
function useFindTagQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindTagDocument, options);
}
exports.useFindTagQuery = useFindTagQuery;
function useFindTagLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindTagDocument, options);
}
exports.useFindTagLazyQuery = useFindTagLazyQuery;
function useFindTagSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindTagDocument, options);
}
exports.useFindTagSuspenseQuery = useFindTagSuspenseQuery;
function refetchFindTagQuery(variables) {
    return { query: exports.FindTagDocument, variables: variables };
}
exports.refetchFindTagQuery = refetchFindTagQuery;
exports.FindTagsForSelectDocument = (0, client_1.gql) `
    query FindTagsForSelect($filter: FindFilterType, $tag_filter: TagFilterType, $ids: [ID!]) {
  findTags(filter: $filter, tag_filter: $tag_filter, ids: $ids) {
    count
    tags {
      ...SelectTagData
    }
  }
}
    ${exports.SelectTagDataFragmentDoc}`;
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
function useFindTagsForSelectQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindTagsForSelectDocument, options);
}
exports.useFindTagsForSelectQuery = useFindTagsForSelectQuery;
function useFindTagsForSelectLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindTagsForSelectDocument, options);
}
exports.useFindTagsForSelectLazyQuery = useFindTagsForSelectLazyQuery;
function useFindTagsForSelectSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindTagsForSelectDocument, options);
}
exports.useFindTagsForSelectSuspenseQuery = useFindTagsForSelectSuspenseQuery;
function refetchFindTagsForSelectQuery(variables) {
    return { query: exports.FindTagsForSelectDocument, variables: variables };
}
exports.refetchFindTagsForSelectQuery = refetchFindTagsForSelectQuery;
exports.FindTagsForListDocument = (0, client_1.gql) `
    query FindTagsForList($filter: FindFilterType, $tag_filter: TagFilterType) {
  findTags(filter: $filter, tag_filter: $tag_filter) {
    count
    tags {
      ...TagListData
    }
  }
}
    ${exports.TagListDataFragmentDoc}`;
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
function useFindTagsForListQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery(exports.FindTagsForListDocument, options);
}
exports.useFindTagsForListQuery = useFindTagsForListQuery;
function useFindTagsForListLazyQuery(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery(exports.FindTagsForListDocument, options);
}
exports.useFindTagsForListLazyQuery = useFindTagsForListLazyQuery;
function useFindTagsForListSuspenseQuery(baseOptions) {
    const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
    return Apollo.useSuspenseQuery(exports.FindTagsForListDocument, options);
}
exports.useFindTagsForListSuspenseQuery = useFindTagsForListSuspenseQuery;
function refetchFindTagsForListQuery(variables) {
    return { query: exports.FindTagsForListDocument, variables: variables };
}
exports.refetchFindTagsForListQuery = refetchFindTagsForListQuery;
exports.JobsSubscribeDocument = (0, client_1.gql) `
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
function useJobsSubscribeSubscription(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSubscription(exports.JobsSubscribeDocument, options);
}
exports.useJobsSubscribeSubscription = useJobsSubscribeSubscription;
exports.LoggingSubscribeDocument = (0, client_1.gql) `
    subscription LoggingSubscribe {
  loggingSubscribe {
    ...LogEntryData
  }
}
    ${exports.LogEntryDataFragmentDoc}`;
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
function useLoggingSubscribeSubscription(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSubscription(exports.LoggingSubscribeDocument, options);
}
exports.useLoggingSubscribeSubscription = useLoggingSubscribeSubscription;
exports.ScanCompleteSubscribeDocument = (0, client_1.gql) `
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
function useScanCompleteSubscribeSubscription(baseOptions) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSubscription(exports.ScanCompleteSubscribeDocument, options);
}
exports.useScanCompleteSubscribeSubscription = useScanCompleteSubscribeSubscription;
//# sourceMappingURL=generated-graphql.js.map