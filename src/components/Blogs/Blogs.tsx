import { useGetAllBlogsQuery } from '@/redux/api/blogApi';
import BlogCard from './BlogCard';
import { Link } from 'react-router';
import BlogCardSkeleton from './BlogCradSkeleton';
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}
const Blogs = () => {
  const { data, isLoading } = useGetAllBlogsQuery(undefined);
  const blogs = data?.data?.slice(0, 3);
  console.log(blogs);
  return (
    <section className='bg-white dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12 animate-fade-in-up'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Latest from Our Blog
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300'>
            Stay informed with financial tips and PayWallet updates
          </p>
        </div>
        <div className='grid md:grid-cols-3 gap-8'>
          {isLoading
            ? [1, 2, 3].map((_, i) => <BlogCardSkeleton key={i} />)
            : blogs?.map((blog: BlogPost) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
        </div>
        <div>
          <Link
            to='/blogs'
            className='bg-blue-600 mx-auto hover:bg-blue-700 flex items-center justify-center py-2 text-white font-bold w-fit px-4 rounded mt-8'
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
