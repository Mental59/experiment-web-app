import { Group, Text, rem, useMantineColorScheme } from '@mantine/core';
import { IconUpload, IconTextRecognition, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps } from '@mantine/dropzone';
import { useHover } from '@mantine/hooks';

export type DataDropzoneProps = {
  dropzoneTitle: string;
  dropzoneDescription: string;
} & DropzoneProps;

export function DataDropzone({ dropzoneTitle, dropzoneDescription, ...props }: DataDropzoneProps) {
  const { hovered, ref } = useHover();
  const { colorScheme } = useMantineColorScheme();
  const hoveredColor =
    colorScheme === 'dark' ? 'var(--mantine-color-gray-7)' : 'var(--mantine-color-gray-2)';

  return (
    <Dropzone
      ref={ref}
      bg={hovered ? hoveredColor : 'var(--mantine-primary-color)'}
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
            {dropzoneTitle}
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            {dropzoneDescription}
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
