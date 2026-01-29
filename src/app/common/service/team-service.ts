import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Team } from '../../model/team.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  http = inject(HttpClient);
  private readonly _teams = signal<Team[]>([]);
  teams = this._teams.asReadonly();

  setTeams(teams: Team[]) {
    this._teams.set(teams);
  }

  clear() {
    this._teams.set([]);
  }

  getTeams() {
    return this.http.get<Team[]>(`${environment.apiUrl}/api/teams`);
  }
}
