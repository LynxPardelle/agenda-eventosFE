import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
/* Modules */
import { SharedModule } from '../../../shared/shared.module';
/* Interfaces */
import { IUser } from '../../interfaces/user';
import { IActionTable } from '../../../shared/interfaces/actionTable';
import { ISpecialCell } from '../../../shared/interfaces/specialCell';
import { IStoredSpecialCell } from '../../../shared/interfaces/storedSpecialCell';
import { IOptionButton } from '../../../shared/interfaces/optionButton';
/* Models */
/* Services */
import { SharedService } from '../../../shared/services/shared.service';
import { UserService } from '../../services/user.service';
/* Material */
import { MatTableDataSource } from '@angular/material/table';
/* Components */
import { GenericButtonComponent } from '../../../shared/components/generic-button/generic-button.component';
import { LogoShowComponent } from '../../../shared/components/logo-show/logo-show.component';
import { GenericTableComponent } from '../../../shared/components/generic-table/generic-table.component';

@Component({
  selector: 'app-user-list',
  imports: [SharedModule, RouterLink, GenericButtonComponent, LogoShowComponent, GenericTableComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  public users: IUser[] = [];
  public ELEMENT_DATA: any[] = [];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource(
    this.users
  );
  public isEdit: boolean = false;
  public displayedColumns: string[] = [
    'name',
    'tickets',
    'email' /* , 'actions' */,
  ];
  public actions: IActionTable[] = [
    /* {
      type: 'edit',
      action: 'edit',
      tooltip: 'Editar',
    }, */
  ];
  public currentPage: number = 1;
  public pages: number = 1;
  public pageSize: number = 10;
  public type: string = 'user';
  public specialColumns: string[] = [];
  public getSpecialCell = (value: string): ISpecialCell => {
    let alreadyStoredSpecialCell: any = this.storedSpecialCells.find((sC) => {
      return value === sC.value;
    });
    if (alreadyStoredSpecialCell) {
      return alreadyStoredSpecialCell.cell;
    } else {
      let specialCell: ISpecialCell = {
        type: 'customHtml',
        thing: value,
      };
      switch (true) {
        case value.includes('Button'):
          specialCell.type = 'button';
          specialCell.object = {
            type: value,
            classButton: 'btn btn-primary',
            disabled: false,
          };
          break;
        default:
          break;
      }
      this.storedSpecialCells.push({
        value: value,
        cell: specialCell,
        index: this.storedSpecialCells.length,
      });
      return specialCell;
    }
  };
  public storedSpecialCells: IStoredSpecialCell[] = [];
  public currentSort: string = '_id';
  public loadingData: boolean = false;
  public showOptions: boolean = false;
  public options: IOptionButton[] = [];
  constructor(
    private location: Location,
    private _router: Router,
    private _sharedService: SharedService,
    private _userService: UserService
  ) {
    this.options = [
      {
        id: 'create',
        icon: this.getHTML('create'),
        show: true,
        text: 'Crear nuevo usuario',
        click: 'create',
      },
    ]
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getData();
    this.cssCreate();
  }
  getData() {
    this.loadingData = true;
    this.ELEMENT_DATA = [];
    this._userService.getUsers(this.currentPage, this.pageSize).subscribe({
      next: (res: {
        status: string;
        total_items: number;
        pages: number;
        users: IUser[];
      }) => {
        this.users = res.users;
        this.ELEMENT_DATA = this.users.map((user) => {
          return {
            _id: user?._id,
            name: user?.name,
            tickets: `
            <ul class="list-group list-group-numbered">
            ${user.tickets
              .map((ticket) => {
                return `
                <li class="list-group-item">
                  <ul class="list-group list-group-horizontal">
                    <li class="list-group-item">Evento: ${ticket.evento?.title}</li>
                    <li class="list-group-item">Role: ${ticket.role}</li>
                  </ul>
                </li>
                `;
              })
              .join('')}
            </ul>
            `,
            email: user?.email,
          };
        });
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.pages = res.pages;
        this.loadingData = false;
      },
      error: (e) => {
        this._sharedService.consoleParser({ thing: e, type: 'error' });
        this.ELEMENT_DATA = [];
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.loadingData = false;
      },
    });
  }
  /* Configuración para sacar páginas */
  getPages(): number[] {
    let pages: number[] = [];
    for (let i = 1; i <= this.pages; i++) {
      pages.push(i);
    }
    return pages;
  }
  doAction(event: IActionTable) {
    this._sharedService.consoleLog(event);
    switch (true) {
      case event.action === 'edit':
        break;
      case event.action === 'delete':
        break;
      default:
        break;
    }
  }
  /* Configuración para cambiar páginas */
  /**
   * @param  {number} page
   * @returns void
   */
  changePage(page: number): void {
    this.currentPage = page;
    this.getData();
  }
  changePageSize(pageSize: number): void {
    this.pageSize = pageSize;
    this.currentPage = 1;
  }
  /* Configuración para hacer el sort de la lista */
  getSort(sort: any) {
    if (sort.direction === 'desc') {
      this.currentSort = '-' + sort.active;
    } else {
      this.currentSort = sort.active;
    }
  }
  clickedButton(event: any) {
    switch (event) {
      case 'edit':
        this.isEdit = true;
        this.showOptions = false;
        break;
      case 'create':
        this._router.navigate(['/user/user']);
        this.showOptions = false;
        break;
      default:
        break;
    }
  }
  changesInput(event: any) {
    this._sharedService.consoleLog(event);
  }
  buttonId(event: any) {
    this._sharedService.consoleLog(event);
  }
  recoverThing(event: any) {
    this._sharedService.consoleLog(event);
  }
  recoverSelected(event: any) {
    this._sharedService.consoleLog(event);
    this._router.navigate(['/user/user', event._id]);
  }
  getHTML(type: string): string {
    return this._sharedService.getHTML(type);
  }
  returnToPreviousPage() {
    this.location.back();
  }
  cssCreate() {
    this._sharedService.cssCreate();
  }
}
