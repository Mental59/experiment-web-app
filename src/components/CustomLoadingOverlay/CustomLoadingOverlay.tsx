import { LoadingOverlay, Box } from '@mantine/core';

export function CustomLoadingOverlay({
  visible,
  children,
}: {
  visible: boolean;
  children: React.ReactNode;
}) {
  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 1 }}
        loaderProps={{ color: 'pink', type: 'bars' }}
      />
      {children}
    </Box>
  );
}
