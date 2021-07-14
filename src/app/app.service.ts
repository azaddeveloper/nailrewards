import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { StoreUser } from './models/store-user.model';

@Injectable()
export class AppService {
    constructor(private injector: Injector) { }
    initializeApp(): Promise<any> {

        var promise = new Promise(((resolve, reject) => {
            this.injector.get(AuthService).initializeApp()
            resolve();
        }));

        return promise;
    }

}