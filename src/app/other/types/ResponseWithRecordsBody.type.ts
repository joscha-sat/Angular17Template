/**
 * Structure of a response with a records body
 * containing the total number of records and an array of records.
 */
export type ResponseWithRecordsBody = {
  total: number;
  records: any[];
}
