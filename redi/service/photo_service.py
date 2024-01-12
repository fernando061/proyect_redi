from firebase_admin import storage
from models.photo import Photo
from typing import List
from extensions import data_base
import mimetypes
class PhotoService():
    def __init__(self):
        pass
    
    def upload_firebase(files,typePost):

        urls = []
        photos: List[Photo] = []
        for file in files:
            bucket = storage.bucket()
            blob = bucket.blob(file.filename)
            mime_type, _ = mimetypes.guess_type(file.filename)
            blob_name = f"{typePost}/{file.filename}"
            blob = bucket.blob(blob_name)

            # Subir el archivo a Firebase Storage con el tipo MIME detectado
            blob.upload_from_file(file, content_type=mime_type)
            

            # Obtener la URL pública del archivo
            blob.make_public()

            url = blob.public_url
            urls.append(url)

            # Esperar a que la carga se complete antes de obtener la URL firmada
            # blob.reload()
            # url = blob.generate_signed_url(expiration=datetime.timedelta(minutes=1), method='GET')
            # urls.append(url)
            photos.append( Photo(
                type_file = mime_type,
                url_file = url
            ))

        data_base.session.add_all(photos)
        data_base.session.commit()
        # photo_ids = [photo.id for photo in photos]
        return photos
    # def get_storage_url(bucket_name, blob_name):
    #     bucket = storage.bucket()
    #     # Obtener referencia al archivo (blob) dentro del bucket
    #     blob = bucket.blob(blob_name)

    #     # Obtener la URL pública del archivo
    #     url = blob.public_url

    #     return url
