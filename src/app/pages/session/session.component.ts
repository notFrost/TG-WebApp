import {Component, AfterViewInit, OnInit, ViewChild} from '@angular/core';
import {HttpDataService} from '../../services/http-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit, AfterViewInit {
  @ViewChild('video')
  video: any;
  constructor(private httpDataService: HttpDataService,  private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
    });
  }
  ngAfterViewInit(): void {
    let _video = this.video.nativeElement;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          _video.src = window.URL.createObjectURL(stream);
          _video.play();
        })
    }
  }
}
