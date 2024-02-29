import { DataDropzone } from '../../DataDropzone/DataDropzone';
import { CustomLoadingOverlay } from '../../CustomLoadingOverlay/CustomLoadingOverlay';
import { useSourceCodeUpload as useSourceCodeUploader } from '../../../hooks/useSourceCode';

export type SourceCodeUploaderProps = {
  onFilesUploaded?: () => void;
};
export function SourceCodeUploader({ onFilesUploaded }: SourceCodeUploaderProps) {
  const { sourceCodeLoading, handleFilesDrop } = useSourceCodeUploader(onFilesUploaded);

  return (
    <CustomLoadingOverlay visible={sourceCodeLoading}>
      <DataDropzone
        m="lg"
        dropzoneTitle="Перетащите файлы исходного кода экспериментов или нажмите для выбора файлов"
        dropzoneDescription="Принимаются только текстовые файлы. Размер каждого файла не должен превышать 250 МБ"
        accept={{ 'text/plain': ['.py'] }}
        onDrop={handleFilesDrop}
      />
    </CustomLoadingOverlay>
  );
}
