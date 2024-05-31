import { IBlogMetadata } from '../../interfaces/model/blog_metadata';
import BlogDetail from './BlogDetail';

interface Prop {
  blogs: IBlogMetadata[];
}

const ListBlog = (prop: Prop) => {
  return (
    <div className="flex flex-col space-y-3 w-full justify-center">
      {prop.blogs.map((blog) => {
        return <BlogDetail key={blog.id} blog={blog} />;
      })}
    </div>
  );
};

export default ListBlog;
