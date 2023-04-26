import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  // All the variable needed to make an APi call
  data: any[] = [];
  totalDocument: number = 0;
  p: number = 1;
  tokens: string = '';
  searchString: string = '';
  type: string = '';
  searchInput = new Subject<string>(); //instance of the subject class
  constructor(
    private http: HttpClient,
    private ngxService: NgxUiLoaderService
  ) {
    // Implementing debouncing

    this.searchInput
      .pipe(
        debounceTime(300), // debounce for 300ms
        distinctUntilChanged(), // only emit when the search query changes
        switchMap((query: string) => {
          return this.http.get<any[]>(
            `${environment.apiBaseUrl}movies/shows/${this.p}?type=${this.type}&searchStr=${query}`,
            {
              headers: {
                Authorization: this.tokens,
              },
            }
          );
        })
      )
      .subscribe((response: any) => {
        this.data = response.shows;
        this.totalDocument = response.totalCount;
      });
  }

  ngOnInit() {
    const auth = localStorage.getItem('auth');
    // starting the loader until we get the response back
    this.ngxService.start();
    if (auth) {
      this.tokens = JSON.parse(auth).token;
    }

    // Making an api call to get the data from database
    this.http
      .get<any[]>(`${environment.apiBaseUrl}movies/shows/`, {
        headers: {
          Authorization: this.tokens,
        },
      })
      .subscribe((response: any) => {
        this.ngxService.stop();
        this.data = response.shows;
        this.totalDocument = response.totalCount;
      });
  }

  // fecthing data based on user choice
  fetchType(type: string) {
    this.ngxService.start();
    this.type = type;
    this.http
      .get<any[]>(
        `${environment.apiBaseUrl}movies/shows/${this.p}?type=${this.type}&searchStr=${this.searchString}`,
        {
          headers: {
            Authorization: this.tokens,
          },
        }
      )
      .subscribe((response: any) => {
        this.ngxService.stop();
        this.data = response.shows;
        this.totalDocument = response.totalCount;
      });
  }

  // function to make an api call based on the page change event
  pageChange(p: number) {
    this.ngxService.start();
    this.http
      .get<any[]>(
        `${environment.apiBaseUrl}movies/shows/${this.p}?type=${this.type}&searchStr=${this.searchString}`,
        {
          headers: {
            Authorization: this.tokens,
          },
        }
      )
      .subscribe((response: any) => {
        this.ngxService.stop();
        this.data = response.shows;
        this.totalDocument = response.totalCount;
      });
  }

  // function to format date in a redabale format
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }

  searchStr() {
    // subscribing to searchInput subject
    this.searchInput.next(this.searchString);
  }
}
