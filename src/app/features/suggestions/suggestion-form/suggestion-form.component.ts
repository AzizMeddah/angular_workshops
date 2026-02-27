import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionsService } from '../../../services/suggestions.service';

@Component({
  selector: 'app-suggestion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})
export class SuggestionFormComponent implements OnInit {
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

  id: number | null = null;
  isEditMode: boolean = false;
  suggestion: Suggestion | undefined;

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
    private router: Router,
    private actR: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.actR.snapshot.params['id'];
    if (this.id) {
      this.isEditMode = true;
      this.suggestionsService.getSuggestionById(this.id).subscribe((data) => {
        this.suggestion = data;
        this.suggestionForm.patchValue({
          title: this.suggestion.title,
          description: this.suggestion.description,
          category: this.suggestion.category,
          date: this.formatDate(new Date(this.suggestion.date)),
          status: this.suggestion.status
        });
      });
    }
  }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      if (this.isEditMode && this.suggestion) {
        // Mode modification
        const updatedSuggestion: Suggestion = {
          ...this.suggestion,
          title: this.suggestionForm.get('title')?.value || '',
          description: this.suggestionForm.get('description')?.value || '',
          category: this.suggestionForm.get('category')?.value || ''
        };

        this.suggestionsService.updateSuggestion(updatedSuggestion).subscribe(() => {
          this.router.navigate(['/suggestions']);
        });
      } else {
        // Mode ajout
        const newSuggestion: Suggestion = {
          id: 0, // sera généré par le backend
          title: this.suggestionForm.get('title')?.value || '',
          description: this.suggestionForm.get('description')?.value || '',
          category: this.suggestionForm.get('category')?.value || '',
          date: new Date(),
          status: 'en_attente',
          nbLikes: 0
        };

        this.suggestionsService.addSuggestion(newSuggestion).subscribe(() => {
          this.router.navigate(['/suggestions']);
        });
      }
    }
  }

  // Getters pour accéder facilement aux contrôles dans le template
  get title() { return this.suggestionForm.get('title'); }
  get description() { return this.suggestionForm.get('description'); }
  get category() { return this.suggestionForm.get('category'); }
}
