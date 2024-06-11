import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isIOS: boolean;
  isDarkTheme = false;
  base64src: string;
  fileObj: {};
  imgSrc: string;

  constructor(
    private readonly platform: Platform) {}

  ngOnInit(): void {
    this.isIOS = this.platform.is('ios');
  }

  async selectImage(): Promise<void> {
    try {
      await Camera.requestPermissions();
    } catch (err) {
      // do nothing
      console.log(err);
    }

    let img: Photo = null;

    try {
      img = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos
      });
    } catch (err) {
      // cancel image from gallery
      console.log(err);
    }

    if (img) {
      const imgName = new Date().getTime() + `.${img.format}`;

      this.fileObj = {
        file: new File([this.base64ToBlob(img.base64String, img.format)], 'test'),
        fileName: imgName
      };
      
      this.base64src = `data:image/${img.format};base64,` + img.base64String;
    }
  }

  private base64ToBlob(base64Data: string, contentType: string): Blob {
    contentType = contentType || '';
    let sliceSize = 1024;
    let byteCharacters = atob(base64Data);
    let bytesLength = byteCharacters.length;
    let slicesCount = Math.ceil(bytesLength / sliceSize);
    let byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        let begin = sliceIndex * sliceSize;
        let end = Math.min(begin + sliceSize, bytesLength);

        let bytes = new Array(end - begin);
        for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }

    return new Blob(byteArrays, { type: contentType });
  }
}
