// var csv is the CSV file with headers
export function csvJSON(csv: string): any[] {
  const lines = csv.split('\n');
  const result = [];
  const headers = lines[0].split(',');

  for (let i = 1; i < lines.length; i++) {
    const obj: any = {};
    let line = lines[i];
    const re = new RegExp('(?!(([^"]*"){2})*[^"]*$),');
    line = line.replace(re, ' ');
    const currentline = line.split(',');
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  // return result; //JavaScript object
  // return JSON.stringify(result); // JSON
  return result;
}
