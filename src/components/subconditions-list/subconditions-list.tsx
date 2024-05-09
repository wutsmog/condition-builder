import { Card, CardContent } from '@mui/material';
import { ICondition } from '../../types/condition';
import { SingleCondition } from '../single-condition';
import { useCondition } from '../../contexts/condition-contexts';
import { Operator } from '../../types/operator';

interface SubconditionsListProps {
  conditionIndex: number;
  conditions: ICondition[];
}

export function SubconditionsList({ conditionIndex, conditions }: SubconditionsListProps) {
  const { columns, setConditions } = useCondition();

  const handleAddSubcondition = (conditionIndex: number, subconditionIndex: number) => {
    setConditions((prev) => {
      const newConditions = [...prev];
      newConditions[conditionIndex].splice(subconditionIndex + 1, 0, {
        column: columns[0],
        operator: Operator.equals,
        value: '',
      });
      return newConditions;
    });
  };

  const handleRemoveSubcondition = (conditionIndex: number, subconditionIndex: number) => {
    setConditions((prev) => {
      const newConditions = [...prev];
      newConditions[conditionIndex].splice(subconditionIndex, 1);
      return newConditions;
    });

    setConditions((prev) => {
      const filteredConditions = prev.filter((condition) => condition.length > 0);

      if (filteredConditions.length === 0) {
        return [[{ column: columns[0], operator: Operator.equals, value: '' }]];
      }
      return filteredConditions;
    });
  };

  return (
    <Card>
      <CardContent>
        {conditions.map((condition, index) => (
          <SingleCondition
            key={`or-condition-${conditionIndex}-${index}`}
            conditionIndex={conditionIndex}
            subconditionIndex={index}
            condition={condition}
            requireOrLabel={index > 0}
            onAdd={() => handleAddSubcondition(conditionIndex, index)}
            onRemove={() => handleRemoveSubcondition(conditionIndex, index)}
          />
        ))}
      </CardContent>
    </Card>
  );
}
