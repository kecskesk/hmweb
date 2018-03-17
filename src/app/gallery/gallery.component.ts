import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize } from 'ngx-gallery';
import { AngularFireDatabase, SnapshotAction } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.less']
})
export class GalleryComponent implements OnInit {
    imageAlbums: Array<ImageAlbum> = [];
    imageAlbumKeys: Array<SnapshotAction> = [];
    openAlbum: ImageAlbum;
    openAlbumKey: string;

    constructor(private storage: AngularFireStorage, private db: AngularFireDatabase) {
        this.db.list('gallery').valueChanges().subscribe((res) => {
            this.imageAlbums = res as Array<ImageAlbum>;
        });
        this.db.list('gallery').snapshotChanges().subscribe((res) => {
            this.imageAlbumKeys = res as Array<SnapshotAction>;
        });
    }
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

        this.galleryImages = [];
    }

    selectAlbum(i: number) {
        this.openAlbumKey = this.imageAlbumKeys[i].key;
        this.db.list('gallery/' + this.openAlbumKey + '/images').valueChanges().subscribe((imagesResult) => {
            let imagesArray = imagesResult as Array<string>;
            imagesArray.forEach((url) => {
                this.galleryImages = [];
                this.storage.ref('gallery/' + url).getDownloadURL().subscribe((fullUrl) => {
                    this.galleryImages.push({
                        small: fullUrl, 
                        medium: fullUrl,
                        big: fullUrl
                    });
                    this.openAlbum = this.imageAlbums[i];
                });
            });
        });
    }
}

export class ImageAlbum {
    title: string;
    imageurls: any;
}
