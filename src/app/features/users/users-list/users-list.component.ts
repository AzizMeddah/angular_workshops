import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar: string;
}

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  users: User[] = [
    {
      id: 1,
      name: 'Marie Dupont',
      email: 'marie.dupont@entreprise.com',
      role: 'Administrateur',
      department: 'IT',
      avatar: '👩‍💼'
    },
    {
      id: 2,
      name: 'Jean Martin',
      email: 'jean.martin@entreprise.com',
      role: 'Utilisateur',
      department: 'Ressources Humaines',
      avatar: '👨‍💼'
    },
    {
      id: 3,
      name: 'Sophie Bernard',
      email: 'sophie.bernard@entreprise.com',
      role: 'Manager',
      department: 'Marketing',
      avatar: '👩‍💻'
    },
    {
      id: 4,
      name: 'Pierre Dubois',
      email: 'pierre.dubois@entreprise.com',
      role: 'Utilisateur',
      department: 'Ventes',
      avatar: '👨‍💻'
    },
    {
      id: 5,
      name: 'Isabelle Petit',
      email: 'isabelle.petit@entreprise.com',
      role: 'Manager',
      department: 'Finance',
      avatar: '👩‍🔬'
    },
    {
      id: 6,
      name: 'Luc Moreau',
      email: 'luc.moreau@entreprise.com',
      role: 'Utilisateur',
      department: 'IT',
      avatar: '👨‍🔧'
    }
  ];

  getRoleBadgeClass(role: string): string {
    switch (role) {
      case 'Administrateur':
        return 'badge-admin';
      case 'Manager':
        return 'badge-manager';
      case 'Utilisateur':
        return 'badge-user';
      default:
        return '';
    }
  }
}
