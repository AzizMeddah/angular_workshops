import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { SuggestionsListComponent } from './suggestions-list/suggestions-list.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { SuggestionsContainerComponent } from './suggestions-container/suggestions-container.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    SuggestionsRoutingModule,
    SuggestionsListComponent,
    SuggestionDetailsComponent,
    SuggestionsContainerComponent
  ]
})
export class SuggestionsModule { }
