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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<any[]>(`${environment.apiBaseUrl}movies/shows/}`)
      .subscribe((response: any) => {
        this.data = response.shows;
        this.totalDocument = response.totalCount;
      });
  }
}
