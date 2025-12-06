import { Component, inject } from "@angular/core";
import { AuthService } from "../../service/auth-service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-home-terminal',
    imports: [],
    templateUrl: './logout.html',
    styleUrl: './logout.css',
})
export class LogoutComponent {
    private authService: AuthService = inject(AuthService);
    private router: Router = inject(Router);

    ngOnInit() {
        this.logout();
    }

    logout() {
        this.authService.logout();
        this.router.navigateByUrl("/home");
    }
}