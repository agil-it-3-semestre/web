import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { NavBarComponent } from './nav-bar.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        NavBarComponent,
        NavItemComponent
    ],
    imports: [ 
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        RouterModule
    ],
    exports: [
        NavBarComponent,
        NavItemComponent
    ]
})
export class NavBarModule { }