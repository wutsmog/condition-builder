import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

import { ICondition } from '../../types/condition';
import { Operator } from '../../types/operator';
import { useCondition } from '../../contexts/condition-contexts';

interface SingleConditionProps {
  conditionIndex: number;
  subconditionIndex: number;
  condition: ICondition;
  requireOrLabel: boolean;
  onAdd: () => void;
  onRemove: () => void;
}

export function SingleCondition({
  conditionIndex,
  subconditionIndex,
  condition,
  requireOrLabel,
  onAdd,
  onRemove,
}: SingleConditionProps) {
  const { columns, setConditions } = useCondition();

  return (
    <Box display="flex" alignItems="center" gap={2} mt={requireOrLabel ? 4 : 0}>
      {requireOrLabel && (
        <Typography variant="button" color="primary" ml={2} sx={{ fontWeight: 'bold' }}>
          OR
        </Typography>
      )}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Left Condition</InputLabel>
            <Select
              label="Left Condition"
              value={condition.column}
              onChange={(event) => {
                setConditions((prev) => {
                  const newConditions = [...prev];
                  newConditions[conditionIndex][subconditionIndex] = {
                    ...condition,
                    column: event.target.value as string,
                  };
                  return newConditions;
                });
              }}
            >
              {columns.map((column) => (
                <MenuItem key={column} value={column}>
                  {column}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Operator</InputLabel>
            <Select
              label="Operator"
              value={condition.operator}
              onChange={(event) => {
                setConditions((prev) => {
                  const newConditions = [...prev];
                  newConditions[conditionIndex][subconditionIndex] = {
                    ...condition,
                    operator: event.target.value as Operator,
                  };
                  return newConditions;
                });
              }}
            >
              {Operator.getAllOptions().map((operator) => (
                <MenuItem key={operator} value={operator}>
                  {Operator.toString(operator)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Value"
            value={condition.value}
            onChange={(event) => {
              setConditions((prev) => {
                const newConditions = [...prev];
                newConditions[conditionIndex][subconditionIndex] = {
                  ...condition,
                  value: event.target.value,
                };
                return newConditions;
              });
            }}
            fullWidth
          />
        </Grid>
      </Grid>
      <IconButton onClick={onAdd} color="primary">
        <AddIcon />
      </IconButton>
      <IconButton onClick={onRemove} color="error">
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}
