import { Box, Button, Typography } from '@mui/material';
import { ICondition } from '../../types/condition';
import { SubconditionsList } from '../subconditions-list';
import { useCondition } from '../../contexts/condition-contexts';
import { Operator } from '../../types/operator';

export function ConditionsList() {
  const { conditions, columns, setConditions } = useCondition();

  const handleAddAnd = () => {
    setConditions((prev) => [
      ...prev,
      [{ column: columns[0], operator: Operator.equals, value: '' }],
    ]);
  };

  return (
    <Box position="relative">
      {conditions.map((subConditions: ICondition[], index) => (
        <Box key={`and-condition-${index}`}>
          <SubconditionsList
            key={`and-condition-${index}`}
            conditionIndex={index}
            conditions={subConditions}
          />
          {index === conditions.length - 1 ? (
            <>
              <Box bgcolor="lightgray" width="2px" height="24px" ml={4.5} />
              <Button variant="outlined" color="primary" onClick={handleAddAnd}>
                + AND
              </Button>
            </>
          ) : (
            <>
              <Box bgcolor="lightgray" width="2px" height="24px" ml={4.5} />
              <Typography variant="button" color="gray" ml={2.5}>
                AND
              </Typography>
              <Box bgcolor="lightgray" width="2px" height="24px" ml={4.5} />
            </>
          )}
        </Box>
      ))}
    </Box>
  );
}
