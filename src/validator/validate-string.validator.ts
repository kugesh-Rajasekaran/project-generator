import { dataType } from '../models/nest/data-type.model';

export function validateInput(inputToValidate: string, expectedType: string, inputName: string, categoryName: string, errors: string[]) {
  if(typeof inputToValidate != expectedType)
    errors.push(`type mismatch, expected ${expectedType} but found ${typeof inputToValidate} - ${inputName} in ${categoryName}`);
  if(!inputToValidate)
   errors.push(`${inputToValidate} for ${categoryName} not provided`);
  if(!inputToValidate.length)
   errors.push(`enter valid ${inputToValidate} for ${categoryName}`);
  return ;
}

export function validateTypeInput(inputString: string, inputName: string, categoryName: string, errors: string[]){

  if(!dataType.includes(inputString))
    errors.push(`${inputString} is invalid in ${inputName} under ${categoryName}`);
  return ;
}
