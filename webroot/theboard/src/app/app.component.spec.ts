import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule

} from '@angular/material';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { ApiService } from './api.service';
import { Stock } from './event/event.model';
import { of, empty } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
        MatIconModule,
        OverlayModule,
        HttpClientModule
      ],
      providers: [MatSnackBarModule],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  describe('app setup', () => {
    let service: ApiService;
    let fixture: ComponentFixture<AppComponent>;
    let app: AppComponent;
    let snackBar: MatSnackBar;
    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.debugElement.componentInstance;
      service = TestBed.get(ApiService);
      fixture = TestBed.createComponent(AppComponent);
      snackBar = TestBed.get(MatSnackBar);
    });

    it('should create the app', () => {
      expect(app).toBeTruthy();
    });

    it(`should have as title 'Finapp'`, () => {
      expect(app.title).toEqual('Finapp');
    });

    it('should render title in a h1 tag', () => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain('Finapp - look up a stock!');
    });

    describe('"stockChange"', () => {
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
      it('should make a call to api service when ticker is provided', () => {
        const apiSpy = spyOn(service, 'getStock').and.returnValue(
          of(mockResponse)
        );
        app.stockChange('FB');
        expect(apiSpy).toHaveBeenCalledWith('FB');
      });
      it('should not make a call to api service when ticker is not provided', () => {
        const apiSpy = spyOn(service, 'getStock').and.returnValue(
          of(mockResponse)
        );
        const showStockSnackBarSpy = spyOn(app, 'showStockSnackBar');
        app.stockChange('');
        expect(apiSpy).not.toHaveBeenCalled();
        expect(showStockSnackBarSpy).toHaveBeenCalledWith(
          'Please enter a stock'
        );
      });
      it('should show a snackbar message when ticker is provided but no stock found', () => {
        const apiSpy = spyOn(service, 'getStock').and.returnValue(of(empty));
        const showStockSnackBarSpy = spyOn(app, 'showStockSnackBar');
        app.stockChange('zzz');
        expect(showStockSnackBarSpy).toHaveBeenCalledWith('Stock not found');
      });
    });

    describe('"getPriceColor"', () => {
      it('should return green if change is positive', () => {
        const mockChange = 0.73;
        expect(app.getPriceColor(mockChange)).toEqual('green');
      });
      it('should return green if change is positive', () => {
        const mockChange = -2.3;
        expect(app.getPriceColor(mockChange)).toEqual('red');
      });
      it('should return green if change is positive', () => {
        const mockChange = 0.0;
        expect(app.getPriceColor(mockChange)).toEqual('grey');
      });
      it('should return green if change is positive', () => {
        const mockChange = null;
        expect(app.getPriceColor(mockChange)).toEqual('grey');
      });
    });
    describe('"getFormattedNumber"', () => {
      it('should show 4510000 as 4.51M', () => {
        expect(app.getFormattedNumber(4510000)).toEqual('4.51M');
      });
      it('should show 9000000 as 9M', () => {
        expect(app.getFormattedNumber(9000000)).toEqual('9.00M');
      });
      it('should show 99 as 99', () => {
        expect(app.getFormattedNumber(99)).toEqual('99.00');
      });
      it('should show 34670000001 as 34B', () => {
        expect(app.getFormattedNumber(34670000001)).toEqual('34.67B');
      });
      it('should show 1230000000000 as 1.2T', () => {
        expect(app.getFormattedNumber(1230000000000)).toEqual('1.23T');
      });
      it('should show 123456789 as 123,456,789', () => {
        expect(app.getFormattedNumber(123456789, '0,0')).toEqual('123,456,789');
      });
      it('should show 10000 as 10,000', () => {
        expect(app.getFormattedNumber(10000, '0,0')).toEqual('10,000');
      });
    });

    describe('"showStockSnackBar"', () => {
      it('should show snack bar with provided message', () => {
        const snackBarSpy = spyOn(snackBar, 'open');
        app.showStockSnackBar('test message');
        expect(snackBarSpy).toHaveBeenCalled();
        expect(snackBarSpy).toHaveBeenCalledWith('test message', 'Close', { duration: 2000 });
      });
    });
  });
});
