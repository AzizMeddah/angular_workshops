import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionsService } from '../../../services/suggestions.service';

@Component({
  selector: 'app-suggestion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})
export class SuggestionFormComponent {
  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  currentDate: string = this.formatDate(new Date());

  suggestionForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('^[A-Z][a-zA-Z ]*$')
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(30)
    ]),
    category: new FormControl('', [Validators.required]),
    date: new FormControl({ value: this.formatDate(new Date()), disabled: true }),
    status: new FormControl({ value: 'en attente', disabled: true })
  });

  constructor(
    private suggestionsService: SuggestionsService,
    private router: Router
  ) {}

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const newSuggestion: Suggestion = {
        id: 0, // sera généré par le service
        title: this.suggestionForm.get('title')?.value || '',
        description: this.suggestionForm.get('description')?.value || '',
        category: this.suggestionForm.get('category')?.value || '',
        date: new Date(),
        status: 'en_attente',
        nbLikes: 0
      };

      this.suggestionsService.addSuggestion(newSuggestion);
      this.router.navigate(['/suggestions']);
    }
  }

  // Getters pour accéder facilement aux contrôles dans le template
  get title() { return this.suggestionForm.get('title'); }
  get description() { return this.suggestionForm.get('description'); }
  get category() { return this.suggestionForm.get('category'); }
}
