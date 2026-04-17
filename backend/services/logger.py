from typing import Optional

USING_STASH_LOG = False
stash_log = None

try:
    import backend.services.stash_log as stash_log  # type: ignore
    USING_STASH_LOG = True
except ImportError:
    try:
        import log as stash_log  # type: ignore
        USING_STASH_LOG = True
    except ImportError:
        pass


class LoggerService:
    def __init__(self, debug_mode: bool = True):
        self.debug_mode = debug_mode

    def emit_progress(self, progress: float) -> None:
        if not (USING_STASH_LOG and stash_log):
            return
        try:
            stash_log.LogProgress(progress)
        except Exception:
            pass

    def log(self, msg: str) -> None:
        if not msg:
            return
        if USING_STASH_LOG and stash_log:
            if "[ERROR]" in msg or "[Error]" in msg:
                stash_log.LogError(msg)
            elif "[WARN]" in msg or "[Warn]" in msg:
                stash_log.LogWarning(msg)
            elif "[DEBUG]" in msg:
                stash_log.LogDebug(msg)
            elif "[DRY]" in msg or "[DRY_RUN]" in msg:
                stash_log.LogTrace(msg)
            elif "[OS]" in msg:
                stash_log.LogInfo(msg)
            else:
                stash_log.LogInfo(msg)
            return
        print(msg)
