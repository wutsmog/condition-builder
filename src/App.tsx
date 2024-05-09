import { Box, Typography } from '@mui/material';
import { ConditionBuilder } from './components/condition-builder';
import { ConditionContextProvider } from './contexts/condition-contexts';

function App() {
  return (
    <Box sx={{ p: 8, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h3" gutterBottom>
        Condition Builder
      </Typography>
      <ConditionContextProvider>
        <ConditionBuilder />
      </ConditionContextProvider>
    </Box>
  );
}

export default App;
