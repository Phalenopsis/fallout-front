import { Component, inject } from "@angular/core";
import { AuthService } from "../../service/auth-service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-home-terminal',
    standalone: true,
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

    async logout() {
        this.authService.logout().subscribe(() => this.router.navigateByUrl("/home"));

    }
}