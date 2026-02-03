import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { ListSuggestionComponent } from './core/list-suggestion/list-suggestion.component';
import { NotfoundComponent } from './core/notfound/notfound.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'listSuggestion', component: ListSuggestionComponent },
  {
    path: 'suggestions',
    loadChildren: () => import('./features/suggestions/suggestions.module').then(m => m.SuggestionsModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule)
  },
  { path: '**', component: NotfoundComponent }
];
