import { Component, Input } from '@angular/core';

@Component({
    selector: 'ma-nav-item',
    templateUrl: './nav-item.component.html',
    styleUrls: ['./nav-item.component.css']
})

export class NavItemComponent {

    @Input() icone = '';
    @Input() nome = '';
    @Input() redirect ='';
}