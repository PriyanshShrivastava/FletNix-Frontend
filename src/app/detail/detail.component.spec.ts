import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DetailComponent } from './detail.component';
import { environment } from 'src/environments/environment';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let httpMock: HttpTestingController;
  let route: ActivatedRoute;
  let ngxService: NgxUiLoaderService;

  // ActivatedRoute to mock the route parameters
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '123' } },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    route = TestBed.inject(ActivatedRoute);

    // NgxUiLoaderService to mock the loading spinner
    ngxService = TestBed.inject(NgxUiLoaderService);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // To check whether the formatDate function works as expected
  it('should call formatDate function', () => {
    const dateString = '2023-04-26T00:00:00.000Z';
    const formattedDate = component.formatDate(dateString);
    expect(formattedDate).toBe('Apr 26, 2023');
  });

  // HttpClientTestingModule to mock HTTP requests
  it('should make an HTTP GET request to fetch movie details', () => {
    const mockResponse = { show: { id: 's1', name: 'Test Movie' } };
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify({ token: 'mock_token' })
    );
    component.ngOnInit();
    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}movies/single-show/s1`
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('mock_token');
    req.flush(mockResponse);
    expect(component.data).toEqual(mockResponse.show);
    expect(ngxService.stop).toHaveBeenCalled();
  });
});
