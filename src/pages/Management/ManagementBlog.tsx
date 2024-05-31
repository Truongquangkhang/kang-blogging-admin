import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import DefaultLayout from '../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import ApiBlog from '../../apis/kang-blogging/blog';
import { IBlogMetadata } from '../../interfaces/model/blog_metadata';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ICategory } from '../../interfaces/model/category';
import { IUSerMetadata } from '../../interfaces/model/user_metadata';
import { FormatRelativeTime } from '../../utils/convert';
import { IconButton } from '@mui/material';
import { FaEye } from 'react-icons/fa';
import { MdOutlineModeEdit, MdDelete } from 'react-icons/md';

const columns1: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 350,
  },
  {
    field: `author`,
    headerName: `Author`,
    width: 150,
    renderCell: (params) => {
      const author = params.value as IUSerMetadata;
      return <p>{author.displayName}</p>;
    },
  },
  {
    field: 'categories',
    headerName: 'Categories',
    width: 250,
    renderCell: (params) => {
      const categories = params.value as ICategory[];
      const displayCategories = categories.slice(0, 1);
      const remainingCount = categories.length - displayCategories.length;

      return (
        <Tooltip
          className="cursor-pointer"
          title={
            <div>
              {categories.map((category) => (
                <div key={category.id}>{category.name}</div>
              ))}
            </div>
          }
          placement="top"
          arrow
        >
          <Stack direction="row" spacing={1}>
            {displayCategories.map((category) => (
              <Chip key={category.id} label={category.name} />
            ))}
            {remainingCount > 0 && <Chip label={`+${remainingCount} more`} />}
          </Stack>
        </Tooltip>
      );
    },
  },
  {
    field: 'totalBlogComments',
    headerName: 'Comments',
    width: 100,
  },
  {
    field: 'updatedAt',
    headerName: 'Edit at',
    width: 100,
    renderCell: (params) => {
      const timestamp = params.value as number;
      return <p>{FormatRelativeTime(timestamp)}</p>;
    },
  },
  {
    field: 'thumbnail',
    headerName: 'Actions',
    width: 150,
    renderCell: () => (
      <Stack direction="row" spacing={1}>
        <Tooltip title="Edit">
          <IconButton onClick={() => {}}>
            <FaEye className="w-3 h-4" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Show">
          <IconButton onClick={() => {}}>
            <MdOutlineModeEdit className="w-3 h-4" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={() => {}}>
            <MdDelete className="w-3 h-4" />
          </IconButton>
        </Tooltip>
      </Stack>
    ),
  },
];

const Blogs: IBlogMetadata[] = [];

const ManagementBlog = () => {
  //const [blogs, setBlogs] = useState<IBlogMetadata[]>([]);
  const [pageState, setPageState] = useState({
    page: 0,
    pageSize: 20,
    total: 0,
    isLoading: true,
    data: Blogs,
  });

  useEffect(() => {
    const fetchData = async () => {
      ApiBlog.getBlogs({
        page: pageState.page,
        pageSize: pageState.pageSize,
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
    <DefaultLayout>
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={pageState.data}
          rowCount={pageState.total}
          loading={pageState.isLoading}
          rowsPerPageOptions={[20, 30, 50, 70]}
          pagination
          page={pageState.page}
          pageSize={pageState.pageSize}
          // sortingMode="server"
          // filterMode="server"
          paginationMode="server"
          onPageChange={(newPage) => {
            setPageState((old) => ({ ...old, page: newPage }));
          }}
          onPageSizeChange={(newPageSize) =>
            setPageState((old) => ({ ...old, pageSize: newPageSize }))
          }
          columns={columns1}
          checkboxSelection
        />
      </Box>
    </DefaultLayout>
  );
};

export default ManagementBlog;
