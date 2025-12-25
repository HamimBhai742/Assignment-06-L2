import {
  useCreateReviewMutation,
  useGetMyReviewsQuery,
} from '@/redux/api/reviewApi';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { format } from 'timeago.js';

export interface Review {
  _id: string;
  rating: number;
  comment: string;
  serviceType: string;
  user: {
    name: string;
    role: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
}

const UserReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [createReview] = useCreateReviewMutation();
  const { data } = useGetMyReviewsQuery(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    comment: '',
    serviceType: '',
    agentName: '',
  });

  useEffect(() => {
    if (data) {
      setReviews(data?.data as Review[]);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await createReview(formData);
    if (data) {
      toast.success('Review submitted successfully!');
      setIsModalOpen(false);
    }
    if (error) {
      toast.error('Failed to submit review. Please try again.');
    }
    setFormData({ rating: 5, comment: '', serviceType: '', agentName: '' });
  };

  const renderStars = (
    rating: number,
    interactive = false,
    onRate?: (rating: number) => void
  ) => {
    return (
      <div className='flex gap-1'>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            onClick={interactive ? () => onRate?.(star) : undefined}
            className={`text-xl ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } ${interactive ? 'hover:text-yellow-400 cursor-pointer' : ''}`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>My Reviews & Feedback</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-200'
        >
          Write Review
        </button>
      </div>

      <div className='grid gap-4'>
        {reviews?.length === 0 ? (
          <div className='text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl'>
            <div className='w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg
                className='w-8 h-8 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
              No Reviews Yet
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
              Share your experience with our services
            </p>
          </div>
        ) : (
          reviews?.map((review: Review) => (
            <div
              key={review._id}
              className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700'
            >
              <div className='flex justify-between items-start mb-4'>
                <div>
                  {renderStars(review.rating)}
                  <p className='text-sm flex gap-4 items-center text-gray-500 dark:text-gray-400 mt-1'>
                    <span className='font-semibold'> {review.serviceType}</span>{' '}
                    • {format(review.createdAt)}
                  </p>
                </div>
              </div>
              <p className='text-gray-700 dark:text-gray-300'>
                {review.comment}
              </p>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
          <div className='bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md'>
            <div className='p-6 border-b border-gray-100 dark:border-gray-800'>
              <div className='flex items-center justify-between'>
                <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
                  Write a Review
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className='w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors'
                >
                  <svg
                    className='w-4 h-4 text-gray-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className='p-6 space-y-4'>
              <div className='space-y-2'>
                <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                  Rating
                </label>
                {renderStars(formData.rating, true, (rating) =>
                  setFormData({ ...formData, rating })
                )}
              </div>

              <div className='space-y-2'>
                <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                  Service Type
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) =>
                    setFormData({ ...formData, serviceType: e.target.value })
                  }
                  className='w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                  required
                >
                  <option value=''>Select service</option>
                  <option value='Cash In'>Cash In</option>
                  <option value='Cash Out'>Cash Out</option>
                  <option value='Send Money'>Send Money</option>
                  <option value='General Service'>General Service</option>
                </select>
              </div>

              <div className='space-y-2'>
                <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                  Comment
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  className='w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none'
                  placeholder='Share your experience...'
                  rows={4}
                  required
                />
              </div>

              <div className='flex gap-3 pt-4'>
                <button
                  type='submit'
                  className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl'
                >
                  Submit Review
                </button>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='px-6 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReviews;
