import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Character, IOption, Pagination } from '../../models/marvel.interface';
import { MarvelApiService } from '../../services/marvel-api.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
  providers: [MarvelApiService],
})
export class CharactersComponent implements OnInit {
  constructor(private marvelApiService: MarvelApiService) {}

  public option: IOption = {
    limit: 10,
    offset: 0,
  };
  public characters: Character[] = [];
  public pagination: Pagination = {
    limit: null,
    total: null,
    count: null,
    page: 1,
    maxSize: 3,
  };

  public loading: boolean = false;

  private getCharactersSub: Subscription;

  ngOnInit() {
    this.initPage();
  }

  private initPage() {
    this.searchCharacters();
  }

  public changePage(page: number) {
    this.searchCharacters(page);
  }

  public onSearchNameChange(value: string) {
    this.option.nameStartsWith = value.trim();
    this.searchCharacters();
  }

  public onSearchReset() {
    this.onSearchNameChange('');
  }

  public submitFormSearch(): boolean {
    this.searchCharacters();
    return false;
  }

  public displayResult(): string {
    const totalChars = this.pagination && this.pagination.total ? this.pagination.total : 0;
    return `Found ${totalChars} ${totalChars > 1 ? 'characters' : 'character'}.`;
  }

  private searchCharacters(page: number = 1) {
    this.loading = true;
    this.option.offset = (page - 1) * this.pagination.limit;
    this.unsubscribe(this.getCharactersSub);
    this.getCharactersSub = this.marvelApiService.getCharacters(this.option).subscribe(
      (data) => {
        if (!data || !Array.isArray(data.characters)) {
          this.characters = [];
          this.displayError();
          return;
        }

        // set pagination
        this.pagination = {
          ...this.pagination,
          ...{
            limit: data.limit,
            total: data.total,
            count: data.count,
          },
        };

        this.characters = data.characters.map((char: any) => {
          const { path, extension } = char.thumbnail || { path: null, extension: null };
          return {
            name: char.name,
            picture: extension && path ? `${path}.${extension}` : null,
          };
        });

        this.loading = false;
      },
      (error) => {
        this.displayError(error);
      }
    );
  }

  private displayError(error?: any) {
    this.loading = false;
    Swal.fire({ icon: 'warning', text: 'Une erreur est survenue. Veuillez réessayer ultérieurement...' });
  }

  private unsubscribe(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }
}
