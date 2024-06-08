import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import ApiBlog from '../../apis/kang-blogging/blog';
import { IBlogMetadata } from '../../interfaces/model/blog_metadata';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  renderActions,
  renderAuthor,
  renderCategories,
  renderEditAt,
  renderStatus,
} from './Helper';
import { MapErrorResponse } from '../../utils/map_data_response';
import { AxiosError } from 'axios';
import { useAppDispatch } from '../../hooks/useAppSelectorDitpatch';
import { setNotify } from '../../redux/reducers/notify';
import { NotifyType } from '../../interfaces/model/notify';

const Blogs: IBlogMetadata[] = [];

const AllBlogs = () => {
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
      field: 'published',
      headerName: 'Status',
      width: 100,
      renderCell: renderStatus,
    },
    {
      field: '#',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => renderActions(params, handlerDeleteBlog),
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
            type: NotifyType.ERROR,
          }),
        );
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      ApiBlog.getBlogs({
        page: pageState.page,
        pageSize: pageState.pageSize,
        is_deprecated: false,
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

export default AllBlogs;
