import { CameraOptions } from "@ionic-native/camera";

export interface Perfil{
    image: string;
    username: string;
    nombre: string;
    apellido: string;
}


    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit:true,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 50
    }

    this.camera.getPicture( options )
    .then(imageData => {
      // this.image = 'data:image/jpeg;base64,${imageData}';
      this.image = 'data:image/jpeg;base64,' + imageData;
      console.log(this.image);
      
      
    })
    .catch(error =>{
      console.error( error );
    });
  