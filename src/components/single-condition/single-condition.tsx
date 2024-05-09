import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

import { ICondition } from '../../types/condition';
import { Operator } from '../../types/operator';
import { useCondition } from '../../contexts/condition-contexts';
import { useState } from 'react';

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

  const [isHover, setIsHover] = useState(false);

  return (
    <>
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
              error={
                [Operator.greaterThan, Operator.lessThan].includes(condition.operator) &&
                isNaN(Number(condition.value))
              }
              helperText={
                [Operator.greaterThan, Operator.lessThan].includes(condition.operator) &&
                isNaN(Number(condition.value))
                  ? 'Value must be a number'
                  : ''
              }
              fullWidth
            />
          </Grid>
        </Grid>
        <IconButton
          color="primary"
          onClick={() => {
            setIsHover(false);
            onAdd();
          }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <AddIcon />
        </IconButton>
        <IconButton color="error" onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      </Box>
      {isHover && <Skeleton variant="rectangular" height={60} sx={{ mt: 2 }} />}
    </>
  );
}
