import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  data: any[] = [];
  totalDocument: number = 0;
  p: number = 1;
  tokens: string = '';
  searchString: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const auth = localStorage.getItem('auth');

    if (auth) {
      this.tokens = JSON.parse(auth).token;
    }
    this.http
      .get<any[]>(`${environment.apiBaseUrl}movies/shows/`, {
        headers: {
          Authorization: this.tokens,
        },
      })
      .subscribe((response: any) => {
        this.data = response.shows;
        this.totalDocument = response.totalCount;
      });
  }

  showTV() {
    this.http
      .get<any[]>(
        `${environment.apiBaseUrl}movies/shows/${this.p}?&type=TV Show`,
        {
          headers: {
            Authorization: this.tokens,
          },
        }
      )
      .subscribe((response: any) => {
        this.data = response.shows;
        this.totalDocument = response.totalCount;
      });
  }

  showMovies() {
    this.http
      .get<any[]>(
        `${environment.apiBaseUrl}movies/shows/${this.p}?&type=Movie`,
        {
          headers: {
            Authorization: this.tokens,
          },
        }
      )
      .subscribe((response: any) => {
        this.data = response.shows;
        this.totalDocument = response.totalCount;
      });
  }

  pageChange(p: number) {
    this.http
      .get<any[]>(`${environment.apiBaseUrl}movies/shows/${p}`, {
        headers: {
          Authorization: this.tokens,
        },
      })
      .subscribe((response: any) => {
        this.data = response.shows;
        this.totalDocument = response.totalCount;
      });
  }
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
    this.http
      .get<any[]>(
        `${environment.apiBaseUrl}movies/shows/${this.p}?searchStr=${this.searchString}`,
        {
          headers: {
            Authorization: this.tokens,
          },
        }
      )
      .subscribe((response: any) => {
        this.data = response.shows;
        this.totalDocument = response.totalCount;
      });
  }
}
