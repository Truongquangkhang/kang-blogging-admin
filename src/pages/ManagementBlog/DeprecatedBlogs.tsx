import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import ApiBlog from '../../apis/kang-blogging/blog';
import { IBlogMetadata } from '../../interfaces/model/blog_metadata';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  renderActionsDeprecated,
  renderAuthor,
  renderCategories,
  renderEditAt,
} from './Helper';
import { MapErrorResponse } from '../../utils/map_data_response';
import { AxiosError } from 'axios';
import { useAppDispatch } from '../../hooks/useAppSelectorDitpatch';
import { setNotify } from '../../redux/reducers/notify';

const Blogs: IBlogMetadata[] = [];

const DeprecatedBlogs = () => {
  const dispatch = useAppDispatch();
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 300 },
    {
      field: 'author',
      headerName: 'Author',
      width: 150,
      renderCell: renderAuthor,
    },
    {
      field: 'categories',
      headerName: 'Categories',
      width: 200,
      renderCell: renderCategories,
    },
    { field: 'totalBlogComments', headerName: 'Comments', width: 100 },
    {
      field: 'updatedAt',
      headerName: 'Edit at',
      width: 130,
      renderCell: renderEditAt,
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 100,
      renderCell: () => {
        return (
          <p className="px-1 py-2 w-full text-center rounded-md text-xs bg-red-400">
            Deprecated
          </p>
        );
      },
    },
    {
      field: '#',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) =>
        renderActionsDeprecated(params, handlerDeleteBlog, handlerViewBlog),
    },
  ];
  const [pageState, setPageState] = useState({
    page: 0,
    pageSize: 20,
    total: 0,
    isLoading: true,
    data: Blogs,
  });

  const handlerDeleteBlog = (blog_id: string) => {
    ApiBlog.deleteBlog(blog_id)
      .then(() => {
        setPageState((prevState) => ({
          ...prevState,
          data: prevState.data.filter((blog) => blog.id !== blog_id),
        }));
      })
      .catch((err) => {
        const e = MapErrorResponse((err as AxiosError).response);
        dispatch(
          setNotify({
            title: 'an occurred error',
            description: e.message,
            mustShow: true,
          }),
        );
      });
  };

  const handlerViewBlog = (blog_id: string) => {
    window.open(`http://localhost:5137/blog/${blog_id}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      ApiBlog.getBlogs({
        page: pageState.page,
        pageSize: pageState.pageSize,
        is_deprecated: true,
      }).then((rs) => {
        setPageState((old) => ({
          ...old,
          isLoading: false,
          total: rs.data.data.pagination.total,
          data: rs.data.data.blogs,
        }));
        //setBlogs(rs.data.data.blogs);
      });
    };
    fetchData();
  }, [pageState.page, pageState.pageSize]);
  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={pageState.data}
        rowCount={pageState.total}
        loading={pageState.isLoading}
        rowsPerPageOptions={[20, 30, 50, 70]}
        pagination
        page={pageState.page}
        pageSize={pageState.pageSize}
        paginationMode="server"
        onPageChange={(newPage) => {
          setPageState((old) => ({ ...old, page: newPage }));
        }}
        onPageSizeChange={(newPageSize) =>
          setPageState((old) => ({ ...old, pageSize: newPageSize }))
        }
        columns={columns}
        checkboxSelection
      />
    </Box>
  );
};

export default DeprecatedBlogs;
