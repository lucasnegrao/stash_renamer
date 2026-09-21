let runtimePythonPath = "";

export function setRuntimePythonPath(path: string | null | undefined): void {
	runtimePythonPath = String(path || "").trim();
}

export function getRuntimePythonPath(): string {
	return runtimePythonPath;
}
