import { TestBed } from '@angular/core/testing';
import { CustomerService } from './customer.service';
import { MessageService } from 'primeng/api';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
    });
    service = TestBed.inject(CustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
