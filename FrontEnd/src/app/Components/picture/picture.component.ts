import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PictureService } from '../../Services/picture.service';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css'],
})
export class PictureComponent implements OnChanges {
  imageURL: string | undefined;
  @Input() employeeId: number | undefined;
  childData: string = 'Initial Data';

  constructor(private pictureService: PictureService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employeeId'] && this.employeeId) {
      this.getPicture();
    }
  }

  getPicture(): void {
    this.pictureService.getImage(this.employeeId!).subscribe(
      (data: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imageURL = reader.result as string;
        };
        reader.readAsDataURL(data);
      },
      (error) => {
        this.imageURL = "";
        console.error('Failed to load image', error);
      }
    );
  }
}
