import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CampaignService } from '../../services/campaign.service';

@Component({
  selector: 'app-create-campaign',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-campaign.component.html',
  styleUrl: './create-campaign.component.css',
})
export class CreateCampaignComponent {
  campaignName = signal<string>('');
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  constructor(private campaignService: CampaignService) {}

  onSubmit(): void {
    const name = this.campaignName().trim();
    if (!name) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    this.campaignService.createCampaign(name).subscribe({
      next: (created) => {
        this.successMessage.set(`Campagne "${created.name}" initialisée avec succès !`);
        this.campaignName.set('');
        this.isLoading.set(false);
      },
      error: (err: Error) => {
        this.errorMessage.set(err.message);
        this.isLoading.set(false);
      },
    });
  }
}
