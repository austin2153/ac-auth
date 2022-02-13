import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  servers = [
    {
      id: 1,
      name: 'Jackson',
      status: "online"
    },
    {
      id: 2,
      name: 'Lansing',
      status: "online"
    },
    {
      id: 3,
      name: 'Grand Rapids',
      status: "offline"
    },
  ];

}
