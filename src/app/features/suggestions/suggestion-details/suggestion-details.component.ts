import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionsService } from '../../../services/suggestions.service';

@Component({
  selector: 'app-suggestion-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
export class SuggestionDetailsComponent implements OnInit {
  suggestion: Suggestion | undefined;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionsService: SuggestionsService
  ) {}

  ngOnInit(): void {
    // Récupérer l'id avec le service ActivatedRoute
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      // Appeler getSuggestionById() pour récupérer la suggestion par id
      this.suggestionsService.getSuggestionById(this.id).subscribe(data => {
        this.suggestion = data;
      });
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

  deleteSuggestion(): void {
    this.suggestionsService.deleteSuggestion(this.id).subscribe(() => {
      this.router.navigate(['/suggestions']);
    });
  }

  updateSuggestion(): void {
    this.router.navigate(['/suggestions/edit', this.id]);
  }
}
