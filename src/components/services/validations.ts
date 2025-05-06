export default function validation(str: string, n: number) {
  let validStr: string = str[0].toUpperCase() + str.substring(1);
  if (validStr.length < n) {
    return new Error(`Input field must have at least ${n} characters`);
  }
  return validStr;
}
