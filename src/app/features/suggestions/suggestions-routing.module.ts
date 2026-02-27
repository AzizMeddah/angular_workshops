import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestionsListComponent } from './suggestions-list/suggestions-list.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { SuggestionsContainerComponent } from './suggestions-container/suggestions-container.component';
import { SuggestionFormComponent } from './suggestion-form/suggestion-form.component';

const routes: Routes = [
  {
    path: '',
    component: SuggestionsContainerComponent,
    children: [
      { path: '', component: SuggestionsListComponent },
      { path: 'new', component: SuggestionFormComponent },
      { path: 'edit/:id', component: SuggestionFormComponent },
      { path: ':id', component: SuggestionDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestionsRoutingModule { }
