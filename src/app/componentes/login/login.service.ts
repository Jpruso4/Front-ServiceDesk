import { Injectable, OnInit } from "@angular/core";

import { DataServices } from "src/app/data.service";

@Injectable()
export class LoginService implements OnInit{

    constructor(private dataService: DataServices){}

    ngOnInit(): void {
        
    }

    login(email: string, password: string){
        return new Promise((resolve, reject) =>{
            
        })
    }

}