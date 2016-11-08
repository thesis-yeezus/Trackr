import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <p>
      login Works!
    </p>
<button class="ui button green" (click)="myModal.show()">Click me</button>
<sm-modal title="Hello from Modal" class="basic" #myModal>
    <modal-content>
        ...
    </modal-content>
</sm-modal>

  `,
  styles: []
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  test(){
    alert('sup');
  }

}
