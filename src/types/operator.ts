export enum Operator {
  equals = 'equals',
  greaterThan = 'greaterThan',
  lessThan = 'lessThan',
  contain = 'contain',
  notContain = 'notContain',
  regex = 'regex',
}

export namespace Operator {
  export function toString(operator: Operator) {
    switch (operator) {
      case Operator.equals:
        return 'Equals';
      case Operator.greaterThan:
        return 'Greater Than';
      case Operator.lessThan:
        return 'Less Than';
      case Operator.contain:
        return 'Contain';
      case Operator.notContain:
        return 'Not Contain';
      case Operator.regex:
        return 'Regex';
      default:
        return '';
    }
  }

  export function getAllOptions(): Operator[] {
    return [
      Operator.equals,
      Operator.greaterThan,
      Operator.lessThan,
      Operator.contain,
      Operator.notContain,
      Operator.regex,
    ];
  }
}
