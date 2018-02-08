import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BioComponent } from './bio/bio.component';
import { GalleryComponent } from './gallery/gallery.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './admin/admin.component';
import { BlogComponent } from './blog/blog.component';
import { ConcertComponent } from './concert/concert.component';
import { SongsComponent } from './songs/songs.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { FireDatabaseService } from './common/fire-database.service';
import { DictionaryPipe } from './common/dictionary.pipe';
import { NgxGalleryModule } from 'ngx-gallery';
import { AuthService } from './common/auth.service';
import { AuthGuard } from './common/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AdminBioComponent } from './admin/admin-bio/admin-bio.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { AdminConcertComponent } from './admin/admin-concert/admin-concert.component';
import { AdminSongsComponent } from './admin/admin-songs/admin-songs.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'bio', component: BioComponent },
	{ path: 'gallery', component: GalleryComponent },
	{ path: 'blog', component: BlogComponent },
	{ path: 'concert', component: ConcertComponent },
	{ path: 'songs', component: SongsComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
		children: [
		{ path: '', redirectTo: 'bio', pathMatch: 'full' },
		{ path: 'bio', component: AdminBioComponent },
		{ path: 'blog', component: AdminBlogComponent },
		{ path: 'concert', component: AdminConcertComponent },
		{ path: 'songs', component: AdminSongsComponent },
	  ]},
	/*{ path: 'hero/:id',      component: HeroDetailComponent },
	{
		path: 'heroes',
		component: HeroListComponent,
		data: { title: 'Heroes List' }
	},
	{ path: '',
		redirectTo: '/heroes',
		pathMatch: 'full'
	},*/
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
		declarations: [
			AppComponent,
			HomeComponent,
			BioComponent,
			GalleryComponent,
			NavbarComponent,
			AdminComponent,
			BlogComponent,
			ConcertComponent,
			SongsComponent,
			ContactComponent,
			PageNotFoundComponent,
			LoginComponent,
			DictionaryPipe,
			AdminConcertComponent,
			AdminBioComponent,
			AdminBlogComponent,
			AdminSongsComponent
		],
	imports: [
		FormsModule,
		RouterModule.forRoot(appRoutes),
		BrowserModule,
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule, // imports firebase/firestore, only needed for database features
		AngularFireDatabaseModule, // imports firebase/firestore, only needed for database features
		AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
		AngularFireStorageModule, // imports firebase/storage only needed for storage features
		CollapseModule.forRoot(),
		BsDropdownModule.forRoot(),
		NgxGalleryModule,
		OwlDateTimeModule, 
		OwlNativeDateTimeModule,
	],
	providers: [
		FireDatabaseService,
		AuthService,
		AuthGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
