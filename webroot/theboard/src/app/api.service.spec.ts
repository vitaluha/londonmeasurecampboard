import {
  TestBed, async, inject, fakeAsync
} from '@angular/core/testing';

import {
  HttpClientTestingModule
} from '@angular/common/http/testing';

import {
  ApiService
} from './api.service';
import { Observable, of } from 'rxjs';
import { Stock } from './event/event.model';
import { HttpClient } from '@angular/common/http';


describe('ApiService', () => {
  let service: ApiService;
  let httpClient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.get(ApiService);
    httpClient = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have "getStock" function', () => {
    expect(service.getStock).toBeTruthy();
  });

  describe('"getStock"', () => {
    it('should return an Observable of type Stock', () => {
      expect(service.getStock('AAPL')).toEqual(jasmine.any(Observable));
    });
    it('should return null when empty ticker is provided', () => {
      expect(service.getStock('')).toBeNull();
    });
    it('should return null when no ticker is provided', () => {
      expect(service.getStock(null)).toBeNull();
    });
    it('should return Stock object in Observable when ticker is provided', () => {

      const mockResponse: Stock = {
        symbol: 'FB',
        profile: {
          price: 208.61,
          beta: 0.897069,
          volAvg: 32315322,
          mktCap: 602882900000.0,
          lastDiv: 0,
          range: '123.02-218.62',
          changes: -0.77,
          changesPercentage: '(-0.37%)',
          companyName: 'Facebook Inc.',
          exchange: 'Nasdaq Global Select',
          industry: 'Online Media',
          website: 'http://www.facebook.com',
          description:
            'Facebook Inc is the world\'s largest online social network. Its products are Facebook, Instagram, Messenger, WhatsApp, and Oculus. Its products enable people to connect and share through mobile devices and personal computers.',
          ceo: 'Mark Zuckerberg',
          sector: 'Technology',
          image: 'https://financialmodelingprep.com/images-New-jpg/FB.jpg'
        }
      };
      const httpSpy = spyOn(httpClient, 'get').and.returnValue(of(mockResponse));
      service.getStock('FBa').subscribe(res => {
        expect(httpSpy).toHaveBeenCalledTimes(1);
        expect(res).toEqual(mockResponse);
      });
    });
  });
});
