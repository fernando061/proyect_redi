import { useForm } from 'react-hook-form';
import styles from './form.module.css';
const MyForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data) => {
          
        console.log(data); // Aquí puedes manejar los datos del formulario
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