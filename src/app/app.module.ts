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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'bio', component: BioComponent },
	{ path: 'gallery', component: GalleryComponent },
	{ path: 'admin', component: AdminComponent },
	{ path: 'blog', component: BlogComponent },
	{ path: 'concert', component: ConcertComponent },
	{ path: 'songs', component: SongsComponent },
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
			PageNotFoundComponent
		],
	imports: [
		RouterModule.forRoot(appRoutes,{ enableTracing: true }),
		BrowserModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
