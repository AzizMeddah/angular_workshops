import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionsService } from '../../../services/suggestions.service';

@Component({
  selector: 'app-suggestions-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './suggestions-list.component.html',
  styleUrl: './suggestions-list.component.css'
})
export class SuggestionsListComponent implements OnInit {
  favorites: Suggestion[] = [];
  searchTerm: string = '';
  suggestions: Suggestion[] = [];

  constructor(private suggestionsService: SuggestionsService) {}

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions(): void {
    this.suggestionsService.getSuggestionsList().subscribe(data => {
      this.suggestions = data;
    });
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'acceptee':
        return 'Acceptée';
      case 'refusee':
        return 'Refusée';
      case 'en_attente':
        return 'En attente';
      default:
        return status;
    }
  }

  likeSuggestion(id: number): void {
    const suggestion = this.suggestions.find(s => s.id === id);
    if (suggestion && suggestion.status !== 'refusee') {
      const newLikes = suggestion.nbLikes + 1;
      this.suggestionsService.updateLikes(id, newLikes).subscribe(updated => {
        suggestion.nbLikes = updated.nbLikes;
      });
    }
  }

  toggleFavorite(suggestion: Suggestion): void {
    const index = this.favorites.findIndex(f => f.id === suggestion.id);
    if (index === -1) {
      // Ajouter aux favoris
      this.favorites.push(suggestion);
    } else {
      // Retirer des favoris
      this.favorites.splice(index, 1);
    }
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(f => f.id === id);
  }

  get filteredSuggestions(): Suggestion[] {
    if (!this.searchTerm.trim()) {
      return this.suggestions;
    }

    const searchLower = this.searchTerm.toLowerCase().trim();

    return this.suggestions.filter(suggestion =>
      suggestion.title.toLowerCase().includes(searchLower) ||
      suggestion.category.toLowerCase().includes(searchLower)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
  }

  deleteSuggestion(id: number): void {
    this.suggestionsService.deleteSuggestion(id).subscribe(() => {
      this.loadSuggestions();
    });
  }
}
