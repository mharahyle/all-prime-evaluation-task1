import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { EditingComponent } from './app/pages/editing/editing.component';
import { FilteringComponent } from './app/pages/filtering/filtering.component';
import { PagingComponent } from './app/pages/paging/paging.component';
import { SortingComponent } from './app/pages/sorting/sorting.component';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter([
      { path: '', redirectTo: 'grid1', pathMatch: 'full' },
      { path: 'grid1', component: PagingComponent },
      { path: 'grid2', component: SortingComponent },
      { path: 'grid3', component: FilteringComponent },
      { path: 'grid4', component: EditingComponent },
      { path: '**', redirectTo: '/grid1' },
    ]),
  ],
}).catch((err) => console.error(err));