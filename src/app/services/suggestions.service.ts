import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suggestion } from '../models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {
  private suggestionUrl = 'http://localhost:3000/suggestions';

  constructor(private http: HttpClient) {}

  // Retourner la liste des suggestions
  getSuggestionsList(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.suggestionUrl);
  }

  // Retourner une suggestion par son id
  getSuggestionById(id: number): Observable<Suggestion> {
    return this.http.get<Suggestion>(`${this.suggestionUrl}/${id}`);
  }

  // Ajouter une nouvelle suggestion
  addSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    return this.http.post<Suggestion>(this.suggestionUrl, suggestion);
  }

  // Mettre à jour une suggestion
  updateSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    return this.http.put<Suggestion>(`${this.suggestionUrl}/${suggestion.id}`, suggestion);
  }

  // Supprimer une suggestion
  deleteSuggestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.suggestionUrl}/${id}`);
  }

  // Mettre à jour le nbLikes
  updateLikes(id: number, nbLikes: number): Observable<Suggestion> {
    return this.http.patch<Suggestion>(`${this.suggestionUrl}/${id}`, { nbLikes });
  }
}
