import { useForm } from 'react-hook-form';
import styles from './form.module.css';
import { savePost } from '@/app/service/PostService';
const MyForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmit = async(data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('type_post', data.category);
        for (let i = 0; i < data.files.length; i++) {
          formData.append('file[]', data.files[i]);
        }
        // formData.append('file[]', data.files);
        // console.log(data.files); 
        // console.log(data.files[0]); 

        await savePost(formData)
        console.log("guardado")
      };
    
      return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formstyle}>
          <div className='flex flex-col'>
            <label htmlFor="title">Título:</label>
            <input {...register('title', { required: true })} id="title" />
            {errors.title && <span className={styles.error}>Este campo es obligatorio</span>}
          </div>
          <div className='flex flex-col'>
            <label htmlFor="files">Archivos:</label>
            <input {...register('files', { required: true })} type="file" id="files" multiple />
            {errors.files && <span className={styles.error}>Este campo es obligatorio</span>}
          </div>
    
          <div className='flex flex-col'>
            <label htmlFor="category">Categoría:</label>
            <select className={styles.select} {...register('category', { required: true })} id="category">
              <option value="blog">Blog</option>
              <option value="post">Post</option>
              <option value="news">News</option>
              <option value="others">Others</option>
            </select>
            {errors.category && <span className={styles.error}>Selecciona una categoría</span>}
          </div>
          <div className='flex flex-col'>
            <label htmlFor="content">Contenido:</label>
            <textarea {...register('content', { required: true })} id="content" />
            {errors.content && <span className={styles.error}>Este campo es obligatorio</span>}
          </div>
          <button type="submit">Enviar</button>
        </form>
      );
}

export default MyForm