import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import DefaultLayout from '../../layout/DefaultLayout';
import { GetDashBoardResponse } from '../../interfaces/response/management_response';
import ApiManagement from '../../apis/kang-blogging/management';
import ListBlog from '../../components/ListBlog/ListBlog';
import ListComment from '../../components/ListComment/ListComment';
import { FiBook, FiUser, FiMessageSquare } from 'react-icons/fi';
import { FaHashtag } from 'react-icons/fa';

const ECommerce: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [board, setBoard] = useState<GetDashBoardResponse>();

  useEffect(() => {
    ApiManagement.getDashboard()
      .then((rs) => {
        setBoard(rs.data);

        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (isLoading) {
    return (
      <DefaultLayout>
        <p>LOADING...</p>
      </DefaultLayout>
    );
  }
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Total Blogs"
          total={board?.data.totalBlogs.toString() ?? '0'}
          rate="0.43%"
          levelUp
        >
          <FiBook />
        </CardDataStats>
        <CardDataStats
          title="Total Users"
          total={board?.data.totalUsers.toString() ?? '0'}
          rate="4.35%"
          levelUp
        >
          <FiUser />
        </CardDataStats>
        <CardDataStats
          title="Total Comments"
          total={board?.data.totalComments.toString() ?? '0'}
          rate="2.59%"
          levelUp
        >
          <FiMessageSquare />
        </CardDataStats>
        <CardDataStats
          title="Total Categories"
          total={board?.data.totalCategories.toString() ?? '0'}
          rate="0.95%"
          levelDown
        >
          <FaHashtag />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-8">
          <p className="font-semibold">New Blogs</p>
          <ListBlog blogs={board?.data.latestBlogs ?? []} />
        </div>
        <div className="col-span-4">
          <p className="font-semibold">New Comments</p>
          <ListComment comments={board?.data.latestComments ?? []} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
