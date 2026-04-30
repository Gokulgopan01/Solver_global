import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { WorkComponent } from './component/work/work.component';
import { VisitVisaComponent } from './component/visit-visa/visit-visa.component';
import { StudyAbroadComponent } from './component/study-abroad/study-abroad.component';
import { GalleryComponent } from './component/gallery/gallery.component';
import { HireWorkersComponent } from './component/hire-workers/hire-workers.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'work',
        component: WorkComponent
    },
    {
        path: 'visit-visa',
        component: VisitVisaComponent
    },
    {
        path: 'study-abroad',
        component: StudyAbroadComponent
    },
    {
        path: 'gallery',
        component: GalleryComponent
    },
    {
        path: 'hire-workers',
        component: HireWorkersComponent
    },
    {
        path: 'navbar',
        component: NavbarComponent
    }
];
