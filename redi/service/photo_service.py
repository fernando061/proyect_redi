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
        print("##############################################################")
        for file in files:
            print(file.filename)
            bucket = storage.bucket()
            blob = bucket.blob(file.filename)
            mime_type, _ = mimetypes.guess_type(file.filename)
            blob_name = f"{typePost}/{file.filename}"
            blob = bucket.blob(blob_name)
            # Subir el archivo a Firebase Storage con el tipo MIME detectado
            blob.upload_from_file(file, content_type=mime_type)
            
            # Esperar a que la carga se complete antes de obtener la URL firmada
            blob.reload()
            url = blob.generate_signed_url(expiration=300, method='GET')
            urls.append(url)
            photos.append( Photo(
                type_file = mime_type,
                url_file = url
            ))
        data_base.session.add_all(photos)
        data_base.session.commit()
        return urls
