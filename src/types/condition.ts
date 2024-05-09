import { Operator } from './operator';

export interface ICondition {
  column: string;
  operator: Operator;
  value: string;
}
