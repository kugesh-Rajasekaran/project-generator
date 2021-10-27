/**
 *  Validates the given string
 * */
export function validateString(stringToValidate: string, inputName: string, categoryName: string, errors: string[]): string[]{
  if(typeof stringToValidate != 'string')
    errors.push(`type mismatch - ${inputName} in ${categoryName}`);
  if(!stringToValidate)
   errors.push(`${inputName} for ${categoryName} not provided`);
  if(!stringToValidate.length)
   errors.push(`enter valid ${inputName} for ${categoryName}`);
  return ;
} 
