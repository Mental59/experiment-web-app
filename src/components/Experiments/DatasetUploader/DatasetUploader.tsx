import { DataDropzone } from '../../DataDropzone/DataDropzone';
import { CustomLoadingOverlay } from '../../CustomLoadingOverlay/CustomLoadingOverlay';
import { useDatasetsUpload } from '../../../hooks/useDatasets';

export function DatasetUploader() {
  const { datasetsLoading, handleFilesDrop } = useDatasetsUpload();

  return (
    <CustomLoadingOverlay visible={datasetsLoading}>
      <DataDropzone
        m="lg"
        dropzoneTitle="Перетащите наборы данных или нажмите для выбора файлов"
        dropzoneDescription="Принимаются только текстовые файлы. Размер каждого файла не должен превышать 250 МБ"
        onDrop={handleFilesDrop}
      />
    </CustomLoadingOverlay>
  );
}
