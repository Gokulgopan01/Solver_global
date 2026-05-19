import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { WorkComponent } from './component/work/work.component';
import { ServicesComponent } from './component/services/services.component';
import { StudyAbroadComponent } from './component/study-abroad/study-abroad.component';
import { GalleryComponent } from './component/gallery/gallery.component';
import { HireWorkersComponent } from './component/hire-workers/hire-workers.component';
import { ReviewsComponent } from './component/reviews/reviews.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'work-abroad',
        component: WorkComponent
    },
    {
        path: 'services',
        component: ServicesComponent
    },
    {
        path: 'study-abroad-programs',
        component: StudyAbroadComponent
    },
    {
        path: 'success-gallery',
        component: GalleryComponent
    },
    {
        path: 'international-recruitment',
        component: HireWorkersComponent
    },
    {
        path: 'client-reviews',
        component: ReviewsComponent
    }
];
