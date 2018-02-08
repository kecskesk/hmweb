import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize } from 'ngx-gallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.less']
})
export class GalleryComponent implements OnInit {

  constructor() { }
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  ngOnInit(): void {

      this.galleryOptions = [
          {
              width: '600px',
              height: '400px',
              thumbnailsColumns: 4,
              imageAnimation: NgxGalleryAnimation.Slide,
              imageSize: NgxGalleryImageSize.Contain
          },
          // max-width 800
          {
              breakpoint: 800,
              width: '100%',
              height: '600px',
              imagePercent: 80,
              thumbnailsPercent: 20,
              thumbnailsMargin: 20,
              thumbnailMargin: 20,
              imageSize: NgxGalleryImageSize.Contain
          },
          // max-width 400
          {
              breakpoint: 400,
              preview: false,
              imageSize: NgxGalleryImageSize.Contain
          }
      ];

      this.galleryImages = [
          {
              small: 'assets/1-small.jpg',
              medium: 'assets/1-medium.jpg',
              big: 'assets/1-big.jpg'
          },
          {
              small: 'assets/2-small.jpg',
              medium: 'assets/2-medium.jpg',
              big: 'assets/2-big.jpg'
          },
          {
              small: 'assets/3-small.jpg',
              medium: 'assets/3-medium.jpg',
              big: 'assets/3-big.jpg'
          }
      ];
  }

}
