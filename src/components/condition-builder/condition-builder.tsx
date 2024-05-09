import { useEffect, useMemo, useState } from 'react';
import { Box, Chip, TextField, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useDebounce } from '../../hooks/use-debounce';
import { isArray, isString } from '../../utils/is-type';
import { Operator } from '../../types/operator';
import { useCondition } from '../../contexts/condition-contexts';
import { ConditionsList } from '../conditions-list';

export function ConditionBuilder() {
  const { conditions, setConditions, setColumns } = useCondition();

  const [url, setUrl] = useState('https://data.nasa.gov/resource/y77d-th95.json');
  const [records, setRecords] = useState<any[]>([]);
  const [gridColumns, setGridColumns] = useState<GridColDef[]>([]);
  const [error, setError] = useState<string | null>(null);

  const debouncedUrl = useDebounce(url, 1000);

  useEffect(() => {
    setError(null);
    fetch(debouncedUrl)
      .then((response) => response.json())
      .then((data) => {
        if (isArray(data)) {
          setRecords(data);
          setGridColumns(Object.keys(data[0]).map((key) => ({ field: key, resizable: true })));
          setColumns(Object.keys(data[0]));
        } else {
          setRecords([]);
          setError('Returning data MUST be an array.');
        }
      });
  }, [debouncedUrl]);

  useEffect(() => {
    if (gridColumns.length > 0) {
      setConditions([[{ column: gridColumns[0].field, operator: Operator.equals, value: '' }]]);
    }
  }, [gridColumns]);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      return conditions.every((subconditions) => {
        return subconditions.some((condition) => {
          const value = record[condition.column];

          if (!value) return false;
          if (isString(condition.value) && !condition.value) return true;

          switch (condition.operator) {
            case Operator.equals:
              return value === condition.value;
            case Operator.greaterThan:
              return value > +condition.value;
            case Operator.lessThan:
              return value < +condition.value;
            case Operator.contain:
              return value.includes(condition.value);
            case Operator.notContain:
              return !value.includes(condition.value);
            case Operator.regex:
              return new RegExp(condition.value).test(value);
            default:
              return false;
          }
        });
      });
    });
  }, [records, conditions]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <TextField
        label="Url"
        value={url}
        helperText={
          error ??
          'Insert data url. Returning data MUST be an array json with each element is key/value pair'
        }
        error={!!error}
        onChange={(e) => setUrl(e.target.value)}
      />

      <ConditionsList />

      <Box>
        <Typography variant="h6" gutterBottom>
          Result
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Chip label={`Total: ${records.length}`} />
          <Chip label={`Filtered: ${filteredRecords.length}`} color="primary" />
        </Box>
        <DataGrid
          rows={filteredRecords}
          columns={gridColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 100]}
        />
      </Box>
    </Box>
  );
}
