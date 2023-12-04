import { DatasetDropzone } from '../../DatasetDropzone/DatasetDropzone';
import { CustomLoadingOverlay } from '../../CustomLoadingOverlay/CustomLoadingOverlay';
import { useDatasetsUpload } from '../../../hooks/useDatasets';

export function DatasetUploader() {
  const { datasetsLoading, handleFilesDrop } = useDatasetsUpload();

  return (
    <CustomLoadingOverlay visible={datasetsLoading}>
      <DatasetDropzone m="lg" onDrop={handleFilesDrop} />
    </CustomLoadingOverlay>
  );
}
