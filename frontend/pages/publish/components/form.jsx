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
        <form onSubmit={handleSubmit(onSubmit)} className={`mx-auto ${styles.formstyle} w-full md:max-w-md max-w-lg lg:max-w-lg xl:max-w-xl`}>
          <div className='flex flex-col mb-4'>
            <label htmlFor="title" >Título:</label>
            <input {...register('title', { required: true })} id="title" className="p-2 text-sm md:text-base"/>
            {errors.title && <span className={styles.error}>Este campo es obligatorio</span>}
          </div>
          <div className='flex flex-col mb-4'>
            <label htmlFor="event_date" >Título:</label>
            <input type='date' {...register('event_date', { required: false })} id="event_date" className="p-2 text-sm md:text-base"/>
            {errors.title && <span className={styles.error}>Este campo es obligatorio</span>}
          </div>
          <div className='flex flex-col mb-4'>
            <label htmlFor="files">Archivos:</label>
            <input {...register('files', { required: true })} type="file" id="files" multiple />
            {errors.files && <span className={styles.error}>Este campo es obligatorio</span>}
          </div>
    
          <div className='flex flex-col mb-4'>
            <label htmlFor="category" className="text-sm md:text-base">Categoría:</label>
            <select className={styles.select} {...register('category', { required: true })} id="category">
              <option value="blog">Blog</option>
              <option value="post">Post</option>
              <option value="news">News</option>
              <option value="others">Others</option>
            </select>
            {errors.category && <span className={styles.error}>Select a category</span>}
          </div>

          <div className='flex flex-col mb-4'>
            <label htmlFor="content"  className="text-sm md:text-base">Content:</label>
            <textarea {...register('content', { required: true })} id="content" className="p-2 text-sm md:text-base" />
            {errors.content && <span className={styles.error}>This fiel is required</span>}
          </div>

          <button type="submit" className="py-2 px-4 text-sm md:text-base">Send</button>
        </form>
      );
}

export default MyForm;