import { Box, CircularProgress, Typography } from '@mui/material';

export const LoadingInfo = () => {
  return (
    <Box display="flex" justifyContent="center" py={4}>
      <CircularProgress />
      <Typography variant="body1" sx={{ ml: 2 }}>
        Loading...
      </Typography>
    </Box>
  )
}