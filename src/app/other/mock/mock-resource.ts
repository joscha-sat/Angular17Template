import { HttpRequest, HttpResponse } from '@angular/common/http';

export type MockRecord = {
  id: string;
  [key: string]: unknown;
};

export type MockResource = {
  records: MockRecord[];
  handleRequest: (request: HttpRequest<unknown>, resourceId?: string) => HttpResponse<unknown>;
};

export function createMockResource(initialRecords: MockRecord[]): MockResource {
  const records: MockRecord[] = initialRecords;

  return {
    records,
    handleRequest: (request: HttpRequest<unknown>, resourceId?: string): HttpResponse<unknown> => {
      if (request.method === 'GET') {
        return createGetResponse(records, resourceId, request.urlWithParams);
      }

      if (request.method === 'POST') {
        return createRecord(records, request.body);
      }

      if (request.method === 'PATCH') {
        return updateRecord(records, resourceId, request.body);
      }

      if (request.method === 'DELETE') {
        return deleteRecord(records, resourceId);
      }

      return new HttpResponse({ status: 405, body: { message: `Mock method not supported: ${request.method}` } });
    },
  };
}

function createGetResponse(
  records: MockRecord[],
  resourceId: string | undefined,
  requestUrl: string,
): HttpResponse<unknown> {
  if (resourceId) {
    const record: MockRecord | undefined = records.find((item: MockRecord) => item.id === resourceId);
    return record
      ? new HttpResponse({ status: 200, body: { ...record } })
      : new HttpResponse({ status: 404, body: { message: 'Mock record not found' } });
  }

  const url: URL = new URL(requestUrl, 'http://mock.local');
  const searchTerm: string = url.searchParams.get('search')?.toLowerCase() ?? '';
  const filteredRecords: MockRecord[] = searchTerm
    ? records.filter((record: MockRecord) => JSON.stringify(record).toLowerCase().includes(searchTerm))
    : records;

  return new HttpResponse({
    status: 200,
    body: { total: filteredRecords.length, records: filteredRecords.map((record: MockRecord) => ({ ...record })) },
  });
}

function createRecord(records: MockRecord[], requestBody: unknown): HttpResponse<unknown> {
  const currentTimestamp: string = new Date().toISOString();
  const record: MockRecord = {
    ...getRecordProperties(requestBody),
    id: createMockId(),
    createdAt: currentTimestamp,
    updatedAt: currentTimestamp,
  };
  records.push(record);
  return new HttpResponse({ status: 201, body: { ...record } });
}

function updateRecord(
  records: MockRecord[],
  resourceId: string | undefined,
  requestBody: unknown,
): HttpResponse<unknown> {
  const recordIndex: number = records.findIndex((record: MockRecord) => record.id === resourceId);
  if (recordIndex < 0) {
    return new HttpResponse({ status: 404, body: { message: 'Mock record not found' } });
  }

  const updatedRecord: MockRecord = {
    ...records[recordIndex],
    ...getRecordProperties(requestBody),
    id: records[recordIndex].id,
    updatedAt: new Date().toISOString(),
  };
  records[recordIndex] = updatedRecord;
  return new HttpResponse({ status: 200, body: { ...updatedRecord } });
}

function deleteRecord(records: MockRecord[], resourceId: string | undefined): HttpResponse<unknown> {
  if (!resourceId) {
    records.splice(0);
  } else {
    const recordIndex: number = records.findIndex((record: MockRecord) => record.id === resourceId);
    if (recordIndex >= 0) {
      records.splice(recordIndex, 1);
    }
  }

  return new HttpResponse({ status: 204, body: null });
}

function getRecordProperties(requestBody: unknown): Record<string, unknown> {
  return typeof requestBody === 'object' && requestBody !== null ? (requestBody as Record<string, unknown>) : {};
}

function createMockId(): string {
  return `mock-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
