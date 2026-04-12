import React from "react";
import TextUtils from "src/utils/text";

export const FileSize: React.FC<{ size: number }> = ({ size: fileSize }) => {
  const { size, unit } = TextUtils.fileSize(fileSize);
  const PluginApi = (window as any).PluginApi;
  const { FormattedNumber } = PluginApi.libraries.Intl;
  return (
    <>
      <FormattedNumber
        value={size}
        maximumFractionDigits={TextUtils.fileSizeFractionalDigits(unit)}
      />
      {` ${TextUtils.formatFileSizeUnit(unit)}`}
    </>
  );
};