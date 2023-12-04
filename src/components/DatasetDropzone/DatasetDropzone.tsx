import { Group, Text, rem } from '@mantine/core';
import { IconUpload, IconTextRecognition, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps } from '@mantine/dropzone';
import { useHover } from '@mantine/hooks';

export function DatasetDropzone(props: DropzoneProps) {
  const { hovered, ref } = useHover();

  return (
    <Dropzone
      ref={ref}
      bg={hovered ? 'var(--mantine-color-gray-7)' : 'var(--mantine-primary-color)'}
      maxSize={250 * 1024 ** 2}
      accept={['text/plain']}
      {...props}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconTextRecognition
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Перетащите наборы данных или нажмите для выбора файлов
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Принимаются только текстовые файлы. Размер каждого файла не должен превышать 250 МБ
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
