import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent {
  data: any = {};
  tokens: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private ngxService: NgxUiLoaderService
  ) {}
  ngOnInit() {
    // getting the id from url
    const id = this.route.snapshot.paramMap.get('id');
    this.ngxService.start();
    const auth = localStorage.getItem('auth');

    if (auth) {
      this.tokens = JSON.parse(auth).token;
    }

    // making a get request
    this.http
      .get<any[]>(`${environment.apiBaseUrl}movies/single-show/${id}`, {
        headers: {
          Authorization: this.tokens,
        },
      })
      .subscribe((response: any) => {
        this.ngxService.stop();
        this.data = response.show;
      });
  }

  // function for changing the date string to a radable date
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }
}
